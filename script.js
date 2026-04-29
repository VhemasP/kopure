const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const navSections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
const backToTop = document.querySelector('.back-to-top');

function closeMenu() {
  navMenu.classList.remove('open');
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
}

function updateActiveNav() {
  const scrollPosition = window.scrollY + 160;
  let currentId = navSections[0]?.id;

  navSections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = !link.classList.contains('nav-cta') && link.getAttribute('href') === `#${currentId}`;
    link.classList.toggle('active', isActive);

    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function updateHeader() {
  if (window.scrollY > 20) header.classList.add('scrolled');
  else header.classList.remove('scrolled');

  if (window.scrollY > 600) backToTop.classList.add('show');
  else backToTop.classList.remove('show');

  updateActiveNav();
}

window.addEventListener('scroll', updateHeader);
updateHeader();

menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navMenu.classList.contains('open')) {
    closeMenu();
    menuToggle.focus();
  }
});

document.addEventListener('click', (event) => {
  const isNavbarClick = event.target.closest('.navbar');

  if (!isNavbarClick && navMenu.classList.contains('open')) {
    closeMenu();
  }
});

const usecaseCards = document.querySelectorAll('.usecase-card');

if (usecaseCards.length) {
  const activateUsecaseCard = (selectedCard) => {
    usecaseCards.forEach((card) => {
      const isSelected = card === selectedCard;
      card.classList.toggle('is-active', isSelected);
      card.setAttribute('aria-pressed', String(isSelected));
    });
  };

  usecaseCards.forEach((card) => {
    card.addEventListener('click', () => {
      activateUsecaseCard(card);
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateUsecaseCard(card);
      }
    });
  });
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 6, 4) * 70}ms`;
  observer.observe(element);
});
