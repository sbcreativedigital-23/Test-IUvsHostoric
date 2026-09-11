import React, { useState, useMemo } from 'react';
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES } from '../data/glossaryData';
import { GlossaryCategory, GlossaryTerm } from '../types';
import {
  BookOpen,
  Search,
  Zap,
  DollarSign,
  Trophy,
  Activity,
  Layers,
  HelpCircle,
  TrendingUp,
  X,
  ExternalLink,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface GlossaryViewProps {
  onSelectTerm?: (termId: string) => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ isModal = false, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory>('all');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  // Filtered terms based on search query and category
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        item.term.toLowerCase().includes(q) ||
        (item.acronym && item.acronym.toLowerCase().includes(q)) ||
        item.definition.toLowerCase().includes(q) ||
        item.whyItMatters.toLowerCase().includes(q) ||
        item.indianaContext.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'efficiency':
        return <Zap className="w-3.5 h-3.5 text-emerald-400" />;
      case 'scoring':
        return <Activity className="w-3.5 h-3.5 text-red-400" />;
      case 'market':
        return <DollarSign className="w-3.5 h-3.5 text-amber-400" />;
      case 'resume':
        return <Trophy className="w-3.5 h-3.5 text-blue-400" />;
      case 'tactics':
        return <Layers className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <BookOpen className="w-3.5 h-3.5 text-zinc-400" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'efficiency':
        return 'bg-emerald-950/70 text-emerald-300 border-emerald-800/60';
      case 'scoring':
        return 'bg-red-950/70 text-red-300 border-red-800/60';
      case 'market':
        return 'bg-amber-950/70 text-amber-300 border-amber-800/60';
      case 'resume':
        return 'bg-blue-950/70 text-blue-300 border-blue-800/60';
      case 'tactics':
        return 'bg-purple-950/70 text-purple-300 border-purple-800/60';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-red-900/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-red-400 bg-red-950/80 px-2.5 py-0.5 rounded-full border border-red-800/60 flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-red-400" />
                Analytical Lexicon
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                {GLOSSARY_TERMS.length} Defined Terms
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Glossary of Analytical & Championship Terms
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Clear mathematical definitions, football context, and empirical benchmarks for advanced metrics (EPA, Success Rates, Z-Scores), betting efficiency (ATS, Cover Margin), and tactical concepts used throughout this intelligence studio.
            </p>
          </div>

          {/* Close button if rendered as a modal */}
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="self-start md:self-center p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition cursor-pointer border border-zinc-700"
              aria-label="Close glossary"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="mt-5 relative max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search metric name, acronym (e.g. EPA, ATS, PAPG, Z-Score), or keyword..."
            className="w-full bg-zinc-950/90 border border-zinc-700/80 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
        {GLOSSARY_CATEGORIES.map((cat) => {
          const active = activeCategory === cat.id;
          const count =
            cat.id === 'all'
              ? GLOSSARY_TERMS.length
              : GLOSSARY_TERMS.filter((t) => t.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer border ${
                active
                  ? 'bg-red-950 text-white border-red-800 shadow-sm'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {cat.id !== 'all' && getCategoryIcon(cat.id)}
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  active ? 'bg-red-800 text-red-100' : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Terms Grid */}
      {filteredTerms.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold text-zinc-300">No terms matching "{searchQuery}"</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try searching for common metrics like EPA, ATS, PAPG, Success Rate, or reset your search.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="mt-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {filteredTerms.map((item) => (
            <div
              key={item.id}
              id={`term-${item.id}`}
              className="bg-zinc-900/90 border border-zinc-800/90 hover:border-zinc-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition space-y-4"
            >
              {/* Card Header */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                      {item.term}
                    </h3>
                    {item.acronym && (
                      <span className="font-mono text-xs font-extrabold text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                        {item.acronym}
                      </span>
                    )}
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border flex items-center gap-1 whitespace-nowrap flex-shrink-0 ${getCategoryBadgeClass(
                      item.category
                    )}`}
                  >
                    {getCategoryIcon(item.category)}
                    {item.category}
                  </span>
                </div>

                {/* Optional Mathematical Formula */}
                {item.formula && (
                  <div className="bg-zinc-950 border border-zinc-800/80 rounded-lg px-3 py-1.5 font-mono text-[11px] text-zinc-400 flex items-center gap-2 shadow-inner">
                    <span className="text-[10px] uppercase font-bold text-zinc-600">Formula:</span>
                    <span className="text-zinc-200 font-semibold">{item.formula}</span>
                  </div>
                )}

                {/* Definition */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1">
                  {item.definition}
                </p>
              </div>

              {/* Analytical Significance & Real-World Indiana Benchmark */}
              <div className="space-y-2.5 pt-2 border-t border-zinc-800/80">
                {/* Why It Matters */}
                <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/60 space-y-1">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-3 h-3 text-amber-400" />
                    Why It Matters
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {item.whyItMatters}
                  </p>
                </div>

                {/* Indiana 2025 Value */}
                <div className="bg-gradient-to-r from-red-950/40 via-red-950/20 to-transparent p-3 rounded-xl border border-red-900/40 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Flame className="w-3 h-3 text-red-500 fill-red-500" />
                      Indiana 2025 Context
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                      16-0 Title Season
                    </span>
                  </div>
                  <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                    {item.indianaContext}
                  </p>
                </div>

                {/* Benchmark Context if available */}
                {item.benchmarkContext && (
                  <div className="text-[11px] text-zinc-400 flex items-start gap-1.5 px-1">
                    <span className="font-semibold text-zinc-500 uppercase text-[10px] flex-shrink-0 mt-0.5">
                      Benchmark:
                    </span>
                    <span className="leading-snug">{item.benchmarkContext}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
