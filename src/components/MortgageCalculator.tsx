import React, { useState, useEffect } from 'react';

interface MortgageCalculatorProps {
  initialPrice?: number;
}

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
    <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
      <div className="mortgage-layout">
        {/* Sliders Side */}
        <div className="mortgage-inputs">
          {/* Slider 1: Purchase Price */}
          <div className="input-slider-group">
            <div className="input-slider-header">
              <span style={{ color: 'var(--text-secondary)' }}>Property Valuation</span>
              <span className="luxury-number">${price.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min={Math.max(100000, Math.round(initialPrice * 0.5))} 
              max={Math.round(initialPrice * 1.5)} 
              step={100000}
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="range-slider"
            />
          </div>

          {/* Slider 2: Down Payment */}
          <div className="input-slider-group">
            <div className="input-slider-header">
              <span style={{ color: 'var(--text-secondary)' }}>Down Payment ({downPaymentPercent}%)</span>
              <span className="luxury-number">${downPaymentAmount.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min={10} 
              max={50} 
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
              className="range-slider"
            />
          </div>

          {/* Slider 3: Interest Rate */}
          <div className="input-slider-group">
            <div className="input-slider-header">
              <span style={{ color: 'var(--text-secondary)' }}>Interest Rate</span>
              <span className="luxury-number">{interestRate.toFixed(2)}%</span>
            </div>
            <input 
              type="range" 
              min={2.0} 
              max={8.0} 
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="range-slider"
            />
          </div>

          {/* Selector 4: Term */}
          <div className="input-slider-group">
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Amortization Term</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="button" 
                onClick={() => setTerm(15)} 
                className={term === 15 ? 'luxury-gold-button' : 'outline-luxury-button'}
                style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
              >
                15 Years
              </button>
              <button 
                type="button" 
                onClick={() => setTerm(30)} 
                className={term === 30 ? 'luxury-gold-button' : 'outline-luxury-button'}
                style={{ flex: 1, padding: '10px', fontSize: '0.85rem' }}
              >
                30 Years
              </button>
            </div>
          </div>
        </div>

        {/* Visual Chart Output Side */}
        <div className="mortgage-chart-side">
          <svg className="mortgage-pie-svg" width="120" height="120" viewBox="0 0 80 80">
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
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Estimated Monthly Outlay</span>
            <h3 style={{ fontSize: '2.2rem', margin: '4px 0 16px', color: 'var(--text-primary)' }} className="luxury-number">
              ${monthlyPayment.toLocaleString()}/mo
            </h3>
            
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color" style={{ background: 'var(--secondary)' }} />
                <span>Loan Principal: ${(loanAmount/1000000).toFixed(1)}M</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ background: 'var(--accent-gold)' }} />
                <span>Total Interest: ${(totalInterest/1000000).toFixed(1)}M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
