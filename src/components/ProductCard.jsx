import React from 'react';
import { Star, Eye, ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onProductClick }) {
  // Generate random ratings so it looks realistic and premium
  const ratingStars = 5;
  
  // Custom luxury details for our inventory
  const getInventoryTagline = (title) => {
    switch(title) {
      case "Signature": return "5-in-1 Elite Hybrid";
      case "Blue Blood": return "Royal Oceanic Majesty";
      case "Floranza": return "Enchanted Blooming Nectar";
      case "Oceanic Retro": return "Vibrant Sea Odyssey";
      case "The Alpha": return "Dominant Spiced Woody Blend";
      case "The Desert Dusk": return "Mystical Amberwood Trail";
      case "The Heart-Breaker": return "Seductive Sweet Vanilla";
      case "The Mythic Trio": return "Complete Collection Set";
      default: return "Premium Luxury Parfum";
    }
  };

  const getRatingCount = (title) => {
    switch(title) {
      case "Signature": return 482;
      case "The Mythic Trio": return 195;
      case "The Alpha": return 234;
      default: return 128 + Math.floor(Math.random() * 80);
    }
  };

  return (
    <div className="product-card glass-morphism gold-border gold-border-hover">
      
      {/* Product Image Area with Hover Zoom */}
      <div className="card-image-wrapper" onClick={() => onProductClick(product)}>
        <img 
          src={product.img.startsWith('//') ? `https:${product.img}` : product.img} 
          alt={product.title} 
          className="card-image"
          loading="lazy"
        />
        
        {/* Quick view hover panel */}
        <div className="card-image-overlay">
          <button className="quick-view-btn font-body">
            <Eye size={16} /> Quick View
          </button>
        </div>
      </div>

      {/* Product Information Details */}
      <div className="card-info" onClick={() => onProductClick(product)}>
        <span className="card-category font-body">{getInventoryTagline(product.title)}</span>
        <h3 className="card-title font-title">{product.title}</h3>
        
        {/* Rating stars */}
        <div className="card-rating">
          <div className="stars-row">
            {[...Array(ratingStars)].map((_, i) => (
              <Star key={i} size={14} fill="#C5A059" color="#C5A059" />
            ))}
          </div>
          <span className="rating-count font-body">({getRatingCount(product.title)})</span>
        </div>

        {/* Pricing */}
        <div className="card-pricing">
          <span className="card-price font-body">{product.price}</span>
        </div>
      </div>

      {/* Card Action Row */}
      <div className="card-actions">
        <button onClick={() => onAddToCart(product)} className="add-to-cart-btn font-body">
          <ShoppingCart size={16} /> Add To Cart
        </button>
      </div>

      <style>{`
        .product-card {
          border-radius: var(--border-radius-premium);
          padding: 16px;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: var(--transition-smooth);
          overflow: hidden;
          background: rgba(18, 19, 22, 0.4);
        }

        .product-card:hover {
          transform: translateY(-8px);
          background: rgba(24, 26, 31, 0.85);
        }

        /* Image styling */
        .card-image-wrapper {
          position: relative;
          width: 100%;
          padding-top: 100%; /* 1:1 Aspect Ratio */
          border-radius: 12px;
          overflow: hidden;
          background: #0d0e10;
          cursor: pointer;
        }

        .card-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }

        .product-card:hover .card-image {
          transform: scale(1.08);
        }

        .card-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(7, 7, 8, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition-snappy);
          z-index: 10;
        }

        .card-image-wrapper:hover .card-image-overlay {
          opacity: 1;
        }

        .quick-view-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-deep);
          color: var(--gold-primary);
          border: 1px solid var(--gold-primary);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: var(--transition-snappy);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .quick-view-btn:hover {
          background: var(--gold-primary);
          color: var(--bg-deep);
          transform: scale(1.05);
        }

        /* Information Styling */
        .card-info {
          padding: 16px 4px 12px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-category {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--gold-primary);
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }

        .card-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--silver-light);
          margin-bottom: 8px;
          transition: var(--transition-snappy);
        }

        .product-card:hover .card-title {
          color: var(--gold-light);
        }

        .card-rating {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
        }

        .stars-row {
          display: flex;
          gap: 2px;
        }

        .rating-count {
          font-size: 0.75rem;
          color: var(--silver-muted);
        }

        .card-pricing {
          margin-top: auto;
          display: flex;
          align-items: center;
        }

        .card-price {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--silver-light);
        }

        /* Action Buttons */
        .card-actions {
          padding-top: 8px;
        }

        .add-to-cart-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: transparent;
          color: var(--silver-light);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: var(--transition-snappy);
        }

        .add-to-cart-btn:hover {
          background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%);
          color: var(--bg-deep);
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(197, 160, 89, 0.2);
        }

        .add-to-cart-btn:active {
          transform: scale(0.97);
        }
      `}</style>
    </div>
  );
}
