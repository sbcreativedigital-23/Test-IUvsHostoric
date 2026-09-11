import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Chart } from 'chart.js';
import { MASTER_ROWS } from '../data/championshipData';
import { MetricCategory, MasterRow } from '../types';
import { ensureChartRegistered, safeCreateChart } from '../utils/chartSetup';
import { generateMasterReportPDF } from '../utils/pdfExport';
import { TableProperties, Search, Download, Copy, Check, FileText, ChevronDown } from 'lucide-react';
import { KeyTakeaways } from './KeyTakeaways';

export const MasterRepository: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MetricCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState<boolean>(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const repoBarCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const repoMarketCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const downloadMenuRef = useRef<HTMLDivElement | null>(null);

  const repoBarChartInstanceRef = useRef<Chart | null>(null);
  const repoMarketChartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    ensureChartRegistered();
  }, []);

  // Close download dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target as Node)) {
        setShowDownloadMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter rows
  const filteredRows = useMemo(() => {
    return MASTER_ROWS.filter((row) => {
      const matchCat = activeCategory === 'all' || row.category === activeCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        row.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (row.description && row.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Handle Export PDF
  const handleExportPDF = () => {
    try {
      generateMasterReportPDF({
        rows: filteredRows,
        activeCategory,
        searchQuery
      });
      setShowDownloadMenu(false);
      setDownloadSuccessMessage('PDF Report generated successfully!');
      setTimeout(() => setDownloadSuccessMessage(null), 3500);
    } catch (err) {
      console.error('Error generating PDF:', err);
    }
  };

  // Handle Export CSV
  const handleExportCSV = () => {
    const headers = ['Metric / Attribute', 'Indiana (2025)', 'Alabama (2020)', 'LSU (2019)', 'Georgia (2022)', 'Michigan (2023)', 'Description'];
    const csvLines = [
      headers.join(','),
      ...filteredRows.map(r => `"${r.label}","${r.iu}","${r.ala}","${r.lsu}","${r.uga}","${r.um}","${r.description || ''}"`)
    ];
    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const catSlug = activeCategory === 'all' ? 'complete' : activeCategory;
    link.setAttribute('download', `Indiana2025_MasterReport_${catSlug}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadMenu(false);
    setDownloadSuccessMessage('CSV Spreadsheet exported successfully!');
    setTimeout(() => setDownloadSuccessMessage(null), 3500);
  };

  // Handle Copy Summary
  const handleCopySummary = () => {
    const text = filteredRows
      .map(r => `${r.label} -> IU 2025: ${r.iu} | Ala 2020: ${r.ala} | LSU 2019: ${r.lsu} | UGA 2022: ${r.uga} | UM 2023: ${r.um}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render the two repository overview charts
  useEffect(() => {
    if (!repoBarCanvasRef.current || !repoMarketCanvasRef.current) return;

    if (repoBarChartInstanceRef.current) {
      repoBarChartInstanceRef.current.destroy();
      repoBarChartInstanceRef.current = null;
    }
    if (repoMarketChartInstanceRef.current) {
      repoMarketChartInstanceRef.current.destroy();
      repoMarketChartInstanceRef.current = null;
    }

    // Repo Bar Chart: PPG vs Scoring Margin
    repoBarChartInstanceRef.current = safeCreateChart(repoBarCanvasRef.current, {
      type: 'bar',
      data: {
        labels: ['Indiana (2025)', 'Alabama (2020)', 'LSU (2019)', 'Georgia (2022)', 'Michigan (2023)'],
        datasets: [
          {
            label: 'PPG',
            data: [41.6, 48.5, 48.4, 41.1, 35.9],
            backgroundColor: '#dc2626',
            borderRadius: 4,
            borderColor: '#ef4444',
            borderWidth: 1
          },
          {
            label: 'Scoring Margin',
            data: [29.9, 29.1, 26.5, 26.8, 25.5],
            backgroundColor: '#52525b',
            borderRadius: 4,
            borderColor: '#71717a',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#d4d4d8', font: { weight: 'bold' } }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: { color: '#a1a1aa' }
          }
        },
        plugins: {
          legend: {
            labels: { color: '#ffffff', font: { weight: 'bold' } }
          }
        }
      }
    });

    // Repo Market Chart: ATS Win Rate %
    repoMarketChartInstanceRef.current = safeCreateChart(repoMarketCanvasRef.current, {
      type: 'bar',
      data: {
        labels: ['Indiana (2025)', 'Alabama (2020)', 'Georgia (2022)', 'LSU (2019)', 'Michigan (2023)'],
        datasets: [
          {
            label: 'ATS Win Rate (%)',
            data: [75.0, 61.5, 60.0, 53.3, 53.3],
            backgroundColor: ['#dc2626', '#3f3f46', '#3f3f46', '#3f3f46', '#3f3f46'],
            borderRadius: 6,
            borderColor: ['#ef4444', '#52525b', '#52525b', '#52525b', '#52525b'],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#d4d4d8', font: { weight: 'bold' } }
          },
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: {
              color: '#a1a1aa',
              callback: (val) => `${val}%`
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `ATS Rate: ${ctx.raw}%`
            }
          }
        }
      }
    });

    return () => {
      if (repoBarChartInstanceRef.current) {
        repoBarChartInstanceRef.current.destroy();
        repoBarChartInstanceRef.current = null;
      }
      if (repoMarketChartInstanceRef.current) {
        repoMarketChartInstanceRef.current.destroy();
        repoMarketChartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-[#191919] border border-[#DCDDD9]/20 rounded-2xl p-6 shadow-2xl space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#DCDDD9]/15 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#990000] px-3 py-1 rounded-md border border-[#700000] inline-flex items-center gap-1.5 shadow-sm">
            <TableProperties className="w-3.5 h-3.5 text-white" />
            Official Intelligence Archive
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white font-serif tracking-tight mt-2">
            Master Statistical Repository
          </h2>
          <p className="text-xs sm:text-sm text-[#EEEDEB]/80 mt-1 max-w-2xl">
            Verified comparative matrix covering all five championship squads across regular season, conference championships, and postseason metrics.
          </p>
        </div>

        {/* Action Buttons with Download Report & Copy */}
        <div className="flex flex-wrap items-center gap-2 relative">
          {downloadSuccessMessage && (
            <div className="text-[11px] bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2.5 py-1 rounded-lg animate-fade-in flex items-center gap-1.5 font-medium">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>{downloadSuccessMessage}</span>
            </div>
          )}

          <button
            onClick={handleCopySummary}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-[#191919] hover:bg-zinc-800 text-[#EEEDEB] border border-[#DCDDD9]/30 transition flex items-center gap-1.5 cursor-pointer shadow"
            title="Copy formatted summary to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>

          {/* Download Report Button with Popover Dropdown */}
          <div className="relative" ref={downloadMenuRef}>
            <button
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#990000] hover:bg-[#700000] text-white transition flex items-center gap-2 cursor-pointer shadow-lg shadow-red-950/40 border border-[#700000]"
              title="Export report in PDF or CSV format"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span className="font-extrabold tracking-wide">Download Report</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showDownloadMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showDownloadMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-[#191919] border border-[#DCDDD9]/30 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-[#DCDDD9]/15 mb-1">
                  <p className="text-[11px] font-bold text-white font-serif uppercase tracking-wider">
                    Export Current View
                  </p>
                  <p className="text-[10px] text-[#EEEDEB]/70 mt-0.5">
                    {filteredRows.length} attributes matching current filters
                  </p>
                </div>

                <button
                  onClick={handleExportPDF}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-xs hover:bg-zinc-800 text-white flex items-start gap-2.5 transition group cursor-pointer"
                >
                  <div className="p-1.5 rounded-md bg-[#990000]/30 text-red-300 group-hover:bg-[#990000] group-hover:text-white transition">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold flex items-center gap-1.5">
                      <span>Executive PDF Report</span>
                      <span className="text-[9px] bg-[#990000] text-white px-1.5 py-0.2 rounded font-mono font-bold">
                        PDF
                      </span>
                    </div>
                    <p className="text-[10px] text-[#EEEDEB]/70 mt-0.5 leading-tight">
                      Landscape formatted dossier with tables, branding & metadata
                    </p>
                  </div>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-xs hover:bg-zinc-800 text-white flex items-start gap-2.5 transition group cursor-pointer"
                >
                  <div className="p-1.5 rounded-md bg-emerald-950/60 text-emerald-400 group-hover:bg-emerald-900 group-hover:text-white transition">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold flex items-center gap-1.5">
                      <span>Data Matrix Spreadsheet</span>
                      <span className="text-[9px] bg-zinc-800 text-zinc-300 px-1.5 py-0.2 rounded font-mono font-bold">
                        CSV
                      </span>
                    </div>
                    <p className="text-[10px] text-[#EEEDEB]/70 mt-0.5 leading-tight">
                      Raw data matrix compatible with Excel, Sheets & Python
                    </p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key Takeaways Section */}
      <KeyTakeaways
        title="Master Data Repository: Key Insights"
        subtitle="Granular attribute matrix and strength-of-record validation"
        accentColor="red"
        items={[
          {
            title: 'Granular Deep Dive',
            description: 'Provides a complete database across 70+ attributes covering scoring, play success rates, red-zone efficiency, turnover margins, and market edges.',
            badge: '70+ Attributes'
          },
          {
            title: 'Quality Competition Proof',
            description: "Confirms Indiana's dominance was sustained against quality opponents, maintaining a +24.1 point margin against teams with .500 or better records.",
            badge: '+24.1 vs .500+ Teams'
          },
          {
            title: 'Value-Game Outlier',
            description: 'Indiana achieved an 87.5% Value-Game Win Rate, demonstrating that they consistently beat market expectations more reliably than any of the four historical benchmark teams.',
            badge: '87.5% Value Rate (#1)'
          }
        ]}
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#990000] text-white shadow border border-[#700000]'
                : 'bg-[#191919] text-[#EEEDEB] hover:bg-zinc-800 border border-[#DCDDD9]/30'
            }`}
          >
            All Metrics ({MASTER_ROWS.length})
          </button>
          <button
            onClick={() => setActiveCategory('scoring')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeCategory === 'scoring'
                ? 'bg-[#990000] text-white shadow border border-[#700000]'
                : 'bg-[#191919] text-[#EEEDEB] hover:bg-zinc-800 border border-[#DCDDD9]/30'
            }`}
          >
            Scoring & Record
          </button>
          <button
            onClick={() => setActiveCategory('efficiency')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeCategory === 'efficiency'
                ? 'bg-[#990000] text-white shadow border border-[#700000]'
                : 'bg-[#191919] text-[#EEEDEB] hover:bg-zinc-800 border border-[#DCDDD9]/30'
            }`}
          >
            EPA & Efficiency
          </button>
          <button
            onClick={() => setActiveCategory('market')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeCategory === 'market'
                ? 'bg-[#990000] text-white shadow border border-[#700000]'
                : 'bg-[#191919] text-[#EEEDEB] hover:bg-zinc-800 border border-[#DCDDD9]/30'
            }`}
          >
            Market & ATS
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#DCDDD9] absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search metrics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-black border border-[#DCDDD9]/30 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#990000] transition"
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto rounded-xl border border-[#DCDDD9]/20 custom-scrollbar">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#DCDDD9]/20 text-[#EEEDEB]/80 bg-black uppercase tracking-wider font-semibold font-serif">
              <th className="p-3.5 sticky left-0 bg-black z-10">Metric / Attribute</th>
              <th className="p-3.5 text-white font-bold bg-[#990000]/25 text-center border-l border-r border-[#990000]/50">
                Indiana (2025)
              </th>
              <th className="p-3.5 text-center">Alabama (2020)</th>
              <th className="p-3.5 text-center">LSU (2019)</th>
              <th className="p-3.5 text-center">Georgia (2022)</th>
              <th className="p-3.5 text-center">Michigan (2023)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCDDD9]/10 text-zinc-200">
            {filteredRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-zinc-800/50 transition group">
                <td className="p-3.5 font-semibold text-zinc-200 sticky left-0 bg-[#191919] border-r border-[#DCDDD9]/20 group-hover:bg-zinc-850">
                  <div className="flex flex-col">
                    <span className="font-bold text-white">{row.label}</span>
                    {row.description && (
                      <span className="text-[10px] text-[#EEEDEB]/60 font-normal mt-0.5 max-w-sm whitespace-normal">
                        {row.description}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-3.5 font-bold text-white bg-[#990000]/20 text-center border-l border-r border-[#990000]/50 font-mono text-sm">
                  {row.iu}
                </td>
                <td className="p-3.5 text-zinc-300 text-center font-mono">{row.ala}</td>
                <td className="p-3.5 text-zinc-300 text-center font-mono">{row.lsu}</td>
                <td className="p-3.5 text-zinc-300 text-center font-mono">{row.uga}</td>
                <td className="p-3.5 text-zinc-300 text-center font-mono">{row.um}</td>
              </tr>
            ))}
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-zinc-500">
                  No matching metrics found for "{searchQuery}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CHARTS AND VISUALS UNDER THE TABLES IN THE MASTER DATA REPOSITORY SECTION */}
      <div className="pt-6 border-t border-zinc-800 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 flex flex-col" style={{ minHeight: '340px' }}>
          <div className="mb-2">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
              Repository Overview: Scoring & Margin Distribution
            </h3>
            <p className="text-[11px] text-zinc-500">
              Comparing offensive output vs. defensive suppression across all squads.
            </p>
          </div>
          <div className="flex-1 relative" style={{ minHeight: '250px' }}>
            <canvas ref={repoBarCanvasRef}></canvas>
          </div>
        </div>

        <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 flex flex-col" style={{ minHeight: '340px' }}>
          <div className="mb-2">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
              Repository Overview: Betting Market Performance
            </h3>
            <p className="text-[11px] text-zinc-500">
              ATS win rate % comparison highlighting Indiana's cover performance.
            </p>
          </div>
          <div className="flex-1 relative" style={{ minHeight: '250px' }}>
            <canvas ref={repoMarketCanvasRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};
