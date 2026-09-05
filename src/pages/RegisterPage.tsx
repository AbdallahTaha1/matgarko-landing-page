import React, { useState, useEffect } from 'react';
import { Check, X, Loader2, Store, ArrowRight, ArrowLeft } from 'lucide-react';
import { api } from '../lib/api';

// Reusing the simple debounce hook
function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    storeName: '',
    subdomain: '',
    email: '',
    password: '',
    confirmPassword: '',
    installSampleData: true,
    acceptTerms: false
  });

  const debouncedSubdomain = useDebounceValue(formData.subdomain, 500);
  const [subdomainStatus, setSubdomainStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'error'>('idle');
  const [subdomainMessage, setSubdomainMessage] = useState('');

  useEffect(() => {
    async function check() {
      if (debouncedSubdomain.length < 3) {
        setSubdomainStatus('idle');
        setSubdomainMessage('');
        return;
      }

      setSubdomainStatus('checking');
      const result = await api.checkSubdomain(debouncedSubdomain);
      
      if (result.available) {
        setSubdomainStatus('available');
        setSubdomainMessage(result.message);
      } else {
        setSubdomainStatus('taken');
        setSubdomainMessage(result.message);
      }
    }

    if (debouncedSubdomain) {
        check();
    }
  }, [debouncedSubdomain]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (step === 1) {
        if (!formData.storeName || !formData.subdomain) {
            setError('من فضلك املأ كل البيانات المطلوبة');
            return;
        }
        if (subdomainStatus !== 'available') {
            setError('من فضلك اختر رابط متجر متاح');
            return;
        }
        setError('');
        setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        setError('كلمتا المرور غير متطابقتين');
        return;
    }
    if (!formData.acceptTerms) {
        setError('يجب الموافقة على الشروط والأحكام');
        return;
    }

    setLoading(true);
    setError('');

    const result = await api.signup(formData);

    if (result.success && result.redirectUrl) {
        window.location.href = result.redirectUrl;
    } else if (result.success) {
         window.location.href = `http://${formData.subdomain}.lvh.me:5000/admin`;
    } else {
        setError(result.message || 'لم نتمكن من إنشاء المتجر');
        setLoading(false);
    }
  };

  return (
    <div className="hero-band noise-grid flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8" dir="rtl">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
            <div className="icon-tile h-14 w-14">
              <Store className="h-7 w-7" />
            </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black text-gray-950 font-heading">
          أنشئ متجرك الآن
        </h2>
        <p className="mt-2 text-center text-sm font-medium leading-6 text-gray-600">
          اختر اسم المتجر والرابط، ثم أكمل رحلة الإعداد بنفسك
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-lg border border-gray-200 bg-white px-4 py-8 shadow-2xl shadow-emerald-900/10 sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {step === 1 && (
                <div
                  key={step}
                  className="animate-in fade-in slide-in-from-right-4 space-y-4 duration-300"
                >
                  <div className="space-y-2">
                    <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">اسم المتجر</label>
                    <input
                      id="storeName"
                      name="storeName"
                      value={formData.storeName}
                      onChange={handleChange}
                      placeholder="متجري الرائع"
                      required
                      className="block h-12 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2 shadow-sm placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 sm:text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subdomain" className="block text-sm font-medium text-gray-700">رابط المتجر</label>
                    <div className="flex items-center space-x-2 space-x-reverse" dir="ltr">
                      <span className="text-gray-500 font-mono text-sm">.matgarko.com</span>
                      <div className="relative flex-1">
                        <input
                          id="subdomain"
                          name="subdomain"
                          value={formData.subdomain}
                          onChange={(e) => {
                              const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                              setFormData(prev => ({ ...prev, subdomain: val }));
                          }}
                          placeholder="mystore"
                          required
                          className={`block h-12 w-full appearance-none rounded-lg border px-4 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
                            subdomainStatus === 'available' ? 'border-emerald-500 focus:ring-emerald-100 focus:border-emerald-500' :
                            subdomainStatus === 'taken' ? 'border-red-500 focus:ring-red-100 focus:border-red-500' :
                            'border-gray-300 focus:ring-emerald-100 focus:border-emerald-500'
                          }`}
                        />
                        <div className="absolute inset-y-0 right-0 max-w-7 pr-3 flex items-center pointer-events-none">
                            {subdomainStatus === 'checking' && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
                            {subdomainStatus === 'available' && <Check className="h-4 w-4 text-green-500" />}
                            {subdomainStatus === 'taken' && <X className="h-4 w-4 text-red-500" />}
                        </div>
                      </div>
                    </div>
                    {subdomainMessage && (
                        <p className={`text-xs ${subdomainStatus === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                            {subdomainMessage}
                        </p>
                    )}
                  </div>

                  <button 
                    type="button" 
                    onClick={handleNext}
                    disabled={subdomainStatus !== 'available' || !formData.storeName}
                    className="flex h-12 w-full justify-center rounded-lg border border-transparent bg-gray-950 px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-emerald-900/10 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    التالي <ArrowLeft className="mr-2 h-4 w-4" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div
                  key={step}
                  className="animate-in fade-in slide-in-from-right-4 space-y-4 duration-300"
                >
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block h-12 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2 shadow-sm placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 sm:text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">كلمة المرور</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="block h-12 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2 shadow-sm placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 sm:text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">تأكيد كلمة المرور</label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="block h-12 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2 shadow-sm placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 sm:text-sm"
                    />
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <input
                      id="installSampleData"
                      name="installSampleData"
                      type="checkbox"
                      checked={formData.installSampleData}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="installSampleData" className="text-sm font-medium text-gray-700">إضافة بيانات تجريبية لمساعدتي في البداية</label>
                  </div>

                   <div className="flex items-center space-x-2 space-x-reverse">
                    <input
                      id="acceptTerms"
                      name="acceptTerms"
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      required
                    />
                     <label htmlFor="acceptTerms" className="text-sm font-medium text-gray-700">أوافق على <a href="#" className="text-primary hover:underline">الشروط والأحكام</a></label>
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                        {error}
                    </div>
                  )}

                  <div className="flex space-x-2 space-x-reverse mt-4">
                     <button type="button" onClick={() => setStep(1)} disabled={loading} className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                        <ArrowRight className="ml-2 h-4 w-4" /> السابق
                     </button>
                     <button type="submit" disabled={loading || !formData.acceptTerms} className="flex flex-1 justify-center rounded-lg border border-transparent bg-gray-950 px-4 py-2 text-sm font-extrabold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'إنشاء المتجر المستقل'}
                     </button>
                  </div>
                </div>
              )}

            </form>
        </div>
      </div>
    </div>
  );
}
