// ── KEYBOARD NAVIGATION ───────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  // If search is open, only handle Escape
  const searchOverlay = document.getElementById('search-overlay');
  if (searchOverlay && searchOverlay.classList.contains('open')) {
    if (e.key === 'Escape') closeSearch();
    return;
  }

  // Arrow keys for prev/next
  if (e.key === 'ArrowRight') {
    const nextBtn = document.getElementById('btn-next');
    if (nextBtn && !nextBtn.classList.contains('disabled')) {
      nextBtn.click();
    }
  }
  if (e.key === 'ArrowLeft') {
    const prevBtn = document.getElementById('btn-prev');
    if (prevBtn && !prevBtn.classList.contains('disabled')) {
      prevBtn.click();
    }
  }

  // Slash to open search
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault();
    openSearch();
  }
});
