import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SignatureHighlight from './components/SignatureHighlight';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import ContactForm from './components/ContactForm';
import { Compass, ShoppingBag, Heart, ShieldCheck, Mail, ArrowUp } from 'lucide-react';

const productsData = [
  {
    id: "sig-01",
    title: "Signature",
    price: "Rs.2,449.00",
    img: "//mythicscentsations.com/cdn/shop/files/WhatsAppImage2026-02-22at6.37.45AM.jpg?v=1771771085&width=3840"
  },
  {
    id: "bb-02",
    title: "Blue Blood",
    price: "Rs.2,449.00",
    img: "//mythicscentsations.com/cdn/shop/files/WhatsAppImage2026-02-22at2.42.55AM_0b77e234-3cc7-4a67-af2f-fd3b11edd73e.jpg?v=1771769141&width=3840"
  },
  {
    id: "fl-03",
    title: "Floranza",
    price: "Rs.2,449.00",
    img: "//mythicscentsations.com/cdn/shop/files/WhatsApp_Image_2026-02-22_at_2.56.08_AM.jpg?v=1771769498&width=3840"
  },
  {
    id: "or-04",
    title: "Oceanic Retro",
    price: "Rs.2,449.00",
    img: "//mythicscentsations.com/cdn/shop/files/WhatsAppImage2026-02-22at2.42.57AM_abc8450f-8fde-440f-bfbd-22ad5f5b9039.jpg?v=1771770431&width=3840"
  },
  {
    id: "al-05",
    title: "The Alpha",
    price: "Rs.2,449.00",
    img: "//mythicscentsations.com/cdn/shop/files/WhatsAppImage2026-02-22at2.42.30AM.jpg?v=1771768318&width=3840"
  },
  {
    id: "dd-06",
    title: "The Desert Dusk",
    price: "Rs.2,449.00",
    img: "//mythicscentsations.com/cdn/shop/files/WhatsApp_Image_2026-02-22_at_2.43.28_AM.jpg?v=1771768645&width=3840"
  },
  {
    id: "hb-07",
    title: "The Heart-Breaker",
    price: "Rs.2,449.00",
    img: "//mythicscentsations.com/cdn/shop/files/WhatsApp_Image_2026-02-22_at_2.42.39_AM.jpg?v=1771767720&width=3840"
  },
  {
    id: "mt-08",
    title: "The Mythic Trio",
    price: "Rs.5,999.00",
    img: "//mythicscentsations.com/cdn/shop/files/WhatsAppImage2026-02-22at3.19.52AM.jpg?v=1771771432&width=3840"
  }
];

const announcementBanners = [
  "✨ FREE SHIPPING ACROSS PAKISTAN ON ORDERS OVER RS. 3000! ✨",
  "👑 ELITE 5-IN-1 HYBRIDS BLENDING HISTORY'S GREATEST DNA SCENTS! 👑"
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('mythic_scents_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync cart to local storage
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('mythic_scents_cart', JSON.stringify(newCart));
  };

  // Rotating Announcement Bar
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcementBanners.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Back to Top button listener
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Cart operations
  const handleAddToCart = (product, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      saveCart(updatedCart);
    } else {
      saveCart([...cart, { ...product, quantity }]);
    }
  };

  const handleUpdateQty = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    const updatedCart = cart.map((item) => 
      item.id === itemId ? { ...item, quantity: newQty } : item
    );
    saveCart(updatedCart);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    saveCart(updatedCart);
  };

  const handleCheckoutSuccess = () => {
    saveCart([]); // Clear cart state and storage
  };

  // Smooth scroll helper
  const handleSmoothScroll = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const flagshipProduct = productsData.find((p) => p.title === "Signature");

  return (
    <div className="app-luxury-vault">
      
      {/* 1. Announcement Bar */}
      <div className="announcement-bar-premium glass-morphism font-body">
        <span className="announcement-text gold-text-gradient animate-fade-in" key={announcementIndex}>
          {announcementBanners[announcementIndex]}
        </span>
      </div>

      {/* 2. Glassmorphic Navigation Header */}
      <Header 
        cartCount={totalCartItems} 
        onCartClick={() => setCartOpen(true)}
        onNavClick={handleSmoothScroll}
      />

      {/* 3. Background-Video Cinematic Hero */}
      <Hero onExploreClick={() => handleSmoothScroll('catalog')} />

      <main>
        
        {/* 4. Brand Trust Badges Row */}
        <section className="trust-badges-bar font-body border-bottom">
          <div className="container-premium badges-grid">
            <div className="badge-card">
              <Compass className="badge-icon" size={24} />
              <div className="badge-text">
                <strong>Premium Blends</strong>
                <span>100% genuine concentrates</span>
              </div>
            </div>
            <div className="badge-card">
              <ShoppingBag className="badge-icon" size={24} />
              <div className="badge-text">
                <strong>Complimentary Courier</strong>
                <span>Free shipping on all items above Rs. 3000</span>
              </div>
            </div>
            <div className="badge-card">
              <Heart className="badge-icon" size={24} />
              <div className="badge-text">
                <strong>Beast Mode Projection</strong>
                <span>Unrivaled 12+ hour sillage trail</span>
              </div>
            </div>
            <div className="badge-card">
              <ShieldCheck className="badge-icon" size={24} />
              <div className="badge-text">
                <strong>Satisfaction Shield</strong>
                <span>Premium olfactory excellence guaranteed</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Infographic Scent Signature Showcase */}
        <SignatureHighlight 
          onPurchaseFlagship={() => {
            if (flagshipProduct) {
              handleAddToCart(flagshipProduct);
              setCartOpen(true);
            }
          }}
        />

        {/* 6. Products Catalog Grid Section */}
        <section className="catalog-section" id="catalog">
          <div className="container-premium">
            <div className="section-header-centered animate-slide-up">
              <div className="badge-luxury font-body">THE VAULT</div>
              <h2 className="catalog-headline font-title gold-text-gradient">The Mythic Collection</h2>
              <p className="catalog-subhead font-body">
                Explore our full registry of luxury fragrances. Extrait de Parfum blends constructed with premium botanical extracts and rich amber infusions.
              </p>
            </div>

            <div className="products-grid">
              {productsData.map((prod) => (
                <ProductCard 
                  key={prod.id}
                  product={prod}
                  onAddToCart={(p) => {
                    handleAddToCart(p);
                    setCartOpen(true);
                  }}
                  onProductClick={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 7. Glassmorphism Contact Form & Newsletter */}
        <ContactForm />

      </main>

      {/* 8. Luxury Brand Footer */}
      <footer className="luxury-footer font-body border-top">
        <div className="container-premium footer-grid">
          
          <div className="footer-brand-column">
            <span className="footer-logo font-title gold-text-gradient">Mythic Scentsations</span>
            <p className="footer-brand-desc">
              History's greatest olfactory profiles synthesized under one luxury banner. Engineered for pioneers, visionaries, and alphas who dictate their own path.
            </p>
            <div className="social-links-row">
              <a href="https://instagram.com" className="social-icon" target="_blank" rel="noreferrer">IG</a>
              <a href="https://facebook.com" className="social-icon" target="_blank" rel="noreferrer">FB</a>
              <a href="https://youtube.com" className="social-icon" target="_blank" rel="noreferrer">YT</a>
            </div>
          </div>

          <div className="footer-links-column">
            <h4 className="footer-col-title font-title gold-text-gradient">Vault Directory</h4>
            <button onClick={() => handleSmoothScroll('home')} className="footer-link-btn">Home</button>
            <button onClick={() => handleSmoothScroll('signature-reveal')} className="footer-link-btn">Flagship Essence</button>
            <button onClick={() => handleSmoothScroll('catalog')} className="footer-link-btn">Scent Registry</button>
            <button onClick={() => handleSmoothScroll('contact')} className="footer-link-btn">Concierge Desk</button>
          </div>

          <div className="footer-newsletter-column">
            <h4 className="footer-col-title font-title gold-text-gradient font-title">Direct Inquiries</h4>
            <p className="inquiries-desc">Reach out directly to our central curation lab for private compounding requests.</p>
            <div className="inquiry-email">
              <Mail className="icon-gold" size={16} />
              <span>concierge@mythicscentsations.com</span>
            </div>
          </div>

        </div>

        <div className="footer-copyright-bar container-premium">
          <p>© 2026 Mythic Scentsations. Engineered for premium preview. All rights reserved.</p>
          <p>Hand-crafted with luxury aesthetics by Antigravity.</p>
        </div>
      </footer>

      {/* 9. Floating Shopping Cart Slide-out Drawer */}
      {cartOpen && (
        <CartDrawer 
          cartItems={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onCheckoutSuccess={handleCheckoutSuccess}
        />
      )}

      {/* 10. Product Detail Dialog Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p, q) => {
            handleAddToCart(p, q);
            setCartOpen(true);
          }}
        />
      )}

      {/* 11. Back to Top smooth scroll button */}
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="back-to-top-btn glass-morphism gold-border animate-fade-in"
          aria-label="Back to Top"
        >
          <ArrowUp size={18} className="icon-gold" />
        </button>
      )}

      <style>{`
        .app-luxury-vault {
          padding-top: 0; /* Let hero overlay full-bleed */
          background-color: var(--bg-deep);
          min-height: 100vh;
          position: relative;
        }

        /* 1. Rotating Announcement Bar */
        .announcement-bar-premium {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 950;
          font-size: clamp(0.55rem, 2.5vw, 0.72rem); /* safe font sizing on small viewports */
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: rgba(7, 7, 8, 0.95);
          border-bottom: 1px solid rgba(197, 160, 89, 0.1);
          padding: 0 12px;
          overflow: hidden; /* bulletproof height guard */
          white-space: nowrap;
        }

        .announcement-text {
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* 4. Trust Badges Section */
        .trust-badges-bar {
          background: #09090b;
          padding: 40px 0;
          border-bottom: 1px solid rgba(197, 160, 89, 0.1);
        }

        .badges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 30px;
        }

        .badge-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px;
        }

        .badge-icon {
          color: var(--gold-primary);
          flex-shrink: 0;
          filter: drop-shadow(0 0 5px rgba(197, 160, 89, 0.2));
        }

        .badge-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .badge-text strong {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--silver-light);
          letter-spacing: 0.02em;
        }

        .badge-text span {
          font-size: 0.75rem;
          color: var(--silver-muted);
        }

        /* 6. Catalog Grid Layout */
        .catalog-section {
          padding: 120px 0;
          background: #070708;
        }

        .section-header-centered {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .catalog-headline {
          font-size: clamp(2rem, 5vw, 2.8rem);
          font-weight: 700;
          margin: 12px 0 16px;
        }

        .catalog-subhead {
          font-size: 0.95rem;
          color: var(--silver-muted);
          line-height: 1.6;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 30px;
        }

        /* 8. Luxury Footer */
        .luxury-footer {
          background: #09090b;
          padding: 80px 0 30px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.2fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .footer-brand-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-logo {
          font-size: 1.6rem;
          font-weight: 700;
        }

        .footer-brand-desc {
          color: var(--silver-muted);
          font-size: 0.88rem;
          line-height: 1.6;
          max-width: 320px;
        }

        .social-links-row {
          display: flex;
          gap: 12px;
        }

        .social-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(197, 160, 89, 0.2);
          color: var(--silver-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          font-weight: 600;
          text-decoration: none;
          transition: var(--transition-snappy);
        }

        .social-icon:hover {
          color: var(--gold-primary);
          border-color: var(--gold-primary);
          background: rgba(197, 160, 89, 0.05);
          transform: translateY(-2px);
        }

        .footer-links-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .footer-col-title {
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 12px;
        }

        .footer-link-btn {
          background: transparent;
          border: none;
          color: var(--silver-muted);
          font-family: var(--font-family-body);
          font-size: 0.88rem;
          cursor: pointer;
          transition: var(--transition-snappy);
          padding: 4px 0;
        }

        .footer-link-btn:hover {
          color: var(--gold-primary);
          padding-left: 4px;
        }

        .footer-newsletter-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .inquiries-desc {
          font-size: 0.85rem;
          color: var(--silver-muted);
          line-height: 1.5;
        }

        .inquiry-email {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--silver-light);
        }

        .footer-copyright-bar {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 30px;
          font-size: 0.75rem;
          color: var(--silver-muted);
          flex-wrap: wrap;
          gap: 12px;
        }

        /* 11. Back to top button */
        .back-to-top-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 850;
          transition: var(--transition-smooth);
        }

        .back-to-top-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 15px rgba(197, 160, 89, 0.25);
          background: rgba(197, 160, 89, 0.15);
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* Responsive Mobile Vault Adjustments */
        @media (max-width: 768px) {
          .trust-badges-bar {
            padding: 30px 0;
          }
          
          .badges-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          
          .badge-card {
            flex-direction: column;
            text-align: center;
            align-items: center;
            padding: 10px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.01);
            border: 1px solid rgba(255, 255, 255, 0.02);
          }
          
          .badge-icon {
            margin-bottom: 4px;
          }
          
          .badge-text strong {
            font-size: 0.8rem;
          }
          
          .badge-text span {
            font-size: 0.68rem;
          }
        }

        @media (max-width: 600px) {
          .catalog-section {
            padding: 70px 0;
          }
          
          .section-header-centered {
            margin-bottom: 32px;
          }
          
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px; /* tighter spacing for high end feel */
          }
          
          .footer-copyright-bar {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 8px;
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
}
