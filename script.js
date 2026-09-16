document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('nav');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav-open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav when clicking on a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          nav.classList.remove('nav-open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close mobile nav on Escape key press
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.focus();
      }
    });
  }
});
