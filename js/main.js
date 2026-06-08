/* StudyVerse — main.js (Upgraded) */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Scroll reveal ---- */
  const items = document.querySelectorAll('.subject-card, .lec-item');
  if (items.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0) scale(1)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px) scale(0.97)';
      el.style.transition = `opacity 0.5s cubic-bezier(0.4,0,0.2,1) ${i * 0.07}s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.07}s`;
      obs.observe(el);
    });
  }

  /* ---- 3D Tilt on subject cards (desktop only) ---- */
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.subject-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `translateY(-8px) scale(1.015) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease';
        setTimeout(() => { card.style.transition = ''; }, 500);
      });
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease';
      });
    });
  }

  /* ---- Smooth header opacity on scroll ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY > 20;
      header.style.background = scrolled
        ? 'rgba(255,255,255,0.92)'
        : 'rgba(255,255,255,0.72)';
    }, { passive: true });
  }

});
