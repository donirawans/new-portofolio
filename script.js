// ============================================
// Doni Irawan Portfolio - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ========== Navigation: Smooth Scroll & Scroll Spy ==========
  const navLinks = document.querySelectorAll('#desktop-nav .nav-item');
  const sections = ['home', 'about', 'experience', 'projects', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function setActiveLink(clickedLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      setActiveLink(link);
    });
  });

  let isClickScrolling = false;
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      isClickScrolling = true;
      setTimeout(() => { isClickScrolling = false; }, 800);
    });
  });

  window.addEventListener('scroll', () => {
    if (isClickScrolling) return;
    const scrollPos = window.scrollY + 120;

    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = sections[i];
      if (sec.offsetTop <= scrollPos) {
        const targetHref = '#' + sec.id;
        navLinks.forEach(link => {
          if (link.getAttribute('href') === targetHref) {
            if (!link.classList.contains('active')) {
              navLinks.forEach(l => l.classList.remove('active'));
              link.classList.add('active');
            }
          }
        });
        break;
      }
    }
  });

  // ========== Mobile Menu Toggle ==========
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileClose = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('#mobile-nav a');

  function openMobile() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (mobileBtn) mobileBtn.addEventListener('click', openMobile);
  if (mobileClose) mobileClose.addEventListener('click', closeMobile);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobile);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobile));

  // ========== Contact Form Validation ==========
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill all fields.');
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      alert('Thank you, ' + name + '! Your message has been received.');
      contactForm.reset();
    });
  }

  // ========== Scroll Reveal Animation ==========
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add('visible');
      }
    });
  };

  if (revealElements.length > 0) {
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
  }

  // ========== Dynamic Year in Footer ==========
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });

});
