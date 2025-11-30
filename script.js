// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Theme toggle with localStorage
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Initialize theme from storage or prefers-color-scheme
(function initTheme(){
  const saved = localStorage.getItem('theme');
  if (saved === 'light') root.classList.add('light');
  else if (saved === 'dark') root.classList.remove('light');
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    root.classList.add('light');
  }
})();

themeToggle?.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});

// Back to top
const backToTop = document.getElementById('backToTop');
backToTop?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact form validation (client-side demo)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    const errName = document.getElementById('err-name');
    const errEmail = document.getElementById('err-email');
    const errMessage = document.getElementById('err-message');

    // Reset errors
    [errName, errEmail, errMessage].forEach(el => el.textContent = '');

    if (!name.value.trim()) {
      errName.textContent = 'Please enter your name.';
      ok = false;
    }
    if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
      errEmail.textContent = 'Please enter a valid email.';
      ok = false;
    }
    if (!message.value.trim() || message.value.trim().length < 10) {
      errMessage.textContent = 'Message should be at least 10 characters.';
      ok = false;
    }

    if (ok) {
      // Demo only — no backend. Replace with your submit logic / service.
      alert('Thanks! Your message has been validated locally.');
      form.reset();
    }
  });
}
