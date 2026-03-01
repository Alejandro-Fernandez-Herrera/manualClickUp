// ── SIDEBAR TOGGLE ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#hamburger-btn');
    if (btn) {
      toggleSidebar();
      return;
    }
    const backdrop = e.target.closest('#sidebar-backdrop');
    if (backdrop) {
      closeSidebar();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && sidebar.classList.contains('sidebar--open')) {
        closeSidebar();
      }
    }
  });
});

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const hamburger = document.getElementById('hamburger-btn');
  if (!sidebar) return;

  const isOpen = sidebar.classList.toggle('sidebar--open');
  if (backdrop) backdrop.classList.toggle('backdrop--visible', isOpen);
  if (hamburger) hamburger.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const hamburger = document.getElementById('hamburger-btn');
  if (!sidebar) return;

  sidebar.classList.remove('sidebar--open');
  if (backdrop) backdrop.classList.remove('backdrop--visible');
  if (hamburger) hamburger.classList.remove('active');
  document.body.style.overflow = '';
}
