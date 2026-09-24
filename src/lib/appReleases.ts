export const RELEASE_URL = 'https://downloads.matgarko.com/android/latest.json';
export const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.matgarko.merchant';

export type Release = {
  versionCode: number;
  versionName: string;
  minSdk: number;
  downloadUrl?: string;
  storeUrl?: string;
  sizeBytes?: number;
};
export type Releases = { website: Release | null; play: Release | null };

function release(value: unknown, website: boolean): Release | null {
  if (value === null) return null;
  if (typeof value !== 'object' || !value) throw new Error('Invalid release');
  const v = value as Record<string, unknown>;
  if (!Number.isInteger(v.versionCode) || Number(v.versionCode) < 1 || Number(v.versionCode) > 2100000000 ||
      typeof v.versionName !== 'string' || !/^\d+\.\d+\.\d+$/.test(v.versionName) ||
      !Number.isInteger(v.minSdk) || Number(v.minSdk) < 24 || Number(v.minSdk) > 100) throw new Error('Invalid version');
  if (website) {
    if (v.downloadUrl !== `https://downloads.matgarko.com/android/releases/${v.versionName}-${v.versionCode}.apk` ||
        !Number.isInteger(v.sizeBytes) || Number(v.sizeBytes) < 1 || Number(v.sizeBytes) > 536870912 ||
        typeof v.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(v.sha256)) throw new Error('Invalid APK');
  } else if (v.storeUrl !== PLAY_URL) throw new Error('Invalid store URL');
  return v as Release;
}

export function parseReleases(value: unknown): Releases {
  if (typeof value !== 'object' || !value) throw new Error('Invalid manifest');
  const v = value as Record<string, unknown>;
  if (v.schemaVersion !== 1 || v.packageName !== 'com.matgarko.merchant') throw new Error('Unsupported manifest');
  return { website: release(v.website, true), play: release(v.play, false) };
}

export async function fetchReleases(signal: AbortSignal): Promise<Releases> {
  const response = await fetch(RELEASE_URL, { signal, cache: 'no-store', credentials: 'omit', redirect: 'error' });
  if (!response.ok || !response.body) throw new Error('Release service unavailable');
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let body = '';
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 65536) throw new Error('Manifest too large');
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    return parseReleases(JSON.parse(body));
  } finally {
    await reader.cancel();
  }
}
