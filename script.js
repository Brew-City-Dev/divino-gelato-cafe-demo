/* Divino Gelato Cafe — demo site interactions */

// Menu tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('is-hidden'));
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(`tab-${target}`)?.classList.remove('is-hidden');
  });
});

// Mobile nav hamburger
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('main-nav');

if (hamburger && mainNav) {
  const drawer = document.createElement('nav');
  drawer.className = 'mobile-nav';
  drawer.id = 'mobile-nav';
  drawer.setAttribute('aria-label', 'Mobile navigation');

  const links = [
    { href: '#menu',      label: 'Menu'      },
    { href: '#flavors',   label: 'Flavors'   },
    { href: '#locations', label: 'Locations' },
    { href: '#services',  label: 'Services'  },
    { href: 'tel:+12626724755', label: 'Call Racine: (262) 672-4755' },
  ];
  links.forEach(({ href, label }) => {
    const a = document.createElement('a');
    a.href  = href;
    a.textContent = label;
    a.addEventListener('click', () => closeMobileNav());
    drawer.appendChild(a);
  });

  hamburger.parentElement.parentElement.insertAdjacentElement('afterend', drawer);

  function openMobileNav() {
    drawer.classList.add('is-open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
  }
  function closeMobileNav() {
    drawer.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
  }

  hamburger.addEventListener('click', () => {
    if (drawer.classList.contains('is-open')) closeMobileNav();
    else openMobileNav();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileNav();
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Sticky header shadow on scroll
const header = document.querySelector('.site-header');
if (header) {
  const obs = new IntersectionObserver(
    ([entry]) => header.style.boxShadow = entry.isIntersecting ? '' : '0 2px 12px rgba(30,10,5,.12)',
    { rootMargin: '-64px 0px 0px 0px' }
  );
  const sentinel = document.getElementById('hero');
  if (sentinel) obs.observe(sentinel);
}