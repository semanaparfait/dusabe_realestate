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

const suggestionChipClass = "bg-bg-primary border border-border-light text-text-secondary py-1 px-2.5 rounded-[20px] text-[0.75rem] whitespace-nowrap cursor-pointer";

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
      <div
        className="fixed bottom-[30px] right-[30px] bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black w-[60px] h-[60px] rounded-full flex items-center justify-center cursor-pointer shadow-[0_10px_30px_rgba(245,158,11,0.4)] z-[1000] [transition:transform_var(--transition-fast)] hover:scale-110 [animation:float_6s_ease-in-out_infinite]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </div>

      {/* Dialog Window */}
      {isOpen && (
        <div className="fixed bottom-[100px] right-[30px] w-[380px] h-[500px] rounded-2xl overflow-hidden z-[1001] flex flex-col shadow-[0_15px_40px_rgba(0,0,0,0.2)] [animation:slide-up_var(--transition-normal)] bg-bg-primary border border-border-light">
          <div className="bg-primary text-white py-4 px-5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-accent-gold" />
              <div>
                <h4 className="text-[0.9rem] font-bold">AURA Concierge</h4>
                <p className="text-[0.65rem] text-accent-gold">AI Digital Butler</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-transparent border-none text-white cursor-pointer flex"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="grow p-5 overflow-y-auto flex flex-col gap-3 bg-bg-primary">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-2 max-w-[85%] ${msg.sender === 'bot' ? 'self-start flex-row' : 'self-end flex-row-reverse'}`}>
                <div className={`py-2.5 px-3.5 rounded-xl text-[0.85rem] ${msg.sender === 'bot' ? 'bg-bg-tertiary text-text-primary' : 'bg-accent-gold text-black'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="flex gap-1.5 py-2.5 px-4 bg-bg-secondary overflow-x-auto border-t border-border-light">
            <button
              onClick={() => handleSendMessage('Show Malibu properties')}
              className={suggestionChipClass}
            >
              Malibu Villas
            </button>
            <button
              onClick={() => handleSendMessage('Contact Sophia Sterling')}
              className={suggestionChipClass}
            >
              Sophia Sterling
            </button>
            <button
              onClick={() => handleSendMessage('Mortgage help')}
              className={suggestionChipClass}
            >
              Mortgage Info
            </button>
          </div>

          {/* Input Panel */}
          <div className="py-3 px-4 border-t border-border-light flex gap-2.5 bg-bg-secondary">
            <input
              type="text"
              className="grow bg-white/[0.08] border border-white/15 [[data-theme=dark]_&]:bg-[rgba(15,23,42,0.4)] [[data-theme=dark]_&]:border-white/8 rounded-lg text-text-primary py-2 px-3 outline-none font-sans text-[0.85rem] [transition:all_var(--transition-fast)] focus:border-accent-gold focus:bg-white/15 focus:shadow-[0_0_10px_rgba(245,158,11,0.15)]"
              placeholder="Ask AURA concierge..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage(inputText);
              }}
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              className="relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black font-heading font-semibold border-none cursor-pointer [transition:transform_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 p-2 rounded-lg flex items-center justify-center shadow-none"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
