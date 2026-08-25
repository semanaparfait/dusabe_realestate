import React from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import { type Agent } from '@/data';

interface AgentsTabProps {
  agents: Agent[];
  onOpenNewAgent: () => void;
  onOpenEditAgent: (agent: Agent) => void;
  onDeleteAgent: (id: string, name: string) => void;
}

export const AgentsTab: React.FC<AgentsTabProps> = ({
  agents,
  onOpenNewAgent,
  onOpenEditAgent,
  onDeleteAgent
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>Advising Group & Consultants</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>Manage private wealth consultants, experience tags, and contact protocols.</p>
        </div>

        <button 
          onClick={onOpenNewAgent}
          className="luxury-gold-button shine-hover"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.85rem' }}
        >
          <Plus size={16} /> Register New Advisor
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {agents.map(agent => (
          <div key={agent.id} className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <img src={agent.image} alt={agent.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-gold)' }} />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{agent.name}</h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 600 }}>{agent.role}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>{agent.experience} Experience • Rating {agent.rating.toFixed(1)} ★</div>
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              {agent.bio}
            </p>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', borderTop: '1px solid var(--border-light)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>Email: {agent.email}</div>
              <div>WhatsApp: {agent.whatsapp}</div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <button 
                onClick={() => onOpenEditAgent(agent)}
                style={{ flex: 1, padding: '8px', borderRadius: '8px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Edit3 size={14} /> Edit Details
              </button>
              <button 
                onClick={() => onDeleteAgent(agent.id, agent.name)}
                style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#EF4444', cursor: 'pointer' }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};