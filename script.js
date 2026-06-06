document.addEventListener("DOMContentLoaded", () => {
  initializeThemes();
  initializeNavigation();
  initializeTypewriter();
  initializeParticles();
  initializeScrollReveal();
});

function initializeTypewriter() {
  document.querySelectorAll(".typewriter").forEach(el => {
    const text = el.textContent.trim();
    el.textContent = "";
    let i = 0;

    (function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, 65 + Math.random() * 55);
      } else {
        el.classList.add("typing-done");
      }
    })();
  });
}

function initializeThemes() {
  const body = document.body;
  const toggle = document.querySelector(".theme-toggle");

  const saved = localStorage.getItem("theme");
  const isDark = saved ? saved === "dark" : true;

  body.classList.toggle("dark-theme", isDark);
  body.classList.toggle("light-theme", !isDark);

  toggle.addEventListener("click", () => {
    const goingLight = body.classList.contains("dark-theme");
    body.classList.toggle("dark-theme", !goingLight);
    body.classList.toggle("light-theme", goingLight);
    localStorage.setItem("theme", goingLight ? "light" : "dark");
  });
}

function initializeNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu   = document.querySelector(".nav-menu");
  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", e => {
    e.stopPropagation();
    const open = navMenu.classList.toggle("open");
    navToggle.textContent = open ? "✕" : "MENU";
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".pixel-nav") && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      navToggle.textContent = "MENU";
    }
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.textContent = "MENU";
    });
  });
}

function initializeParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  class Mote {
    constructor(randomY) { this.init(randomY); }

    init(randomY) {
      this.x      = Math.random() * canvas.width;
      this.y      = randomY ? Math.random() * canvas.height : canvas.height + 20;
      this.radius = Math.random() * 1.8 + 0.4;
      this.vy     = -(Math.random() * 0.55 + 0.2);
      this.vx     = (Math.random() - 0.5) * 0.22;
      this.alpha  = 0;
      this.peak   = Math.random() * 0.6 + 0.18;
      this.rate   = Math.random() * 0.007 + 0.003;
      this.fading = false;
    }

    update() {
      if (!this.fading) {
        this.alpha += this.rate;
        if (this.alpha >= this.peak) { this.alpha = this.peak; this.fading = true; }
      } else {
        this.alpha -= this.rate * 0.45;
      }
      this.x += this.vx;
      this.y += this.vy;
      if (this.alpha <= 0 || this.y < -20) this.init(false);
    }

    draw() {
      const light = document.body.classList.contains("light-theme");
      const [r, g, b] = light ? [106, 68, 0] : [220, 168, 30];
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.shadowBlur  = 12;
      ctx.shadowColor = `rgba(${r},${g},${b},0.6)`;
      ctx.fill();
      ctx.restore();
    }
  }

  const motes = Array.from({ length: 60 }, (_, i) => new Mote(i < 40));

  (function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    motes.forEach(m => { m.update(); m.draw(); });
    requestAnimationFrame(frame);
  })();
}

function initializeScrollReveal() {
  const targets = document.querySelectorAll(".pixel-panel, .project-card");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(el => {
    el.classList.add("hidden-panel");
    observer.observe(el);
  });
}
