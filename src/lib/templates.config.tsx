import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export interface TemplateProps {
  name: React.ReactNode;
  title: React.ReactNode;
  serial: string;
  isRTL: boolean;
  signatureDataUrl?: string | null;
  badgeId?: string | null;
  className?: string; // used for scaling or extra styles
}

export interface TemplateConfig {
  id: string;
  name: { ar: string; en: string };
  themeColor: string;
  isPremium?: boolean;
  component: React.FC<TemplateProps>;
}

const WaxSeal = () => (
  <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-yellow-500 to-red-700 rounded-full flex items-center justify-center shadow-lg transform -rotate-12 border-4 border-yellow-600/50">
    <div className="w-20 h-20 rounded-full border-2 border-yellow-400/50 flex items-center justify-center">
      <span className="text-yellow-200 text-3xl font-bold font-arabic-title">ختم</span>
    </div>
  </div>
);



// 1. The Royal Decree
const RoyalTemplate: React.FC<TemplateProps> = ({ name, title, serial, isRTL, signatureDataUrl, badgeId, className = '' }) => (
  <div 
    className={`w-full aspect-[1.414/1] bg-[#fdf5e6] text-amber-900 border-[16px] border-double border-amber-800 p-8 relative flex flex-col justify-between overflow-hidden shadow-2xl ${className}`}
    style={{ backgroundImage: 'radial-gradient(#d3b88c 1px, transparent 1px)', backgroundSize: '20px 20px', backgroundColor: '#f4ebd8' }}
  >
    <WaxSeal />
    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
      <span className="text-[120px] font-bold rotate-[-30deg] uppercase whitespace-nowrap text-amber-900 font-arabic-title">الديوان الملكي</span>
    </div>

    {/* KAC8 Watermark */}
    <div className="absolute bottom-4 right-1/2 translate-x-1/2 opacity-[0.03] pointer-events-none z-0">
      <span className="text-8xl font-black tracking-tighter">KAC8.ME</span>
    </div>

    <div className="absolute top-8 right-8 z-20">
       <BadgeRenderer id={badgeId} className="w-20 h-20 md:w-24 md:h-24" />
    </div>

    <div className="z-10 text-center mt-4">
      <h3 className="text-amber-800 text-2xl md:text-3xl tracking-[0.2em] font-bold uppercase font-arabic-title">
        {isRTL ? 'صك ملكية فخرية' : 'Royal Decree'}
      </h3>
      <div className="w-32 h-[3px] bg-amber-700 mx-auto mt-4 rounded-full"></div>
    </div>

    <div className="z-10 text-center">
      <p className="text-amber-700 text-sm mb-4 italic">{isRTL ? 'يشهد هذا المستند بأن' : 'This document certifies that'}</p>
      <h2 className={`text-4xl md:text-6xl font-bold text-amber-950 mb-8 ${isRTL ? 'font-arabic-title' : 'font-serif'}`}>
        {name || (isRTL ? '[الاسم هنا]' : '[Your Name]')}
      </h2>
      <p className="text-amber-700 text-sm mb-2 italic">{isRTL ? 'قد نال وبكل استحقاق لقب' : 'Has rightfully earned the title of'}</p>
      <h1 className={`text-3xl md:text-4xl text-amber-800 font-bold ${isRTL ? 'font-arabic-title' : 'font-serif'}`}>
        {title}
      </h1>
    </div>

    <div className="flex justify-between items-end z-10 w-full mt-8">
      <div className="text-left flex flex-col items-start gap-2">
        <div className="text-amber-800/60 font-mono text-sm border-b border-amber-800/30 pb-1">
          {serial}
        </div>
        {signatureDataUrl && (
          <div className="h-16 w-32 relative">
            <img src={signatureDataUrl} alt="Signature" className="object-contain h-full w-full invert" style={{ filter: 'invert(30%) sepia(100%) hue-rotate(-20deg) saturate(3)' }} />
          </div>
        )}
      </div>
      
      <div className="bg-white/80 p-2 rounded-lg border-2 border-amber-800/20">
        <QRCodeSVG value={`https://txt8.app/verify/${serial}`} size={64} fgColor="#78350f" bgColor="transparent" />
      </div>
    </div>
  </div>
);

// 2. The Futuristic Cyber-ID
const CyberTemplate: React.FC<TemplateProps> = ({ name, title, serial, isRTL, signatureDataUrl, badgeId, className = '' }) => (
  <div 
    className={`w-full aspect-[1.414/1] bg-black text-green-400 border-[4px] border-green-500 p-8 relative flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(0,255,0,0.2)] ${className}`}
  >
    <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.1) 2px, rgba(0, 255, 0, 0.1) 4px)' }}></div>
    
    <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_20px_#0f0] animate-pulse"></div>

    {/* KAC8 Watermark */}
    <div className="absolute bottom-4 right-1/2 translate-x-1/2 opacity-[0.03] pointer-events-none z-0">
      <span className="text-8xl font-black tracking-tighter text-green-500">KAC8.ME</span>
    </div>

    <div className="absolute top-8 right-8 z-20">
       <BadgeRenderer id={badgeId} className="w-16 h-16 md:w-20 md:h-20" />
    </div>

    <div className="z-10 text-center mt-2 flex justify-between items-center border-b border-green-500/50 pb-4">
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <h3 className="text-green-500 text-xl tracking-[0.4em] font-mono uppercase">
        {isRTL ? 'الهوية الرقمية //:' : 'CYBER_ID //:'}
      </h3>
    </div>

    <div className="z-10 text-left font-mono">
      <p className="text-green-600 text-xs mb-1">$&gt; SUBJECT_NAME:</p>
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        {name || (isRTL ? '[الاسم هنا]' : '[Your Name]')}
      </h2>
      <p className="text-green-600 text-xs mb-1">$&gt; ASSIGNED_ROLE:</p>
      <h1 className="text-2xl md:text-3xl text-green-400 font-bold bg-green-900/30 inline-block px-4 py-2 border-l-4 border-green-500">
        {title}
      </h1>
    </div>

    <div className="flex justify-between items-end z-10 w-full mt-8 border-t border-green-500/50 pt-4">
      <div className="text-left font-mono flex flex-col items-start gap-2">
        <p className="text-[10px] text-green-600">ID_HASH</p>
        <p className="text-sm text-green-400">{serial}</p>
        {signatureDataUrl && (
          <div className="h-12 w-32 relative bg-green-900/20 border border-green-500/30 rounded p-1 mt-2">
            <img src={signatureDataUrl} alt="Signature" className="object-contain h-full w-full opacity-80" style={{ filter: 'invert(60%) sepia(100%) saturate(300%) hue-rotate(80deg)' }} />
          </div>
        )}
      </div>
      
      <div className="bg-green-500 p-2 rounded shadow-[0_0_15px_#0f0]">
        <QRCodeSVG value={`https://txt8.app/verify/${serial}`} size={64} fgColor="#000" bgColor="#0f0" />
      </div>
    </div>
  </div>
);

// 3. The Galaxy Title
const GalaxyTemplate: React.FC<TemplateProps> = ({ name, title, serial, isRTL, signatureDataUrl, badgeId, className = '' }) => (
  <div 
    className={`w-full aspect-[1.414/1] bg-[#0b0b1a] text-purple-100 border-2 border-purple-500/30 p-8 relative flex flex-col justify-between overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(138,43,226,0.3)] ${className}`}
    style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #2a1b4d 0%, #0b0b1a 80%)' }}
  >
    {/* Stars background mock */}
    <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '30px 30px', backgroundPosition: '0 0, 15px 15px' }}></div>
    
    {/* KAC8 Watermark */}
    <div className="absolute bottom-4 right-1/2 translate-x-1/2 opacity-[0.03] pointer-events-none z-0">
      <span className="text-8xl font-black tracking-tighter text-white">KAC8.ME</span>
    </div>

    <div className="absolute top-8 right-8 z-20">
       <BadgeRenderer id={badgeId} className="w-16 h-16 md:w-20 md:h-20" />
    </div>

    <div className="z-10 text-center mt-4 relative">
      <h3 className="text-purple-300 text-xl md:text-2xl tracking-[0.5em] font-light uppercase">
        {isRTL ? 'صك ملكية كوكبي' : 'Galactic Title'}
      </h3>
      <div className="w-full max-w-[200px] h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mt-6"></div>
    </div>

    <div className="z-10 text-center">
      <p className="text-purple-300/70 text-sm mb-4 tracking-widest">{isRTL ? 'كيان معتمد عبر المجرات' : 'CERTIFIED ACROSS GALAXIES'}</p>
      <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
        {name || (isRTL ? '[الاسم هنا]' : '[Your Name]')}
      </h2>
      <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-cyan-500 to-purple-500">
        <div className="bg-[#0b0b1a] rounded-full px-8 py-3">
          <h1 className="text-xl md:text-2xl text-purple-200 font-bold tracking-wider">
            {title}
          </h1>
        </div>
      </div>
    </div>

    <div className="flex justify-between items-end z-10 w-full mt-8 bg-purple-900/20 p-4 rounded-xl backdrop-blur-sm border border-purple-500/20">
      <div className="text-left flex flex-col items-start gap-2">
        <p className="text-[10px] text-purple-400 tracking-widest">COSMIC_REF</p>
        <p className="text-sm font-mono text-cyan-300">{serial}</p>
        {signatureDataUrl && (
          <div className="h-10 w-24 relative mt-1">
            <img src={signatureDataUrl} alt="Signature" className="object-contain h-full w-full opacity-70" style={{ filter: 'invert(80%) sepia(50%) saturate(300%) hue-rotate(200deg)' }} />
          </div>
        )}
      </div>
      
      <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
        <QRCodeSVG value={`https://txt8.app/verify/${serial}`} size={56} fgColor="#e9d5ff" bgColor="transparent" />
      </div>
    </div>
  </div>
);

// 4. The Vintage News
const VintageTemplate: React.FC<TemplateProps> = ({ name, title, serial, isRTL, signatureDataUrl, badgeId, className = '' }) => (
  <div 
    className={`w-full aspect-[1.414/1] bg-[#e8e0d5] text-[#2c2c2c] p-8 relative flex flex-col justify-between overflow-hidden shadow-lg ${className}`}
  >
    <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ filter: 'url(#noiseFilter)' }}></div>
    <svg className="hidden">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
      </filter>
    </svg>

    {/* KAC8 Watermark */}
    <div className="absolute bottom-4 right-1/2 translate-x-1/2 opacity-[0.05] pointer-events-none z-0">
      <span className="text-8xl font-black tracking-tighter text-[#2c2c2c]">KAC8.ME</span>
    </div>

    <div className="absolute top-8 right-8 z-20">
       <BadgeRenderer id={badgeId} className="w-16 h-16 md:w-20 md:h-20 grayscale" />
    </div>

    <div className="z-10 text-center border-b-4 border-double border-[#2c2c2c] pb-4 mb-4">
      <p className="text-xs uppercase tracking-widest mb-2 font-serif">The Daily Chronicle • Est. 1950</p>
      <h3 className="text-[#2c2c2c] text-3xl md:text-5xl font-black uppercase font-serif" style={{ transform: 'scaleY(1.2)' }}>
        {isRTL ? 'مانشيت تاريخي' : 'EXTRA! EXTRA!'}
      </h3>
    </div>

    <div className="z-10 grid grid-cols-3 gap-6 flex-grow">
      <div className="col-span-2 flex flex-col justify-center border-r-2 border-[#2c2c2c] pr-6">
        <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] mb-6 font-serif leading-none">
          {name || (isRTL ? '[الاسم هنا]' : '[Your Name]')}
        </h2>
        <p className="text-sm font-serif mb-2 uppercase tracking-wider">{isRTL ? 'يصنع التاريخ كـ' : 'MAKES HISTORY AS'}</p>
        <h1 className="text-2xl md:text-4xl text-[#2c2c2c] font-bold font-serif italic bg-[#d5ccbe] inline-block p-2">
          &quot;{title}&quot;
        </h1>
      </div>
      <div className="col-span-1 flex flex-col justify-between py-4">
        <p className="text-xs font-serif text-justify leading-tight">
          {isRTL 
            ? 'أعلنت السلطات العليا اليوم عن هذا التعيين غير المسبوق، والذي أثار موجة من الذهول في الأوساط الرسمية.' 
            : 'Authorities today announced this unprecedented appointment, causing waves of shock across official circles.'}
        </p>
        <div className="mt-auto">
          {signatureDataUrl && (
            <div className="h-12 w-full relative mb-2 border-b border-[#2c2c2c] border-dashed pb-1">
              <img src={signatureDataUrl} alt="Signature" className="object-contain h-full w-full" style={{ filter: 'grayscale(100%) contrast(200%)' }} />
              <p className="text-[8px] text-center uppercase font-serif mt-1">Authorized Signature</p>
            </div>
          )}
        </div>
      </div>
    </div>

    <div className="flex justify-between items-end z-10 w-full mt-4 border-t-2 border-[#2c2c2c] pt-4">
      <div className="text-left">
        <p className="text-xs font-serif font-bold">Vol. 1 • No. {serial.split('-')[2]}</p>
        <p className="text-xs font-mono">{serial}</p>
      </div>
      
      <div className="bg-[#e8e0d5] p-1 border border-[#2c2c2c]">
        <QRCodeSVG value={`https://txt8.app/verify/${serial}`} size={48} fgColor="#2c2c2c" bgColor="transparent" />
      </div>
    </div>
  </div>
);

// 5. The 'Meme' Card
const MemeTemplate: React.FC<TemplateProps> = ({ name, title, serial, isRTL, signatureDataUrl, badgeId, className = '' }) => (
  <div 
    className={`w-full aspect-[1.414/1] bg-yellow-300 text-black border-8 border-black p-8 relative flex flex-col justify-between overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-3xl ${className}`}
    style={{ backgroundImage: 'radial-gradient(circle, #facc15 20%, #fef08a 20%, #fef08a 80%, #facc15 80%, #facc15 100%)', backgroundSize: '40px 40px' }}
  >
    {/* KAC8 Watermark */}
    <div className="absolute bottom-4 right-1/2 translate-x-1/2 opacity-[0.05] pointer-events-none z-0">
      <span className="text-8xl font-black tracking-tighter text-black">KAC8.ME</span>
    </div>

    <div className="absolute top-8 left-8 z-20 transform -rotate-12 hover:rotate-12 transition-transform">
       <BadgeRenderer id={badgeId} className="w-20 h-20 md:w-24 md:h-24 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]" />
    </div>

    <div className="absolute top-4 right-4 bg-pink-500 text-white font-black text-xl px-4 py-2 rotate-12 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] z-20">
      OMG! 😱
    </div>

    <div className="z-10 text-center bg-white border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] mt-2">
      <h3 className="text-black text-2xl md:text-3xl font-black uppercase tracking-wide">
        {isRTL ? 'بطاقة الهبد الرسمية' : 'CERTIFIED MEME CARD'}
      </h3>
    </div>

    <div className="z-10 text-center my-auto">
      <div className="bg-cyan-400 border-4 border-black p-6 rounded-2xl shadow-[8px_8px_0px_rgba(0,0,0,1)] inline-block transform -rotate-2 hover:rotate-0 transition-transform">
        <p className="text-black text-sm font-bold uppercase mb-2 bg-white inline-block px-2 border-2 border-black -skew-x-12">{isRTL ? 'الأسطورة:' : 'THE LEGEND:'}</p>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] stroke-black" style={{ WebkitTextStroke: '2px black' }}>
          {name || (isRTL ? '[الاسم هنا]' : '[Your Name]')}
        </h2>
        <div className="bg-purple-500 text-white border-4 border-black px-6 py-3 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] transform rotate-3">
          <h1 className="text-2xl md:text-3xl font-black uppercase">
            {title}
          </h1>
        </div>
      </div>
    </div>

    <div className="flex justify-between items-end z-10 w-full mt-4">
      <div className="bg-white border-4 border-black p-2 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col items-center">
        <p className="text-xs font-black uppercase mb-1">SCAN ME PLZ</p>
        <QRCodeSVG value={`https://txt8.app/verify/${serial}`} size={64} fgColor="#000" bgColor="#fff" />
      </div>

      <div className="flex flex-col items-end gap-2">
        {signatureDataUrl && (
          <div className="h-16 w-32 relative bg-white border-4 border-black rounded-xl p-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] -rotate-6">
            <p className="text-[8px] font-black absolute top-1 left-1">SIGN:</p>
            <img src={signatureDataUrl} alt="Signature" className="object-contain h-full w-full" />
          </div>
        )}
        <div className="bg-black text-white font-mono font-bold px-3 py-1 rounded-lg">
          {serial}
        </div>
      </div>
    </div>
  </div>
);

import { BadgeRenderer } from './badges.config';

export const templates: TemplateConfig[] = [
  {
    id: 'royal',
    name: { ar: 'الديوان الملكي', en: 'Royal Decree' },
    themeColor: '#78350f',
    component: RoyalTemplate
  },
  {
    id: 'cyber',
    name: { ar: 'الهوية الرقمية', en: 'Cyber-ID' },
    themeColor: '#22c55e',
    isPremium: true,
    component: CyberTemplate
  },
  {
    id: 'galaxy',
    name: { ar: 'صك كوكبي', en: 'Galaxy Title' },
    themeColor: '#a855f7',
    isPremium: true,
    component: GalaxyTemplate
  },
  {
    id: 'vintage',
    name: { ar: 'مانشيت تاريخي', en: 'Vintage News' },
    themeColor: '#525252',
    component: VintageTemplate
  },
  {
    id: 'meme',
    name: { ar: 'بطاقة الهبد', en: 'Meme Card' },
    themeColor: '#eab308',
    component: MemeTemplate
  }
];
