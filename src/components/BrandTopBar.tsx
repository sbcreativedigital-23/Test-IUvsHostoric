import React from 'react';
import { ExternalLink } from 'lucide-react';

export const BrandTopBar: React.FC = () => {
  return (
    <div
      id="brand-top-bar"
      className="w-full bg-black text-white border-b border-zinc-800/80 px-4 sm:px-6 py-2.5 flex items-center justify-between z-50 relative shadow-md"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Brand Logo matching 1B.png */}
        <a
          href="https://creativetech.studio/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group focus:outline-none"
          title="Visit creativetech.studio"
        >
          {/* Typographic Logo precisely styled after 1B.png */}
          <div className="flex flex-col leading-none">
            <span className="font-extrabold tracking-tight text-lg sm:text-xl text-white font-sans flex items-baseline">
              <span>creative</span>
              <span className="font-black text-zinc-100">tech</span>
            </span>
            <span className="font-bold tracking-widest text-[11px] sm:text-xs text-zinc-300 font-sans -mt-0.5">
              .studio
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-zinc-800">
            <span className="w-1.5 h-1.5 rounded-full bg-[#990000]"></span>
            <span className="text-[11px] text-zinc-400 font-medium tracking-wide">
              Official Architecture & Analytics
            </span>
          </div>
        </a>

        {/* Link back to brand website */}
        <div className="flex items-center gap-3">
          <a
            href="https://creativetech.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3 py-1 rounded-lg transition flex items-center gap-1.5"
          >
            <span>creativetech.studio</span>
            <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-white" />
          </a>
        </div>
      </div>
    </div>
  );
};
