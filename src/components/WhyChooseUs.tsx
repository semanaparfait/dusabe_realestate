import React, { useState, useEffect } from 'react';
import { ShieldCheck, Users, Lock, Award, Headphones, Scale } from 'lucide-react';

interface StatCounter {
  value: number;
  label: string;
  suffix: string;
}

const STATS_DATA: StatCounter[] = [
  { value: 1250, label: 'Properties Sold', suffix: '+' },
  { value: 980, label: 'Happy Clients', suffix: '+' },
  { value: 18, label: 'Cities Covered', suffix: '' },
  { value: 45, label: 'Expert Agents', suffix: '' }
];

const whyCardClass = "group text-center p-10 pt-10 pb-[30px] rounded-2xl [transition:all_var(--transition-slow)] border border-border-light hover:-translate-y-2 hover:border-accent-gold hover:shadow-card bg-bg-primary";

export const WhyChooseUs: React.FC = () => {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 50;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      setCounts(
        STATS_DATA.map((stat) => {
          const target = stat.value;
          const current = Math.round((target / steps) * stepCount);
          return current >= target ? target : current;
        })
      );

      if (stepCount >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="why-choose-us" className="relative py-[100px] bg-bg-secondary border-t border-b border-border-light">
      <div className="max-w-[1400px] w-full mx-auto px-6">
        <div className="text-center mb-[60px]">
          <span className="font-heading uppercase tracking-[0.25em] text-[0.85rem] text-accent-gold font-semibold">Our Promise</span>
          <h2 className="text-[2.5rem] mb-4">Why Choose DUSABE Real Estate</h2>
          <p className="max-w-[600px] mx-auto text-base">
            We help you find, buy, and rent top quality homes with honest advice and simple steps.
          </p>
        </div>

        {/* 6 Guarantee Cards */}
        <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-[30px]">
          <div className={whyCardClass}>
            <div className="w-16 h-16 rounded-full bg-bg-tertiary text-accent-gold-dark flex items-center justify-center mx-auto mb-6 [transition:all_var(--transition-fast)] group-hover:bg-accent-gold group-hover:text-black group-hover:scale-110"><ShieldCheck size={28} /></div>
            <h3 className="text-[1.2rem] mb-3">100% Verified Homes</h3>
            <p className="text-[0.85rem] text-text-secondary">
              Every property is checked for safety, legal ownership, and top quality before listing.
            </p>
          </div>

          <div className={whyCardClass}>
            <div className="w-16 h-16 rounded-full bg-bg-tertiary text-accent-gold-dark flex items-center justify-center mx-auto mb-6 [transition:all_var(--transition-fast)] group-hover:bg-accent-gold group-hover:text-black group-hover:scale-110"><Users size={28} /></div>
            <h3 className="text-[1.2rem] mb-3">Expert Real Estate Agents</h3>
            <p className="text-[0.85rem] text-text-secondary">
              Our friendly agents help you find the right property for your family or investment.
            </p>
          </div>

          <div className={whyCardClass}>
            <div className="w-16 h-16 rounded-full bg-bg-tertiary text-accent-gold-dark flex items-center justify-center mx-auto mb-6 [transition:all_var(--transition-fast)] group-hover:bg-accent-gold group-hover:text-black group-hover:scale-110"><Lock size={28} /></div>
            <h3 className="text-[1.2rem] mb-3">Safe & Secure Payments</h3>
            <p className="text-[0.85rem] text-text-secondary">
              Your money and paperwork are protected every step of the way.
            </p>
          </div>

          <div className={whyCardClass}>
            <div className="w-16 h-16 rounded-full bg-bg-tertiary text-accent-gold-dark flex items-center justify-center mx-auto mb-6 [transition:all_var(--transition-fast)] group-hover:bg-accent-gold group-hover:text-black group-hover:scale-110"><Award size={28} /></div>
            <h3 className="text-[1.2rem] mb-3">Best Price Guarantee</h3>
            <p className="text-[0.85rem] text-text-secondary">
              Get direct access to fair market deals and high-value properties.
            </p>
          </div>

          <div className={whyCardClass}>
            <div className="w-16 h-16 rounded-full bg-bg-tertiary text-accent-gold-dark flex items-center justify-center mx-auto mb-6 [transition:all_var(--transition-fast)] group-hover:bg-accent-gold group-hover:text-black group-hover:scale-110"><Headphones size={28} /></div>
            <h3 className="text-[1.2rem] mb-3">24/7 Customer Support</h3>
            <p className="text-[0.85rem] text-text-secondary">
              Our team is always available to answer your questions and guide your visits.
            </p>
          </div>

          <div className={whyCardClass}>
            <div className="w-16 h-16 rounded-full bg-bg-tertiary text-accent-gold-dark flex items-center justify-center mx-auto mb-6 [transition:all_var(--transition-fast)] group-hover:bg-accent-gold group-hover:text-black group-hover:scale-110"><Scale size={28} /></div>
            <h3 className="text-[1.2rem] mb-3">Full Legal Assistance</h3>
            <p className="text-[0.85rem] text-text-secondary">
              We take care of all legal documents, contracts, and transfer requirements for you.
            </p>
          </div>
        </div>

        {/* Dynamic Counter Section */}
        <div className="grid grid-cols-4 max-lg:grid-cols-1 gap-[30px] mt-20">
          {STATS_DATA.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-serif text-[4rem] font-bold italic text-accent-gold leading-none mb-2.5">
                {counts[index].toLocaleString()}{stat.suffix}
              </div>
              <div className="font-heading uppercase text-[0.8rem] tracking-[0.1em] text-text-secondary font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
