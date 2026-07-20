(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var clockEl = document.getElementById('clock');
  if (clockEl) {
    function updateClock() {
      var opts = { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      clockEl.textContent = new Date().toLocaleTimeString('en-US', opts);
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  var spinnerEl = document.getElementById('cli-spinner');
  if (spinnerEl && !reduceMotion) {
    var spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    var spinnerIndex = 0;
    setInterval(function () {
      spinnerIndex = (spinnerIndex + 1) % spinnerFrames.length;
      spinnerEl.textContent = spinnerFrames[spinnerIndex];
    }, 80);
  }

  document.querySelectorAll('.hero h1[data-words]').forEach(function (el) {
    var text = el.getAttribute('data-words');
    if (!text) return;
    el.textContent = '';
    if (reduceMotion) {
      el.textContent = text;
      return;
    }
    text.split(' ').forEach(function (word, i) {
      var span = document.createElement('span');
      span.textContent = word;
      span.style.animationDelay = (i * 0.045) + 's';
      el.appendChild(span);
    });
  });

  var revealEls = document.querySelectorAll('section.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }
})();
