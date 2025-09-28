document.addEventListener("DOMContentLoaded", () => {
  initializePortfolio();
});

function initializePortfolio() {
  initializeTypewriter();
  
  initializeThemes();
  
  initializeNavigation();
}

function initializeTypewriter() {
  document.querySelectorAll(".typewriter").forEach(el => {
    const text = el.textContent;
    el.textContent = "";
    let i = 0;
    
    (function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        const delay = 60 + Math.random() * 50;
        setTimeout(type, delay);
      }
    })();
  });
}

function initializeThemes() {
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    body.classList.add('dark-theme');
  } else {
    body.classList.add('light-theme');
  }

  themeToggle.addEventListener("click", () => {
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
    }
  });
}

function initializeNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!navToggle || !navMenu) {
    console.error('Navigation elements not found!');
    return;
  }

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('open');
    navToggle.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.pixel-nav') && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.textContent = '☰';
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.textContent = '☰';
    });
  });
}