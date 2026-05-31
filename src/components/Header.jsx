import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Phone, Compass, Home as HomeIcon } from 'lucide-react';

export default function Header({ cartCount, onCartClick, onNavClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    onNavClick(sectionId);
  };

  return (
    <>
      <header className={`fixed-header ${scrolled ? 'scrolled glass-navbar' : 'transparent-navbar'}`}>
        <div className="header-container">
          {/* Logo with luxurious typography */}
          <div className="logo-section" onClick={() => handleLinkClick('home')}>
            <span className="logo-brand font-title gold-text-gradient">Mythic Scentsations</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <button onClick={() => handleLinkClick('home')} className="nav-link font-body">Home</button>
            <button onClick={() => handleLinkClick('catalog')} className="nav-link font-body">Scents</button>
            <button onClick={() => handleLinkClick('contact')} className="nav-link font-body">Contact</button>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <button onClick={onCartClick} className="cart-trigger-btn" aria-label="Open Cart">
              <ShoppingBag className="icon-gold" size={22} />
              {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
            </button>
            
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="mobile-menu-trigger" aria-label="Toggle Menu">
              {isMobileMenuOpen ? <X size={24} className="icon-gold" /> : <Menu size={24} className="icon-gold" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer glass-morphism gold-border" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <span className="logo-brand font-title gold-text-gradient">Mythic Scentsations</span>
              <button className="drawer-close" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={22} className="icon-gold" />
              </button>
            </div>
            <nav className="mobile-nav">
              <button onClick={() => handleLinkClick('home')} className="mobile-nav-link font-body">
                <HomeIcon size={18} /> Home
              </button>
              <button onClick={() => handleLinkClick('catalog')} className="mobile-nav-link font-body">
                <Compass size={18} /> Scents Catalog
              </button>
              <button onClick={() => handleLinkClick('contact')} className="mobile-nav-link font-body">
                <Phone size={18} /> Contact Us
              </button>
            </nav>
            <div className="mobile-drawer-footer">
              <p className="footer-copyright font-body">© 2026 Mythic Scentsations.</p>
              <p className="footer-tagline font-title gold-text-gradient">Your odyssey begins here.</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .fixed-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          z-index: 900;
          transition: var(--transition-smooth);
          display: flex;
          align-items: center;
        }
        
        .transparent-navbar {
          background: rgba(7, 7, 8, 0.2);
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }
        
        .scrolled {
          height: 70px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
        }
        
        .header-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .logo-section {
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        
        .logo-brand {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          user-select: none;
        }

        .font-title {
          font-family: var(--font-family-title);
        }

        .font-body {
          font-family: var(--font-family-body);
        }
        
        .desktop-nav {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        
        .nav-link {
          background: transparent;
          border: none;
          color: var(--silver-light);
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 8px 0;
          position: relative;
          transition: var(--transition-snappy);
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--gold-primary);
          transition: var(--transition-smooth);
        }
        
        .nav-link:hover {
          color: var(--gold-primary);
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .cart-trigger-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          transition: var(--transition-snappy);
          border-radius: 50%;
        }
        
        .cart-trigger-btn:hover {
          background: rgba(197, 160, 89, 0.1);
          transform: scale(1.05);
        }
        
        .icon-gold {
          color: var(--gold-primary);
          transition: var(--transition-snappy);
        }
        
        .cart-trigger-btn:hover .icon-gold {
          color: var(--gold-light);
        }
        
        .cart-count-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: linear-gradient(135deg, var(--gold-accent) 0%, var(--gold-dark) 100%);
          color: var(--bg-deep);
          font-size: 0.7rem;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--bg-deep);
        }
        
        .mobile-menu-trigger {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
        }
        
        /* Mobile Drawer styles */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 1000;
        }
        
        .mobile-menu-drawer {
          position: absolute;
          top: 0;
          right: 0;
          width: 80%;
          max-width: 320px;
          height: 100%;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 48px;
        }
        
        .drawer-close {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        
        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .mobile-nav-link {
          background: transparent;
          border: none;
          color: var(--silver-light);
          font-size: 1.1rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          transition: var(--transition-snappy);
          text-align: left;
          width: 100%;
        }
        
        .mobile-nav-link:hover {
          color: var(--gold-primary);
          padding-left: 8px;
        }
        
        .mobile-drawer-footer {
          margin-top: auto;
          text-align: center;
          border-top: 1px solid rgba(197, 160, 89, 0.1);
          padding-top: 24px;
        }
        
        .footer-copyright {
          font-size: 0.75rem;
          color: var(--silver-muted);
          margin-bottom: 8px;
        }
        
        .footer-tagline {
          font-size: 0.95rem;
          font-style: italic;
        }
        
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          
          .mobile-menu-trigger {
            display: flex;
          }
          
          .logo-brand {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </>
  );
}
