/* Shared navigation — Pure Joy Empowerment Uganda v2.1 */
(function() {
  const navHTML = `
  <div class="utility-bar">
    <div class="utility-inner">
      <div class="utility-left">
        <a href="contact.html"><span>📍</span> Jinja City, Uganda</a>
        <a href="tel:+256782000000"><span>📞</span> +256 782 000 000</a>
        <a href="mailto:info@purejoyempowerment.org"><span>✉</span> info@purejoyempowerment.org</a>
      </div>
      <div class="utility-right">
        <a href="events.html">Events</a>
        <a href="news.html">News</a>
        <a href="partners.html">Partners</a>
        <a href="contact.html">Contact</a>
        <div class="utility-divider"></div>
        <div class="social-bar">
          <a href="https://facebook.com" target="_blank" rel="noopener" title="Facebook" aria-label="Facebook">f</a>
          <a href="https://instagram.com" target="_blank" rel="noopener" title="Instagram" aria-label="Instagram">📷</a>
          <a href="https://youtube.com" target="_blank" rel="noopener" title="YouTube" aria-label="YouTube">▶</a>
          <a href="https://twitter.com" target="_blank" rel="noopener" title="X/Twitter" aria-label="Twitter">✕</a>
        </div>
      </div>
    </div>
  </div>

  <nav class="navbar" role="navigation" aria-label="Main navigation">
    <div class="nav-inner">
      <a href="index.html" class="logo" aria-label="Pure Joy Empowerment — Home">
        <div class="logo-mark" aria-hidden="true">☀</div>
        <div class="logo-words">
          <div class="logo-name">Pure Joy Empowerment</div>
          <div class="logo-tagline">Uganda · Building Lives · Restoring Hope</div>
        </div>
      </a>

      <div class="nav-menu" id="nav-menu" role="menubar">
        <div class="dropdown" role="none">
          <a href="about.html" role="menuitem" aria-haspopup="true">About ▾</a>
          <div class="drop-panel" role="menu" aria-label="About submenu">
            <a href="about.html#story"      role="menuitem"><span class="dp-icon">📖</span> Our Story</a>
            <a href="about.html#mission"    role="menuitem"><span class="dp-icon">🎯</span> Mission &amp; Vision</a>
            <a href="about.html#leadership" role="menuitem"><span class="dp-icon">👥</span> Leadership Team</a>
            <a href="about.html#values"     role="menuitem"><span class="dp-icon">✝</span> Our Values</a>
            <div class="drop-divider"></div>
            <a href="partners.html"         role="menuitem"><span class="dp-icon">🤝</span> Our Partners</a>
            <a href="gallery.html"          role="menuitem"><span class="dp-icon">🖼</span> Gallery</a>
          </div>
        </div>

        <div class="dropdown" role="none">
          <a href="programs.html" role="menuitem" aria-haspopup="true">Programs ▾</a>
          <div class="drop-panel" role="menu" aria-label="Programs submenu">
            <a href="programs.html#boys"       role="menuitem"><span class="dp-icon">👦</span> Boys Emancipation</a>
            <a href="programs.html#women"      role="menuitem"><span class="dp-icon">👩‍💼</span> Women Empowerment</a>
            <a href="programs.html#street"     role="menuitem"><span class="dp-icon">🏘</span> Street Children</a>
            <a href="programs.html#vocational" role="menuitem"><span class="dp-icon">🔧</span> Vocational Training</a>
            <a href="programs.html#nutrition"  role="menuitem"><span class="dp-icon">🥗</span> Nutrition Program</a>
            <div class="drop-divider"></div>
            <a href="programs.html#energy"     role="menuitem"><span class="dp-icon">⚡</span> Clean Energy</a>
          </div>
        </div>

        <a href="orphanage.html" role="menuitem">Orphanage</a>

        <div class="dropdown" role="none">
          <a href="get-involved.html" role="menuitem" aria-haspopup="true">Get Involved ▾</a>
          <div class="drop-panel" role="menu" aria-label="Get Involved submenu">
            <a href="get-involved.html#volunteer" role="menuitem"><span class="dp-icon">✈</span> Volunteer</a>
            <a href="get-involved.html#sponsor"   role="menuitem"><span class="dp-icon">❤</span> Sponsor a Child</a>
            <a href="get-involved.html#partner"   role="menuitem"><span class="dp-icon">🤝</span> Partner With Us</a>
            <a href="get-involved.html#fundraise" role="menuitem"><span class="dp-icon">💰</span> Fundraise</a>
          </div>
        </div>

        <a href="events.html" role="menuitem">Events</a>
        <a href="news.html"   role="menuitem">News</a>
        <a href="donate.html" class="nav-give" role="menuitem" aria-label="Donate now">❤ Give Now</a>
      </div>

      <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>`;

  const wrapper = document.createElement('header');
  wrapper.innerHTML = navHTML;
  document.body.insertBefore(wrapper, document.body.firstChild);

  /* Active link */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();
