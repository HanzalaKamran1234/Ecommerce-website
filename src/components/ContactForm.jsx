import React, { useState } from 'react';
import { Mail, Send, PhoneCall, MapPin, CheckCircle, RefreshCw, User, HelpCircle, MessageSquare } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [newsEmail, setNewsEmail] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [isSubmittingNews, setIsSubmittingNews] = useState(false);
  const [newsSuccess, setNewsSuccess] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmittingContact(true);
    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setContactSuccess(false), 5000);
    }, 1500);
  };

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    if (!newsEmail) return;

    setIsSubmittingNews(true);
    setTimeout(() => {
      setIsSubmittingNews(false);
      setNewsSuccess(true);
      setNewsEmail('');
      
      setTimeout(() => setNewsSuccess(false), 5000);
    }, 1200);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container-premium contact-grid">
        
        {/* Left Side: Brand Story & Coordinates */}
        <div className="brand-coordinates-panel animate-slide-up">
          <div className="badge-luxury font-body">CONNECT WITH US</div>
          <h2 className="contact-title font-title gold-text-gradient">The Scent Vault HQ</h2>
          <p className="contact-subtitle font-body">
            Have questions regarding our fragrance hybridizations or custom orders? Reach out directly. Our client success specialists are ready to curate your perfume experience.
          </p>

          <div className="coordinates-list font-body">
            <div className="coordinate-item gold-border">
              <div className="icon-wrap"><Mail size={18} /></div>
              <div className="coordinate-meta">
                <span className="label">Electronic Mail</span>
                <span className="value">concierge@mythicscentsations.com</span>
              </div>
            </div>

            <div className="coordinate-item gold-border">
              <div className="icon-wrap"><PhoneCall size={18} /></div>
              <div className="coordinate-meta">
                <span className="label">Concierge Hotline</span>
                <span className="value">+92 300 1234567</span>
              </div>
            </div>

            <div className="coordinate-item gold-border">
              <div className="icon-wrap"><MapPin size={18} /></div>
              <div className="coordinate-meta">
                <span className="label">Fragrance Laboratory</span>
                <span className="value">Scent Mansion Sector 5, DHA Phase 6, Lahore, PK</span>
              </div>
            </div>
          </div>

          {/* Newsletter Panel */}
          <div className="newsletter-box glass-morphism gold-border font-body">
            <h3 className="newsletter-title font-title">Join the Inner Vault</h3>
            <p className="newsletter-desc">Subscribe to receive exclusive launches, surprise golden coupons, and scent guides.</p>
            
            {newsSuccess ? (
              <div className="success-toast animate-fade-in">
                <CheckCircle size={16} />
                <span>You have successfully entered the vault! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsSubmit} className="newsletter-form">
                <input 
                  type="email" 
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  placeholder="Enter email address" 
                  required
                  className="news-input"
                />
                <button type="submit" disabled={isSubmittingNews} className="premium-btn news-btn">
                  {isSubmittingNews ? <RefreshCw size={14} className="animate-spin" /> : 'Join'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Side: Message Concierge Form */}
        <div className="message-form-panel glass-morphism gold-border animate-slide-up">
          <h3 className="form-header font-title gold-text-gradient">Message Our Concierge</h3>
          <p className="form-desc font-body">Complete the coordinates below and our master curators will respond within 24 business hours.</p>
          
          {contactSuccess ? (
            <div className="form-success-container font-body animate-fade-in">
              <CheckCircle size={36} className="icon-gold animate-bounce" />
              <h4 className="success-title font-title">Message Received!</h4>
              <p className="success-desc">
                Your message has been logged securely at our desk. A concierge will be in touch with you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="contact-form font-body">
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="contact-name">Your Name</label>
                  <div className="input-wrapper-with-icon">
                    <User className="input-field-icon" size={16} />
                    <input 
                      id="contact-name"
                      type="text" 
                      placeholder="e.g. Hammad Khan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="glass-input-premium"
                    />
                  </div>
                </div>
                
                <div className="input-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <div className="input-wrapper-with-icon">
                    <Mail className="input-field-icon" size={16} />
                    <input 
                      id="contact-email"
                      type="email" 
                      placeholder="e.g. hammad@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="glass-input-premium"
                    />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="contact-subject">Subject (Optional)</label>
                <div className="input-wrapper-with-icon">
                  <HelpCircle className="input-field-icon" size={16} />
                  <input 
                    id="contact-subject"
                    type="text" 
                    placeholder="How can we assist you today?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="glass-input-premium"
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="contact-message">Scent Inquiry / Message</label>
                <div className="input-wrapper-with-icon text-area-wrapper">
                  <MessageSquare className="input-field-icon text-area-icon" size={16} />
                  <textarea 
                    id="contact-message"
                    placeholder="Describe your request in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="glass-input-premium glass-textarea-premium"
                    rows={5}
                  />
                </div>
              </div>

              <button type="submit" disabled={isSubmittingContact} className="premium-btn send-message-btn">
                {isSubmittingContact ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" style={{ marginRight: '8px' }} />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={16} style={{ marginRight: '8px' }} />
                    Transmit Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>

      <style>{`
        .contact-section {
          padding: 120px 0;
          background: #070708;
          border-top: 1px solid rgba(197, 160, 89, 0.1);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 60px;
          align-items: flex-start;
        }

        .brand-coordinates-panel {
          display: flex;
          flex-direction: column;
        }

        .contact-title {
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 700;
          line-height: 1.2;
          margin: 12px 0 20px;
        }

        .contact-subtitle {
          color: var(--silver-muted);
          line-height: 1.6;
          margin-bottom: 32px;
          font-size: 0.95rem;
        }

        /* Coordinates list */
        .coordinates-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
        }

        .coordinate-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-radius: var(--border-radius-premium);
          background: rgba(255, 255, 255, 0.01);
          transition: var(--transition-snappy);
        }

        .coordinate-item:hover {
          transform: translateX(4px);
          background: rgba(197, 160, 89, 0.03);
          border-color: rgba(197, 160, 89, 0.3);
        }

        .icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(197, 160, 89, 0.1);
          color: var(--gold-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .coordinate-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .coordinate-meta .label {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--silver-muted);
        }

        .coordinate-meta .value {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--silver-light);
        }

        /* Newsletter Panel box */
        .newsletter-box {
          padding: 24px;
          border-radius: var(--border-radius-premium);
          background: rgba(18, 19, 22, 0.4);
        }

        .newsletter-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--silver-light);
          margin-bottom: 8px;
        }

        .newsletter-desc {
          font-size: 0.82rem;
          color: var(--silver-muted);
          line-height: 1.4;
          margin-bottom: 20px;
        }

        .newsletter-form {
          display: flex;
          border: 1px solid rgba(197, 160, 89, 0.2);
          background: #181a1f;
          border-radius: 12px;
          overflow: hidden;
          padding: 2px;
        }

        .news-input {
          flex-grow: 1;
          background: transparent;
          border: none;
          color: var(--silver-light);
          padding: 10px 14px;
          font-size: 0.8rem;
          font-family: var(--font-family-body);
        }

        .news-input:focus {
          outline: none;
        }

        .news-btn {
          border-radius: 10px !important;
          padding: 8px 20px !important;
        }

        .success-toast {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--color-success);
          font-size: 0.82rem;
          padding: 10px;
          border-radius: 8px;
          background: rgba(139, 168, 136, 0.05);
        }

        /* Message submission form card */
        .message-form-panel {
          padding: 40px;
          border-radius: var(--border-radius-premium);
          background: rgba(18, 19, 22, 0.35);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .form-header {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }

        .form-desc {
          color: var(--silver-muted);
          font-size: 0.88rem;
          line-height: 1.4;
          margin-bottom: 32px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .input-row {
          display: flex;
          gap: 20px;
        }

        .input-row .input-group {
          flex: 1;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--silver-muted);
          margin-left: 2px;
        }

        /* Luxury Wrapper for Inputs with Icons */
        .input-wrapper-with-icon {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .input-field-icon {
          position: absolute;
          left: 16px;
          color: rgba(197, 160, 89, 0.45);
          transition: var(--transition-snappy);
          pointer-events: none;
        }

        .text-area-wrapper {
          align-items: flex-start;
        }

        .text-area-icon {
          top: 14px;
        }

        .glass-input-premium {
          width: 100%;
          background: rgba(13, 14, 17, 0.7);
          border: 1px solid rgba(197, 160, 89, 0.15);
          color: var(--silver-light);
          padding: 12px 16px 12px 48px;
          border-radius: 12px;
          font-size: 0.9rem;
          font-family: var(--font-family-body);
          transition: var(--transition-smooth);
        }

        .glass-textarea-premium {
          resize: none;
        }

        /* Focus interactions */
        .glass-input-premium:focus {
          outline: none;
          background: rgba(18, 19, 22, 0.95);
          border-color: var(--gold-primary);
          box-shadow: 0 0 15px rgba(197, 160, 89, 0.15);
        }

        .glass-input-premium:focus + .input-field-icon,
        .input-wrapper-with-icon:focus-within .input-field-icon {
          color: var(--gold-primary);
          transform: scale(1.08);
          filter: drop-shadow(0 0 5px rgba(197, 160, 89, 0.3));
        }

        .send-message-btn {
          width: 100%;
          height: 50px;
          margin-top: 12px;
          border-radius: 12px !important;
          font-size: 0.88rem;
          letter-spacing: 0.12em;
        }

        /* Success screen within form */
        .form-success-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 20px;
        }

        .form-success-container .success-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--silver-light);
          margin-top: 16px;
          margin-bottom: 8px;
        }

        .form-success-container .success-desc {
          font-size: 0.88rem;
          color: var(--silver-muted);
          line-height: 1.5;
          max-width: 280px;
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 576px) {
          .input-row {
            flex-direction: column;
            gap: 24px;
          }
          .message-form-panel {
            padding: 32px 20px;
          }
        }
      `}</style>
    </section>
  );
}
