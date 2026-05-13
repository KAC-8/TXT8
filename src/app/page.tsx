'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Loader2, PenTool, Check, Wand2, X, Smartphone, Image as ImageIcon, Coffee, Lock, Award } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import confetti from 'canvas-confetti';
import { templates } from '@/lib/templates.config';
import { badges } from '@/lib/badges.config';
import dynamic from 'next/dynamic';
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const SignaturePad = dynamic(() => import('react-signature-canvas'), { ssr: false });
const Particles = dynamic(() => import('@tsparticles/react'), { ssr: false });

const FUNNY_TITLES_AR = ['كبير المديرين التنفيذيين للتهرب', 'وزير شؤون النوم', 'عميد السحبات', 'مستشار كبسة معتمد', 'سفير النوايا السيئة'];
const FUNNY_TITLES_EN = ['Chief of Sleep', 'Pro Ghoster', 'Senior Procrastination Officer', 'Global Kabsa Master', 'Certified Couch Potato'];

const playClickSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {}
};

const playDingSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {}
};

const playMagicSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    
    const freqs = [400, 500, 600, 800, 1000, 1200];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.05);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.05);
      gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + i * 0.05 + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.05 + 0.2);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(ctx.currentTime + i * 0.05);
      osc.stop(ctx.currentTime + i * 0.05 + 0.2);
    });
  } catch (e) {}
};

const playRustleSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    const bufferSize = ctx.sampleRate * 0.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.connect(ctx.destination);
    noise.start();
  } catch (e) {}
};

const triggerConfetti = () => {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#2e6417', '#39ff14', '#ffd700']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#2e6417', '#39ff14', '#ffd700']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};

const AnimatedText = ({ text }: { text: string }) => {
  return (
    <AnimatePresence mode="popLayout">
      {text.split('').map((char, index) => (
        <motion.span
          key={"char-"+index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15, delay: index * 0.03 }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </AnimatePresence>
  );
};

// Input Sanitization
const sanitizeInput = (input: string) => {
  return input.replace(/[<>]/g, '').trim();
};

export default function HonoraryGenerator() {
  const [initParticles, setInitParticles] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInitParticles(true);
    });
  }, []);

  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const isRTL = lang === 'ar';
  const titles = isRTL ? FUNNY_TITLES_AR : FUNNY_TITLES_EN;

  const [name, setName] = useState('');
  const [selectedTitle, setSelectedTitle] = useState(titles[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccessView, setShowSuccessView] = useState(false);
  const [serial, setSerial] = useState('TX8-2026-0000');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadingSnap, setIsDownloadingSnap] = useState(false);
  
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0].id);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);
  const [showAIPopup, setShowAIPopup] = useState(false);
  const [showUnlockPopup, setShowUnlockPopup] = useState(false);
  const [pendingTemplateId, setPendingTemplateId] = useState<string | null>(null);
  const [unlockedPremium, setUnlockedPremium] = useState(false);
  
  const [aiInput, setAiInput] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [totalCount, setTotalCount] = useState(142);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [kac8Hovers, setKac8Hovers] = useState(0);
  const [showMatrix, setShowMatrix] = useState(false);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sigCanvasRef = useRef<any>(null);
  const hiddenCertificateRef = useRef<HTMLDivElement>(null);
  const hiddenSnapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We defer the serial generation slightly to avoid sync effect warnings
    const timer = setTimeout(() => {
      setSerial("TX8-2026-" + Math.floor(Math.random() * 10000).toString().padStart(4, '0'));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // We defer to avoid sync effect warnings
    const timer = setTimeout(() => {
      setSelectedTitle(isRTL ? FUNNY_TITLES_AR[0] : FUNNY_TITLES_EN[0]);
    }, 0);
    return () => clearTimeout(timer);
  }, [lang, isRTL, titles]);

  useEffect(() => {
    // Fetch live counter
    supabase.from('orders').select('*', { count: 'exact', head: true })
      .then(({ count }) => {
        if (count !== null) setTotalCount(count);
      });

    // We defer this state setting to avoid React sync effect warnings
    const timer = setTimeout(() => {
      const isUnlocked = localStorage.getItem('txt8_premium_unlocked') === 'true';
      if (isUnlocked) setUnlockedPremium(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleRandomize = () => {
    playClickSound();
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    setSelectedTitle(randomTitle);
  };

  const handleTemplateClick = (t: typeof templates[0]) => {
    playClickSound();
    if (t.isPremium && !unlockedPremium) {
      setPendingTemplateId(t.id);
      setShowUnlockPopup(true);
    } else {
      setSelectedTemplateId(t.id);
    }
  };

  const handleUnlockPremium = () => {
    window.open("https://x.com/KAC8ME", "_blank");
    setTimeout(() => {
      setUnlockedPremium(true);
      localStorage.setItem('txt8_premium_unlocked', 'true');
      if (pendingTemplateId) setSelectedTemplateId(pendingTemplateId);
      setShowUnlockPopup(false);
      triggerConfetti();
    }, 2000);
  };

  const handleAIGenerate = () => {
    if (!aiInput.trim()) return;
    playMagicSound();
    
    const inputLower = sanitizeInput(aiInput).toLowerCase();
    let newTitle = isRTL ? 'الأسطورة الغامضة' : 'The Mysterious Legend';
    
    if (inputLower.includes('sleep') || inputLower.includes('نوم') || inputLower.includes('lazy')) {
      newTitle = isRTL ? 'خبير السبات الشتوي' : 'The High-Speed Caffeinated Sloth';
    } else if (inputLower.includes('code') || inputLower.includes('برمجة') || inputLower.includes('bug')) {
      newTitle = isRTL ? 'صائد البق المحترف' : 'Chief Bug Creator';
    } else if (inputLower.includes('coffee') || inputLower.includes('قهوة')) {
      newTitle = isRTL ? 'مدمن الكافيين المعتمد' : 'Certified Caffeine Addict';
    } else if (inputLower.includes('fast') || inputLower.includes('سريع')) {
      newTitle = isRTL ? 'البرق الخاطف' : 'The Flash Runner';
    } else {
      const partsEn = ['Supreme', 'Galactic', 'Certified', 'Master', 'Chief'];
      const nounsEn = ['Vibe Checker', 'Procrastinator', 'Overthinker', 'Chaos Manager'];
      const partsAr = ['كبير', 'زعيم', 'مستشار', 'عميد'];
      const nounsAr = ['الروقان', 'التسليك', 'الهبد المبرح', 'الطاقة الإيجابية'];
      
      if (isRTL) {
         newTitle = partsAr[Math.floor(Math.random() * partsAr.length)] + ' ' + nounsAr[Math.floor(Math.random() * nounsAr.length)];
      } else {
         newTitle = partsEn[Math.floor(Math.random() * partsEn.length)] + ' ' + nounsEn[Math.floor(Math.random() * nounsEn.length)];
      }
    }

    setSelectedTitle(newTitle);
    setShowAIPopup(false);
    setAiInput('');
  };

  const handleClearSignature = () => {
    sigCanvasRef.current?.clear();
    setSignatureData(null);
  };

  const handleSaveSignature = () => {
    if (sigCanvasRef.current && !sigCanvasRef.current.isEmpty()) {
      setSignatureData(sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png'));
      setShowSignaturePad(false);
      playClickSound();
    }
  };

  const checkRateLimit = () => {
    const now = Date.now();
    const historyStr = localStorage.getItem('txt8_gen_history');
    let history: number[] = historyStr ? JSON.parse(historyStr) : [];
    
    history = history.filter(time => now - time < 60000); // within last 1 minute
    
    if (history.length >= 5) {
      alert(isRTL ? "هدّي اللعب يا هكر! لا تخلص الحبر الملكي." : "Security Alert: Calm down hacker! Don't waste all the royal ink.");
      return false;
    }
    
    history.push(now);
    localStorage.setItem('txt8_gen_history', JSON.stringify(history));
    return true;
  };

  const handleGenerateClick = async () => {
    if (honeypot) return; // Silent reject for bots
    if (!name.trim()) return;
    if (!checkRateLimit()) return;

    playClickSound();
    setIsGenerating(true);
    
    // Sanitize final inputs before sending
    const safeName = sanitizeInput(name);
    const safeTitle = sanitizeInput(selectedTitle);
    
    setName(safeName);
    setSelectedTitle(safeTitle);

    setTimeout(() => {
      setIsGenerating(false);
      setShowSuccessView(true);
      playRustleSound();
      triggerConfetti();
      
      supabase.from('orders').insert([{
        customer_name: safeName,
        title_ar: isRTL ? safeTitle : FUNNY_TITLES_AR[0],
        title_en: !isRTL ? safeTitle : FUNNY_TITLES_EN[0],
        serial_number: serial,
        payment_status: 'paid',
        language_preference: lang,
        template_id: selectedTemplateId,
        badge_id: selectedBadgeId
      }]).catch(() => {}); // Suppress console log
      
    }, 2000);
  };

  const simulateProgress = () => {
    setDownloadProgress(10);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 85) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return interval;
  };

  const handleDownloadPDF = async () => {
    if (!hiddenCertificateRef.current) return;
    setIsDownloading(true);
    playClickSound();
    const progInt = simulateProgress();
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;
      
      const canvas = await html2canvas(hiddenCertificateRef.current, { scale: 2, useCORS: true, logging: false });
      setDownloadProgress(90);
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("TXT8-Legend-" + (name || 'Anonymous') + ".pdf");
      setDownloadProgress(100);
    } catch (error) {
      // ignore
    } finally {
      clearInterval(progInt);
      setTimeout(() => { setIsDownloading(false); setDownloadProgress(0); }, 500);
    }
  };

  const handleDownloadPNG = async () => {
    if (!hiddenCertificateRef.current) return;
    setIsDownloading(true);
    playClickSound();
    const progInt = simulateProgress();
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(hiddenCertificateRef.current, { scale: 2, useCORS: true, logging: false });
      setDownloadProgress(90);
      const imgData = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.download = "TXT8-Legend-" + (name || 'Anonymous') + ".png";
      link.href = imgData;
      link.click();
      setDownloadProgress(100);
    } catch (error) {
      // ignore
    } finally {
      clearInterval(progInt);
      setTimeout(() => { setIsDownloading(false); setDownloadProgress(0); }, 500);
    }
  };

  const handleDownloadSnapchat = async () => {
    if (!hiddenSnapRef.current) return;
    setIsDownloadingSnap(true);
    playClickSound();
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(hiddenSnapRef.current, { scale: 2, useCORS: true, logging: false });
      setDownloadProgress(90);
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      const link = document.createElement('a');
      link.download = "TXT8-Snap-" + (name || 'Anonymous') + ".jpg";
      link.href = imgData;
      link.click();
    } catch (error) {
      // ignore
    } finally {
      setIsDownloadingSnap(false);
    }
  };

  const handleWhatsAppShare = () => {
    playClickSound();
    const url = "https://txt8.app/verify/" + serial;
    const text = isRTL 
      ? encodeURIComponent("أنا رسمياً حصلت على لقب [" + selectedTitle + "] من TXT8! شيكوا على صكي هنا: " + url)
      : encodeURIComponent("I officially claimed the title [" + selectedTitle + "] on TXT8! Check it out: " + url);
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.open("whatsapp://send?text=" + text, '_blank');
    } else {
      window.open("https://wa.me/?text=" + text, '_blank');
    }
  };

  const handleXShare = () => {
    playClickSound();
    const url = "https://txt8.app/verify/" + serial;
    const text = isRTL 
      ? encodeURIComponent("أنا رسمياً حصلت على لقب [" + selectedTitle + "] من TXT8! شيكوا على صكي هنا: " + url)
      : encodeURIComponent("I officially claimed the title [" + selectedTitle + "] on TXT8! Check it out: " + url);
    window.open("https://x.com/intent/tweet?text=" + text, '_blank');
  };

  const ActiveTemplate = templates.find(t => t.id === selectedTemplateId)?.component || templates[0].component;

  const animatedName = name ? <AnimatedText text={name} /> : (isRTL ? '[الاسم هنا]' : '[Your Name]');
  const animatedTitle = <AnimatedText text={selectedTitle} />;

  useEffect(() => {
    if (kac8Hovers >= 5) {
      setTimeout(() => setShowMatrix(true), 0);
      setTimeout(() => setShowMatrix(false), 5000);
      setTimeout(() => setKac8Hovers(0), 0);
    }
  }, [kac8Hovers]);

  return (
    <div className={"min-h-screen bg-animated-gradient text-white flex flex-col " + (isRTL ? 'rtl' : 'ltr')} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {showMatrix && (
        <div className="fixed inset-0 z-[100] pointer-events-none bg-black/90 flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 text-green-500 font-mono text-sm leading-none opacity-50 whitespace-pre wrap break-all select-none overflow-hidden" style={{ textShadow: '0 0 5px #0f0' }}>
            {Array.from({length: 200}).map((_, i) => "1010110001110101001101010 ".repeat(20)).join('')}
          </div>
          <h1 className="text-neon text-6xl font-black z-10 animate-pulse tracking-widest drop-shadow-[0_0_20px_rgba(57,255,20,1)]">
            SYSTEM OVERRIDE
          </h1>
        </div>
      )}

      <header className="p-6 border-b border-royal/30 text-center relative z-20">
        <div className="absolute top-6 right-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { playClickSound(); setLang(lang === 'ar' ? 'en' : 'ar'); }}
            className="text-xs bg-royal/20 text-neon px-3 py-1 rounded border border-royal hover:bg-royal/40 transition-colors"
          >
            {lang === 'ar' ? 'English' : 'عربي'}
          </motion.button>
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-widest text-royal drop-shadow-[0_0_10px_rgba(46,100,23,0.8)] cursor-pointer"
          onClick={() => setShowSuccessView(false)}
        >
          TXT8
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-2 text-sm uppercase tracking-widest font-inter"
        >
          {isRTL ? 'صكوك التقدير الفاخرة' : 'The Luxury Ego Booster'}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 inline-block bg-royal/10 border border-royal/30 px-4 py-1.5 rounded-full"
        >
          <span className="text-neon font-bold font-mono animate-pulse">{totalCount.toLocaleString()}</span>
          <span className="text-gray-300 text-xs ml-2 uppercase tracking-wide">
            {isRTL ? 'أسطورة تم اعتمادهم حتى الآن' : 'Legends Certified So Far'}
          </span>
        </motion.div>
      </header>

      {showSuccessView && initParticles && (
        <Particles
          id="tsparticles"
          options={{
            background: {
              color: { value: "transparent" },
            },
            fpsLimit: 60,
            particles: {
              color: { value: ["#39ff14", "#ffd700", "#ffffff"] },
              links: {
                color: "#2e6417",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 1,
                straight: false,
              },
              number: { density: { enable: true, area: 800 }, value: 60 },
              opacity: { value: 0.5 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 z-0"
        />
      )}

      <main className="max-w-7xl mx-auto p-4 md:p-6 w-full relative z-10 flex-grow flex flex-col justify-center">
        
        <AnimatePresence mode="wait">
          {!showSuccessView ? (
            <motion.div 
              key="editor"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-4 space-y-6">
                <h2 className="text-2xl font-bold mb-4 text-neon font-arabic-title">
                  {isRTL ? 'أصدر صكك الفاخر' : 'Claim Your Legendary Title'}
                </h2>
                
                {/* Honeypot field for bot protection */}
                <input 
                  type="text" 
                  name="user_website" 
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1} 
                  autoComplete="off"
                  className="absolute opacity-0 -left-[9999px]" 
                  aria-hidden="true" 
                />

                <div>
                  <label className="block text-sm text-gray-400 mb-2">{isRTL ? 'اختر القالب' : 'Select Template'}</label>
                  <div className="flex gap-2 overflow-x-auto pb-2 snap-x scrollbar-thin scrollbar-thumb-royal scrollbar-track-transparent">
                    {templates.map(t => (
                      <button
                        key={t.id}
                        onClick={() => handleTemplateClick(t)}
                        className={`snap-center flex-shrink-0 px-4 py-2 rounded-lg border-2 whitespace-nowrap transition-all flex items-center gap-2 ${selectedTemplateId === t.id ? 'border-neon bg-neon/10 text-white' : 'border-gray-700 bg-obsidian text-gray-400 hover:border-gray-500'}`}
                        style={{ borderColor: selectedTemplateId === t.id ? t.themeColor : undefined }}
                      >
                        {t.isPremium && !unlockedPremium && <Lock size={14} className="text-yellow-500" />}
                        {isRTL ? t.name.ar : t.name.en}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">{isRTL ? 'اسم الأسطورة' : 'Legend Name'}</label>
                  <input 
                    type="text" 
                    maxLength={40}
                    placeholder={isRTL ? 'الاسم الكريم...' : 'Enter your name...'}
                    className="w-full p-4 glass-input rounded text-white focus:outline-none transition-colors"
                    value={name}
                    onChange={(e) => { setName(e.target.value); }}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">{isRTL ? 'المنصب الوهمي' : 'Fictional Title'}</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      className="w-full p-4 glass-input rounded text-white focus:outline-none transition-colors"
                      value={selectedTitle}
                      onChange={(e) => { setSelectedTitle(e.target.value); }}
                    />
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAIPopup(true)}
                      className="bg-purple-600/50 hover:bg-purple-600 text-white px-4 rounded border border-purple-500/50 transition-all flex items-center justify-center"
                      title="AI Magic Suggestion"
                    >
                      <Wand2 size={20} className="animate-pulse" />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleRandomize}
                      className="bg-royal/50 hover:bg-royal text-white px-4 rounded border border-royal transition-all"
                    >
                      🎲
                    </motion.button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">{isRTL ? 'اختر وسام (اختياري)' : 'Select Elite Badge (Optional)'}</label>
                  <div className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-thin scrollbar-thumb-royal scrollbar-track-transparent">
                    <button
                        onClick={() => { playDingSound(); setSelectedBadgeId(null); }}
                        className={`snap-center flex-shrink-0 w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${!selectedBadgeId ? 'border-neon bg-neon/10' : 'border-gray-700 bg-obsidian hover:border-gray-500'}`}
                      >
                        <X size={20} className={!selectedBadgeId ? 'text-neon' : 'text-gray-500'} />
                    </button>
                    {badges.map(b => (
                      <button
                        key={b.id}
                        onClick={() => { playDingSound(); setSelectedBadgeId(b.id); }}
                        className={`snap-center flex-shrink-0 w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${selectedBadgeId === b.id ? 'border-neon ' + b.bg : 'border-gray-700 bg-obsidian hover:border-gray-500'}`}
                        title={isRTL ? b.name.ar : b.name.en}
                      >
                        <b.icon className={selectedBadgeId === b.id ? b.color : 'text-gray-400'} size={24} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">{isRTL ? 'التوقيع (اختياري)' : 'Signature (Optional)'}</label>
                  {!showSignaturePad ? (
                    <button 
                      onClick={() => setShowSignaturePad(true)}
                      className="w-full p-4 glass-input border-dashed rounded text-gray-400 hover:text-white hover:border-royal transition-colors flex items-center justify-center gap-2"
                    >
                      <PenTool size={18} />
                      {signatureData ? (isRTL ? 'تعديل التوقيع' : 'Edit Signature') : (isRTL ? 'أضف توقيعك هنا' : 'Add your signature here')}
                    </button>
                  ) : (
                    <div className="bg-white rounded border-2 border-royal overflow-hidden relative">
                      <SignaturePad 
                        ref={sigCanvasRef}
                        penColor="black"
                        canvasProps={{ className: 'w-full h-32 cursor-crosshair' }}
                      />
                      <div className="absolute bottom-2 right-2 flex gap-2">
                        <button onClick={handleClearSignature} className="bg-gray-200 text-black px-2 py-1 rounded text-xs">
                          {isRTL ? 'مسح' : 'Clear'}
                        </button>
                        <button onClick={handleSaveSignature} className="bg-royal text-white px-3 py-1 rounded text-xs flex items-center gap-1">
                          <Check size={14} /> {isRTL ? 'حفظ' : 'Save'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <motion.button 
                  whileHover={{ scale: !isGenerating && name.trim() ? 1.02 : 1 }}
                  whileTap={{ scale: !isGenerating && name.trim() ? 0.98 : 1 }}
                  onClick={handleGenerateClick}
                  disabled={isGenerating || !name.trim()}
                  className="w-full py-4 mt-4 bg-neon text-obsidian font-bold rounded shadow-[0_0_15px_rgba(57,255,20,0.4)] hover:shadow-[0_0_25px_rgba(57,255,20,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide flex justify-center items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      {isRTL ? 'جاري الاعتماد الملكي...' : 'Processing by Royal Decree...'}
                    </>
                  ) : (
                    isRTL ? 'اعتماد الصك الفاخر' : 'Generate Certificate'
                  )}
                </motion.button>
              </div>

              <div className="lg:col-span-8 flex items-center justify-center glass-card p-4 rounded-lg overflow-hidden relative">
                <div className="w-full max-w-4xl transform scale-[0.6] sm:scale-[0.75] md:scale-100 origin-center transition-all flex justify-center">
                  <ActiveTemplate 
                    name={animatedName}
                    title={animatedTitle}
                    serial={serial}
                    isRTL={isRTL}
                    signatureDataUrl={signatureData}
                    badgeId={selectedBadgeId}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto space-y-8"
            >
              <motion.h2 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-4xl md:text-6xl font-black text-neon text-center drop-shadow-[0_0_20px_rgba(57,255,20,0.5)]"
              >
                {isRTL ? 'أسطورة معتمدة!' : 'CERTIFIED LEGEND!'}
              </motion.h2>

              <div className="w-full max-w-3xl glass-card p-4 rounded-2xl flex justify-center shadow-[0_0_30px_rgba(46,100,23,0.5)]">
                <div className="w-full transform scale-[0.6] sm:scale-[0.8] md:scale-100 origin-center flex justify-center">
                  <ActiveTemplate 
                    name={name}
                    title={selectedTitle}
                    serial={serial}
                    isRTL={isRTL}
                    signatureDataUrl={signatureData}
                    badgeId={selectedBadgeId}
                  />
                </div>
              </div>

              {/* Referral / Viral Loop Section */}
              <div className="w-full max-w-2xl bg-[#111] border border-yellow-500/30 rounded-xl p-6 flex flex-col items-center text-center shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                <div className="bg-yellow-500/20 p-3 rounded-full mb-4">
                  <Award className="text-yellow-500" size={32} />
                </div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  {isRTL ? 'افتح الوسام الذهبي!' : 'Unlock the Golden Badge!'}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {isRTL 
                    ? 'شارك رابط صكك أدناه. إذا قام ٥ أشخاص بزيارته، سيتم إضافة وسام ذهبي دائم إلى صكك!' 
                    : 'Share your certificate link below. If 5 people visit it, a permanent Golden Badge will be added to your certificate!'}
                </p>
                <div className="w-full flex items-center justify-between bg-black border border-gray-800 rounded p-4 mb-4">
                  <span className="font-mono text-neon text-sm sm:text-base break-all">https://txt8.app/verify/{serial}</span>
                </div>
                <div className="w-full">
                  <div className="flex justify-between text-xs text-gray-500 mb-1 font-mono">
                    <span>{isRTL ? 'الزيارات:' : 'Visits:'} 0</span>
                    <span>5</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 shadow-[0_0_10px_#eab308]" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>

              {isDownloading && (
                <div className="w-full max-w-md h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${downloadProgress}%` }}
                    className="h-full bg-neon shadow-[0_0_10px_#39ff14]"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleXShare}
                  className="w-full py-4 bg-black text-white border border-gray-700 font-bold rounded-xl shadow-lg hover:border-gray-500 transition-all flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.964H5.078z"></path></svg>
                  {isRTL ? 'شارك على X' : 'Share on X'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWhatsAppShare}
                  className="w-full py-4 bg-[#25D366] text-white font-bold rounded-xl shadow-lg hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2"
                >
                  <Smartphone size={20} />
                  {isRTL ? 'شارك واتساب' : 'WhatsApp'}
                </motion.button>

                <div className="flex gap-2 w-full lg:col-span-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="w-1/2 py-4 bg-royal text-white font-bold rounded-xl shadow-lg hover:bg-royal/80 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isDownloading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
                    {isRTL ? 'تحميل PDF' : 'Save PDF'}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadPNG}
                    disabled={isDownloading}
                    className="w-1/2 py-4 bg-neon text-obsidian font-bold rounded-xl shadow-lg hover:bg-neon/80 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isDownloading ? <Loader2 className="animate-spin" size={20} /> : <ImageIcon size={20} />}
                    {isRTL ? 'تحميل صورة' : 'Save PNG'}
                  </motion.button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadSnapchat}
                disabled={isDownloadingSnap}
                className="w-full max-w-sm py-4 bg-[#FFFC00] text-black font-bold rounded-xl shadow-lg hover:bg-[#e6e300] transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isDownloadingSnap ? <Loader2 className="animate-spin" size={20} /> : <Smartphone size={20} />}
                {isRTL ? 'تحميل لسناب شات (طولي)' : 'Snapchat Format (Vertical)'}
              </motion.button>

              <button 
                onClick={() => setShowSuccessView(false)}
                className="mt-8 text-gray-400 hover:text-white underline underline-offset-4 text-sm"
              >
                {isRTL ? 'إصدار صك جديد' : 'Generate another one'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Premium Unlock Popup */}
      <AnimatePresence>
        {showUnlockPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-obsidian border border-yellow-500/50 p-8 rounded-2xl max-w-md w-full shadow-[0_0_50px_rgba(234,179,8,0.2)] text-center relative"
            >
              <button onClick={() => setShowUnlockPopup(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                <X size={24} />
              </button>
              <div className="mx-auto w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6">
                <Lock className="text-yellow-500" size={32} />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">
                {isRTL ? 'قالب حصري' : 'KAC8 Exclusive'}
              </h3>
              <p className="text-gray-400 mb-8">
                {isRTL 
                  ? 'هذا القالب الفاخر مخصص لأصدقائنا. تابع حساب @KAC8 على منصة X لفتحه مجاناً الآن!' 
                  : 'This premium template is reserved for our friends. Follow @KAC8 on X to unlock it for free right now!'}
              </p>
              <button 
                onClick={handleUnlockPremium}
                className="w-full py-4 bg-white text-black hover:bg-gray-200 font-bold rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 uppercase tracking-widest"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.964H5.078z"></path></svg>
                {isRTL ? 'تابع وافتح القالب' : 'Follow & Unlock'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Popup */}
      <AnimatePresence>
        {showAIPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-obsidian border border-purple-500/50 p-6 rounded-2xl max-w-md w-full shadow-[0_0_40px_rgba(168,85,247,0.2)]"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Wand2 className="text-purple-400" />
                  {isRTL ? 'سحر الذكاء الاصطناعي' : 'AI Magic Assistant'}
                </h3>
                <button onClick={() => setShowAIPopup(false)} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <p className="text-gray-400 mb-4">
                {isRTL ? 'صف نفسك في ٣ كلمات وسنخترع لك منصباً أسطورياً!' : 'Describe yourself in 3 words and we\'ll invent a legendary title for you!'}
              </p>
              <input 
                type="text" 
                placeholder={isRTL ? 'مثال: سريع، قهوة، نوم...' : 'e.g., Fast, Coffee, Sleep...'}
                className="w-full p-4 bg-white/5 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors mb-4"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAIGenerate()}
                autoFocus
              />
              <button 
                onClick={handleAIGenerate}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-lg shadow-lg transition-all flex justify-center items-center gap-2"
              >
                <Wand2 size={18} />
                {isRTL ? 'اقترح لي منصباً' : 'Suggest Title'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden High-Quality Template for PDF */}
      <div className="absolute top-[-9999px] left-[-9999px] pointer-events-none">
        <div ref={hiddenCertificateRef} className="w-[1122px] h-[793px] flex items-center justify-center bg-white">
           <ActiveTemplate 
              name={name || (isRTL ? '[الاسم هنا]' : '[Your Name]')}
              title={selectedTitle}
              serial={serial}
              isRTL={isRTL}
              signatureDataUrl={signatureData}
              badgeId={selectedBadgeId}
              className="w-[1122px] h-[793px] text-xl"
            />
        </div>
      </div>

      {/* Hidden Vertical Template for Snapchat (1080x1920) */}
      <div className="absolute top-[-9999px] left-[-9999px] pointer-events-none">
        <div ref={hiddenSnapRef} className="w-[1080px] h-[1920px] flex items-center justify-center bg-[#080808] relative overflow-hidden">
           <div className="absolute inset-0 bg-animated-gradient opacity-50"></div>
           <div className="z-10 flex flex-col items-center justify-center w-full px-12 gap-16">
              <h1 className="text-neon text-6xl font-bold font-inter tracking-widest bg-black/50 p-6 rounded-2xl border-2 border-neon backdrop-blur-md">
                 {isRTL ? 'رسمياً أسطورة' : 'OFFICIAL LEGEND'}
              </h1>
              
              <div className="w-[900px] h-[636px] flex items-center justify-center shadow-[0_0_50px_rgba(57,255,20,0.3)] bg-white rounded-lg">
                <ActiveTemplate 
                  name={name || (isRTL ? '[الاسم هنا]' : '[Your Name]')}
                  title={selectedTitle}
                  serial={serial}
                  isRTL={isRTL}
                  signatureDataUrl={signatureData}
                  badgeId={selectedBadgeId}
                  className="w-[900px] h-[636px] text-lg rounded-lg"
                />
              </div>

              <div className="flex flex-col items-center gap-4 bg-black/50 p-8 rounded-3xl backdrop-blur-md border border-gray-800">
                 <p className="text-white text-4xl font-inter">{isRTL ? 'احصل على صكك الخاص من:' : 'Get your own certificate at:'}</p>
                 <p className="text-neon text-5xl font-bold">TXT8.APP</p>
              </div>
           </div>
        </div>
      </div>

      <footer className="py-6 mt-auto border-t border-gray-900 bg-obsidian/90 backdrop-blur-md relative z-50 flex flex-col md:flex-row items-center justify-between px-8 gap-4">
        <p className="font-inter text-gray-500 text-sm">
          Developed by <a href="https://www.kac8.me/" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setKac8Hovers(h => h + 1)} className="animate-neon-pulse font-bold tracking-widest inline-block transition-transform hover:scale-110 ml-1">KAC8.ME</a>
        </p>
        
        <a 
          href="https://buymeacoffee.com/kac8" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#111] hover:bg-[#1a1a1a] border border-gray-800 hover:border-neon text-gray-400 hover:text-neon px-4 py-2 rounded-full transition-all text-xs font-bold uppercase tracking-wider"
        >
          <Coffee size={14} className="text-yellow-500" />
          {isRTL ? 'ادعم المطور' : 'Support KAC8'}
        </a>
      </footer>
    </div>
  );
}
