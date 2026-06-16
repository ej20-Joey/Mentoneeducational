// ============================================
// MENTONE EDUCATIONAL — SHARED COMPONENTS
// Injects header and footer into all pages
// ============================================

// Returns the path prefix needed to reach the Website root from the current page.
// Pages in account/, discovery/, info/, purchase/, error/ are one level deep → '../'
// Pages at the root (index.html, interstitial.html) need no prefix → ''
function getBasePath() {
  const inSubdir = /\/(account|discovery|info|purchase|error)\//.test(window.location.pathname);
  return inSubdir ? '../' : '';
}

function buildHeader(base) {
  const assetBase = base;
  return `
<div class="top-bar">
  <div class="container">
    <div class="top-bar-left">
      <span>📞 (03) 9547 6638</span>
      <span>✉ sales@mentone-educational.com.au</span>
      <span>🇦🇺 Australian Owned Since 1979</span>
    </div>
    <div class="top-bar-right">
      <a href="${base}info/about.html">About Us</a>
      <a href="${base}info/contact.html">Contact</a>
      <a href="#">Healthcare Professionals →</a>
    </div>
  </div>
</div>

<header class="site-header">
  <div class="container">
    <div class="header-main">
      <a href="${base}index.html" class="header-logo">
        <img src="${assetBase}assets/Logo/Mentone_Logo.png" alt="Mentone Educational" class="header-logo-img">
      </a>
      <div class="header-search">
        <form class="search-form" onsubmit="handleSearch(event)">
          <input type="text" class="search-input" placeholder="Search products, brands, categories…" id="headerSearch">
          <button type="submit" class="search-btn">Search</button>
        </form>
      </div>
      <div class="header-actions">
        <a href="${base}account/account-dashboard.html" class="header-action">
          <span class="header-action-icon">👤</span>
          <span>Account</span>
        </a>
        <a href="${base}purchase/cart.html" class="header-action">
          <span class="header-action-icon">🛒<span class="cart-count">3</span></span>
          <span>Cart</span>
        </a>
      </div>
      <button class="nav-toggle" onclick="toggleNav()" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
  <nav class="primary-nav" id="primaryNav">
    <div class="container">
      <ul class="nav-list">

        <li class="nav-item nav-item-mega">
          <a href="${base}discovery/clp.html" class="nav-link">Simulation <span class="nav-arrow">▾</span></a>
          <div class="mega-dropdown">
            <div class="mega-band">
              <div class="container">
                <div class="mega-band-inner">
<h3 class="mega-band-title">Simulation</h3>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="mega-links">
                <a href="${base}discovery/plp.html" class="mega-link">Advanced Life Support (ALS)</a>
                <a href="${base}discovery/plp.html" class="mega-link">Airway Management / Intubation</a>
                <a href="${base}discovery/plp.html" class="mega-link">Clinical Skills and Patient Care</a>
                <a href="${base}discovery/plp.html" class="mega-link">CPR, Basic Life Support, Rescue &amp; First Aid</a>
                <a href="${base}discovery/plp.html" class="mega-link">Obstetrics &amp; Gynaecology</a>
                <a href="${base}discovery/plp.html" class="mega-link">Surgical Simulation</a>
                <a href="${base}discovery/plp.html" class="mega-link">Ultrasound</a>
                <a href="${base}discovery/plp.html" class="mega-link">Veterinary Skills</a>
                <a href="${base}discovery/plp.html" class="mega-link">Demo Dose / Simulated Medications</a>
                <a href="${base}discovery/plp.html" class="mega-link">Simulated Patient Monitor</a>
                <a href="${base}discovery/plp.html" class="mega-link">Wearable Simulation</a>
                <a href="${base}discovery/plp.html" class="mega-link">Virtual Dissection Tables</a>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item nav-item-mega">
          <a href="${base}discovery/plp.html" class="nav-link">Anatomy Models <span class="nav-arrow">▾</span></a>
          <div class="mega-dropdown">
            <div class="mega-band">
              <div class="container">
                <div class="mega-band-inner">
<h3 class="mega-band-title">Anatomy Models</h3>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="mega-links">
                <a href="${base}discovery/plp.html" class="mega-link">Human Anatomy</a>
                <a href="${base}discovery/plp.html" class="mega-link">Skeleton Models</a>
                <a href="${base}discovery/plp.html" class="mega-link">Heart &amp; Organ Models</a>
                <a href="${base}discovery/plp.html" class="mega-link">Microanatomy &amp; Cells</a>
                <a href="${base}discovery/plp.html" class="mega-link">Pregnancy &amp; Childbirth</a>
                <a href="${base}discovery/plp.html" class="mega-link">Spine &amp; Neurology</a>
                <a href="${base}discovery/plp.html" class="mega-link">Muscular System</a>
                <a href="${base}discovery/plp.html" class="mega-link">Joints &amp; Orthopaedics</a>
                <a href="${base}discovery/plp.html" class="mega-link">Head &amp; ENT Models</a>
                <a href="${base}discovery/plp.html" class="mega-link">Digestive System</a>
                <a href="${base}discovery/plp.html" class="mega-link">Skin &amp; Sensory Models</a>
                <a href="${base}discovery/plp.html" class="mega-link">Synthetic Cadaver Models</a>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item nav-item-mega">
          <a href="${base}discovery/plp.html" class="nav-link">Health Education <span class="nav-arrow">▾</span></a>
          <div class="mega-dropdown">
            <div class="mega-band">
              <div class="container">
                <div class="mega-band-inner">
<h3 class="mega-band-title">Health Education</h3>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="mega-links">
                <a href="${base}discovery/plp.html" class="mega-link">Drug, Alcohol &amp; Smoking</a>
                <a href="${base}discovery/plp.html" class="mega-link">Sex Education</a>
                <a href="${base}discovery/plp.html" class="mega-link">Childbirth &amp; Development</a>
                <a href="${base}discovery/plp.html" class="mega-link">Men's Health</a>
                <a href="${base}discovery/plp.html" class="mega-link">Women's Health</a>
                <a href="${base}discovery/plp.html" class="mega-link">Nutrition &amp; Obesity</a>
                <a href="${base}discovery/plp.html" class="mega-link">Dental Health</a>
                <a href="${base}discovery/plp.html" class="mega-link">Eye &amp; Vision Care</a>
                <a href="${base}discovery/plp.html" class="mega-link">Mental Health</a>
                <a href="${base}discovery/plp.html" class="mega-link">Sun Safety</a>
                <a href="${base}discovery/plp.html" class="mega-link">First Aid</a>
                <a href="${base}discovery/plp.html" class="mega-link">Procedure Training</a>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item">
          <a href="${base}discovery/brands.html" class="nav-link">Brands <span class="nav-arrow">▾</span></a>
          <div class="nav-dropdown">
            <a href="${base}discovery/brand-landing.html" class="dropdown-link">3B Scientific</a>
            <a href="${base}discovery/brand-landing.html" class="dropdown-link">Gaumard</a>
            <a href="${base}discovery/brand-landing.html" class="dropdown-link">Prestan</a>
            <a href="${base}discovery/brand-landing.html" class="dropdown-link">SynDaver</a>
            <a href="${base}discovery/brand-landing.html" class="dropdown-link">iSimulate</a>
            <a href="${base}discovery/brands.html" class="dropdown-link">All Brands →</a>
          </div>
        </li>


      </ul>
    </div>
  </nav>
</header>
`;
}

function buildFooter(base) {
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-main">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <div class="footer-logo-mark">M</div>
            <span class="footer-brand-name">Mentone Educational</span>
          </div>
          <p class="footer-tagline">Australia's largest range of anatomical models, medical simulation and health education products. Supplying schools, hospitals and universities since 1979.</p>
          <div class="footer-contact">
            <a href="tel:0395476638">📞 (03) 9547 6638</a>
            <a href="mailto:sales@mentone-educational.com.au">✉ sales@mentone-educational.com.au</a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Shop</div>
          <div class="footer-links">
            <a href="${base}discovery/plp.html">Simulation</a>
            <a href="${base}discovery/plp.html">Anatomy Models</a>
            <a href="${base}discovery/plp.html">Health Education</a>
            <a href="${base}discovery/plp.html">Demo Dose</a>
            <a href="${base}discovery/brands.html">All Brands</a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Customer</div>
          <div class="footer-links">
            <a href="${base}account/account-dashboard.html">My Account</a>
            <a href="${base}account/account-orders.html">Order History</a>
            <a href="${base}purchase/cart.html">View Cart</a>
            <a href="${base}info/shipping.html">Shipping Info</a>
            <a href="${base}info/contact.html">Contact Us</a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Company</div>
          <div class="footer-links">
            <a href="${base}info/about.html">About Us</a>
            <a href="${base}info/terms.html">Terms &amp; Conditions</a>
            <a href="${base}info/shipping.html">Shipping &amp; Returns</a>
            <a href="${base}info/terms.html">Security Policy</a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">© 2025 Mentone Educational. All rights reserved. ABN 00 000 000 000.</p>
      <div class="footer-legal">
        <a href="${base}info/terms.html">Terms</a>
        <a href="${base}info/shipping.html">Shipping &amp; Returns</a>
        <a href="${base}info/terms.html">Privacy</a>
      </div>
    </div>
  </div>
</footer>
`;
}

function buildEnquiryModal() {
  return `
<div class="enquiry-overlay" id="enquiry-overlay" onclick="handleEnquiryOverlayClick(event)">
  <div class="enquiry-modal">
    <button class="enquiry-close" onclick="closeEnquiry()" aria-label="Close">×</button>
    <h2 class="enquiry-title">Product Enquiry</h2>
    <form class="enquiry-form" onsubmit="submitEnquiry(event)">
      <div class="enquiry-field">
        <label for="enquiry-name">Contact Name</label>
        <input type="text" id="enquiry-name" required>
      </div>
      <div class="enquiry-field">
        <label for="enquiry-email">Email</label>
        <input type="email" id="enquiry-email" required>
      </div>
      <div class="enquiry-field">
        <label for="enquiry-phone">Phone</label>
        <input type="tel" id="enquiry-phone">
      </div>
      <div class="enquiry-field">
        <label for="enquiry-subject">Subject</label>
        <input type="text" id="enquiry-subject">
      </div>
      <div class="enquiry-field">
        <label for="enquiry-desc">Description</label>
        <textarea id="enquiry-desc" rows="4"></textarea>
      </div>
      <div class="enquiry-captcha">
        <input type="checkbox" id="enquiry-robot">
        <label for="enquiry-robot" class="enquiry-captcha-label">I'm not a robot</label>
        <div class="enquiry-captcha-logo">
          <span class="enquiry-captcha-logo-icon">🔒</span>
          reCAPTCHA<br>Privacy · Terms
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-full">Submit</button>
    </form>
  </div>
</div>
`;
}

function renderSharedComponents() {
  const base = getBasePath();
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = buildHeader(base);
  if (footerEl) footerEl.innerHTML = buildFooter(base);

  // Inject enquiry modal once
  if (!document.getElementById('enquiry-overlay')) {
    document.body.insertAdjacentHTML('beforeend', buildEnquiryModal());
  }

  // Mark active nav item
  const currentPage = window.location.pathname.split('/').pop();
  if (currentPage) {
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href').endsWith(currentPage)) link.classList.add('active');
    });
  }
}

function toggleNav() {
  document.getElementById('primaryNav').classList.toggle('open');
}

function handleSearch(e) {
  e.preventDefault();
  const base = getBasePath();
  const q = document.getElementById('headerSearch')?.value;
  if (q) window.location.href = `${base}discovery/search.html?q=${encodeURIComponent(q)}`;
}

document.addEventListener('DOMContentLoaded', renderSharedComponents);
