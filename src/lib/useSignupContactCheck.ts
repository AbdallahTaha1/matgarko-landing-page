import { useEffect, useState } from 'react';
import { api, ApiError } from './api';

export function useSignupContactCheck(kind: 'email' | 'phone', value: string, enabled: boolean) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ value: '', attempt: -1, state: 'idle' });
  useEffect(() => {
    if (!enabled || !value) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      const valid = kind === 'email'
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) && value.length <= 320
        : /^\+[1-9][0-9]{6,14}$/.test(value);
      if (!valid) {
        setResult({ value, attempt, state: kind === 'email' ? 'EmailInvalid' : 'PhoneInvalid' });
        return;
      }
      setResult({ value, attempt, state: 'checking' });
      try {
        const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]);
        const response = await (kind === 'email' ? api.checkEmail(value, signal) : api.checkPhone(value, signal));
        if (!controller.signal.aborted) setResult({ value, attempt, state: response.available ? 'available' : response.code });
      } catch (error) {
        if (!controller.signal.aborted) setResult({ value, attempt, state: error instanceof ApiError ? error.code : 'NetworkError' });
      }
    }, 450);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [kind, value, enabled, attempt]);
  // An earlier response must never approve a value that is still being checked.
  const state = !value || !enabled ? 'idle' : result.value === value && result.attempt === attempt ? result.state : 'checking';
  return { state, available: state === 'available', retry: () => setAttempt(previous => previous + 1) };
}
