// ============================================
// MENTONE EDUCATIONAL — PAGE UTILITIES
// ============================================

// Simple cart state (replace with real backend)
const cart = {
  items: [
    { id: 1, name: '4-Part Brain Model', brand: '3B Scientific', sku: 'C18', price: 189.00, qty: 1 },
    { id: 2, name: 'CPR Manikin Adult', brand: 'Prestan', sku: 'PP-MANIKIN-1', price: 245.00, qty: 2 },
  ],
  getCount() { return this.items.reduce((sum, i) => sum + i.qty, 0); },
  getSubtotal() { return this.items.reduce((sum, i) => sum + i.price * i.qty, 0); },
};

// Format currency AUD
function formatPrice(amount) {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);
}

// Add to cart feedback
function addToCart(productId, productName) {
  showToast(`✓ ${productName} added to cart`);
}

// Add to Cart button — success state animation
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.product-card-footer .btn-primary:not([disabled])');
  if (!btn || btn.dataset.adding) return;
  btn.dataset.adding = 'true';
  const originalText = btn.textContent;
  btn.classList.add('btn-added');
  btn.textContent = 'Added to Cart';
  setTimeout(() => {
    btn.classList.remove('btn-added');
    btn.textContent = originalText;
    delete btn.dataset.adding;
  }, 2000);
});

// Enquiry modal
function openEnquiry(productName) {
  const subject = document.getElementById('enquiry-subject');
  if (subject) subject.value = `Enquire about ${productName}`;
  const overlay = document.getElementById('enquiry-overlay');
  if (overlay) { overlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
}
function closeEnquiry() {
  const overlay = document.getElementById('enquiry-overlay');
  if (overlay) { overlay.classList.remove('active'); document.body.style.overflow = ''; }
}
function handleEnquiryOverlayClick(e) {
  if (e.target === e.currentTarget) closeEnquiry();
}
function submitEnquiry(e) {
  e.preventDefault();
  closeEnquiry();
  showToast("✓ Enquiry submitted. We'll be in touch soon!");
}

// Simple toast notification
function showToast(message, type = 'success') {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.style.cssText = `
    position: fixed; bottom: 24px; right: 24px; z-index: 9999;
    background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
    color: white; padding: 12px 20px; border-radius: 8px;
    font-size: 14px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transform: translateY(20px); opacity: 0;
    transition: all 0.25s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Quantity selector
function updateQty(btn, delta) {
  const input = btn.parentElement.querySelector('.qty-input');
  const current = parseInt(input.value) || 1;
  const next = Math.max(1, current + delta);
  input.value = next;
}

// Hero parallax — image moves up at ~40% of scroll speed
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  let ticking = false;
  function update() {
    hero.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.4}px)`;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
})();

// Accordion filter toggles
document.addEventListener('DOMContentLoaded', () => {
  // Featured carousel arrows
  const featuredTrack = document.getElementById('featured-track');
  if (featuredTrack) {
    const cardWidth = () => featuredTrack.querySelector('.product-card').offsetWidth + 24;
    document.querySelector('.carousel-btn-prev')?.addEventListener('click', () => {
      featuredTrack.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
    });
    document.querySelector('.carousel-btn-next')?.addEventListener('click', () => {
      featuredTrack.scrollBy({ left: cardWidth(), behavior: 'smooth' });
    });
  }

  // Category carousel arrows
  const categoryTrack = document.getElementById('category-track');
  if (categoryTrack) {
    const catCardWidth = () => categoryTrack.querySelector('.category-card').offsetWidth + 16;
    document.querySelector('.category-carousel-btn-prev')?.addEventListener('click', () => {
      categoryTrack.scrollBy({ left: -catCardWidth(), behavior: 'smooth' });
    });
    document.querySelector('.category-carousel-btn-next')?.addEventListener('click', () => {
      categoryTrack.scrollBy({ left: catCardWidth(), behavior: 'smooth' });
    });
  }

  document.querySelectorAll('.filter-group-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isOpen = body.style.display !== 'none';
      body.style.display = isOpen ? 'none' : 'block';
      header.querySelector('.filter-arrow').textContent = isOpen ? '▾' : '▴';
    });
  });

  // Close modal on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.style.display = 'none';
    });
  });
});
