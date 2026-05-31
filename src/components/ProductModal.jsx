import React, { useState } from 'react';
import { X, ShoppingBag, CheckCircle, ShieldAlert, Award } from 'lucide-react';

const productScentDetails = {
  "Signature": {
    notes: { head: "Royal Pineapple, Crisp Green Apple, Italian Mint", heart: "Sichuan Pepper, Smoky Birchwood, Lavender", base: "Creamy Sandalwood, Rich Incense, Warm Amberwood" },
    longevity: 96,
    projection: 92,
    family: "Elite Hybrid Aromatic Woody",
    concentration: "Extrait de Parfum (30% Scent Concentration)"
  },
  "Blue Blood": {
    notes: { head: "Zesty Grapefruit, Pure Sea Salt, Cool Marine Accord", heart: "Aromatic Bay Leaf, Jasmine Petals, Guaiac Wood", base: "Earthy Oakmoss, Golden Patchouli, Rich Ambergris" },
    longevity: 86,
    projection: 82,
    family: "Royal Fresh Aquatic",
    concentration: "Eau de Parfum (20% Scent Concentration)"
  },
  "Floranza": {
    notes: { head: "Calabrian Bergamot, Pink Pepper, Sweet Nectarine Pear", heart: "Centifolia Rose, Turkish Damask Rose, Blooming Peony", base: "White Musk, Cashmere Wood, Madagascar Bourbon Vanilla" },
    longevity: 82,
    projection: 78,
    family: "Enchanted Floral Nectar",
    concentration: "Eau de Parfum (20% Scent Concentration)"
  },
  "Oceanic Retro": {
    notes: { head: "Tunisian Neroli, Sweet Lemon Zest, Fresh Rosemary", heart: "Oceanic Seaweed, Wild Jasmine, Ground Coriander", base: "Virginian Cedarwood, Warm Amber, Sweet Benzoin" },
    longevity: 80,
    projection: 75,
    family: "Classic Aquatic Chypre",
    concentration: "Eau de Parfum (18% Scent Concentration)"
  },
  "The Alpha": {
    notes: { head: "Guatemalan Cardamom, Nutmeg, Warm Ceylon Cinnamon", heart: "Royal Cambodian Oud, Tanned Leather, Persian Saffron", base: "Indonesian Patchouli, Indian Sandalwood, Dark Vetiver" },
    longevity: 98,
    projection: 95,
    family: "Dominant Spiced Woody Oud",
    concentration: "Extrait de Parfum (35% Scent Concentration)"
  },
  "The Desert Dusk": {
    notes: { head: "Red Saffron, Sweet Medina Dates, Mystic Incense", heart: "Amberwood Crystals, Sweet Myrrh, Honeyed Damascus Rose", base: "Madagascar Vanilla Bean, Dark Musk, Roasted Tonka Bean" },
    longevity: 92,
    projection: 88,
    family: "Mystical Oriental Amber",
    concentration: "Eau de Parfum (22% Scent Concentration)"
  },
  "The Heart-Breaker": {
    notes: { head: "French Lavender, Sparkling Lemon, Dalmatian Sage", heart: "Sweet Praline, Tolu Balsam, Black Cardamom Pods", base: "Brazilian Rosewood, Dark Patchouli, Black Amber" },
    longevity: 88,
    projection: 84,
    family: "Seductive Aromatic Gourmand",
    concentration: "Eau de Parfum (20% Scent Concentration)"
  },
  "The Mythic Trio": {
    notes: { head: "A curation of three legendary parfaits", heart: "Includes: 1x Signature, 1x The Alpha, 1x Blue Blood", base: "Presented in an obsidian wood velvet lined display vault" },
    longevity: 95,
    projection: 92,
    family: "Luxury Collector Set",
    concentration: "Elite Multi-Pack Vault"
  }
};

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);
  const details = productScentDetails[product.title] || {
    notes: { head: "Bergamot, Citrus Zest", heart: "Lavender, Jasmine", base: "Cedar, Amber" },
    longevity: 85,
    projection: 80,
    family: "Premium Scent",
    concentration: "Eau de Parfum"
  };

  const handleAddClick = () => {
    onAddToCart(product, qty);
    onClose();
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="modal-dialog glass-morphism gold-border" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
          <X size={20} className="icon-gold" />
        </button>

        <div className="modal-body-layout">
          
          {/* Left: Interactive Image and badging */}
          <div className="modal-visual-column">
            <div className="modal-visual-glow"></div>
            <img 
              src={product.img.startsWith('//') ? `https:${product.img}` : product.img} 
              alt={product.title} 
              className="modal-product-image"
            />
            <span className="modal-concentration font-body">{details.concentration}</span>
          </div>

          {/* Right: Rich Details and sliders */}
          <div className="modal-details-column">
            <span className="modal-scent-family font-body">{details.family}</span>
            <h2 className="modal-title font-title gold-text-gradient">{product.title}</h2>
            <div className="modal-price font-body">{product.price}</div>
            
            {/* Scent Notes Breakdown */}
            <div className="notes-breakdown">
              <h3 className="section-label font-body">Scent Architecture</h3>
              <div className="note-tier">
                <span className="tier-tag head-tag font-body">Top Notes:</span>
                <span className="tier-content font-body">{details.notes.head}</span>
              </div>
              <div className="note-tier">
                <span className="tier-tag heart-tag font-body">Heart Notes:</span>
                <span className="tier-content font-body">{details.notes.heart}</span>
              </div>
              <div className="note-tier">
                <span className="tier-tag base-tag font-body">Base Notes:</span>
                <span className="tier-content font-body">{details.notes.base}</span>
              </div>
            </div>

            {/* Longevity and Projection Meters */}
            <div className="metrics-box">
              <h3 className="section-label font-body">Performance Indexes</h3>
              
              <div className="metric-row">
                <div className="metric-labels font-body">
                  <span>Longevity</span>
                  <span className="gold-text">{details.longevity}% (Extremely Long-lasting)</span>
                </div>
                <div className="metric-bar-track">
                  <div className="metric-bar-fill" style={{ width: `${details.longevity}%` }}></div>
                </div>
              </div>

              <div className="metric-row">
                <div className="metric-labels font-body">
                  <span>Projection & Sillage</span>
                  <span className="gold-text">{details.projection}% (Heavy Sillage)</span>
                </div>
                <div className="metric-bar-track">
                  <div className="metric-bar-fill" style={{ width: `${details.projection}%` }}></div>
                </div>
              </div>
            </div>

            {/* Quality Seals */}
            <div className="seals-row font-body">
              <div className="seal-item"><Award size={14} /> 100% Original</div>
              <div className="seal-item"><CheckCircle size={14} /> Free Delivery Included</div>
            </div>

            {/* Purchase action block */}
            <div className="purchase-controls">
              <div className="qty-picker">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="qty-btn font-body">-</button>
                <span className="qty-val font-body">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="qty-btn font-body">+</button>
              </div>
              
              <button onClick={handleAddClick} className="premium-btn modal-buy-btn font-body">
                <ShoppingBag size={16} style={{ marginRight: '8px' }} /> Add to Cart
              </button>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .modal-dialog {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: var(--border-radius-premium);
          padding: 40px;
          z-index: 1010;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7);
          animation: slideInDialog 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideInDialog {
          from {
            opacity: 0;
            transform: translate(-50%, -46%) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(197, 160, 89, 0.2);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-snappy);
          z-index: 20;
        }

        .modal-close-btn:hover {
          background: rgba(197, 160, 89, 0.1);
          transform: rotate(90deg);
        }

        .modal-body-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
        }

        /* Visual image column */
        .modal-visual-column {
          position: relative;
          background: #0d0e10;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          min-height: 360px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.02);
        }

        .modal-visual-glow {
          position: absolute;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(197, 160, 89, 0.12) 0%, transparent 70%);
          filter: blur(10px);
        }

        .modal-product-image {
          max-width: 100%;
          max-height: 320px;
          object-fit: contain;
          z-index: 10;
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));
          transition: var(--transition-smooth);
        }

        .modal-product-image:hover {
          transform: scale(1.03);
        }

        .modal-concentration {
          position: absolute;
          bottom: 12px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--silver-muted);
          background: rgba(255, 255, 255, 0.02);
          padding: 4px 12px;
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.04);
        }

        /* Detail Column styling */
        .modal-details-column {
          display: flex;
          flex-direction: column;
        }

        .modal-scent-family {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--gold-primary);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 6px;
        }

        .modal-title {
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 700;
          margin-bottom: 8px;
        }

        .modal-price {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--silver-light);
          margin-bottom: 24px;
        }

        .section-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--silver-light);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
          border-bottom: 1px solid rgba(197, 160, 89, 0.1);
          padding-bottom: 6px;
        }

        /* Notes breakdown */
        .notes-breakdown {
          margin-bottom: 24px;
        }

        .note-tier {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 8px;
          font-size: 0.88rem;
        }

        .tier-tag {
          font-weight: 600;
          min-width: 80px;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .head-tag { color: #E5C483; }
        .heart-tag { color: #C5A059; }
        .base-tag { color: #8E6B2C; }

        .tier-content {
          color: var(--silver-muted);
          line-height: 1.4;
        }

        /* Performance Sliders */
        .metrics-box {
          margin-bottom: 24px;
        }

        .metric-row {
          margin-bottom: 12px;
        }

        .metric-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          font-weight: 500;
          margin-bottom: 6px;
          color: var(--silver-light);
        }

        .gold-text {
          color: var(--gold-primary);
        }

        .metric-bar-track {
          width: 100%;
          height: 6px;
          background: #1e2025;
          border-radius: 3px;
          overflow: hidden;
        }

        .metric-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--gold-dark) 0%, var(--gold-primary) 50%, var(--gold-light) 100%);
          border-radius: 3px;
          transition: width 1s ease-in-out;
        }

        /* Seals Row */
        .seals-row {
          display: flex;
          gap: 16px;
          margin-bottom: 28px;
          font-size: 0.75rem;
          color: var(--silver-muted);
        }

        .seal-item {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.02);
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.03);
        }

        /* Controls block */
        .purchase-controls {
          display: flex;
          gap: 16px;
          margin-top: auto;
        }

        .qty-picker {
          display: flex;
          align-items: center;
          background: #181a1f;
          border: 1px solid rgba(197, 160, 89, 0.2);
          border-radius: 12px;
          overflow: hidden;
        }

        .qty-btn {
          background: transparent;
          border: none;
          color: var(--silver-light);
          width: 40px;
          height: 44px;
          cursor: pointer;
          font-size: 1.1rem;
          font-weight: 500;
          transition: var(--transition-snappy);
        }

        .qty-btn:hover {
          background: rgba(197, 160, 89, 0.1);
          color: var(--gold-primary);
        }

        .qty-val {
          width: 32px;
          text-align: center;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--silver-light);
        }

        .modal-buy-btn {
          flex-grow: 1;
          height: 46px;
          border-radius: 12px !important;
        }

        @media (max-width: 768px) {
          .modal-body-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .modal-dialog {
            padding: 24px;
          }
          .modal-visual-column {
            min-height: 260px;
          }
          .modal-product-image {
            max-height: 220px;
          }
        }
      `}</style>
    </div>
  );
}
