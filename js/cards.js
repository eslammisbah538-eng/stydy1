/* StudyVerse — cards.js (Upgraded)
   Engine for the card-by-card study system
*/

(function () {
  let current = 0;
  const wrappers   = document.querySelectorAll('.card-wrapper');
  const btnPrev    = document.getElementById('btnPrev');
  const btnNext    = document.getElementById('btnNext');
  const counter    = document.getElementById('cardCounter');
  const totalSpan  = document.getElementById('totalCards');
  const currentSpan= document.getElementById('currentCard');
  const fill       = document.getElementById('progressFill');
  const completion = document.getElementById('completionScreen');
  const cardsView  = document.getElementById('cardsViewport');
  const total = wrappers.length;

  if (!total) return;
  if (totalSpan) totalSpan.textContent = total;

  function goTo(n) {
    wrappers[current].classList.remove('active');
    current = Math.max(0, Math.min(n, total - 1));
    wrappers[current].classList.add('active');
    update();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function update() {
    if (currentSpan) currentSpan.textContent = current + 1;
    if (counter)     counter.textContent = current + 1;
    if (fill)        fill.style.width = ((current + 1) / total * 100) + '%';
    if (btnPrev)     btnPrev.disabled = current === 0;

    if (btnNext) {
      const isLast = current === total - 1;
      btnNext.innerHTML = isLast
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> <span>انتهيت</span>'
        : '<span>التالي</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';
    }
  }

  function finish() {
    if (cardsView)  cardsView.style.display   = 'none';
    if (completion) completion.classList.add('active');
    const nav = document.querySelector('.cards-nav');
    if (nav) nav.style.display = 'none';
    if (fill) fill.style.width = '100%';
  }

  if (btnPrev) btnPrev.addEventListener('click', () => goTo(current - 1));
  if (btnNext) btnNext.addEventListener('click', () => {
    if (current === total - 1) finish();
    else goTo(current + 1);
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp')   goTo(current - 1);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowDown') {
      if (current === total - 1) finish();
      else goTo(current + 1);
    }
  });

  // Swipe support
  let touchStartX = 0;
  document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx > 0) goTo(current - 1);
      else {
        if (current === total - 1) finish();
        else goTo(current + 1);
      }
    }
  }, { passive: true });

  // Explain toggles — with icon rotation
  document.querySelectorAll('.explain-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      const open = target.classList.toggle('visible');
      btn.classList.toggle('open', open);
      // Update text node while keeping SVG
      const svg = btn.querySelector('svg');
      btn.textContent = open ? ' إخفاء الشرح' : ' اظهر الشرح';
      if (svg) btn.prepend(svg);
    });
  });

  // Init
  wrappers[0].classList.add('active');
  update();
})();
