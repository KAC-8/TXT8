import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { BadgeRenderer } from './badges.config';

export interface TemplateProps {
  name: React.ReactNode;
  title: React.ReactNode;
  serial: string;
  isRTL: boolean;
  signatureDataUrl?: string | null;
  badgeId?: string | null;
  className?: string; // used for scaling or extra styles
}

export interface TemplateJSONConfig {
  id: string;
  name: { ar: string; en: string };
  themeColor: string;
  isPremium?: boolean;
  
  wrapperClass?: string;
  wrapperStyle?: React.CSSProperties;

  watermarkText?: string;
  watermarkClass?: string;
  
  badgeClass?: string;

  headerContainerClass?: string;
  headerStyle?: React.CSSProperties;
  headerTitleClass?: string;
  headerTitleAr?: string;
  headerTitleEn?: string;
  headerDividerClass?: string;

  bodyContainerClass?: string;
  preNameClass?: string;
  preNameAr?: string;
  preNameEn?: string;
  nameClass?: string;
  postNameClass?: string;
  postNameAr?: string;
  postNameEn?: string;
  titleWrapperClass?: string;
  titleClass?: string;
  titleStyle?: React.CSSProperties;

  footerContainerClass?: string;
  serialContainerClass?: string;
  serialLabelClass?: string;
  serialLabelAr?: string;
  serialLabelEn?: string;
  serialClass?: string;
  signatureContainerClass?: string;
  signatureImageStyle?: React.CSSProperties;
  
  qrContainerClass?: string;
  qrFgColor?: string;
  qrBgColor?: string;
  qrSize?: number;

  decorations?: Array<{
    className: string;
    style?: React.CSSProperties;
    text?: string;
  }>;
}

export interface TemplateConfig {
  id: string;
  name: { ar: string; en: string };
  themeColor: string;
  isPremium?: boolean;
  component: React.FC<TemplateProps>;
}

// The Factory Component that translates JSON config into a React Component
export const createTemplate = (config: TemplateJSONConfig): React.FC<TemplateProps> => {
  const TemplateComponent: React.FC<TemplateProps> = ({ name, title, serial, isRTL, signatureDataUrl, badgeId, className = '' }) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://kac8.me';
    const verifyUrl = `${baseUrl}/verify/${serial}`;

    return (
      <div 
        className={`relative flex flex-col justify-between overflow-hidden ${config.wrapperClass || ''} ${className}`}
        style={config.wrapperStyle}
      >
        {/* Decorations */}
        {config.decorations?.map((dec, i) => (
          <div key={i} className={`absolute pointer-events-none ${dec.className}`} style={dec.style}>
            {dec.text}
          </div>
        ))}

        {/* Watermark */}
        {config.watermarkText && (
          <div className={`absolute pointer-events-none ${config.watermarkClass || ''}`}>
            {config.watermarkText}
          </div>
        )}

        {/* Badge */}
        {badgeId && (
          <div className={`absolute z-20 ${config.badgeClass || 'top-8 right-8 w-20 h-20'}`}>
            <BadgeRenderer id={badgeId} className="w-full h-full" />
          </div>
        )}

        {/* Header */}
        <div className={`z-10 ${config.headerContainerClass || ''}`} style={config.headerStyle}>
          <h3 className={config.headerTitleClass || ''}>
            {isRTL ? (config.headerTitleAr || '') : (config.headerTitleEn || '')}
          </h3>
          {config.headerDividerClass && <div className={config.headerDividerClass}></div>}
        </div>

        {/* Body */}
        <div className={`z-10 ${config.bodyContainerClass || ''}`}>
          {(config.preNameAr || config.preNameEn) && (
            <p className={config.preNameClass || ''}>
              {isRTL ? config.preNameAr : config.preNameEn}
            </p>
          )}
          <h2 className={config.nameClass || ''}>
            {name || (isRTL ? '[الاسم هنا]' : '[Your Name]')}
          </h2>
          {(config.postNameAr || config.postNameEn) && (
            <p className={config.postNameClass || ''}>
              {isRTL ? config.postNameAr : config.postNameEn}
            </p>
          )}
          <div className={config.titleWrapperClass || ''}>
            <h1 className={config.titleClass || ''} style={config.titleStyle}>{title}</h1>
          </div>
        </div>

        {/* Footer */}
        <div className={`z-10 flex justify-between items-end ${config.footerContainerClass || ''}`}>
          <div className={config.serialContainerClass || ''}>
            {(config.serialLabelAr || config.serialLabelEn) && (
              <p className={config.serialLabelClass || ''}>
                {isRTL ? config.serialLabelAr : config.serialLabelEn}
              </p>
            )}
            <p className={config.serialClass || ''}>{serial}</p>
            {signatureDataUrl && (
              <div className={config.signatureContainerClass || 'h-16 w-32 relative mt-2'}>
                <img 
                  src={signatureDataUrl} 
                  alt="Signature" 
                  className="object-contain h-full w-full" 
                  style={config.signatureImageStyle} 
                />
              </div>
            )}
          </div>
          
          <div className={config.qrContainerClass || ''}>
            <QRCodeSVG 
              value={verifyUrl} 
              size={config.qrSize || 64} 
              fgColor={config.qrFgColor || "#000"} 
              bgColor={config.qrBgColor || "transparent"} 
            />
          </div>
        </div>
      </div>
    );
  };
  return TemplateComponent;
};

// ==========================================
// 100-TEMPLATE SCALABILITY ENGINE (JSON configs)
// Paste JSON objects here to scale to 100+
// ==========================================

export const templatesJSON: TemplateJSONConfig[] = [
  {
  "id": "gaming-1",
  "name": {
    "en": "Fortnite Pro",
    "ar": "محترف فورتنايت"
  },
  "themeColor": "#ff0055",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-dashed p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#ff0055"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#ff0055"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-mono",
  "headerTitleAr": "محترف فورتنايت",
  "headerTitleEn": "Fortnite Pro",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-mono",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-mono",
  "titleStyle": {
    "backgroundColor": "#ff0055"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-mono text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-2",
  "name": {
    "en": "EA FC 25 Boss",
    "ar": "زعيم فيفا 25"
  },
  "themeColor": "#00ffcc",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-double p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#00ffcc"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#00ffcc"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-sans",
  "headerTitleAr": "زعيم فيفا 25",
  "headerTitleEn": "EA FC 25 Boss",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-sans",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-sans",
  "titleStyle": {
    "backgroundColor": "#00ffcc"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-sans text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-3",
  "name": {
    "en": "GTA V King",
    "ar": "ملك قراند"
  },
  "themeColor": "#ffcc00",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-dotted p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#ffcc00"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#ffcc00"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-serif",
  "headerTitleAr": "ملك قراند",
  "headerTitleEn": "GTA V King",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-serif",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-serif",
  "titleStyle": {
    "backgroundColor": "#ffcc00"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-serif text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-4",
  "name": {
    "en": "Retro Arcade",
    "ar": "اركيد كلاسيكي"
  },
  "themeColor": "#9900ff",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-solid p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#9900ff"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#9900ff"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-mono",
  "headerTitleAr": "اركيد كلاسيكي",
  "headerTitleEn": "Retro Arcade",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-mono",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-mono",
  "titleStyle": {
    "backgroundColor": "#9900ff"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-mono text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-5",
  "name": {
    "en": "Pixel Master",
    "ar": "سيد البكسل"
  },
  "themeColor": "#ff5500",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-dashed p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#ff5500"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#ff5500"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-sans",
  "headerTitleAr": "سيد البكسل",
  "headerTitleEn": "Pixel Master",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-sans",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-sans",
  "titleStyle": {
    "backgroundColor": "#ff5500"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-sans text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-6",
  "name": {
    "en": "8-Bit Hero",
    "ar": "بطل 8-بت"
  },
  "themeColor": "#00ccff",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-double p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#00ccff"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#00ccff"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-serif",
  "headerTitleAr": "بطل 8-بت",
  "headerTitleEn": "8-Bit Hero",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-serif",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-serif",
  "titleStyle": {
    "backgroundColor": "#00ccff"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-serif text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-7",
  "name": {
    "en": "Console God",
    "ar": "إله الكونسول"
  },
  "themeColor": "#ccff00",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-dotted p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#ccff00"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#ccff00"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-mono",
  "headerTitleAr": "إله الكونسول",
  "headerTitleEn": "Console God",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-mono",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-mono",
  "titleStyle": {
    "backgroundColor": "#ccff00"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-mono text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-8",
  "name": {
    "en": "PC Master Race",
    "ar": "بي سي ماستر"
  },
  "themeColor": "#ff00ff",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-solid p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#ff00ff"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#ff00ff"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-sans",
  "headerTitleAr": "بي سي ماستر",
  "headerTitleEn": "PC Master Race",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-sans",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-sans",
  "titleStyle": {
    "backgroundColor": "#ff00ff"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-sans text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-9",
  "name": {
    "en": "Loot Goblin",
    "ar": "عفريت اللوت"
  },
  "themeColor": "#ff0055",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-dashed p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#ff0055"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#ff0055"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-serif",
  "headerTitleAr": "عفريت اللوت",
  "headerTitleEn": "Loot Goblin",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-serif",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-serif",
  "titleStyle": {
    "backgroundColor": "#ff0055"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-serif text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-10",
  "name": {
    "en": "Spawn Camper",
    "ar": "مخيم السبون"
  },
  "themeColor": "#00ffcc",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-double p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#00ffcc"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#00ffcc"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-mono",
  "headerTitleAr": "مخيم السبون",
  "headerTitleEn": "Spawn Camper",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-mono",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-mono",
  "titleStyle": {
    "backgroundColor": "#00ffcc"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-mono text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-11",
  "name": {
    "en": "Rage Quitter",
    "ar": "المنسحب الغاضب"
  },
  "themeColor": "#ffcc00",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-dotted p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#ffcc00"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#ffcc00"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-sans",
  "headerTitleAr": "المنسحب الغاضب",
  "headerTitleEn": "Rage Quitter",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-sans",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-sans",
  "titleStyle": {
    "backgroundColor": "#ffcc00"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-sans text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-12",
  "name": {
    "en": "Speed Runner",
    "ar": "عداء السرعة"
  },
  "themeColor": "#9900ff",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-solid p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#9900ff"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#9900ff"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-serif",
  "headerTitleAr": "عداء السرعة",
  "headerTitleEn": "Speed Runner",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-serif",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-serif",
  "titleStyle": {
    "backgroundColor": "#9900ff"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-serif text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-13",
  "name": {
    "en": "Boss Slayer",
    "ar": "قاتل الزعماء"
  },
  "themeColor": "#ff5500",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-dashed p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#ff5500"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#ff5500"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-mono",
  "headerTitleAr": "قاتل الزعماء",
  "headerTitleEn": "Boss Slayer",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-mono",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-mono",
  "titleStyle": {
    "backgroundColor": "#ff5500"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-mono text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-14",
  "name": {
    "en": "Noob Pwner",
    "ar": "قاهر النوبز"
  },
  "themeColor": "#00ccff",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-double p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#00ccff"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#00ccff"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-sans",
  "headerTitleAr": "قاهر النوبز",
  "headerTitleEn": "Noob Pwner",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-sans",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-sans",
  "titleStyle": {
    "backgroundColor": "#00ccff"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-sans text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-15",
  "name": {
    "en": "High Score",
    "ar": "أعلى رقم قياسي"
  },
  "themeColor": "#ccff00",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-dotted p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#ccff00"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#ccff00"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-serif",
  "headerTitleAr": "أعلى رقم قياسي",
  "headerTitleEn": "High Score",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-serif",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-serif",
  "titleStyle": {
    "backgroundColor": "#ccff00"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-serif text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-16",
  "name": {
    "en": "Combo Master",
    "ar": "سيد الكومبو"
  },
  "themeColor": "#ff00ff",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-solid p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#ff00ff"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#ff00ff"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-mono",
  "headerTitleAr": "سيد الكومبو",
  "headerTitleEn": "Combo Master",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-mono",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-mono",
  "titleStyle": {
    "backgroundColor": "#ff00ff"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-mono text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-17",
  "name": {
    "en": "Esports Pro",
    "ar": "محترف الرياضات الإلكترونية"
  },
  "themeColor": "#ff0055",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-dashed p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#ff0055"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#ff0055"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-sans",
  "headerTitleAr": "محترف الرياضات الإلكترونية",
  "headerTitleEn": "Esports Pro",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-sans",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-sans",
  "titleStyle": {
    "backgroundColor": "#ff0055"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-sans text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-18",
  "name": {
    "en": "Glitch Hunter",
    "ar": "صائد القلتشات"
  },
  "themeColor": "#00ffcc",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-double p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#00ffcc"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#00ffcc"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-serif",
  "headerTitleAr": "صائد القلتشات",
  "headerTitleEn": "Glitch Hunter",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-serif",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-serif",
  "titleStyle": {
    "backgroundColor": "#00ffcc"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-serif text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-19",
  "name": {
    "en": "RPG Hero",
    "ar": "بطل الار بي جي"
  },
  "themeColor": "#ffcc00",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-dotted p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#ffcc00"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#ffcc00"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-mono",
  "headerTitleAr": "بطل الار بي جي",
  "headerTitleEn": "RPG Hero",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-mono",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-mono",
  "titleStyle": {
    "backgroundColor": "#ffcc00"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-mono text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "gaming-20",
  "name": {
    "en": "FPS God",
    "ar": "زعيم الشوتر"
  },
  "themeColor": "#9900ff",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#1a1a2e] text-white border-[6px] border-solid p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
  "wrapperStyle": {
    "borderColor": "#9900ff"
  },
  "watermarkText": "GAMER",
  "watermarkClass": "bottom-4 left-4 opacity-[0.03] text-8xl font-black italic z-0 transform -rotate-12",
  "badgeClass": "top-8 right-8 w-16 h-16 mix-blend-screen",
  "headerContainerClass": "text-center border-b-2 pb-2",
  "headerStyle": {
    "borderColor": "#9900ff"
  },
  "headerTitleClass": "text-2xl font-black uppercase tracking-widest font-sans",
  "headerTitleAr": "زعيم الشوتر",
  "headerTitleEn": "FPS God",
  "bodyContainerClass": "text-center mt-12 flex flex-col items-center justify-center",
  "nameClass": "text-5xl md:text-6xl font-black mb-4 font-sans",
  "titleClass": "text-xl md:text-2xl font-bold px-6 py-2 rounded-lg text-black font-sans",
  "titleStyle": {
    "backgroundColor": "#9900ff"
  },
  "footerContainerClass": "w-full mt-auto flex justify-between items-end",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs font-sans text-gray-400 mt-2",
  "qrContainerClass": "p-2 rounded",
  "qrBgColor": "#fff",
  "qrFgColor": "#000",
  "decorations": [
    {
      "className": "top-2 right-2 text-xs opacity-50",
      "text": "LEVEL 99"
    }
  ]
},
  {
  "id": "cyber-1",
  "name": {
    "en": "Terminal Admin",
    "ar": "مدير التيرمنال"
  },
  "themeColor": "#ff003c",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#ff003c"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "مدير التيرمنال",
  "headerTitleEn": "Terminal Admin",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#ff003c"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#ff003c",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#ff003c"
      }
    }
  ]
},
  {
  "id": "cyber-2",
  "name": {
    "en": "Kali Linux Pro",
    "ar": "محترف كالي"
  },
  "themeColor": "#00ff41",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#00ff41"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "محترف كالي",
  "headerTitleEn": "Kali Linux Pro",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#00ff41"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#00ff41",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#00ff41"
      }
    }
  ]
},
  {
  "id": "cyber-3",
  "name": {
    "en": "Binary Rain",
    "ar": "مطر الباينري"
  },
  "themeColor": "#ff003c",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#ff003c"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "مطر الباينري",
  "headerTitleEn": "Binary Rain",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#ff003c"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#ff003c",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#ff003c"
      }
    }
  ]
},
  {
  "id": "cyber-4",
  "name": {
    "en": "Firewall Bypass",
    "ar": "مخترق الجدار"
  },
  "themeColor": "#00ff41",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#00ff41"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "مخترق الجدار",
  "headerTitleEn": "Firewall Bypass",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#00ff41"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#00ff41",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#00ff41"
      }
    }
  ]
},
  {
  "id": "cyber-5",
  "name": {
    "en": "Zero Day",
    "ar": "زيرو داي"
  },
  "themeColor": "#ff003c",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#ff003c"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "زيرو داي",
  "headerTitleEn": "Zero Day",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#ff003c"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#ff003c",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#ff003c"
      }
    }
  ]
},
  {
  "id": "cyber-6",
  "name": {
    "en": "Root Access",
    "ar": "صلاحيات الروت"
  },
  "themeColor": "#00ff41",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#00ff41"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "صلاحيات الروت",
  "headerTitleEn": "Root Access",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#00ff41"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#00ff41",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#00ff41"
      }
    }
  ]
},
  {
  "id": "cyber-7",
  "name": {
    "en": "White Hat",
    "ar": "القبعة البيضاء"
  },
  "themeColor": "#ff003c",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#ff003c"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "القبعة البيضاء",
  "headerTitleEn": "White Hat",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#ff003c"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#ff003c",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#ff003c"
      }
    }
  ]
},
  {
  "id": "cyber-8",
  "name": {
    "en": "Black Hat",
    "ar": "القبعة السوداء"
  },
  "themeColor": "#00ff41",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#00ff41"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "القبعة السوداء",
  "headerTitleEn": "Black Hat",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#00ff41"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#00ff41",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#00ff41"
      }
    }
  ]
},
  {
  "id": "cyber-9",
  "name": {
    "en": "Packet Sniffer",
    "ar": "متلصص الحزم"
  },
  "themeColor": "#ff003c",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#ff003c"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "متلصص الحزم",
  "headerTitleEn": "Packet Sniffer",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#ff003c"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#ff003c",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#ff003c"
      }
    }
  ]
},
  {
  "id": "cyber-10",
  "name": {
    "en": "DDoS Master",
    "ar": "سيد الحجب"
  },
  "themeColor": "#00ff41",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#00ff41"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "سيد الحجب",
  "headerTitleEn": "DDoS Master",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#00ff41"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#00ff41",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#00ff41"
      }
    }
  ]
},
  {
  "id": "cyber-11",
  "name": {
    "en": "Phishing King",
    "ar": "ملك التصيد"
  },
  "themeColor": "#ff003c",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#ff003c"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "ملك التصيد",
  "headerTitleEn": "Phishing King",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#ff003c"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#ff003c",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#ff003c"
      }
    }
  ]
},
  {
  "id": "cyber-12",
  "name": {
    "en": "Encryption Lord",
    "ar": "لورد التشفير"
  },
  "themeColor": "#00ff41",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#00ff41"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "لورد التشفير",
  "headerTitleEn": "Encryption Lord",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#00ff41"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#00ff41",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#00ff41"
      }
    }
  ]
},
  {
  "id": "cyber-13",
  "name": {
    "en": "Cyber Ninja",
    "ar": "نينجا سيبراني"
  },
  "themeColor": "#ff003c",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#ff003c"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "نينجا سيبراني",
  "headerTitleEn": "Cyber Ninja",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#ff003c"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#ff003c",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#ff003c"
      }
    }
  ]
},
  {
  "id": "cyber-14",
  "name": {
    "en": "Botnet Boss",
    "ar": "زعيم البوتنت"
  },
  "themeColor": "#00ff41",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#00ff41"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "زعيم البوتنت",
  "headerTitleEn": "Botnet Boss",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#00ff41"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#00ff41",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#00ff41"
      }
    }
  ]
},
  {
  "id": "cyber-15",
  "name": {
    "en": "Mainframe Hacker",
    "ar": "مخترق المينفريم"
  },
  "themeColor": "#ff003c",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#ff003c"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "مخترق المينفريم",
  "headerTitleEn": "Mainframe Hacker",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#ff003c"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#ff003c",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#ff003c"
      }
    }
  ]
},
  {
  "id": "cyber-16",
  "name": {
    "en": "SQL Injector",
    "ar": "حقن SQL"
  },
  "themeColor": "#00ff41",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#00ff41"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "حقن SQL",
  "headerTitleEn": "SQL Injector",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#00ff41"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#00ff41",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#00ff41"
      }
    }
  ]
},
  {
  "id": "cyber-17",
  "name": {
    "en": "Trojan Horse",
    "ar": "حصان طروادة"
  },
  "themeColor": "#ff003c",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#ff003c"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "حصان طروادة",
  "headerTitleEn": "Trojan Horse",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#ff003c"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#ff003c",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#ff003c"
      }
    }
  ]
},
  {
  "id": "cyber-18",
  "name": {
    "en": "Keylogger",
    "ar": "راصد لوحة المفاتيح"
  },
  "themeColor": "#00ff41",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#00ff41"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "راصد لوحة المفاتيح",
  "headerTitleEn": "Keylogger",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#00ff41"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#00ff41",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#00ff41"
      }
    }
  ]
},
  {
  "id": "cyber-19",
  "name": {
    "en": "Ransomware Boss",
    "ar": "زعيم الفدية"
  },
  "themeColor": "#ff003c",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#ff003c"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "زعيم الفدية",
  "headerTitleEn": "Ransomware Boss",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#ff003c"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#ff003c",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#ff003c"
      }
    }
  ]
},
  {
  "id": "cyber-20",
  "name": {
    "en": "Sysadmin God",
    "ar": "إله النظام"
  },
  "themeColor": "#00ff41",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#0a0a0a] text-white border-2 p-8 font-mono shadow-lg",
  "wrapperStyle": {
    "borderColor": "#00ff41"
  },
  "watermarkText": "HACK THE PLANET",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-5 text-6xl font-black",
  "headerContainerClass": "text-left border-b pb-2",
  "headerTitleClass": "text-xl font-bold uppercase",
  "headerTitleAr": "إله النظام",
  "headerTitleEn": "Sysadmin God",
  "bodyContainerClass": "text-left mt-8",
  "preNameClass": "text-xs opacity-70 mb-1",
  "preNameEn": "root@kac8:~# whoami",
  "preNameAr": "root@kac8:~# whoami",
  "nameClass": "text-4xl md:text-5xl font-bold mb-6",
  "titleClass": "text-lg text-black px-2 inline-block",
  "titleStyle": {
    "backgroundColor": "#00ff41"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialContainerClass": "text-left",
  "serialClass": "text-xs opacity-80",
  "qrContainerClass": "border p-1",
  "qrFgColor": "#00ff41",
  "qrBgColor": "#0a0a0a",
  "decorations": [
    {
      "className": "top-4 right-4 text-xs",
      "text": "SYS_OVERRIDE_ENABLED",
      "style": {
        "color": "#00ff41"
      }
    }
  ]
},
  {
  "id": "heritage-1",
  "name": {
    "en": "Najdi Knight",
    "ar": "فارس نجدي"
  },
  "themeColor": "#8B4513",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#8B4513"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "فارس نجدي",
  "headerTitleEn": "Najdi Knight",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#8B4513"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-2",
  "name": {
    "en": "Hijazi Trader",
    "ar": "تاجر حجازي"
  },
  "themeColor": "#D2691E",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#D2691E"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "تاجر حجازي",
  "headerTitleEn": "Hijazi Trader",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#D2691E"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-3",
  "name": {
    "en": "Islamic Art",
    "ar": "فن إسلامي"
  },
  "themeColor": "#CD853F",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#CD853F"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "فن إسلامي",
  "headerTitleEn": "Islamic Art",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#CD853F"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-4",
  "name": {
    "en": "Desert Night",
    "ar": "ليلة صحراوية"
  },
  "themeColor": "#F4A460",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#F4A460"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "ليلة صحراوية",
  "headerTitleEn": "Desert Night",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#F4A460"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-5",
  "name": {
    "en": "Oasis King",
    "ar": "ملك الواحة"
  },
  "themeColor": "#DAA520",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#DAA520"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "ملك الواحة",
  "headerTitleEn": "Oasis King",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#DAA520"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-6",
  "name": {
    "en": "Bedouin Legend",
    "ar": "أسطورة البدو"
  },
  "themeColor": "#B8860B",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#B8860B"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "أسطورة البدو",
  "headerTitleEn": "Bedouin Legend",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#B8860B"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-7",
  "name": {
    "en": "Falconer",
    "ar": "صقار"
  },
  "themeColor": "#8B4513",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#8B4513"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "صقار",
  "headerTitleEn": "Falconer",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#8B4513"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-8",
  "name": {
    "en": "Calligraphy Master",
    "ar": "سيد الخط"
  },
  "themeColor": "#D2691E",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#D2691E"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "سيد الخط",
  "headerTitleEn": "Calligraphy Master",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#D2691E"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-9",
  "name": {
    "en": "Date Palm Lord",
    "ar": "لورد النخيل"
  },
  "themeColor": "#CD853F",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#CD853F"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "لورد النخيل",
  "headerTitleEn": "Date Palm Lord",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#CD853F"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-10",
  "name": {
    "en": "Camel Rider",
    "ar": "راكب الجمل"
  },
  "themeColor": "#F4A460",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#F4A460"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "راكب الجمل",
  "headerTitleEn": "Camel Rider",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#F4A460"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-11",
  "name": {
    "en": "Dune Basher",
    "ar": "مطعس محترف"
  },
  "themeColor": "#DAA520",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#DAA520"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "مطعس محترف",
  "headerTitleEn": "Dune Basher",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#DAA520"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-12",
  "name": {
    "en": "Arabian Nights",
    "ar": "ألف ليلة وليلة"
  },
  "themeColor": "#B8860B",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#B8860B"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "ألف ليلة وليلة",
  "headerTitleEn": "Arabian Nights",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#B8860B"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-13",
  "name": {
    "en": "Henna Artist",
    "ar": "فنانة الحناء"
  },
  "themeColor": "#8B4513",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#8B4513"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "فنانة الحناء",
  "headerTitleEn": "Henna Artist",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#8B4513"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-14",
  "name": {
    "en": "Oud Master",
    "ar": "عازف العود"
  },
  "themeColor": "#D2691E",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#D2691E"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "عازف العود",
  "headerTitleEn": "Oud Master",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#D2691E"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-15",
  "name": {
    "en": "Incense Burner",
    "ar": "مبخرة"
  },
  "themeColor": "#CD853F",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#CD853F"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "مبخرة",
  "headerTitleEn": "Incense Burner",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#CD853F"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-16",
  "name": {
    "en": "Lantern Lighter",
    "ar": "مضيء الفوانيس"
  },
  "themeColor": "#F4A460",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#F4A460"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "مضيء الفوانيس",
  "headerTitleEn": "Lantern Lighter",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#F4A460"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-17",
  "name": {
    "en": "Spice Merchant",
    "ar": "تاجر التوابل"
  },
  "themeColor": "#DAA520",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#DAA520"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "تاجر التوابل",
  "headerTitleEn": "Spice Merchant",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#DAA520"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-18",
  "name": {
    "en": "Silk Road",
    "ar": "طريق الحرير"
  },
  "themeColor": "#B8860B",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#B8860B"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "طريق الحرير",
  "headerTitleEn": "Silk Road",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#B8860B"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-19",
  "name": {
    "en": "Pearl Diver",
    "ar": "غواص اللؤلؤ"
  },
  "themeColor": "#8B4513",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#8B4513"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "غواص اللؤلؤ",
  "headerTitleEn": "Pearl Diver",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#8B4513"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "heritage-20",
  "name": {
    "en": "Majlis Boss",
    "ar": "راعي المجلس"
  },
  "themeColor": "#D2691E",
  "wrapperClass": "w-full aspect-[1.414/1] bg-[#FAF0E6] text-[#5C4033] border-[12px] border-double p-8 font-arabic-title shadow-lg",
  "wrapperStyle": {
    "borderColor": "#D2691E"
  },
  "watermarkText": "تراث",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-[0.03] text-[200px] font-black",
  "headerContainerClass": "text-center mt-2",
  "headerTitleClass": "text-2xl font-bold uppercase tracking-widest",
  "headerTitleAr": "راعي المجلس",
  "headerTitleEn": "Majlis Boss",
  "bodyContainerClass": "text-center mt-12",
  "nameClass": "text-5xl md:text-6xl font-bold mb-4",
  "titleClass": "text-2xl font-bold border-y-2 py-2 inline-block px-8",
  "titleStyle": {
    "borderColor": "#D2691E"
  },
  "footerContainerClass": "w-full mt-auto",
  "serialClass": "text-sm font-mono mt-2",
  "qrContainerClass": "bg-white/50 p-2 rounded",
  "qrFgColor": "#5C4033",
  "qrBgColor": "transparent",
  "decorations": [
    {
      "className": "top-4 left-4 text-4xl opacity-20",
      "text": "۞"
    },
    {
      "className": "bottom-4 right-4 text-4xl opacity-20",
      "text": "۞"
    }
  ]
},
  {
  "id": "luxury-1",
  "name": {
    "en": "Diamond Member",
    "ar": "عضو ماسي"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "عضو ماسي",
  "headerTitleEn": "Diamond Member",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-2",
  "name": {
    "en": "Platinum VIP",
    "ar": "بلاتينيوم VIP"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "بلاتينيوم VIP",
  "headerTitleEn": "Platinum VIP",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-3",
  "name": {
    "en": "Marble Baron",
    "ar": "بارون الرخام"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "بارون الرخام",
  "headerTitleEn": "Marble Baron",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-4",
  "name": {
    "en": "Silk Monarch",
    "ar": "عاهل الحرير"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "عاهل الحرير",
  "headerTitleEn": "Silk Monarch",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-5",
  "name": {
    "en": "Gold Elite",
    "ar": "نخبة الذهب"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "نخبة الذهب",
  "headerTitleEn": "Gold Elite",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-6",
  "name": {
    "en": "Ruby Master",
    "ar": "سيد الياقوت"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "سيد الياقوت",
  "headerTitleEn": "Ruby Master",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-7",
  "name": {
    "en": "Sapphire Lord",
    "ar": "لورد الزفير"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "لورد الزفير",
  "headerTitleEn": "Sapphire Lord",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-8",
  "name": {
    "en": "Emerald King",
    "ar": "ملك الزمرد"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "ملك الزمرد",
  "headerTitleEn": "Emerald King",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-9",
  "name": {
    "en": "Onyx Prince",
    "ar": "أمير الأونيكس"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "أمير الأونيكس",
  "headerTitleEn": "Onyx Prince",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-10",
  "name": {
    "en": "Crystal Boss",
    "ar": "زعيم الكريستال"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "زعيم الكريستال",
  "headerTitleEn": "Crystal Boss",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-11",
  "name": {
    "en": "Velvet Knight",
    "ar": "فارس المخمل"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "فارس المخمل",
  "headerTitleEn": "Velvet Knight",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-12",
  "name": {
    "en": "Cashmere Duke",
    "ar": "دوق الكشمير"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "دوق الكشمير",
  "headerTitleEn": "Cashmere Duke",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-13",
  "name": {
    "en": "Leather Baron",
    "ar": "بارون الجلد"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "بارون الجلد",
  "headerTitleEn": "Leather Baron",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-14",
  "name": {
    "en": "Mahogany Lord",
    "ar": "لورد الماهوجني"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "لورد الماهوجني",
  "headerTitleEn": "Mahogany Lord",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-15",
  "name": {
    "en": "Ivory King",
    "ar": "ملك العاج"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "ملك العاج",
  "headerTitleEn": "Ivory King",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-16",
  "name": {
    "en": "Champagne VIP",
    "ar": "شامبين VIP"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "شامبين VIP",
  "headerTitleEn": "Champagne VIP",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-17",
  "name": {
    "en": "Caviar Master",
    "ar": "سيد الكافيار"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "سيد الكافيار",
  "headerTitleEn": "Caviar Master",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-18",
  "name": {
    "en": "Yacht Owner",
    "ar": "مالك يخت"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "مالك يخت",
  "headerTitleEn": "Yacht Owner",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-19",
  "name": {
    "en": "Private Jet VIP",
    "ar": "طائرة خاصة VIP"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "طائرة خاصة VIP",
  "headerTitleEn": "Private Jet VIP",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "luxury-20",
  "name": {
    "en": "Billionaire Club",
    "ar": "نادي المليارديرات"
  },
  "themeColor": "#d4af37",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-tr from-gray-900 to-gray-800 text-white border p-12 shadow-2xl",
  "wrapperStyle": {
    "borderColor": "#d4af37"
  },
  "watermarkText": "LUXURY",
  "watermarkClass": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-9xl font-serif font-black tracking-[0.2em]",
  "headerContainerClass": "text-left mb-8",
  "headerTitleClass": "text-[#d4af37] text-sm tracking-[0.5em] font-light uppercase",
  "headerTitleAr": "نادي المليارديرات",
  "headerTitleEn": "Billionaire Club",
  "bodyContainerClass": "text-left flex-grow flex flex-col justify-center",
  "nameClass": "text-5xl md:text-7xl font-serif font-light text-white mb-4 tracking-wide drop-shadow",
  "titleClass": "text-xl text-gray-400 font-light tracking-widest uppercase",
  "footerContainerClass": "w-full mt-auto pt-8 border-t border-[#d4af37]/30 flex items-end",
  "serialClass": "text-xs font-mono text-gray-500 tracking-widest",
  "qrFgColor": "#000",
  "qrBgColor": "#d4af37",
  "qrContainerClass": "p-1 rounded-sm"
},
  {
  "id": "meme-ext-1",
  "name": {
    "en": "Doge Master",
    "ar": "سيد الدوج"
  },
  "themeColor": "#ff00ff",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 text-white border-8 border-dashed border-yellow-300 p-8 shadow-[8px_8px_0_#000] rounded-3xl",
  "watermarkText": "LOL",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-20 text-[250px] font-black transform rotate-12",
  "headerContainerClass": "text-center bg-white text-black p-2 rounded-xl shadow-[4px_4px_0_#000] transform -rotate-2 w-2/3 mx-auto mt-4",
  "headerTitleClass": "text-2xl font-black uppercase",
  "headerTitleAr": "سيد الدوج",
  "headerTitleEn": "Doge Master",
  "bodyContainerClass": "text-center my-auto",
  "nameClass": "text-6xl font-black text-yellow-300 drop-shadow-[2px_2px_0_#000] mb-4 stroke-black",
  "titleClass": "text-3xl font-black bg-black text-white px-6 py-2 rounded-full transform rotate-3 inline-block shadow-[4px_4px_0_#fff]",
  "footerContainerClass": "w-full mt-4 flex justify-between items-end bg-white/20 p-4 rounded-2xl",
  "serialClass": "text-sm font-black text-black bg-yellow-300 px-2 py-1 rounded shadow-[2px_2px_0_#000]",
  "qrFgColor": "#000",
  "qrBgColor": "#fff",
  "qrContainerClass": "p-2 border-4 border-black rounded-xl shadow-[4px_4px_0_#000] transform rotate-6"
},
  {
  "id": "meme-ext-2",
  "name": {
    "en": "Distracted Boyfriend",
    "ar": "الحبيب المشتت"
  },
  "themeColor": "#ff00ff",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 text-white border-8 border-dashed border-yellow-300 p-8 shadow-[8px_8px_0_#000] rounded-3xl",
  "watermarkText": "LOL",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-20 text-[250px] font-black transform rotate-12",
  "headerContainerClass": "text-center bg-white text-black p-2 rounded-xl shadow-[4px_4px_0_#000] transform -rotate-2 w-2/3 mx-auto mt-4",
  "headerTitleClass": "text-2xl font-black uppercase",
  "headerTitleAr": "الحبيب المشتت",
  "headerTitleEn": "Distracted Boyfriend",
  "bodyContainerClass": "text-center my-auto",
  "nameClass": "text-6xl font-black text-yellow-300 drop-shadow-[2px_2px_0_#000] mb-4 stroke-black",
  "titleClass": "text-3xl font-black bg-black text-white px-6 py-2 rounded-full transform rotate-3 inline-block shadow-[4px_4px_0_#fff]",
  "footerContainerClass": "w-full mt-4 flex justify-between items-end bg-white/20 p-4 rounded-2xl",
  "serialClass": "text-sm font-black text-black bg-yellow-300 px-2 py-1 rounded shadow-[2px_2px_0_#000]",
  "qrFgColor": "#000",
  "qrBgColor": "#fff",
  "qrContainerClass": "p-2 border-4 border-black rounded-xl shadow-[4px_4px_0_#000] transform rotate-6"
},
  {
  "id": "meme-ext-3",
  "name": {
    "en": "Crying Cat",
    "ar": "القط الباكي"
  },
  "themeColor": "#ff00ff",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 text-white border-8 border-dashed border-yellow-300 p-8 shadow-[8px_8px_0_#000] rounded-3xl",
  "watermarkText": "LOL",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-20 text-[250px] font-black transform rotate-12",
  "headerContainerClass": "text-center bg-white text-black p-2 rounded-xl shadow-[4px_4px_0_#000] transform -rotate-2 w-2/3 mx-auto mt-4",
  "headerTitleClass": "text-2xl font-black uppercase",
  "headerTitleAr": "القط الباكي",
  "headerTitleEn": "Crying Cat",
  "bodyContainerClass": "text-center my-auto",
  "nameClass": "text-6xl font-black text-yellow-300 drop-shadow-[2px_2px_0_#000] mb-4 stroke-black",
  "titleClass": "text-3xl font-black bg-black text-white px-6 py-2 rounded-full transform rotate-3 inline-block shadow-[4px_4px_0_#fff]",
  "footerContainerClass": "w-full mt-4 flex justify-between items-end bg-white/20 p-4 rounded-2xl",
  "serialClass": "text-sm font-black text-black bg-yellow-300 px-2 py-1 rounded shadow-[2px_2px_0_#000]",
  "qrFgColor": "#000",
  "qrBgColor": "#fff",
  "qrContainerClass": "p-2 border-4 border-black rounded-xl shadow-[4px_4px_0_#000] transform rotate-6"
},
  {
  "id": "meme-ext-4",
  "name": {
    "en": "Pepe the Frog",
    "ar": "بيبي الضفدع"
  },
  "themeColor": "#ff00ff",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 text-white border-8 border-dashed border-yellow-300 p-8 shadow-[8px_8px_0_#000] rounded-3xl",
  "watermarkText": "LOL",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-20 text-[250px] font-black transform rotate-12",
  "headerContainerClass": "text-center bg-white text-black p-2 rounded-xl shadow-[4px_4px_0_#000] transform -rotate-2 w-2/3 mx-auto mt-4",
  "headerTitleClass": "text-2xl font-black uppercase",
  "headerTitleAr": "بيبي الضفدع",
  "headerTitleEn": "Pepe the Frog",
  "bodyContainerClass": "text-center my-auto",
  "nameClass": "text-6xl font-black text-yellow-300 drop-shadow-[2px_2px_0_#000] mb-4 stroke-black",
  "titleClass": "text-3xl font-black bg-black text-white px-6 py-2 rounded-full transform rotate-3 inline-block shadow-[4px_4px_0_#fff]",
  "footerContainerClass": "w-full mt-4 flex justify-between items-end bg-white/20 p-4 rounded-2xl",
  "serialClass": "text-sm font-black text-black bg-yellow-300 px-2 py-1 rounded shadow-[2px_2px_0_#000]",
  "qrFgColor": "#000",
  "qrBgColor": "#fff",
  "qrContainerClass": "p-2 border-4 border-black rounded-xl shadow-[4px_4px_0_#000] transform rotate-6"
},
  {
  "id": "meme-ext-5",
  "name": {
    "en": "Rickroll King",
    "ar": "ملك الريكرول"
  },
  "themeColor": "#ff00ff",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 text-white border-8 border-dashed border-yellow-300 p-8 shadow-[8px_8px_0_#000] rounded-3xl",
  "watermarkText": "LOL",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-20 text-[250px] font-black transform rotate-12",
  "headerContainerClass": "text-center bg-white text-black p-2 rounded-xl shadow-[4px_4px_0_#000] transform -rotate-2 w-2/3 mx-auto mt-4",
  "headerTitleClass": "text-2xl font-black uppercase",
  "headerTitleAr": "ملك الريكرول",
  "headerTitleEn": "Rickroll King",
  "bodyContainerClass": "text-center my-auto",
  "nameClass": "text-6xl font-black text-yellow-300 drop-shadow-[2px_2px_0_#000] mb-4 stroke-black",
  "titleClass": "text-3xl font-black bg-black text-white px-6 py-2 rounded-full transform rotate-3 inline-block shadow-[4px_4px_0_#fff]",
  "footerContainerClass": "w-full mt-4 flex justify-between items-end bg-white/20 p-4 rounded-2xl",
  "serialClass": "text-sm font-black text-black bg-yellow-300 px-2 py-1 rounded shadow-[2px_2px_0_#000]",
  "qrFgColor": "#000",
  "qrBgColor": "#fff",
  "qrContainerClass": "p-2 border-4 border-black rounded-xl shadow-[4px_4px_0_#000] transform rotate-6"
},
  {
  "id": "meme-ext-6",
  "name": {
    "en": "Trollface",
    "ar": "ترول فيس"
  },
  "themeColor": "#ff00ff",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 text-white border-8 border-dashed border-yellow-300 p-8 shadow-[8px_8px_0_#000] rounded-3xl",
  "watermarkText": "LOL",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-20 text-[250px] font-black transform rotate-12",
  "headerContainerClass": "text-center bg-white text-black p-2 rounded-xl shadow-[4px_4px_0_#000] transform -rotate-2 w-2/3 mx-auto mt-4",
  "headerTitleClass": "text-2xl font-black uppercase",
  "headerTitleAr": "ترول فيس",
  "headerTitleEn": "Trollface",
  "bodyContainerClass": "text-center my-auto",
  "nameClass": "text-6xl font-black text-yellow-300 drop-shadow-[2px_2px_0_#000] mb-4 stroke-black",
  "titleClass": "text-3xl font-black bg-black text-white px-6 py-2 rounded-full transform rotate-3 inline-block shadow-[4px_4px_0_#fff]",
  "footerContainerClass": "w-full mt-4 flex justify-between items-end bg-white/20 p-4 rounded-2xl",
  "serialClass": "text-sm font-black text-black bg-yellow-300 px-2 py-1 rounded shadow-[2px_2px_0_#000]",
  "qrFgColor": "#000",
  "qrBgColor": "#fff",
  "qrContainerClass": "p-2 border-4 border-black rounded-xl shadow-[4px_4px_0_#000] transform rotate-6"
},
  {
  "id": "meme-ext-7",
  "name": {
    "en": "Nyan Cat",
    "ar": "نيان كات"
  },
  "themeColor": "#ff00ff",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 text-white border-8 border-dashed border-yellow-300 p-8 shadow-[8px_8px_0_#000] rounded-3xl",
  "watermarkText": "LOL",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-20 text-[250px] font-black transform rotate-12",
  "headerContainerClass": "text-center bg-white text-black p-2 rounded-xl shadow-[4px_4px_0_#000] transform -rotate-2 w-2/3 mx-auto mt-4",
  "headerTitleClass": "text-2xl font-black uppercase",
  "headerTitleAr": "نيان كات",
  "headerTitleEn": "Nyan Cat",
  "bodyContainerClass": "text-center my-auto",
  "nameClass": "text-6xl font-black text-yellow-300 drop-shadow-[2px_2px_0_#000] mb-4 stroke-black",
  "titleClass": "text-3xl font-black bg-black text-white px-6 py-2 rounded-full transform rotate-3 inline-block shadow-[4px_4px_0_#fff]",
  "footerContainerClass": "w-full mt-4 flex justify-between items-end bg-white/20 p-4 rounded-2xl",
  "serialClass": "text-sm font-black text-black bg-yellow-300 px-2 py-1 rounded shadow-[2px_2px_0_#000]",
  "qrFgColor": "#000",
  "qrBgColor": "#fff",
  "qrContainerClass": "p-2 border-4 border-black rounded-xl shadow-[4px_4px_0_#000] transform rotate-6"
},
  {
  "id": "meme-ext-8",
  "name": {
    "en": "Hide the Pain Harold",
    "ar": "هارولد خافي الألم"
  },
  "themeColor": "#ff00ff",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 text-white border-8 border-dashed border-yellow-300 p-8 shadow-[8px_8px_0_#000] rounded-3xl",
  "watermarkText": "LOL",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-20 text-[250px] font-black transform rotate-12",
  "headerContainerClass": "text-center bg-white text-black p-2 rounded-xl shadow-[4px_4px_0_#000] transform -rotate-2 w-2/3 mx-auto mt-4",
  "headerTitleClass": "text-2xl font-black uppercase",
  "headerTitleAr": "هارولد خافي الألم",
  "headerTitleEn": "Hide the Pain Harold",
  "bodyContainerClass": "text-center my-auto",
  "nameClass": "text-6xl font-black text-yellow-300 drop-shadow-[2px_2px_0_#000] mb-4 stroke-black",
  "titleClass": "text-3xl font-black bg-black text-white px-6 py-2 rounded-full transform rotate-3 inline-block shadow-[4px_4px_0_#fff]",
  "footerContainerClass": "w-full mt-4 flex justify-between items-end bg-white/20 p-4 rounded-2xl",
  "serialClass": "text-sm font-black text-black bg-yellow-300 px-2 py-1 rounded shadow-[2px_2px_0_#000]",
  "qrFgColor": "#000",
  "qrBgColor": "#fff",
  "qrContainerClass": "p-2 border-4 border-black rounded-xl shadow-[4px_4px_0_#000] transform rotate-6"
},
  {
  "id": "meme-ext-9",
  "name": {
    "en": "Woman Yelling",
    "ar": "المرأة تصرخ"
  },
  "themeColor": "#ff00ff",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 text-white border-8 border-dashed border-yellow-300 p-8 shadow-[8px_8px_0_#000] rounded-3xl",
  "watermarkText": "LOL",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-20 text-[250px] font-black transform rotate-12",
  "headerContainerClass": "text-center bg-white text-black p-2 rounded-xl shadow-[4px_4px_0_#000] transform -rotate-2 w-2/3 mx-auto mt-4",
  "headerTitleClass": "text-2xl font-black uppercase",
  "headerTitleAr": "المرأة تصرخ",
  "headerTitleEn": "Woman Yelling",
  "bodyContainerClass": "text-center my-auto",
  "nameClass": "text-6xl font-black text-yellow-300 drop-shadow-[2px_2px_0_#000] mb-4 stroke-black",
  "titleClass": "text-3xl font-black bg-black text-white px-6 py-2 rounded-full transform rotate-3 inline-block shadow-[4px_4px_0_#fff]",
  "footerContainerClass": "w-full mt-4 flex justify-between items-end bg-white/20 p-4 rounded-2xl",
  "serialClass": "text-sm font-black text-black bg-yellow-300 px-2 py-1 rounded shadow-[2px_2px_0_#000]",
  "qrFgColor": "#000",
  "qrBgColor": "#fff",
  "qrContainerClass": "p-2 border-4 border-black rounded-xl shadow-[4px_4px_0_#000] transform rotate-6"
},
  {
  "id": "meme-ext-10",
  "name": {
    "en": "This is Fine",
    "ar": "الوضع تمام"
  },
  "themeColor": "#ff00ff",
  "wrapperClass": "w-full aspect-[1.414/1] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 text-white border-8 border-dashed border-yellow-300 p-8 shadow-[8px_8px_0_#000] rounded-3xl",
  "watermarkText": "LOL",
  "watermarkClass": "inset-0 flex items-center justify-center opacity-20 text-[250px] font-black transform rotate-12",
  "headerContainerClass": "text-center bg-white text-black p-2 rounded-xl shadow-[4px_4px_0_#000] transform -rotate-2 w-2/3 mx-auto mt-4",
  "headerTitleClass": "text-2xl font-black uppercase",
  "headerTitleAr": "الوضع تمام",
  "headerTitleEn": "This is Fine",
  "bodyContainerClass": "text-center my-auto",
  "nameClass": "text-6xl font-black text-yellow-300 drop-shadow-[2px_2px_0_#000] mb-4 stroke-black",
  "titleClass": "text-3xl font-black bg-black text-white px-6 py-2 rounded-full transform rotate-3 inline-block shadow-[4px_4px_0_#fff]",
  "footerContainerClass": "w-full mt-4 flex justify-between items-end bg-white/20 p-4 rounded-2xl",
  "serialClass": "text-sm font-black text-black bg-yellow-300 px-2 py-1 rounded shadow-[2px_2px_0_#000]",
  "qrFgColor": "#000",
  "qrBgColor": "#fff",
  "qrContainerClass": "p-2 border-4 border-black rounded-xl shadow-[4px_4px_0_#000] transform rotate-6"
},
  
  {
    id: 'royal',
    name: { ar: 'الديوان الملكي', en: 'Royal Decree' },
    themeColor: '#78350f',
    wrapperClass: 'w-full aspect-[1.414/1] bg-[#fdf5e6] text-amber-900 border-[16px] border-double border-amber-800 p-8 shadow-2xl',
    wrapperStyle: { backgroundImage: 'radial-gradient(#d3b88c 1px, transparent 1px)', backgroundSize: '20px 20px', backgroundColor: '#f4ebd8' },
    watermarkText: 'KAC8.ME',
    watermarkClass: 'bottom-4 right-1/2 translate-x-1/2 opacity-[0.03] text-8xl font-black tracking-tighter z-0',
    badgeClass: 'top-8 right-8 w-20 h-20 md:w-24 md:h-24',
    headerContainerClass: 'text-center mt-4',
    headerTitleClass: 'text-amber-800 text-2xl md:text-3xl tracking-[0.2em] font-bold uppercase font-arabic-title',
    headerTitleAr: 'صك ملكية فخرية',
    headerTitleEn: 'Royal Decree',
    headerDividerClass: 'w-32 h-[3px] bg-amber-700 mx-auto mt-4 rounded-full',
    bodyContainerClass: 'text-center',
    preNameClass: 'text-amber-700 text-sm mb-4 italic',
    preNameAr: 'يشهد هذا المستند بأن',
    preNameEn: 'This document certifies that',
    nameClass: 'text-4xl md:text-6xl font-bold text-amber-950 mb-8 font-serif',
    postNameClass: 'text-amber-700 text-sm mb-2 italic',
    postNameAr: 'قد نال وبكل استحقاق لقب',
    postNameEn: 'Has rightfully earned the title of',
    titleClass: 'text-3xl md:text-4xl text-amber-800 font-bold font-serif',
    footerContainerClass: 'w-full mt-8',
    serialContainerClass: 'text-left flex flex-col items-start gap-2',
    serialClass: 'text-amber-800/60 font-mono text-sm border-b border-amber-800/30 pb-1',
    signatureContainerClass: 'h-16 w-32 relative',
    signatureImageStyle: { filter: 'invert(30%) sepia(100%) hue-rotate(-20deg) saturate(3)' },
    qrContainerClass: 'bg-white/80 p-2 rounded-lg border-2 border-amber-800/20',
    qrFgColor: '#78350f',
    decorations: [
      {
        className: 'top-10 left-10 w-24 h-24 bg-gradient-to-br from-yellow-500 to-red-700 rounded-full flex items-center justify-center shadow-lg transform -rotate-12 border-4 border-yellow-600/50',
        text: 'ختم',
        style: { color: '#fef08a', fontSize: '24px', fontWeight: 'bold' }
      },
      {
        className: 'inset-0 flex items-center justify-center opacity-5',
        text: 'الديوان الملكي',
        style: { fontSize: '120px', fontWeight: 'bold', transform: 'rotate(-30deg)', whiteSpace: 'nowrap', color: '#78350f' }
      }
    ]
  },
  {
    id: 'cyber',
    name: { ar: 'الهوية الرقمية', en: 'Cyber-ID' },
    themeColor: '#22c55e',
    isPremium: true,
    wrapperClass: 'w-full aspect-[1.414/1] bg-black text-green-400 border-[4px] border-green-500 p-8 shadow-[0_0_50px_rgba(0,255,0,0.2)]',
    watermarkText: 'KAC8.ME',
    watermarkClass: 'bottom-4 right-1/2 translate-x-1/2 opacity-[0.03] text-8xl font-black tracking-tighter text-green-500 z-0',
    badgeClass: 'top-8 right-8 w-16 h-16 md:w-20 md:h-20',
    headerContainerClass: 'text-center mt-2 flex justify-between items-center border-b border-green-500/50 pb-4',
    headerTitleClass: 'text-green-500 text-xl tracking-[0.4em] font-mono uppercase',
    headerTitleAr: 'الهوية الرقمية //:',
    headerTitleEn: 'CYBER_ID //:',
    bodyContainerClass: 'text-left font-mono mt-4',
    preNameClass: 'text-green-600 text-xs mb-1',
    preNameEn: '$> SUBJECT_NAME:',
    preNameAr: '$> SUBJECT_NAME:',
    nameClass: 'text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]',
    postNameClass: 'text-green-600 text-xs mb-1',
    postNameEn: '$> ASSIGNED_ROLE:',
    postNameAr: '$> ASSIGNED_ROLE:',
    titleClass: 'text-2xl md:text-3xl text-green-400 font-bold bg-green-900/30 inline-block px-4 py-2 border-l-4 border-green-500',
    footerContainerClass: 'w-full mt-8 border-t border-green-500/50 pt-4',
    serialContainerClass: 'text-left font-mono flex flex-col items-start gap-1',
    serialLabelClass: 'text-[10px] text-green-600',
    serialLabelEn: 'ID_HASH',
    serialLabelAr: 'ID_HASH',
    serialClass: 'text-sm text-green-400',
    signatureContainerClass: 'h-12 w-32 relative bg-green-900/20 border border-green-500/30 rounded p-1 mt-2',
    signatureImageStyle: { filter: 'invert(60%) sepia(100%) saturate(300%) hue-rotate(80deg)' },
    qrContainerClass: 'bg-green-500 p-2 rounded shadow-[0_0_15px_#0f0]',
    qrFgColor: '#000',
    qrBgColor: '#22c55e',
    decorations: [
      {
        className: 'inset-0 opacity-20',
        style: { backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.5) 2px, rgba(0, 255, 0, 0.5) 4px)' }
      },
      {
        className: 'top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_20px_#0f0] animate-pulse'
      }
    ]
  },
  {
    id: 'meme',
    name: { ar: 'بطاقة الهبد', en: 'Meme Card' },
    themeColor: '#eab308',
    wrapperClass: 'w-full aspect-[1.414/1] bg-yellow-300 text-black border-8 border-black p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-3xl',
    wrapperStyle: { backgroundImage: 'radial-gradient(circle, #facc15 20%, #fef08a 20%, #fef08a 80%, #facc15 80%, #facc15 100%)', backgroundSize: '40px 40px' },
    watermarkText: 'KAC8.ME',
    watermarkClass: 'bottom-4 right-1/2 translate-x-1/2 opacity-[0.05] text-8xl font-black tracking-tighter text-black z-0',
    badgeClass: 'top-8 left-8 w-20 h-20 md:w-24 md:h-24 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] transform -rotate-12',
    headerContainerClass: 'text-center bg-white border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] mt-2 mx-auto w-3/4',
    headerTitleClass: 'text-black text-2xl md:text-3xl font-black uppercase tracking-wide',
    headerTitleAr: 'بطاقة الهبد الرسمية',
    headerTitleEn: 'CERTIFIED MEME CARD',
    bodyContainerClass: 'text-center my-auto flex flex-col items-center justify-center',
    preNameClass: 'text-black text-sm font-bold uppercase mb-2 bg-white inline-block px-2 border-2 border-black -skew-x-12',
    preNameAr: 'الأسطورة:',
    preNameEn: 'THE LEGEND:',
    nameClass: 'text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]',
    titleWrapperClass: 'bg-purple-500 text-white border-4 border-black px-6 py-3 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] transform rotate-3 inline-block',
    titleClass: 'text-2xl md:text-3xl font-black uppercase',
    footerContainerClass: 'w-full mt-4 flex-row-reverse',
    serialContainerClass: 'flex flex-col items-end gap-2',
    serialClass: 'bg-black text-white font-mono font-bold px-3 py-1 rounded-lg',
    signatureContainerClass: 'h-16 w-32 relative bg-white border-4 border-black rounded-xl p-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] -rotate-6',
    qrContainerClass: 'bg-white border-4 border-black p-2 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col items-center',
    qrFgColor: '#000',
    qrBgColor: '#fff',
    decorations: [
      {
        className: 'top-4 right-4 bg-pink-500 text-white font-black text-xl px-4 py-2 rotate-12 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] z-20',
        text: 'OMG! 😱'
      }
    ]
  },
  {
    id: 'galaxy',
    name: { ar: 'صك كوكبي', en: 'Galaxy Title' },
    themeColor: '#a855f7',
    isPremium: true,
    wrapperClass: 'w-full aspect-[1.414/1] bg-[#0b0b1a] text-purple-100 border-2 border-purple-500/30 p-8 rounded-2xl shadow-[0_0_40px_rgba(138,43,226,0.3)]',
    wrapperStyle: { backgroundImage: 'radial-gradient(circle at 50% 0%, #2a1b4d 0%, #0b0b1a 80%)' },
    watermarkText: 'KAC8.ME',
    watermarkClass: 'bottom-4 right-1/2 translate-x-1/2 opacity-[0.03] text-8xl font-black tracking-tighter text-white z-0',
    badgeClass: 'top-8 right-8 w-16 h-16 md:w-20 md:h-20',
    headerContainerClass: 'text-center mt-4 relative',
    headerTitleClass: 'text-purple-300 text-xl md:text-2xl tracking-[0.5em] font-light uppercase',
    headerTitleAr: 'صك ملكية كوكبي',
    headerTitleEn: 'Galactic Title',
    headerDividerClass: 'w-full max-w-[200px] h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mt-6',
    bodyContainerClass: 'text-center mt-8',
    preNameClass: 'text-purple-300/70 text-sm mb-4 tracking-widest',
    preNameAr: 'كيان معتمد عبر المجرات',
    preNameEn: 'CERTIFIED ACROSS GALAXIES',
    nameClass: 'text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]',
    titleWrapperClass: 'inline-block p-[1px] rounded-full bg-gradient-to-r from-cyan-500 to-purple-500',
    titleClass: 'bg-[#0b0b1a] rounded-full px-8 py-3 text-xl md:text-2xl text-purple-200 font-bold tracking-wider',
    footerContainerClass: 'w-full mt-8 bg-purple-900/20 p-4 rounded-xl backdrop-blur-sm border border-purple-500/20',
    serialContainerClass: 'text-left flex flex-col items-start gap-1',
    serialLabelClass: 'text-[10px] text-purple-400 tracking-widest',
    serialLabelAr: 'COSMIC_REF',
    serialLabelEn: 'COSMIC_REF',
    serialClass: 'text-sm font-mono text-cyan-300',
    signatureContainerClass: 'h-10 w-24 relative mt-1',
    signatureImageStyle: { filter: 'invert(80%) sepia(50%) saturate(300%) hue-rotate(200deg)' },
    qrContainerClass: 'bg-white/10 p-2 rounded-xl backdrop-blur-md',
    qrFgColor: '#e9d5ff',
    decorations: [
      {
        className: 'inset-0 opacity-40',
        style: { backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '30px 30px', backgroundPosition: '0 0, 15px 15px' }
      }
    ]
  },
  {
    id: 'vintage',
    name: { ar: 'مانشيت تاريخي', en: 'Vintage News' },
    themeColor: '#525252',
    wrapperClass: 'w-full aspect-[1.414/1] bg-[#e8e0d5] text-[#2c2c2c] p-8 shadow-lg border-8 border-double border-[#2c2c2c]',
    watermarkText: 'KAC8.ME',
    watermarkClass: 'bottom-4 right-1/2 translate-x-1/2 opacity-[0.05] text-8xl font-black tracking-tighter text-[#2c2c2c] z-0',
    badgeClass: 'top-8 right-8 w-16 h-16 md:w-20 md:h-20 grayscale',
    headerContainerClass: 'text-center border-b-4 border-double border-[#2c2c2c] pb-4 mb-4',
    headerTitleClass: 'text-[#2c2c2c] text-3xl md:text-5xl font-black uppercase font-serif transform scale-y-110',
    headerTitleAr: 'مانشيت تاريخي',
    headerTitleEn: 'EXTRA! EXTRA!',
    bodyContainerClass: 'flex flex-col justify-center items-center text-center mt-4',
    nameClass: 'text-4xl md:text-6xl font-black text-[#1a1a1a] mb-6 font-serif leading-none',
    preNameClass: 'text-sm font-serif mb-2 uppercase tracking-wider',
    preNameAr: 'يصنع التاريخ كـ',
    preNameEn: 'MAKES HISTORY AS',
    titleClass: 'text-2xl md:text-4xl text-[#2c2c2c] font-bold font-serif italic bg-[#d5ccbe] inline-block p-2',
    footerContainerClass: 'w-full mt-auto border-t-2 border-[#2c2c2c] pt-4',
    serialContainerClass: 'text-left',
    serialLabelClass: 'text-xs font-serif font-bold',
    serialLabelAr: 'Vol. 1 • No. 1',
    serialLabelEn: 'Vol. 1 • No. 1',
    serialClass: 'text-xs font-mono mt-1',
    signatureContainerClass: 'h-12 w-32 relative border-b border-[#2c2c2c] border-dashed pb-1 mt-2',
    signatureImageStyle: { filter: 'grayscale(100%) contrast(200%)' },
    qrContainerClass: 'bg-[#e8e0d5] p-1 border border-[#2c2c2c]',
    qrFgColor: '#2c2c2c',
    decorations: [
      {
        className: 'top-2 left-1/2 transform -translate-x-1/2 text-xs uppercase tracking-widest font-serif',
        text: 'The Daily Chronicle • Est. 1950'
      }
    ]
  },
  {
    id: 'minimal',
    name: { ar: 'بسيط وأنيق', en: 'Minimal Elegance' },
    themeColor: '#000000',
    wrapperClass: 'w-full aspect-[1.414/1] bg-white text-black border border-gray-200 p-12 shadow-sm',
    watermarkText: 'KAC8',
    watermarkClass: 'bottom-8 right-8 opacity-[0.02] text-9xl font-black tracking-tighter text-black z-0',
    badgeClass: 'top-12 right-12 w-12 h-12 grayscale opacity-50',
    headerContainerClass: 'text-left mb-12',
    headerTitleClass: 'text-gray-400 text-sm tracking-[0.3em] font-light uppercase',
    headerTitleAr: 'شهادة توثيق',
    headerTitleEn: 'CERTIFICATE OF AUTHENTICITY',
    bodyContainerClass: 'text-left flex-grow flex flex-col justify-center',
    nameClass: 'text-5xl md:text-7xl font-light text-black mb-4 tracking-tight',
    titleClass: 'text-xl md:text-2xl text-gray-500 font-light tracking-wide',
    footerContainerClass: 'w-full mt-auto pt-8 flex items-end',
    serialContainerClass: 'text-left',
    serialClass: 'text-xs font-mono text-gray-400',
    signatureContainerClass: 'h-16 w-40 relative mt-4 opacity-80',
    qrContainerClass: 'opacity-50 hover:opacity-100 transition-opacity',
    qrFgColor: '#000'
  },
  {
    id: 'gold',
    name: { ar: 'الذهبي الفاخر', en: 'Solid Gold' },
    themeColor: '#fbbf24',
    isPremium: true,
    wrapperClass: 'w-full aspect-[1.414/1] bg-gradient-to-br from-yellow-100 via-yellow-400 to-yellow-600 text-yellow-900 border-4 border-yellow-200 p-8 shadow-[0_10px_30px_rgba(251,191,36,0.5)]',
    watermarkText: 'PREMIUM',
    watermarkClass: 'inset-0 flex items-center justify-center opacity-10 text-[150px] font-black transform -rotate-12 pointer-events-none',
    badgeClass: 'top-8 right-8 w-20 h-20 drop-shadow-xl',
    headerContainerClass: 'text-center border-b border-yellow-700/30 pb-4',
    headerTitleClass: 'text-yellow-900 text-2xl tracking-[0.3em] font-serif uppercase',
    headerTitleAr: 'الامتياز الذهبي',
    headerTitleEn: 'GOLD EXCELLENCE',
    bodyContainerClass: 'text-center my-auto',
    nameClass: 'text-5xl md:text-7xl font-black text-white drop-shadow-md mb-4',
    titleClass: 'text-2xl font-bold bg-yellow-900 text-yellow-100 px-6 py-2 inline-block rounded-full shadow-inner',
    footerContainerClass: 'w-full mt-8 bg-white/20 p-4 rounded-2xl backdrop-blur-sm',
    serialContainerClass: 'text-left',
    serialClass: 'text-sm font-mono font-bold text-yellow-900',
    signatureContainerClass: 'h-12 w-32 relative mt-2',
    qrContainerClass: 'bg-white p-2 rounded-xl shadow-md',
    qrFgColor: '#713f12'
  },
  {
    id: 'neon',
    name: { ar: 'نيون سيتي', en: 'Neon City' },
    themeColor: '#ff00ff',
    wrapperClass: 'w-full aspect-[1.414/1] bg-[#050505] text-[#ff00ff] border border-[#ff00ff]/30 p-8 shadow-[0_0_30px_rgba(255,0,255,0.2)]',
    wrapperStyle: { backgroundImage: 'linear-gradient(rgba(255, 0, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 255, 0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' },
    watermarkText: 'NIGHT_CITY',
    watermarkClass: 'bottom-4 right-4 opacity-10 text-6xl font-black italic pointer-events-none',
    badgeClass: 'top-8 right-8 w-20 h-20 mix-blend-screen',
    headerContainerClass: 'text-left',
    headerTitleClass: 'text-[#00ffff] text-xl font-bold tracking-widest uppercase drop-shadow-[0_0_5px_#00ffff]',
    headerTitleAr: 'سجل النيون',
    headerTitleEn: 'NEON REGISTRY',
    bodyContainerClass: 'text-left mt-16',
    preNameClass: 'text-[#ff00ff] text-sm mb-2',
    preNameAr: '>> المستخدم:',
    preNameEn: '>> USER:',
    nameClass: 'text-5xl md:text-7xl font-black text-white drop-shadow-[0_0_10px_#ff00ff] mb-4',
    titleClass: 'text-2xl text-[#00ffff] drop-shadow-[0_0_8px_#00ffff] uppercase tracking-wider',
    footerContainerClass: 'w-full mt-auto',
    serialContainerClass: 'text-left',
    serialClass: 'text-xs font-mono text-[#ff00ff] bg-[#ff00ff]/10 px-2 py-1 border border-[#ff00ff]/30 inline-block',
    signatureContainerClass: 'h-12 w-32 relative mt-4 opacity-80',
    signatureImageStyle: { filter: 'invert(1) drop-shadow(0 0 5px #00ffff)' },
    qrContainerClass: 'bg-[#ff00ff]/10 p-2 border border-[#ff00ff]',
    qrFgColor: '#00ffff'
  },
  {
    id: 'matrix',
    name: { ar: 'الماتريكس', en: 'The Matrix' },
    themeColor: '#00ff00',
    isPremium: true,
    wrapperClass: 'w-full aspect-[1.414/1] bg-black text-[#00ff00] p-8 border-2 border-[#00ff00]/50 font-mono overflow-hidden',
    watermarkText: '01010111 01000001 01001011 01000101 01010101 01010000',
    watermarkClass: 'inset-0 flex flex-wrap opacity-10 text-xs break-all leading-none pointer-events-none',
    badgeClass: 'top-8 right-8 w-16 h-16',
    headerContainerClass: 'text-center border-b border-[#00ff00]/30 pb-2',
    headerTitleClass: 'text-[#00ff00] text-lg font-bold',
    headerTitleAr: 'النظام.استيقظ()',
    headerTitleEn: 'SYSTEM.WAKE()',
    bodyContainerClass: 'text-center mt-12 z-10 bg-black/50 backdrop-blur-sm p-8 rounded border border-[#00ff00]/20 inline-block mx-auto',
    preNameClass: 'text-xs text-[#00ff00]/70 mb-2',
    preNameAr: 'تم التعرف على الكيان:',
    preNameEn: 'ENTITY RECOGNIZED:',
    nameClass: 'text-4xl md:text-5xl font-bold text-white mb-4',
    titleClass: 'text-xl text-black bg-[#00ff00] px-4 py-1',
    footerContainerClass: 'w-full mt-auto z-10',
    serialContainerClass: 'text-left',
    serialClass: 'text-xs text-[#00ff00]',
    signatureContainerClass: 'h-10 w-24 relative mt-2',
    signatureImageStyle: { filter: 'invert(50%) sepia(100%) saturate(500%) hue-rotate(80deg)' },
    qrContainerClass: 'p-2 border border-[#00ff00]',
    qrFgColor: '#00ff00',
    qrBgColor: '#000000'
  },
  {
    id: 'retro',
    name: { ar: 'ريترو 80s', en: 'Retro 80s' },
    themeColor: '#f43f5e',
    wrapperClass: 'w-full aspect-[1.414/1] bg-gradient-to-b from-[#2e0854] to-[#090910] text-white p-8 border-4 border-cyan-400 overflow-hidden',
    watermarkText: 'RADICAL',
    watermarkClass: 'bottom-10 left-10 opacity-5 text-8xl font-black italic transform -skew-x-12 pointer-events-none',
    badgeClass: 'top-8 right-8 w-20 h-20',
    headerContainerClass: 'text-center',
    headerTitleClass: 'text-pink-500 text-3xl font-black italic tracking-wider drop-shadow-[2px_2px_0px_#0ff]',
    headerTitleAr: 'ريترو ويف',
    headerTitleEn: 'RETROWAVE',
    bodyContainerClass: 'text-center mt-12 flex flex-col items-center',
    nameClass: 'text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-blue-600 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] mb-4',
    titleClass: 'text-2xl text-yellow-400 font-bold italic border-y-2 border-pink-500 py-2 w-full max-w-md',
    footerContainerClass: 'w-full mt-auto flex flex-row items-end justify-between',
    serialContainerClass: 'text-left',
    serialClass: 'text-xs font-mono text-cyan-400',
    signatureContainerClass: 'h-12 w-32 relative mt-2',
    signatureImageStyle: { filter: 'invert(1) sepia(1) saturate(5) hue-rotate(280deg)' },
    qrContainerClass: 'bg-white p-2 border-2 border-pink-500 shadow-[4px_4px_0px_#0ff]',
    qrFgColor: '#000',
    decorations: [
      {
        className: 'bottom-0 left-0 w-full h-32 opacity-30',
        style: { backgroundImage: 'linear-gradient(transparent 50%, rgba(255, 0, 255, 0.5) 50%)', backgroundSize: '100% 4px' }
      }
    ]
  }
];

export const templates: TemplateConfig[] = templatesJSON.map(config => ({
  id: config.id,
  name: config.name,
  themeColor: config.themeColor,
  isPremium: config.isPremium,
  component: createTemplate(config)
}));
