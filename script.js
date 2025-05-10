// script.js

document.addEventListener('DOMContentLoaded', () => {
  console.log('🟢 script.js loaded');

  // ——— 1) Countdown ———
  const big = document.getElementById('countdownBig');
  const message = document.getElementById('countdownMessage');
  if (big && message) {
    const campStartDate = new Date('2025-06-16T09:00:00');
    const today = new Date();
    const diffDays = Math.ceil((campStartDate - today) / (1000 * 60 * 60 * 24));
    big.textContent = diffDays;

    const funMessages = [
      "more sleeps 'til camp! 🛌🌞",
      "more days until the camp fun begins! 🎉🌈",
      "more days until songs, crafts, and chaos (the good kind)! 🎶✂️🤪",
      "more days away from popsicle season and playtime! 🍧☀️🛝",
      "more days ‘til we get crafty, splashy, and silly! 🖍️💦🧡",
      "more days left to practice your happy dances! 💃🕺🎵"
    ];
    // pick and show one
    message.textContent = funMessages[Math.floor(Math.random() * funMessages.length)];
  } else {
    console.warn('⚠️ Countdown elements not found (countdownBig or countdownMessage)');
  }

  // ——— 2) Sliding Text ———
  const slidingText = document.getElementById('slidingText');
  if (slidingText) {
    const words = [
      { text: 'Laughs',    color: '#f499b1' },
      { text: 'Love',      color: '#f19a6a' },
      { text: 'Learning',  color: '#f4b762' }
    ];
    let idx = 0;
    slidingText.style.color = words[0].color;
    slidingText.textContent = words[0].text;
    slidingText.classList.add('animate');

    setInterval(() => {
      idx = (idx + 1) % words.length;
      slidingText.classList.remove('animate');
      setTimeout(() => {
        slidingText.textContent = words[idx].text;
        slidingText.style.color   = words[idx].color;
        slidingText.classList.add('animate');
      }, 50);
    }, 3750);
  } else {
    console.warn('⚠️ Sliding text element #slidingText not found');
  }

  // ——— 3) Carousel Auto‑Scroll ———
  const track = document.getElementById('carouselTrack');
  if (track) {
    const cards = track.querySelectorAll('.theme-card');
    if (cards.length > 0) {
      const gap = parseInt(getComputedStyle(cards[0]).marginRight) || 0;
      const cardWidth = cards[0].offsetWidth + gap;
      let scrollInterval = null;

      const startAuto = () => {
        scrollInterval = setInterval(() => {
          if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            track.scrollBy({ left: cardWidth, behavior: 'smooth' });
          }
        }, 3000);
      };

      startAuto();
      track.addEventListener('mouseenter', () => clearInterval(scrollInterval));
      track.addEventListener('mouseleave', startAuto);
    }
  } else {
    console.warn('⚠️ Carousel track #carouselTrack not found');
  }

  // ——— 4) Modals ———
  console.log('🟢 Attaching modal handlers');
  document.querySelectorAll('.portal-btn').forEach(btn => {
    console.log('  • Found portal-btn', btn.dataset.modalTarget);
    btn.addEventListener('click', e => {
      e.preventDefault();
      const modal = document.querySelector(btn.dataset.modalTarget);
      if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
      } else {
        console.warn('⚠️ No modal matches', btn.dataset.modalTarget);
      }
    });
  });

  // Close buttons (×)
  document.querySelectorAll('.modal-close').forEach(x => {
    x.addEventListener('click', () => {
      const m = x.closest('.modal');
      if (m) {
        m.classList.remove('active');
        m.setAttribute('aria-hidden', 'true');
      }
    });
  });

  // Click outside to close
  document.querySelectorAll('.modal').forEach(backdrop => {
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
        backdrop.setAttribute('aria-hidden', 'true');
      }
    });
  });

  // ESC to close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active').forEach(m => {
        m.classList.remove('active');
        m.setAttribute('aria-hidden', 'true');
      });
    }
  });
});




//nav bar mobile updates

document.querySelector('.hamburger')?.addEventListener('click', () => {
  document.querySelector('.nav-links')?.classList.toggle('active');
});

