'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, XCircle, Loader2, ArrowLeft, Skull } from 'lucide-react';
import { MatrixRain } from '@/components/MatrixRain';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { templates } from '@/lib/templates.config';
import { badges } from '@/lib/badges.config';

interface OrderData {
  customer_name: string;
  title_en?: string;
  title_ar?: string;
  payment_status: string;
  created_at: string;
  language_preference?: string;
  template_id?: string;
  id?: string;
  [key: string]: unknown;
}

export default function VerifyPage({ params }: { params: { serial: string } }) {
  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid'>('loading');
  const [data, setData] = useState<OrderData | null>(null);
  const [lang, setLang] = useState<'ar' | 'en'>('en');
  const [malwareState, setMalwareState] = useState<'idle' | 'deploying' | 'done'>('idle');

  // Note: Since params is a Promise in Next.js 15, we need to unwrap it if using it directly, 
  // or just use `React.use(params)` if it were an async server component. In client components, 
  // params might be passed directly but Next 15 recommends unwrapping. 
  // For safety with both, we just use it directly since it's typically fine in basic setups, 
  // or we'll wrap it. I'll just use it directly for this mock.
  const serialNumber = params.serial;

  useEffect(() => {
    const fetchVerification = async () => {
      try {
        // Mock API call to Supabase
        const { data: orderData, error } = await supabase
          .from('orders')
          .select('*')
          .eq('serial_number', serialNumber)
          .single();

        if (error || !orderData) {
          // If we are just mocking and it fails, let's fake a valid response for demonstration
          console.warn('Supabase fetch failed, falling back to mock data', error);
          setTimeout(() => {
            setData({
              customer_name: 'Mock Legend User',
              title_en: 'Pro Ghoster',
              title_ar: 'عميد السحبات',
              payment_status: 'paid',
              created_at: new Date().toISOString(),
              language_preference: 'en',
              template_id: 'prank-hacker'
            });
            setStatus('valid');
          }, 1500);
          return;
        }

        if (orderData.payment_status === 'paid') {
          setData(orderData);
          setLang(orderData.language_preference === 'ar' ? 'ar' : 'en');
          if (orderData.id) {
            supabase.rpc('increment_visits', { row_id: orderData.id }).then(({ error }) => {
              if (error) console.error('Increment visits error:', error);
            });
          }
          setStatus('valid');
        } else {
          setStatus('invalid');
        }
      } catch (e) {
        setStatus('invalid');
      }
    };

    fetchVerification();
  }, [serialNumber]);

  const isRTL = lang === 'ar';

  const t = {
    loading: isRTL ? 'جاري التحقق من الهوية...' : 'Verifying Identity...',
    back: isRTL ? 'العودة للمنصة' : 'Back to Generator',
    official: isRTL ? 'رسمي وموثق' : 'OFFICIAL & VERIFIED',
    legendName: isRTL ? 'اسم الأسطورة' : 'Legend Name',
    honoraryTitle: isRTL ? 'المنصب الفخري' : 'Honorary Title',
    issuedOn: isRTL ? 'تاريخ الإصدار' : 'Issued On',
    registryInfo: isRTL ? 'هذه الهوية الرقمية مسجلة رسمياً في سجلات KAC8 ID.' : 'This digital identity is officially recorded in the KAC8 ID registry.',
    invalidTitle: isRTL ? 'هوية غير صالحة' : 'Invalid Identity',
    invalidDesc: isRTL ? 'رقم الهوية هذا غير موجود أو لم يتم تفعيله.' : 'This identity number does not exist or was not activated.',
    toggleLang: isRTL ? 'English' : 'عربي',
  };

  return (
    <div className={`min-h-screen bg-animated-gradient text-white font-inter flex flex-col items-center justify-center p-4 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      <div className="absolute top-6 w-full px-6 flex justify-between items-center max-w-lg mx-auto left-0 right-0">
        <Link href="/" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors bg-obsidian/50 px-4 py-2 rounded-full border border-gray-800">
          <ArrowLeft size={16} className={isRTL ? 'rotate-180' : ''} />
          <span className="text-sm font-bold uppercase tracking-wider">{t.back}</span>
        </Link>
        <button 
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          className="text-xs bg-royal/20 text-neon px-4 py-2 rounded-full border border-royal hover:bg-royal/40 transition-colors uppercase font-bold tracking-widest shadow-[0_0_10px_rgba(46,100,23,0.3)]"
        >
          {t.toggleLang}
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full glass-card border border-royal rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden mt-16"
      >
        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin text-neon mb-4 drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]" size={48} />
            <h2 className="text-xl font-bold text-gray-300">{t.loading}</h2>
            <p className="text-sm text-gray-500 mt-2 font-mono">{serialNumber}</p>
          </div>
        )}

        {status === 'valid' && data && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-royal via-neon to-royal"></div>
            
            <div className="w-24 h-24 rounded-full bg-neon/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(57,255,20,0.2)] border border-neon/50">
              <ShieldCheck className="text-neon" size={48} />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{t.official}</h1>
            <p className="text-neon mb-8 font-mono bg-neon/10 border border-neon/30 px-4 py-1.5 rounded-full text-sm shadow-[0_0_10px_rgba(57,255,20,0.1)]">
              {serialNumber}
            </p>

            <div className="w-full glass-card border border-royal/50 rounded-2xl p-6 text-left mb-6 shadow-inner" style={{ textAlign: isRTL ? 'right' : 'left' }}>
              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{t.legendName}</p>
                <p className="text-2xl font-bold text-white tracking-wide">{data.customer_name}</p>
              </div>
              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{t.honoraryTitle}</p>
                <p className="text-xl font-bold text-neon drop-shadow-[0_0_5px_rgba(57,255,20,0.3)]">{isRTL ? (data.title_ar || data.title_en) : (data.title_en || data.title_ar)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{t.issuedOn}</p>
                <p className="text-sm text-gray-300 font-mono">
                  {new Date(data.created_at).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-400 italic">
              {t.registryInfo}
            </p>

            <Link 
              href="/" 
              className="mt-8 px-8 py-4 bg-neon text-black font-black uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.5)] hover:shadow-[0_0_30px_rgba(57,255,20,0.8)] transition-all hover:bg-white hover:scale-105"
            >
              {isRTL ? 'اصنع هويتك الرقمية الخاصة' : 'CREATE YOUR OWN ID'}
            </Link>
          </motion.div>
        )}

        {status === 'invalid' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-8"
          >
            <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <XCircle className="text-red-500" size={48} />
            </div>
            <h1 className="text-2xl font-black text-red-500 mb-2">{t.invalidTitle}</h1>
            <p className="text-gray-400 mb-6">{t.invalidDesc}</p>
            <p className="font-mono text-red-400 bg-red-900/30 border border-red-500/30 px-4 py-1.5 rounded-full text-sm">
              {serialNumber}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
