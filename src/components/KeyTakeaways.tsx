import React from 'react';
import { Lightbulb, CheckCircle2 } from 'lucide-react';

export interface TakeawayItem {
  title: string;
  description: string;
  badge?: string;
}

interface KeyTakeawaysProps {
  title?: string;
  subtitle?: string;
  items: TakeawayItem[];
  accentColor?: 'red' | 'blue' | 'amber' | 'emerald' | 'purple';
}

export const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({
  title = 'Key Analytical Takeaways',
  subtitle,
  items,
  accentColor = 'red'
}) => {
  const accentClasses = {
    red: {
      border: 'border-red-900/40',
      badgeBg: 'bg-red-950/80 text-red-400 border-red-900/60',
      iconColor: 'text-red-400',
      itemBorder: 'border-red-950/50 hover:border-red-800/40',
      cardGlow: 'from-red-950/15'
    },
    blue: {
      border: 'border-blue-900/40',
      badgeBg: 'bg-blue-950/80 text-blue-400 border-blue-900/60',
      iconColor: 'text-blue-400',
      itemBorder: 'border-blue-950/50 hover:border-blue-800/40',
      cardGlow: 'from-blue-950/15'
    },
    amber: {
      border: 'border-amber-900/40',
      badgeBg: 'bg-amber-950/80 text-amber-400 border-amber-900/60',
      iconColor: 'text-amber-400',
      itemBorder: 'border-amber-950/50 hover:border-amber-800/40',
      cardGlow: 'from-amber-950/15'
    },
    emerald: {
      border: 'border-emerald-900/40',
      badgeBg: 'bg-emerald-950/80 text-emerald-400 border-emerald-900/60',
      iconColor: 'text-emerald-400',
      itemBorder: 'border-emerald-950/50 hover:border-emerald-800/40',
      cardGlow: 'from-emerald-950/15'
    },
    purple: {
      border: 'border-purple-900/40',
      badgeBg: 'bg-purple-950/80 text-purple-400 border-purple-900/60',
      iconColor: 'text-purple-400',
      itemBorder: 'border-purple-950/50 hover:border-purple-800/40',
      cardGlow: 'from-purple-950/15'
    }
  }[accentColor];

  return (
    <div
      className={`bg-gradient-to-br ${accentClasses.cardGlow} to-zinc-900/90 border ${accentClasses.border} rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden space-y-4`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/70 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center">
            <Lightbulb className={`w-4 h-4 ${accentClasses.iconColor}`} />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-zinc-400">{subtitle}</p>
            )}
          </div>
        </div>
        <span
          className={`text-[10px] font-mono uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full border self-start sm:self-auto ${accentClasses.badgeBg}`}
        >
          Executive Summary
        </span>
      </div>

      <div
        className={`grid grid-cols-1 ${
          items.length === 2
            ? 'md:grid-cols-2'
            : items.length === 3
            ? 'md:grid-cols-3'
            : 'sm:grid-cols-2 lg:grid-cols-4'
        } gap-4`}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`bg-zinc-950/80 border ${accentClasses.itemBorder} rounded-xl p-4 transition duration-200 flex flex-col justify-between space-y-2`}
          >
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-black text-white flex items-center gap-1.5">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${accentClasses.iconColor} flex-shrink-0`} />
                  {item.title}
                </span>
                {item.badge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 flex-shrink-0">
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
