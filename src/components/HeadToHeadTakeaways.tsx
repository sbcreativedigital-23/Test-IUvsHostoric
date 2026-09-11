import React from 'react';
import { HEAD_TO_HEAD_INSIGHTS, TEAMS } from '../data/championshipData';
import { TeamKey } from '../types';
import { Swords, Award, TrendingUp, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeadToHeadTakeawaysProps {
  opponent: Exclude<TeamKey, 'indiana'>;
}

export const HeadToHeadTakeaways: React.FC<HeadToHeadTakeawaysProps> = ({ opponent }) => {
  const h2h = HEAD_TO_HEAD_INSIGHTS[opponent];
  const oppData = TEAMS[opponent];
  const iu = TEAMS.indiana;

  if (!h2h) return null;

  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header with matchup pill and primary takeaway */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-950 border border-red-900/60 flex items-center justify-center flex-shrink-0">
            <Swords className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-red-400">
                Direct Head-to-Head Evaluation
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                IU 2025 vs. {oppData.name}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight mt-0.5">
              Primary Takeaway: <span className="text-zinc-200 italic font-medium">"{h2h.primaryTakeaway}"</span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
          <span className="text-xs font-bold text-red-400">IU '25</span>
          <span className="text-xs text-zinc-600 font-mono">vs</span>
          <span className="text-xs font-bold text-zinc-300">{oppData.name.split(' ')[0]} '{oppData.year.toString().slice(2)}</span>
        </div>
      </div>

      {/* 3 Key Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {h2h.insights.map((insight, idx) => (
          <div
            key={idx}
            className="bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl p-4 flex flex-col justify-between transition space-y-2.5"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                  {insight.title}
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {insight.text}
              </p>
            </div>

            {insight.metric && (
              <div className="pt-2 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold">Key Metric</span>
                <span className="text-[11px] font-mono font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900/40">
                  {insight.metric}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
