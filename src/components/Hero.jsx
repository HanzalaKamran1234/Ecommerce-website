import React from 'react';
import { ChevronDown, Play } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  const videoUrl = "https://mythicscentsations.com/cdn/shop/videos/c/vp/4e1af51a6ac0413a8f7c5352dbda11af/4e1af51a6ac0413a8f7c5352dbda11af.HD-1080p-7.2Mbps-76838236.mp4";

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

      {/* Hero Content Section */}
      <div className="hero-content animate-slide-up">
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

      {/* Scrolling Indicator */}
      <div className="scroll-indicator" onClick={onExploreClick}>
        <span className="scroll-text font-body">SCROLL TO DISCOVER</span>
        <ChevronDown className="arrow-down-bounce" size={18} />
      </div>

      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 120px 24px 60px; /* Offset for floating glass header */
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
          background: radial-gradient(circle, rgba(7, 7, 8, 0.4) 0%, rgba(7, 7, 8, 0.92) 100%);
        }

        .hero-content {
          max-width: 800px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 100px 16px 40px;
            height: auto;
            min-height: 100vh;
          }
          
          .hero-content {
            margin-top: 0;
          }
          
          .badge-luxury {
            margin-bottom: 16px;
            font-size: 0.65rem;
            letter-spacing: 0.15em;
          }
          
          .hero-subtitle {
            margin-bottom: 30px;
          }
        }

        .badge-luxury {
          color: var(--gold-primary);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          margin-bottom: 24px;
          padding: 6px 16px;
          background: rgba(197, 160, 89, 0.08);
          border: 1px solid rgba(197, 160, 89, 0.2);
          border-radius: 30px;
          box-shadow: 0 0 15px rgba(197, 160, 89, 0.05);
        }

        .hero-title {
          font-size: clamp(2.5rem, 8vw, 4.8rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin-bottom: 20px;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
        }

        .hero-subtitle {
          color: var(--silver-muted);
          font-size: clamp(0.95rem, 2.5vw, 1.15rem);
          line-height: 1.6;
          margin-bottom: 40px;
          max-width: 650px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .hero-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          z-index: 10;
          opacity: 0.7;
          transition: var(--transition-snappy);
        }

        .scroll-indicator:hover {
          opacity: 1;
        }

        .scroll-text {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          color: var(--silver-muted);
        }

        .arrow-down-bounce {
          color: var(--gold-primary);
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
          60% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </section>
  );
}
