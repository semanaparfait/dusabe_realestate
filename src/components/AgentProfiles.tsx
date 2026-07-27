import React, { useState } from 'react';
import { MessageSquare, Mail, Calendar, Star, Sparkles, Check, X } from 'lucide-react';
import { AGENTS, type Agent } from '../data';

interface AgentProfilesProps {
  agents?: Agent[];
}

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
    <section id="agents" className="container hidden">
      <div className="section-header">
        <span className="section-subtitle">Our Team</span>
        <h2 className="section-title">Meet Our Expert Real Estate Agents</h2>
        <p className="section-desc">
          Our friendly professional agents are here to help you buy, sell, or rent your ideal property.
        </p>
      </div>

      <div className="agent-grid">
        {agentList.map((agent) => (
          <div key={agent.id} className="agent-card glass-panel" style={{ border: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
            <img src={agent.image} alt={agent.name} className="agent-photo" />
            <div className="agent-info">
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold-dark)', fontWeight: 'bold' }}>
                {agent.role}
              </span>
              <h3 style={{ fontSize: '1.4rem', margin: '8px 0 4px' }}>{agent.name}</h3>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={14} fill="var(--accent-gold)" stroke="var(--accent-gold)" /> 
                  <span className="luxury-number" style={{ fontWeight: 'bold' }}>{agent.rating.toFixed(1)}</span>
                </span>
                <span>•</span>
                <span>{agent.experience} Experience</span>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', minHeight: '60px', marginBottom: '20px' }}>
                {agent.bio}
              </p>

              {/* Action Rows */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <a 
                  href={`https://wa.me/${agent.whatsapp}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="luxury-gold-button"
                  style={{ flex: 1, padding: '10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#25D366', color: '#FFF', boxShadow: 'none' }}
                >
                  <MessageSquare size={14} /> WhatsApp
                </a>
                <a 
                  href={`mailto:${agent.email}`}
                  className="outline-luxury-button"
                  style={{ flex: 1, padding: '10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Mail size={14} /> Email
                </a>
              </div>

              <button 
                onClick={() => setSelectedAgent(agent)}
                className="outline-luxury-button" 
                style={{ width: '100%', padding: '10px', fontSize: '0.8rem', borderColor: 'var(--accent-gold-dark)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Calendar size={14} /> Schedule Briefing
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Appointment Scheduler Dialog */}
      {selectedAgent && (
        <div className="compare-modal-backdrop" onClick={() => setSelectedAgent(null)}>
          <div 
            className="glass-panel" 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              width: '100%', 
              maxWidth: '500px', 
              padding: '40px', 
              borderRadius: '16px', 
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-light)',
              position: 'relative'
            }}
          >
            <button 
              onClick={() => setSelectedAgent(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} style={{ color: 'var(--accent-gold)' }} />
              VIP Briefing Request
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              You are requesting a private meeting with <strong>{selectedAgent.name}</strong>.
            </p>

            {successMsg ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '16px', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Check size={18} style={{ flexShrink: 0 }} />
                <span>{successMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Briefing Date</label>
                  <input 
                    type="date" 
                    required 
                    className="glass-input"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Special Directives / Portfolio Goals</label>
                  <textarea 
                    rows={4}
                    className="glass-input" 
                    placeholder="E.g. Discretion requirements, trust entity purchases, specific location mandates..."
                    value={appointmentMsg}
                    onChange={(e) => setAppointmentMsg(e.target.value)}
                  />
                </div>

                <button type="submit" className="luxury-gold-button shine-hover">
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
