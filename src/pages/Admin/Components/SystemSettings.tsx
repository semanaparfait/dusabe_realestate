import React from 'react';
import { Download, RotateCcw } from 'lucide-react';

interface SystemSettingsTabProps {
  onExportJSON: () => void;
  onResetDatabase: () => void;
}

const downloadBackupBtnClass = "relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black font-heading font-semibold border-none rounded-lg cursor-pointer shadow-[var(--glow-shadow)] [transition:transform_var(--transition-fast),box-shadow_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 after:content-[''] after:absolute after:top-0 after:-left-3/4 after:w-1/2 after:h-full after:[background:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_100%)] after:[transform:skewX(-25deg)] after:[transition:0.75s] hover:after:[animation:shine_0.85s] mt-auto px-5 py-3 text-[0.85rem] w-fit";

export const SystemSettingsTab: React.FC<SystemSettingsTabProps> = ({
  onExportJSON,
  onResetDatabase
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[1.5rem] sm:text-[1.8rem] font-heading font-bold">Platform Operations & Maintenance</h1>
        <p className="text-[0.85rem] text-text-tertiary mt-1">Export data backups, reset mock database, or adjust system operating parameters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border-light bg-bg-secondary p-7 flex flex-col gap-4 [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] shadow-[var(--glass-shadow)]">
          <h3 className="text-[1.1rem] font-bold flex items-center gap-2.5">
            <Download size={18} className="text-accent-gold" /> Export System Snapshot
          </h3>
          <p className="text-[0.85rem] text-text-secondary leading-[1.5]">
            Download a complete JSON file containing all active properties, advising consultants, testimonials, and blog articles state.
          </p>
          <button
            onClick={onExportJSON}
            className={downloadBackupBtnClass}
          >
            Download JSON Backup (.json)
          </button>
        </div>

        <div className="rounded-2xl border border-border-light bg-bg-secondary p-7 flex flex-col gap-4 [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] shadow-[var(--glass-shadow)]">
          <h3 className="text-[1.1rem] font-bold flex items-center gap-2.5 text-red-500">
            <RotateCcw size={18} /> Reset Database State
          </h3>
          <p className="text-[0.85rem] text-text-secondary leading-[1.5]">
            Reset all property listings, agents, testimonials, and journals back to their original default seed data.
          </p>
          <button
            onClick={onResetDatabase}
            className="mt-auto px-5 py-3 text-[0.85rem] rounded-lg border border-red-500/40 bg-red-500/15 text-red-500 font-semibold cursor-pointer w-fit"
          >
            Restore Default Seed Data
          </button>
        </div>
      </div>
    </div>
  );
};