import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  const videoUrl = "https://mythicscentsations.com/cdn/shop/videos/c/vp/4e1af51a6ac0413a8f7c5352dbda11af/4e1af51a6ac0413a8f7c5352dbda11af.HD-1080p-7.2Mbps-76838236.mp4";
  const heroImageUrl = "https://mythicscentsations.com/cdn/shop/files/WhatsAppImage2026-02-22at6.37.45AM.jpg?v=1771771085&width=3840";

  return (
    <section className="hero-section" id="home">
      {/* Background Video Layer */}
      <div className="video-background-container">
        <video 
          className="bg-video" 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://mythicscentsations.com/cdn/shop/files/WhatsApp_Image_2026-02-22_at_10.12.22_PM.jpg?v=1773156519"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Split Hero Layout Grid */}
      <div className="container-premium hero-grid-layout">
        
        {/* Left Side: Premium Brand Copy */}
        <div className="hero-left-col animate-slide-up">
          <div className="badge-luxury font-body">✨ THE ULTIMATE FRAGRANCE EXPERIENCE ✨</div>
          <h1 className="hero-title font-title gold-text-gradient">Mythic Scentsations</h1>
          <p className="hero-subtitle font-body">
            Your odyssey begins here. Explore our curated vault of elite hybrid perfumes, engineered to blend the DNA profiles of the world's finest scents into a single masterpiece.
          </p>
          <div className="hero-ctas">
            <button onClick={onExploreClick} className="premium-btn">
              Explore Collection
            </button>
          </div>
        </div>

        {/* Right Side: Perfume Bottle Picture Alongside Text */}
        <div className="hero-right-col animate-slide-up">
          <div className="hero-image-glow-ring"></div>
          <div className="hero-image-frame glass-morphism gold-border">
            <img 
              src={heroImageUrl} 
              alt="Mythic Scentsations Flagship Bottle" 
              className="hero-display-image"
            />
            <div className="hero-image-badge font-body">
              <Sparkles size={12} className="icon-gold" />
              <span>Signature Scent</span>
            </div>
          </div>
        </div>

      </div>

      {/* Scrolling Indicator */}
      <div className="scroll-indicator" onClick={onExploreClick}>
        <span className="scroll-text font-body">SCROLL TO DISCOVER</span>
        <ChevronDown className="arrow-down-bounce" size={18} />
      </div>

      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 130px 24px 80px; /* Precise top padding to clear header height cleanly */
        }

        .video-background-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        .bg-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(7, 7, 8, 0.5) 0%, rgba(7, 7, 8, 0.94) 100%);
        }

        /* Hero Split Grid Layout */
        .hero-grid-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
          width: 100%;
          z-index: 10;
        }

        .hero-left-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .badge-luxury {
          color: var(--gold-primary);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          margin-bottom: 20px;
          padding: 6px 16px;
          background: rgba(197, 160, 89, 0.08);
          border: 1px solid rgba(197, 160, 89, 0.2);
          border-radius: 30px;
          box-shadow: 0 0 15px rgba(197, 160, 89, 0.05);
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4.2rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.01em;
          margin-bottom: 20px;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
        }

        .hero-subtitle {
          color: var(--silver-muted);
          font-size: clamp(0.95rem, 2vw, 1.1rem);
          line-height: 1.6;
          margin-bottom: 36px;
          max-width: 580px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .hero-ctas {
          display: flex;
          justify-content: flex-start;
        }

        /* Right Column: Perfume Picture Alongside Copy */
        .hero-right-col {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-image-glow-ring {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(197, 160, 89, 0.16) 0%, transparent 70%);
          filter: blur(8px);
          animation: slowPulse 5s infinite alternate;
        }

        @keyframes slowPulse {
          0% { transform: scale(0.96); opacity: 0.6; }
          100% { transform: scale(1.04); opacity: 1; }
        }

        .hero-image-frame {
          position: relative;
          width: 100%;
          max-width: 320px;
          border-radius: 20px;
          padding: 16px;
          background: rgba(18, 19, 22, 0.45);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
          transition: var(--transition-smooth);
        }

        .hero-image-frame:hover {
          transform: translateY(-6px);
          box-shadow: 0 25px 50px rgba(197, 160, 89, 0.1);
        }

        .hero-display-image {
          width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 12px;
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.4));
        }

        .hero-image-badge {
          position: absolute;
          bottom: -10px;
          right: -10px;
          background: linear-gradient(135deg, var(--gold-accent) 0%, var(--gold-dark) 100%);
          color: var(--bg-deep);
          padding: 6px 12px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 0.68rem;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }

        /* Scrolling Indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          z-index: 10;
          opacity: 0.6;
          transition: var(--transition-snappy);
        }

        .scroll-indicator:hover {
          opacity: 0.95;
        }

        .scroll-text {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          color: var(--silver-muted);
        }

        .arrow-down-bounce {
          color: var(--gold-primary);
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .hero-grid-layout {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }
          
          .hero-left-col {
            align-items: center;
            text-align: center;
          }
          
          .hero-subtitle {
            margin-left: auto;
            margin-right: auto;
          }
          
          .hero-ctas {
            justify-content: center;
          }
          
          .hero-image-frame {
            max-width: 260px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 110px 16px 60px;
            height: auto;
          }
          
          .badge-luxury {
            margin-bottom: 16px;
            font-size: 0.65rem;
            letter-spacing: 0.15em;
          }
          
          .hero-title {
            margin-bottom: 16px;
          }
          
          .hero-subtitle {
            margin-bottom: 28px;
          }
        }
      `}</style>
    </section>
  );
}
