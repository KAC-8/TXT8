'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import Tilt from 'react-parallax-tilt';
import { Heart, Loader2, Home } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { templates } from '@/lib/templates.config';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyOrder = any;

export default function HallOfFame() {
  const [orders, setOrders] = useState<AnyOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Fetch Top 20 latest certificates
    const fetchHallOfFame = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (data) {
        setOrders(data);
      } else {
        console.error('Error fetching hall of fame:', error);
      }
      setLoading(false);
    };

    fetchHallOfFame();

    // Load local likes without triggering effect warning
    setTimeout(() => {
      const localLikes = localStorage.getItem('txt8_likes');
      if (localLikes) {
        setLikes(JSON.parse(localLikes));
      }
    }, 0);
  }, []);

  const handleLike = (id: string) => {
    const newLikes = { ...likes, [id]: !likes[id] };
    setLikes(newLikes);
    localStorage.setItem('txt8_likes', JSON.stringify(newLikes));
    
    // Play a small click sound
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      osc.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // Ignore audio errors
    }
  };

  const trendingTitles = orders.map(o => o.language_preference === 'ar' ? o.title_ar : o.title_en).filter(Boolean);

  const handleRefresh = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);
    if (data) setOrders(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-obsidian text-white flex flex-col font-inter overscroll-y-contain" onTouchEnd={(e) => {
      // Very basic pull-to-refresh simulation at the top of the page
      if (window.scrollY === 0 && e.changedTouches[0].clientY > 150) {
        handleRefresh();
      }
    }}>
      {/* Ticker Tape */}
      <div className="bg-neon text-obsidian font-bold py-2 border-b-2 border-royal flex shadow-[0_0_15px_rgba(57,255,20,0.4)] relative z-20">
        <div className="bg-obsidian text-neon px-4 py-1 rounded-r-full font-black uppercase whitespace-nowrap z-10 flex items-center shadow-lg border-r-2 border-neon">
          🔥 Trending
        </div>
        <Marquee speed={50} gradient={false} className="overflow-hidden">
          {trendingTitles.length > 0 ? trendingTitles.map((title, i) => (
            <span key={i} className="mx-8 uppercase tracking-widest flex items-center gap-2">
              <span className="text-royal">✦</span> {title}
            </span>
          )) : (
            <span className="mx-8 uppercase tracking-widest flex items-center gap-2">
              <span className="text-royal">✦</span> THE LEGENDS ARE COMING
            </span>
          )}
        </Marquee>
      </div>

      <header className="p-6 text-center relative z-10 pt-12">
        <Link href="/" className="absolute top-10 left-6 text-gray-400 hover:text-neon transition-colors flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <Home size={18} /> Home
        </Link>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon via-yellow-400 to-neon drop-shadow-[0_0_10px_rgba(57,255,20,0.5)] uppercase"
        >
          Hall of Fame
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-4 text-sm uppercase tracking-widest font-arabic-title"
        >
          متصدرين الهبد الملكي
        </motion.p>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-neon">
            <Loader2 className="animate-spin mb-4" size={48} />
            <p className="tracking-widest uppercase text-sm">Fetching Legends...</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 pb-16">
            {orders.map((order, i) => {
              const TemplateComp = templates.find(t => t.id === order.template_id)?.component || templates[0].component;
              const isRTL = order.language_preference === 'ar';
              const title = isRTL ? order.title_ar : order.title_en;
              const isLiked = likes[order.id];

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="break-inside-avoid relative group"
                >
                  <Tilt
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    perspective={1000}
                    scale={1.02}
                    transitionSpeed={2500}
                    className="w-full glass-card p-3 rounded-2xl shadow-[0_0_20px_rgba(46,100,23,0.2)]"
                  >
                    <div className="w-full aspect-[1.414/1] relative rounded-xl overflow-hidden pointer-events-none origin-top-left flex items-center justify-center bg-black">
                       <div className="transform scale-[0.4] sm:scale-[0.5] md:scale-[0.45] xl:scale-[0.6] w-[1122px] h-[793px] absolute">
                          <TemplateComp 
                            name={order.customer_name}
                            title={title}
                            serial={order.serial_number}
                            isRTL={isRTL}
                            badgeId={order.badge_id}
                          />
                       </div>
                    </div>
                  </Tilt>
                  
                  <div className="absolute -bottom-4 right-4 z-30">
                    <button 
                      onClick={() => handleLike(order.id)}
                      className={`p-3 rounded-full shadow-xl transition-all transform hover:scale-110 ${isLiked ? 'bg-red-500 text-white' : 'bg-obsidian border border-gray-700 text-gray-400 hover:border-red-500 hover:text-red-500'}`}
                    >
                      <Heart size={20} className={isLiked ? 'fill-current animate-pulse' : ''} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}