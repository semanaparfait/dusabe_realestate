import React from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import { type Agent } from '@/data';

interface AgentsTabProps {
  agents: Agent[];
  onOpenNewAgent: () => void;
  onOpenEditAgent: (agent: Agent) => void;
  onDeleteAgent: (id: string, name: string) => void;
}

const newAdvisorBtnClass = "relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black font-heading font-semibold border-none rounded-lg cursor-pointer shadow-[var(--glow-shadow)] [transition:transform_var(--transition-fast),box-shadow_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 after:content-[''] after:absolute after:top-0 after:-left-3/4 after:w-1/2 after:h-full after:[background:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_100%)] after:[transform:skewX(-25deg)] after:[transition:0.75s] hover:after:[animation:shine_0.85s] flex items-center gap-2 px-6 py-3 text-[0.85rem]";

export const AgentsTab: React.FC<AgentsTabProps> = ({
  agents,
  onOpenNewAgent,
  onOpenEditAgent,
  onDeleteAgent
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[1.8rem] font-heading font-bold">Advising Group & Consultants</h1>
          <p className="text-[0.85rem] text-text-tertiary mt-1">Manage private wealth consultants, experience tags, and contact protocols.</p>
        </div>

        <button
          onClick={onOpenNewAgent}
          className={newAdvisorBtnClass}
        >
          <Plus size={16} /> Register New Advisor
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {agents.map(agent => (
          <div key={agent.id} className="rounded-2xl border border-border-light bg-bg-secondary p-6 flex flex-col gap-4 [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] shadow-[var(--glass-shadow)]">
            <div className="flex gap-4 items-center">
              <img src={agent.image} alt={agent.name} className="w-16 h-16 rounded-full object-cover border-2 border-accent-gold" />
              <div>
                <h3 className="text-[1.1rem] font-bold">{agent.name}</h3>
                <div className="text-[0.75rem] text-accent-gold font-semibold">{agent.role}</div>
                <div className="text-[0.75rem] text-text-tertiary mt-0.5">{agent.experience} Experience • Rating {agent.rating.toFixed(1)} ★</div>
              </div>
            </div>

            <p className="text-[0.8rem] text-text-secondary leading-[1.4]">
              {agent.bio}
            </p>

            <div className="text-[0.75rem] text-text-tertiary border-t border-border-light pt-3 flex flex-col gap-1">
              <div>Email: {agent.email}</div>
              <div>WhatsApp: {agent.whatsapp}</div>
            </div>

            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => onOpenEditAgent(agent)}
                className="flex-1 p-2 rounded-lg bg-bg-tertiary border border-border-light text-text-primary text-[0.8rem] cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Edit3 size={14} /> Edit Details
              </button>
              <button
                onClick={() => onDeleteAgent(agent.id, agent.name)}
                className="py-2 px-3 rounded-lg bg-red-500/15 border-none text-red-500 cursor-pointer"
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