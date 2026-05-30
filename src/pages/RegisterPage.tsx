import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" dir="rtl">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
            <Store className="h-12 w-12 text-primary" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-heading">
          أنشئ متجرك الآن
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          اختر اسم المتجر والرابط، ثم أكمل رحلة الإعداد بنفسك
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
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
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
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
                          className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm ${
                            subdomainStatus === 'available' ? 'border-green-500 focus:ring-green-500 focus:border-green-500' :
                            subdomainStatus === 'taken' ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 
                            'border-gray-300 focus:ring-primary focus:border-primary'
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
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    التالي <ArrowLeft className="mr-2 h-4 w-4" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
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
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
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
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
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
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <input
                      id="installSampleData"
                      name="installSampleData"
                      type="checkbox"
                      checked={formData.installSampleData}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
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
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
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
                     <button type="button" onClick={() => setStep(1)} disabled={loading} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        <ArrowRight className="ml-2 h-4 w-4" /> السابق
                     </button>
                     <button type="submit" disabled={loading || !formData.acceptTerms} className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'إنشاء المتجر المستقل'}
                     </button>
                  </div>
                </motion.div>
              )}

            </form>
        </div>
      </div>
    </div>
  );
}
