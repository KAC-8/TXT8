import React from 'react';
import { Heart, Skull, Coffee, Crown, Flame, Star } from 'lucide-react';

export const badges = [
  { id: 'heart', name: { ar: 'وسام الطيبة', en: 'Golden Heart' }, color: 'text-rose-500', bg: 'bg-rose-500/20', border: 'border-rose-500/50', icon: Heart },
  { id: 'skull', name: { ar: 'وسام الهكر', en: 'Hacker Skull' }, color: 'text-green-500', bg: 'bg-green-500/20', border: 'border-green-500/50', icon: Skull },
  { id: 'coffee', name: { ar: 'وسام روقان الدماغ', en: 'Coffee Cup' }, color: 'text-amber-600', bg: 'bg-amber-600/20', border: 'border-amber-600/50', icon: Coffee },
  { id: 'crown', name: { ar: 'وسام الفخامة', en: 'The Crown' }, color: 'text-yellow-400', bg: 'bg-yellow-400/20', border: 'border-yellow-400/50', icon: Crown },
  { id: 'fire', name: { ar: 'وسام الهبد الحارق', en: 'The Fire' }, color: 'text-orange-500', bg: 'bg-orange-500/20', border: 'border-orange-500/50', icon: Flame },
  { id: 'star', name: { ar: 'وسام التألق', en: 'The Star' }, color: 'text-cyan-400', bg: 'bg-cyan-400/20', border: 'border-cyan-400/50', icon: Star },
];

export const BadgeRenderer = ({ id, className = '' }: { id: string | null | undefined, className?: string }) => {
  if (!id) return null;
  const badge = badges.find(b => b.id === id);
  if (!badge) return null;
  
  const Icon = badge.icon;

  return (
    <div className={`relative flex flex-col items-center justify-center animate-shine overflow-hidden rounded-full shadow-xl ${className}`}>
      {/* Medal Ribbon */}
      <div className="absolute top-0 w-4 h-6 bg-gradient-to-b from-red-600 via-white to-red-600 z-0"></div>
      
      {/* Medal Body */}
      <div className={`relative z-10 flex items-center justify-center w-full h-full rounded-full border-4 shadow-inner bg-gradient-to-br from-[#ffd700] via-[#daa520] to-[#b8860b] ${badge.border}`}>
         <div className={`flex items-center justify-center w-[80%] h-[80%] rounded-full bg-black/80 backdrop-blur-sm shadow-inner`}>
            <Icon className={`w-[60%] h-[60%] ${badge.color}`} strokeWidth={2.5} />
         </div>
      </div>
    </div>
  );
};
