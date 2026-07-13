import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot } from 'lucide-react';
import type { Property } from '../data';

interface ChatbotProps {
  onTriggerFilter: (key: string, value: any) => void;
  properties?: Property[];
  t?: (key: string) => string;
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onTriggerFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Greetings, I am your AURA Digital Concierge. How may I assist you with your luxury real estate acquisitions today?'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add User Message
    const userMsg: Message = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Bot response
    setTimeout(() => {
      let botText = '';
      const cleanText = text.toLowerCase();

      if (cleanText.includes('malibu') || cleanText.includes('cliff') || cleanText.includes('nirvana')) {
        botText = 'I have identified Nirvana Cliffside Sanctuary on Carbon Beach, Malibu. It features 5 beds, 6 baths, private beach access, and has been marked at a special valuation of $22.8M. I have updated your search filter to focus on Malibu estates.';
        onTriggerFilter('city', 'Malibu');
      } else if (cleanText.includes('bel air') || cleanText.includes('obsidian') || cleanText.includes('angeles') || cleanText.includes('la')) {
        botText = 'Our signature listing in Los Angeles is The Obsidian Glass Oasis in Bel Air, featuring a 150-ft infinity pool and private cinema. I have filtered our database for Los Angeles properties.';
        onTriggerFilter('city', 'Los Angeles');
      } else if (cleanText.includes('calculator') || cleanText.includes('interest') || cleanText.includes('mortgage')) {
        botText = 'Every asset details panel features a live mortgage calculator. Adjust the down payment and amortization term to view automated principal & interest schedules.';
      } else if (cleanText.includes('sophia') || cleanText.includes('agent') || cleanText.includes('advisor')) {
        botText = 'Sophia Sterling manages our Star Island and Malibu holdings. She is available at sophia@auraestates.com. You can also schedule direct consultations in the Advisors section.';
      } else {
        botText = 'I am scanning our off-market properties database. Could you specify your preferred city (Los Angeles, Miami, New York, Tokyo) or listing type (Mansion, Penthouse, Villa)?';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botText }]);
    }, 800);
  };

  return (
    <>
      {/* Trigger Bubble */}
      <div className="chatbot-bubble animate-float" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </div>

      {/* Dialog Window */}
      {isOpen && (
        <div className="chatbot-window glass-panel" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-light)' }}>
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={20} style={{ color: 'var(--accent-gold)' }} />
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>AURA Concierge</h4>
                <p style={{ fontSize: '0.65rem', color: 'var(--accent-gold)' }}>AI Digital Butler</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer', display: 'flex' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '8px', alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end', flexDirection: msg.sender === 'bot' ? 'row' : 'row-reverse', maxWidth: '85%' }}>
                <div style={{
                  background: msg.sender === 'bot' ? 'var(--bg-tertiary)' : 'var(--accent-gold)',
                  color: msg.sender === 'bot' ? 'var(--text-primary)' : '#000000',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  fontSize: '0.85rem'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div style={{ display: 'flex', gap: '6px', padding: '10px 16px', background: 'var(--bg-secondary)', overflowX: 'auto', borderTop: '1px solid var(--border-light)' }}>
            <button 
              onClick={() => handleSendMessage('Show Malibu properties')}
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-light)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', whiteSpace: 'nowrap', cursor: 'pointer' }}
            >
              Malibu Villas
            </button>
            <button 
              onClick={() => handleSendMessage('Contact Sophia Sterling')}
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-light)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', whiteSpace: 'nowrap', cursor: 'pointer' }}
            >
              Sophia Sterling
            </button>
            <button 
              onClick={() => handleSendMessage('Mortgage help')}
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-light)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', whiteSpace: 'nowrap', cursor: 'pointer' }}
            >
              Mortgage Info
            </button>
          </div>

          {/* Input Panel */}
          <div className="chat-input-row">
            <input 
              type="text" 
              className="glass-input" 
              style={{ flexGrow: 1, padding: '8px 12px', fontSize: '0.85rem' }}
              placeholder="Ask AURA concierge..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage(inputText);
              }}
            />
            <button 
              onClick={() => handleSendMessage(inputText)}
              className="luxury-gold-button"
              style={{ padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'none' }}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
