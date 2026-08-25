import React from 'react';
import { Download, RotateCcw } from 'lucide-react';

interface SystemSettingsTabProps {
  onExportJSON: () => void;
  onResetDatabase: () => void;
}

export const SystemSettingsTab: React.FC<SystemSettingsTabProps> = ({
  onExportJSON,
  onResetDatabase
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>Platform Operations & Maintenance</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>Export data backups, reset mock database, or adjust system operating parameters.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '28px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Download size={18} style={{ color: 'var(--accent-gold)' }} /> Export System Snapshot
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Download a complete JSON file containing all active properties, advising consultants, testimonials, and blog articles state.
          </p>
          <button 
            onClick={onExportJSON}
            className="luxury-gold-button shine-hover"
            style={{ marginTop: 'auto', padding: '12px 20px', fontSize: '0.85rem', width: 'fit-content' }}
          >
            Download JSON Backup (.json)
          </button>
        </div>

        <div className="glass-panel" style={{ padding: '28px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', color: '#EF4444' }}>
            <RotateCcw size={18} /> Reset Database State
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Reset all property listings, agents, testimonials, and journals back to their original default seed data.
          </p>
          <button 
            onClick={onResetDatabase}
            style={{
              marginTop: 'auto',
              padding: '12px 20px',
              fontSize: '0.85rem',
              borderRadius: '8px',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#EF4444',
              fontWeight: 600,
              cursor: 'pointer',
              width: 'fit-content'
            }}
          >
            Restore Default Seed Data
          </button>
        </div>
      </div>
    </div>
  );
};