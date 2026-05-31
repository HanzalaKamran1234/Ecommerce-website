import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, Sparkles, Tag, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({ cartItems, onClose, onUpdateQty, onRemoveItem, onCheckoutSuccess }) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null); // { code, amount, type }
  const [couponError, setCouponError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'shipping', 'success'
  const [address, setAddress] = useState({ name: '', phone: '', city: '', address: '' });

  const freeShippingThreshold = 3000;

  // Calculate pricing
  const subtotal = cartItems.reduce((acc, item) => {
    // Parse numeric price from string e.g. "Rs.2,449.00" -> 2449
    const priceNum = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return acc + (priceNum * item.quantity);
  }, 0);

  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 250;
  
  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.type === 'percentage') {
      discountAmount = subtotal * (appliedDiscount.value / 100);
    } else if (appliedDiscount.type === 'flat') {
      discountAmount = Math.min(subtotal, appliedDiscount.value);
    }
  }

  const grandTotal = Math.max(0, subtotal + shippingCost - discountAmount);

  // Free shipping progress variables
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFree = freeShippingThreshold - subtotal;

  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'MYTHICGOLD') {
      setAppliedDiscount({ code: 'MYTHICGOLD', value: 10, type: 'percentage' });
      setCouponCode('');
    } else if (code === 'WELCOME5') {
      setAppliedDiscount({ code: 'WELCOME5', value: 500, type: 'flat' });
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code. Try "MYTHICGOLD" or "WELCOME5"');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscount(null);
  };

  const handleFormChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!address.name || !address.phone || !address.address || !address.city) {
      alert("Please fill in all checkout fields.");
      return;
    }

    setIsCheckingOut(true);
    
    // Simulate premium payment API call
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutStep('success');
      
      // Beautiful luxury success celebration!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#E5C483', '#8E6B2C', '#FFFFFF', '#000000']
      });

      // Clear the cart on success
      setTimeout(() => {
        onCheckoutSuccess();
      }, 500);
    }, 2000);
  };

  return (
    <div className="drawer-backdrop animate-fade-in" onClick={onClose}>
      <div className="cart-drawer glass-morphism gold-border" onClick={(e) => e.stopPropagation()}>
        
        {/* Drawer Header */}
        <div className="drawer-header border-bottom">
          <div className="drawer-title-row">
            <Gift size={20} className="icon-gold animate-pulse" />
            <h2 className="drawer-title font-title gold-text-gradient">
              {checkoutStep === 'cart' ? 'Shopping Cart' : checkoutStep === 'shipping' ? 'Secure Checkout' : 'Order Placed!'}
            </h2>
          </div>
          <button className="drawer-close" onClick={onClose} aria-label="Close cart">
            <X size={20} className="icon-gold" />
          </button>
        </div>

        {/* Content body split by checkoutStep */}
        {checkoutStep === 'success' ? (
          <div className="checkout-success-pane font-body animate-slide-up">
            <div className="success-icon-wrap">
              <Sparkles size={48} className="icon-gold animate-bounce" />
            </div>
            <h3 className="success-title font-title">Your Odyssey Begins!</h3>
            <p className="success-desc">
              Your order has been recorded successfully. Our premium delivery courier will dispatch your select scents shortly. Thank you for choosing **Mythic Scentsations**!
            </p>
            <div className="success-order-details glass-morphism gold-border">
              <div className="detail-row">
                <span>Receiver:</span>
                <span>{address.name}</span>
              </div>
              <div className="detail-row">
                <span>Phone:</span>
                <span>{address.phone}</span>
              </div>
              <div className="detail-row">
                <span>Destination:</span>
                <span>{address.city}</span>
              </div>
              <div className="detail-row">
                <span>Payment Mode:</span>
                <span className="gold-text font-title">Cash on Delivery</span>
              </div>
            </div>
            <button onClick={onClose} className="premium-btn return-btn">
              Back to Catalog
            </button>
          </div>
        ) : (
          <>
            {/* Main scrollable cart container */}
            <div className="drawer-content">
              {checkoutStep === 'cart' ? (
                <>
                  {/* Free shipping calculator progress bar */}
                  {cartItems.length > 0 && (
                    <div className="shipping-progress-box font-body gold-border">
                      <div className="progress-labels">
                        {remainingForFree > 0 ? (
                          <span>Add <strong className="gold-text">Rs.{remainingForFree.toLocaleString()}</strong> more for <strong>FREE DELIVERY!</strong></span>
                        ) : (
                          <span className="gold-text">🎉 <strong>Congratulations! You have unlocked FREE DELIVERY!</strong></span>
                        )}
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                      </div>
                    </div>
                  )}

                  {cartItems.length === 0 ? (
                    <div className="empty-cart-pane font-body">
                      <ShoppingBag size={48} className="icon-gold-dimmed" />
                      <p className="empty-title font-title">Your Cart is Empty</p>
                      <p className="empty-subtitle">Explore our luxurious scent vault and add items to your cart.</p>
                      <button onClick={onClose} className="premium-btn return-btn">Explore Now</button>
                    </div>
                  ) : (
                    <div className="cart-items-list">
                      {cartItems.map((item) => {
                        const priceNum = parseFloat(item.price.replace(/[^\d.]/g, ''));
                        return (
                          <div key={item.id} className="cart-item glass-morphism gold-border font-body">
                            <img 
                              src={item.img.startsWith('//') ? `https:${item.img}` : item.img} 
                              alt={item.title} 
                              className="item-thumb"
                            />
                            <div className="item-meta">
                              <h4 className="item-title font-title">{item.title}</h4>
                              <div className="item-price">{item.price}</div>
                              
                              <div className="item-controls">
                                <div className="qty-selectors">
                                  <button onClick={() => onUpdateQty(item.id, item.quantity - 1)} className="qty-action-btn"><Minus size={12} /></button>
                                  <span className="qty-num">{item.quantity}</span>
                                  <button onClick={() => onUpdateQty(item.id, item.quantity + 1)} className="qty-action-btn"><Plus size={12} /></button>
                                </div>
                                <button onClick={() => onRemoveItem(item.id)} className="item-remove-btn" title="Remove item">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                            <div className="item-total-price">
                              Rs.{(priceNum * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                /* Shipping Checkout Form */
                <form onSubmit={handleCheckoutSubmit} className="checkout-form font-body animate-slide-up">
                  <h3 className="checkout-section-title font-title">Delivery Coordinates</h3>
                  
                  <div className="input-group">
                    <label htmlFor="checkout-name">Full Name</label>
                    <input 
                      id="checkout-name"
                      type="text" 
                      name="name" 
                      value={address.name} 
                      onChange={handleFormChange} 
                      required 
                      placeholder="Enter full name"
                      className="glass-input"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="checkout-phone">Phone Number</label>
                    <input 
                      id="checkout-phone"
                      type="tel" 
                      name="phone" 
                      value={address.phone} 
                      onChange={handleFormChange} 
                      required 
                      placeholder="e.g. 03001234567"
                      className="glass-input"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="checkout-city">City</label>
                    <input 
                      id="checkout-city"
                      type="text" 
                      name="city" 
                      value={address.city} 
                      onChange={handleFormChange} 
                      required 
                      placeholder="e.g. Lahore, Karachi, Islamabad"
                      className="glass-input"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="checkout-address">Delivery Address</label>
                    <textarea 
                      id="checkout-address"
                      name="address" 
                      value={address.address} 
                      onChange={handleFormChange} 
                      required 
                      placeholder="House/Apartment #, Street, Sector"
                      className="glass-input"
                      rows={3}
                    />
                  </div>

                  <div className="cod-badge glass-morphism gold-border">
                    <CreditCard className="icon-gold" size={16} />
                    <span><strong>Payment Mode:</strong> Cash on Delivery (COD)</span>
                  </div>

                  <div className="checkout-form-actions">
                    <button type="button" onClick={() => setCheckoutStep('cart')} className="premium-btn-secondary back-btn">
                      Back to Cart
                    </button>
                    <button type="submit" disabled={isCheckingOut} className="premium-btn submit-order-btn">
                      {isCheckingOut ? 'Securing Order...' : `Confirm Order — Rs.${grandTotal.toLocaleString()}`}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sticky Pricing Summary Footer */}
            {cartItems.length > 0 && (
              <div className="drawer-footer border-top font-body">
                {checkoutStep === 'cart' && (
                  /* Coupon Box */
                  <div className="coupon-box">
                    {appliedDiscount ? (
                      <div className="applied-coupon glass-morphism gold-border animate-fade-in">
                        <div className="applied-meta">
                          <Tag size={12} className="icon-gold" />
                          <span>Code: <strong>{appliedDiscount.code}</strong> (-{appliedDiscount.type === 'percentage' ? `${appliedDiscount.value}%` : `Rs.${appliedDiscount.value}`})</span>
                        </div>
                        <button onClick={handleRemoveCoupon} className="remove-coupon-btn"><X size={12} /></button>
                      </div>
                    ) : (
                      <div className="coupon-input-group">
                        <input 
                          id="cart-coupon"
                          type="text" 
                          placeholder="Promo code (e.g. MYTHICGOLD)" 
                          value={couponCode} 
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="coupon-input"
                        />
                        <button onClick={handleApplyCoupon} className="coupon-btn font-body">Apply</button>
                      </div>
                    )}
                    {couponError && <p className="coupon-error-text">{couponError}</p>}
                  </div>
                )}

                {/* Bill Breakdown */}
                <div className="bill-breakdown">
                  <div className="bill-row">
                    <span>Subtotal:</span>
                    <span>Rs.{subtotal.toLocaleString()}</span>
                  </div>
                  
                  {discountAmount > 0 && (
                    <div className="bill-row discount-row">
                      <span>Discount:</span>
                      <span>-Rs.{discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="bill-row">
                    <span>Estimated Shipping:</span>
                    <span>{shippingCost === 0 ? 'FREE' : `Rs.${shippingCost}`}</span>
                  </div>

                  <div className="bill-row total-row font-title">
                    <span>Total Amount:</span>
                    <span className="gold-text-gradient">Rs.{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {checkoutStep === 'cart' && (
                  <button onClick={() => setCheckoutStep('shipping')} className="premium-btn checkout-action-btn">
                    Secure Checkout
                  </button>
                )}
              </div>
            )}
          </>
        )}

      </div>

      <style>{`
        .cart-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 100vw;
          max-width: 460px;
          height: 100vh;
          z-index: 1010;
          display: flex;
          flex-direction: column;
          box-shadow: -15px 0 45px rgba(0, 0, 0, 0.7);
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          background: rgba(18, 19, 22, 0.95);
        }

        .border-bottom {
          border-bottom: 1px solid rgba(197, 160, 89, 0.15);
        }

        .border-top {
          border-top: 1px solid rgba(197, 160, 89, 0.15);
        }

        .drawer-header {
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .drawer-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .drawer-title {
          font-size: 1.35rem;
          font-weight: 700;
        }

        .drawer-close {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px;
        }

        /* Drawer scrollable content area */
        .drawer-content {
          flex-grow: 1;
          overflow-y: auto;
          padding: 24px;
        }

        /* Shipping bar inside cart */
        .shipping-progress-box {
          padding: 14px;
          border-radius: 12px;
          margin-bottom: 24px;
          background: rgba(255, 255, 255, 0.02);
          font-size: 0.8rem;
        }

        .progress-labels {
          display: flex;
          justify-content: center;
          margin-bottom: 8px;
          text-align: center;
        }

        .progress-track {
          width: 100%;
          height: 6px;
          background: #1e2025;
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--gold-dark) 0%, var(--gold-primary) 50%, var(--gold-light) 100%);
          border-radius: 3px;
          transition: width 0.4s ease-out;
        }

        /* Empty Cart elements */
        .empty-cart-pane {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 60vh;
          text-align: center;
        }

        .icon-gold-dimmed {
          color: rgba(197, 160, 89, 0.25);
          margin-bottom: 20px;
        }

        .empty-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--silver-light);
          margin-bottom: 8px;
        }

        .empty-subtitle {
          font-size: 0.88rem;
          color: var(--silver-muted);
          max-width: 250px;
          margin-bottom: 24px;
          line-height: 1.4;
        }

        /* Item blocks */
        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cart-item {
          display: flex;
          gap: 16px;
          padding: 16px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          align-items: center;
        }

        .item-thumb {
          width: 64px;
          height: 64px;
          object-fit: cover;
          border-radius: 8px;
          background: #0d0e10;
        }

        .item-meta {
          flex-grow: 1;
        }

        .item-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--silver-light);
          margin-bottom: 4px;
        }

        .item-price {
          font-size: 0.85rem;
          color: var(--gold-primary);
          margin-bottom: 8px;
        }

        .item-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .qty-selectors {
          display: flex;
          align-items: center;
          background: #181a1f;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.05);
          padding: 2px 4px;
        }

        .qty-action-btn {
          background: transparent;
          border: none;
          color: var(--silver-muted);
          width: 24px;
          height: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-snappy);
        }

        .qty-action-btn:hover {
          color: var(--gold-primary);
        }

        .qty-num {
          font-size: 0.85rem;
          width: 20px;
          text-align: center;
          color: var(--silver-light);
        }

        .item-remove-btn {
          background: transparent;
          border: none;
          color: var(--silver-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
          transition: var(--transition-snappy);
        }

        .item-remove-btn:hover {
          color: var(--color-error);
        }

        .item-total-price {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--silver-light);
          align-self: flex-start;
          padding-top: 4px;
        }

        /* Billing Summary footer sticky block */
        .drawer-footer {
          padding: 24px;
          background: rgba(13, 14, 17, 0.95);
        }

        .coupon-box {
          margin-bottom: 20px;
        }

        .coupon-input-group {
          display: flex;
          border: 1px solid rgba(197, 160, 89, 0.2);
          background: #181a1f;
          border-radius: 12px;
          overflow: hidden;
          padding: 2px;
        }

        .coupon-input {
          flex-grow: 1;
          background: transparent;
          border: none;
          color: var(--silver-light);
          padding: 10px 14px;
          font-size: 0.8rem;
          font-family: var(--font-family-body);
        }

        .coupon-input:focus {
          outline: none;
        }

        .coupon-btn {
          background: var(--gold-primary);
          color: var(--bg-deep);
          border: none;
          padding: 8px 18px;
          border-radius: 10px;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-snappy);
        }

        .coupon-btn:hover {
          background: var(--gold-light);
        }

        .applied-coupon {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 16px;
          border-radius: 12px;
          background: rgba(197, 160, 89, 0.05);
          font-size: 0.8rem;
        }

        .applied-meta {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .remove-coupon-btn {
          background: transparent;
          border: none;
          color: var(--silver-muted);
          cursor: pointer;
        }

        .coupon-error-text {
          color: var(--color-error);
          font-size: 0.75rem;
          margin-top: 6px;
          padding-left: 4px;
        }

        .bill-breakdown {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
          font-size: 0.85rem;
        }

        .bill-row {
          display: flex;
          justify-content: space-between;
          color: var(--silver-muted);
        }

        .discount-row {
          color: var(--color-success);
        }

        .total-row {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--silver-light);
          border-top: 1px solid rgba(255,255,255,0.04);
          padding-top: 12px;
          margin-top: 4px;
        }

        .checkout-action-btn {
          width: 100%;
          height: 48px;
          border-radius: 12px !important;
        }

        /* Checkout Address Form block */
        .checkout-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .checkout-section-title {
          font-size: 1.15rem;
          font-weight: 600;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(197, 160, 89, 0.1);
          padding-bottom: 6px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-group label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--silver-muted);
        }

        .glass-input {
          background: #181a1f;
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--silver-light);
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 0.88rem;
          font-family: var(--font-family-body);
          transition: var(--transition-snappy);
          width: 100%;
        }

        .glass-input:focus {
          outline: none;
          border-color: var(--gold-primary);
          box-shadow: 0 0 10px rgba(197, 160, 89, 0.1);
        }

        .cod-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          border-radius: 10px;
          background: rgba(197, 160, 89, 0.05);
          font-size: 0.8rem;
          margin-top: 8px;
        }

        .checkout-form-actions {
          display: flex;
          gap: 12px;
          margin-top: 12px;
        }

        .back-btn {
          flex: 1;
          height: 44px;
          border-radius: 10px !important;
          padding: 0 !important;
          font-size: 0.75rem;
        }

        .submit-order-btn {
          flex: 2;
          height: 44px;
          border-radius: 10px !important;
          font-size: 0.75rem;
        }

        /* Success screen pane */
        .checkout-success-pane {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 80vh;
          text-align: center;
          padding: 24px;
        }

        .success-icon-wrap {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(197, 160, 89, 0.08);
          border: 1.5px solid var(--gold-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          box-shadow: 0 0 25px rgba(197, 160, 89, 0.15);
        }

        .success-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--silver-light);
          margin-bottom: 12px;
        }

        .success-desc {
          font-size: 0.88rem;
          color: var(--silver-muted);
          line-height: 1.5;
          margin-bottom: 32px;
          max-width: 320px;
        }

        .success-order-details {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.01);
          margin-bottom: 36px;
          font-size: 0.82rem;
          text-align: left;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          color: var(--silver-muted);
        }

        .detail-row:not(:last-child) {
          border-bottom: 1px solid rgba(255,255,255,0.02);
        }

        .return-btn {
          width: 100%;
          max-width: 250px;
          height: 44px;
          border-radius: 10px !important;
        }
      `}</style>
    </div>
  );
}
