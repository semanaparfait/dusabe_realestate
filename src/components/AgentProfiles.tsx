import React, { useState } from 'react';
import { MessageSquare, Mail, Calendar, Star, Sparkles, Check, X } from 'lucide-react';
import { AGENTS, type Agent } from '../data';

interface AgentProfilesProps {
  agents?: Agent[];
}

const glassInputClass = "bg-white/[0.08] border border-white/15 [[data-theme=dark]_&]:bg-[rgba(15,23,42,0.4)] [[data-theme=dark]_&]:border-white/8 rounded-lg text-text-primary py-3 px-4 outline-none font-sans [transition:all_var(--transition-fast)] focus:border-accent-gold focus:bg-white/15 focus:shadow-[0_0_10px_rgba(245,158,11,0.15)]";
const luxuryGoldBtnClass = "relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black font-heading font-semibold border-none rounded-lg px-7 py-3 cursor-pointer shadow-[var(--glow-shadow)] [transition:transform_var(--transition-fast),box-shadow_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0";
const shineHoverClass = "after:content-[''] after:absolute after:top-0 after:-left-3/4 after:w-1/2 after:h-full after:[background:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_100%)] after:[transform:skewX(-25deg)] after:[transition:0.75s] hover:after:[animation:shine_0.85s]";
const outlineLuxuryBtnClass = "bg-transparent text-text-primary font-heading font-medium border-[1.5px] border-text-primary rounded-lg cursor-pointer [transition:background_var(--transition-fast),color_var(--transition-fast)] hover:bg-text-primary hover:text-bg-primary";

export const AgentProfiles: React.FC<AgentProfilesProps> = ({ agents }) => {
  const agentList = agents && agents.length > 0 ? agents : AGENTS;
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentMsg, setAppointmentMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAgent || !appointmentDate) return;

    setSuccessMsg(`VIP consultation scheduled with ${selectedAgent.name} for ${appointmentDate}. A security dispatch confirmation has been routed to your inbox.`);
    setTimeout(() => {
      setSuccessMsg('');
      setSelectedAgent(null);
      setAppointmentDate('');
      setAppointmentMsg('');
    }, 5000);
  };

  return (
    <section id="agents" className="hidden relative w-full max-w-[1400px] mx-auto px-6">
      <div className="text-center mb-[60px]">
        <span className="font-heading uppercase tracking-[0.25em] text-[0.85rem] text-accent-gold font-semibold">Our Team</span>
        <h2 className="text-[2.5rem] mb-4">Meet Our Expert Real Estate Agents</h2>
        <p className="max-w-[600px] mx-auto text-base">
          Our friendly professional agents are here to help you buy, sell, or rent your ideal property.
        </p>
      </div>

      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-[30px]">
        {agentList.map((agent) => (
          <div key={agent.id} className="rounded-2xl overflow-hidden shadow-card text-center border border-border-light bg-bg-secondary">
            <img src={agent.image} alt={agent.name} className="w-full h-[320px] object-cover" />
            <div className="p-6">
              <span className="text-[0.75rem] uppercase tracking-[0.1em] text-accent-gold-dark font-bold">
                {agent.role}
              </span>
              <h3 className="text-[1.4rem] my-2 mb-1">{agent.name}</h3>

              <div className="flex justify-center gap-4 text-[0.85rem] text-text-secondary mb-4">
                <span className="flex items-center gap-1">
                  <Star size={14} fill="var(--accent-gold)" stroke="var(--accent-gold)" />
                  <span className="font-serif italic text-accent-gold font-bold">{agent.rating.toFixed(1)}</span>
                </span>
                <span>•</span>
                <span>{agent.experience} Experience</span>
              </div>

              <p className="text-[0.85rem] text-text-secondary min-h-[60px] mb-5">
                {agent.bio}
              </p>

              {/* Action Rows */}
              <div className="flex gap-2 mb-3">
                <a
                  href={`https://wa.me/${agent.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 text-[0.8rem] flex items-center justify-center gap-1.5 bg-[#25D366] text-white shadow-none font-heading font-semibold rounded-lg cursor-pointer [transition:transform_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
                >
                  <MessageSquare size={14} /> WhatsApp
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className={`${outlineLuxuryBtnClass} flex-1 py-2.5 px-4 text-[0.8rem] flex items-center justify-center gap-1.5`}
                >
                  <Mail size={14} /> Email
                </a>
              </div>

              <button
                onClick={() => setSelectedAgent(agent)}
                className={`${outlineLuxuryBtnClass} w-full py-2.5 px-4 text-[0.8rem] border-accent-gold-dark text-text-primary flex items-center justify-center gap-1.5`}
              >
                <Calendar size={14} /> Schedule Briefing
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Appointment Scheduler Dialog */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-[rgba(9,13,22,0.9)] backdrop-blur-[8px] z-[2200] flex justify-center items-center p-10" onClick={() => setSelectedAgent(null)}>
          <div
            className="relative w-full max-w-[500px] p-10 rounded-2xl bg-bg-primary border border-border-light"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAgent(null)}
              className="absolute top-5 right-5 bg-transparent border-none text-text-primary cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-[1.5rem] mb-2 flex items-center gap-2">
              <Sparkles size={20} className="text-accent-gold" />
              VIP Briefing Request
            </h3>
            <p className="text-[0.85rem] text-text-secondary mb-6">
              You are requesting a private meeting with <strong>{selectedAgent.name}</strong>.
            </p>

            {successMsg ? (
              <div className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 p-4 rounded-lg text-[0.85rem] flex items-start gap-2">
                <Check size={18} className="shrink-0" />
                <span>{successMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.75rem] font-semibold uppercase text-text-secondary">Briefing Date</label>
                  <input
                    type="date"
                    required
                    className={glassInputClass}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.75rem] font-semibold uppercase text-text-secondary">Special Directives / Portfolio Goals</label>
                  <textarea
                    rows={4}
                    className={glassInputClass}
                    placeholder="E.g. Discretion requirements, trust entity purchases, specific location mandates..."
                    value={appointmentMsg}
                    onChange={(e) => setAppointmentMsg(e.target.value)}
                  />
                </div>

                <button type="submit" className={`${luxuryGoldBtnClass} ${shineHoverClass}`}>
                  Confirm Briefing Slot
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
