import React, { useState } from 'react';
import { Compass, Flame, Droplets, Wind, Sparkles, Plus } from 'lucide-react';

const hybridElements = [
  {
    name: "Aventus DNA",
    influence: "Pineapple & Birchwood",
    desc: "Provides a vibrant, smoky-sweet opening with rich blackcurrant and royal pineapple notes.",
    icon: Sparkles,
    color: "#E2BA5D"
  },
  {
    name: "Eros DNA",
    influence: "Mint & Candied Apple",
    desc: "Adds a seductive, fresh-sweet aromatic punch with Italian lemon zest, mint, and crisp green apple.",
    icon: Flame,
    color: "#4FA095"
  },
  {
    name: "Sauvage DNA",
    influence: "Spicy Sichuan Pepper",
    desc: "Infuses raw masculine energy with sharp Calabrian bergamot and warm, peppery amberwood facets.",
    icon: Wind,
    color: "#2C363F"
  },
  {
    name: "Cool Water DNA",
    influence: "Aquatic Blue Freshness",
    desc: "Introduces an intense, refreshing ocean breeze with lavender, rosemary, and salty sea minerals.",
    icon: Droplets,
    color: "#5B8FB9"
  },
  {
    name: "Bleu de Chanel DNA",
    influence: "Creamy Sandalwood & Incense",
    desc: "Dries down into a rich, sophisticated incense trail blended with warm New Caledonian sandalwood.",
    icon: Compass,
    color: "#1E2749"
  }
];

export default function SignatureHighlight({ onPurchaseFlagship }) {
  const [activeDna, setActiveDna] = useState(0);

  return (
    <section className="signature-section gold-border" id="signature-reveal">
      <div className="container-premium signature-layout">
        
        {/* Left Side: Product Showcase */}
        <div className="product-visual animate-slide-up">
          <div className="visual-glow-ring"></div>
          <img 
            src="https://mythicscentsations.com/cdn/shop/files/WhatsAppImage2026-02-22at6.37.45AM.jpg?v=1771771085&width=3840" 
            alt="Signature Fragrance Bottle" 
            className="flagship-image"
          />
          <div className="hybrid-badge font-body">🏆 ELITE HYBRID</div>
        </div>

        {/* Right Side: Composition Breakdown */}
        <div className="composition-details">
          <div className="badge-luxury font-body">THE MASTERPIECE</div>
          <h2 className="section-title font-title gold-text-gradient">Signature: The 5-in-1 Odyssey</h2>
          <p className="section-subtitle font-body">
            Why settle for one signature scent when you can embody the legend of five? We took the DNA structures of history's most iconic fragrances and synthesized them into one supreme elixir.
          </p>

          {/* DNA Selectors */}
          <div className="dna-selectors">
            {hybridElements.map((dna, idx) => {
              const Icon = dna.icon;
              return (
                <button 
                  key={idx}
                  onClick={() => setActiveDna(idx)}
                  className={`dna-btn ${activeDna === idx ? 'active-dna' : ''}`}
                  style={{ '--accent-color': dna.color }}
                >
                  <span className="dna-icon-box">
                    <Icon size={18} />
                  </span>
                  <span className="dna-btn-text font-body">{dna.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active DNA Detail Card */}
          <div className="dna-detail-card glass-morphism gold-border animate-fade-in" key={activeDna}>
            <div className="card-accent-strip" style={{ backgroundColor: hybridElements[activeDna].color }}></div>
            <div className="dna-card-header">
              <h3 className="dna-card-title font-title">{hybridElements[activeDna].name}</h3>
              <span className="dna-card-influence font-body" style={{ color: hybridElements[activeDna].color }}>
                {hybridElements[activeDna].influence}
              </span>
            </div>
            <p className="dna-card-desc font-body">{hybridElements[activeDna].desc}</p>
            <div className="dna-card-footer">
              <span className="footer-label font-body">Blending Ratio in Bottle:</span>
              <span className="footer-val font-body">20% Pure Essence</span>
            </div>
          </div>

          <div className="action-row">
            <button onClick={onPurchaseFlagship} className="premium-btn">
              Experience Signature — Rs.2,449.00
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .signature-section {
          background: #09090b;
          border-left: none;
          border-right: none;
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }

        .signature-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: center;
        }

        /* Bottle Visual Showcase */
        .product-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .visual-glow-ring {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(197, 160, 89, 0.15) 0%, transparent 70%);
          filter: blur(10px);
          animation: pulseGlow 4s infinite alternate;
        }

        @keyframes pulseGlow {
          0% { transform: scale(0.95); opacity: 0.7; }
          100% { transform: scale(1.05); opacity: 1; }
        }

        .flagship-image {
          max-width: 100%;
          height: auto;
          max-height: 480px;
          object-fit: contain;
          border-radius: var(--border-radius-premium);
          z-index: 10;
          filter: drop-shadow(0 15px 35px rgba(0,0,0,0.6));
          transition: var(--transition-smooth);
        }

        .flagship-image:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .hybrid-badge {
          position: absolute;
          bottom: 20px;
          right: 20px;
          background: linear-gradient(135deg, var(--gold-accent) 0%, var(--gold-dark) 100%);
          color: var(--bg-deep);
          padding: 8px 16px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          z-index: 20;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        /* Detail copy right column */
        .composition-details {
          display: flex;
          flex-direction: column;
        }

        .section-title {
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 700;
          line-height: 1.2;
          margin: 12px 0 20px;
        }

        .section-subtitle {
          color: var(--silver-muted);
          line-height: 1.6;
          margin-bottom: 32px;
          font-size: 1rem;
        }

        /* DNA select bar */
        .dna-selectors {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .dna-btn {
          flex: 1;
          min-width: 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 12px 8px;
          background: rgba(18, 19, 22, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          cursor: pointer;
          transition: var(--transition-snappy);
          color: var(--silver-muted);
        }

        .dna-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-snappy);
        }

        .dna-btn-text {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .dna-btn:hover {
          color: var(--silver-light);
          border-color: rgba(197, 160, 89, 0.25);
          background: rgba(18, 19, 22, 0.9);
        }

        .active-dna {
          border-color: var(--accent-color) !important;
          color: var(--silver-light) !important;
          background: rgba(18, 19, 22, 1) !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .active-dna .dna-icon-box {
          background: var(--accent-color);
          color: var(--bg-deep);
        }

        /* Card detail container */
        .dna-detail-card {
          position: relative;
          padding: 24px;
          border-radius: var(--border-radius-premium);
          margin-bottom: 36px;
          overflow: hidden;
          background: rgba(18, 19, 22, 0.4);
        }

        .card-accent-strip {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--gold-primary);
        }

        .dna-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }

        .dna-card-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--silver-light);
        }

        .dna-card-influence {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .dna-card-desc {
          color: var(--silver-muted);
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .dna-card-footer {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 12px;
          font-size: 0.8rem;
        }

        .footer-label {
          color: var(--silver-muted);
        }

        .footer-val {
          color: var(--gold-primary);
          font-weight: 600;
        }

        .action-row {
          display: flex;
        }

        @media (max-width: 992px) {
          .signature-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .product-visual {
            order: 2;
          }
          .composition-details {
            order: 1;
          }
          .flagship-image {
            max-height: 380px;
          }
        }
      `}</style>
    </section>
  );
}
