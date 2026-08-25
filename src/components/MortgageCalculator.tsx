import React, { useState, useEffect } from 'react';

interface MortgageCalculatorProps {
  initialPrice?: number;
}

const luxuryGoldBtnClass = "relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black font-heading font-semibold border-none rounded-lg cursor-pointer shadow-[var(--glow-shadow)] [transition:transform_var(--transition-fast),box-shadow_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0";
const outlineLuxuryBtnClass = "bg-transparent text-text-primary font-heading font-medium border-[1.5px] border-text-primary rounded-lg cursor-pointer [transition:background_var(--transition-fast),color_var(--transition-fast)] hover:bg-text-primary hover:text-bg-primary";

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ initialPrice = 18500000 }) => {
  const [price, setPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // 20% default
  const [interestRate, setInterestRate] = useState(4.5); // 4.5% default
  const [term, setTerm] = useState(30); // 30 years default

  // Derived calculations
  const downPaymentAmount = Math.round((price * downPaymentPercent) / 100);
  const loanAmount = price - downPaymentAmount;

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const r = interestRate / 100 / 12;
    const n = term * 12;

    if (r === 0) {
      setMonthlyPayment(loanAmount / n);
      setTotalInterest(0);
    } else {
      const payment = (loanAmount * r) / (1 - Math.pow(1 + r, -n));
      setMonthlyPayment(Math.round(payment));

      const totalCost = payment * n;
      setTotalInterest(Math.round(totalCost - loanAmount));
    }
  }, [price, downPaymentPercent, interestRate, term, loanAmount]);

  // SVG Chart Computations (Simple dynamic arcs using SVG stroke offsets)
  // Let's compute percentages
  const principalPct = loanAmount / (loanAmount + totalInterest);
  const interestPct = totalInterest / (loanAmount + totalInterest);

  const circumference = 2 * Math.PI * 30; // r=30 -> 188.49
  const principalOffset = circumference * (1 - principalPct);

  return (
    <div className="p-6 rounded-2xl border border-border-light bg-[var(--glass-bg)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]">
      <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-10">
        {/* Sliders Side */}
        <div className="flex flex-col gap-5">
          {/* Slider 1: Purchase Price */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-heading text-[0.9rem] font-semibold">
              <span className="text-text-secondary">Property Valuation</span>
              <span className="font-serif italic text-accent-gold">${price.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={Math.max(100000, Math.round(initialPrice * 0.5))}
              max={Math.round(initialPrice * 1.5)}
              step={100000}
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="w-full accent-accent-gold cursor-pointer"
            />
          </div>

          {/* Slider 2: Down Payment */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-heading text-[0.9rem] font-semibold">
              <span className="text-text-secondary">Down Payment ({downPaymentPercent}%)</span>
              <span className="font-serif italic text-accent-gold">${downPaymentAmount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
              className="w-full accent-accent-gold cursor-pointer"
            />
          </div>

          {/* Slider 3: Interest Rate */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-heading text-[0.9rem] font-semibold">
              <span className="text-text-secondary">Interest Rate</span>
              <span className="font-serif italic text-accent-gold">{interestRate.toFixed(2)}%</span>
            </div>
            <input
              type="range"
              min={2.0}
              max={8.0}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full accent-accent-gold cursor-pointer"
            />
          </div>

          {/* Selector 4: Term */}
          <div className="flex flex-col gap-2">
            <span className="text-[0.9rem] font-semibold text-text-secondary mb-2">Amortization Term</span>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setTerm(15)}
                className={`${term === 15 ? luxuryGoldBtnClass : outlineLuxuryBtnClass} flex-1 py-2.5 px-4 text-[0.85rem]`}
              >
                15 Years
              </button>
              <button
                type="button"
                onClick={() => setTerm(30)}
                className={`${term === 30 ? luxuryGoldBtnClass : outlineLuxuryBtnClass} flex-1 py-2.5 px-4 text-[0.85rem]`}
              >
                30 Years
              </button>
            </div>
          </div>
        </div>

        {/* Visual Chart Output Side */}
        <div className="flex flex-col items-center justify-center text-center">
          <svg className="-rotate-90 mb-6" width="120" height="120" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="30" fill="none" stroke="var(--border-light)" strokeWidth="12" />

            {/* Principal Arc */}
            <circle
              cx="40"
              cy="40"
              r="30"
              fill="none"
              stroke="var(--secondary)"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={principalOffset}
            />

            {/* Interest Arc */}
            <circle
              cx="40"
              cy="40"
              r="30"
              fill="none"
              stroke="var(--accent-gold)"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (circumference * interestPct)}
              style={{ transform: `rotate(${principalPct * 360}deg)`, transformOrigin: '40px 40px' }}
            />
          </svg>

          <div>
            <span className="text-[0.8rem] text-text-tertiary uppercase">Estimated Monthly Outlay</span>
            <h3 className="font-serif italic text-[2.2rem] my-1 mb-4 text-text-primary">
              ${monthlyPayment.toLocaleString()}/mo
            </h3>

            <div className="flex gap-5 text-[0.85rem]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-[3px] bg-[var(--secondary)] inline-block" />
                <span>Loan Principal: ${(loanAmount/1000000).toFixed(1)}M</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-[3px] bg-accent-gold inline-block" />
                <span>Total Interest: ${(totalInterest/1000000).toFixed(1)}M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
