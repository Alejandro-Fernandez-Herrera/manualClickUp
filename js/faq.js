// ── FAQ ACCORDION ─────────────────────────────────────────────────────────
function toggleFaq(el) {
  const a = el.nextElementSibling;
  const isOpen = a.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(x => x.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(x => x.classList.remove('open'));
  if (!isOpen) { a.classList.add('open'); el.classList.add('open'); }
}
