// ── PAGE REGISTRY ─────────────────────────────────────────────────────────
const MANUAL_PAGES = [
  { id: 'portada',       title: 'Portada',                    file: 'index.html',           icon: '\uD83D\uDCCB', num: '00' },
  { id: 'indice',        title: '\u00CDndice',                 file: 'pages/indice.html',    icon: '\uD83D\uDCD1', num: '01' },
  { id: 'introduccion',  title: 'Introducci\u00F3n',          file: 'pages/introduccion.html', icon: '\uD83D\uDCD6', num: '02' },
  { id: 'requisitos',    title: 'Requisitos del sistema',     file: 'pages/requisitos.html',   icon: '\u2699\uFE0F', num: '03' },
  { id: 'instalacion',   title: 'Instalaci\u00F3n',           file: 'pages/instalacion.html',  icon: '\uD83D\uDCF2', num: '04' },
  { id: 'interfaz',      title: 'Descripci\u00F3n de la interfaz', file: 'pages/interfaz.html', icon: '\uD83D\uDCF1', num: '05' },
  { id: 'tareas',        title: 'Creaci\u00F3n de tareas',    file: 'pages/tareas.html',       icon: '\u2705',       num: '06' },
  { id: 'problemas',     title: 'Soluci\u00F3n de problemas', file: 'pages/problemas.html',    icon: '\uD83D\uDD27', num: '07' },
  { id: 'mantenimiento', title: 'Mantenimiento',              file: 'pages/mantenimiento.html', icon: '\uD83D\uDD04', num: '08' },
  { id: 'soporte',       title: 'Soporte t\u00E9cnico',       file: 'pages/soporte.html',      icon: '\uD83D\uDCAC', num: '09' },
  { id: 'glosario',      title: 'Glosario',                   file: 'pages/glosario.html',     icon: '\uD83D\uDCD8', num: '10' },
  { id: 'apendices',     title: 'Ap\u00E9ndices',             file: 'pages/apendices.html',    icon: '\uD83D\uDCCE', num: '11' },
];

// ── HELPERS ───────────────────────────────────────────────────────────────
function getBasePath() {
  return document.body.dataset.basePath || '.';
}

function resolveUrl(filePath) {
  const base = getBasePath();
  return base + '/' + filePath;
}

function getCurrentPageId() {
  return document.body.dataset.pageId || 'portada';
}

function getCurrentIndex() {
  return MANUAL_PAGES.findIndex(p => p.id === getCurrentPageId());
}

// ── BUILD HEADER ──────────────────────────────────────────────────────────
function buildHeader() {
  const pageId = getCurrentPageId();
  const page = MANUAL_PAGES.find(p => p.id === pageId);
  const title = page ? page.title : '';

  return `
    <header class="site-header">
      <div style="display:flex;align-items:center;gap:14px;">
        <button class="hamburger" id="hamburger-btn" aria-label="Menú">
          <span></span><span></span><span></span>
        </button>
        <a href="${resolveUrl('index.html')}" class="hd-brand" style="text-decoration:none;">
          <img class="hd-logo" src="${resolveUrl('img/clickup logo.jpg')}" alt="ClickUp" style="width:36px;height:36px;border-radius:8px;object-fit:cover;"/>
          <div class="hd-info">
            <div class="hd-title">ClickUp</div>
            <div class="hd-sub">Manual de Usuario (Tareas)</div>
          </div>
        </a>
      </div>
      <div class="hd-right">
        <div class="hd-badge">${title}</div>
      </div>
    </header>`;
}

// ── BUILD SIDEBAR ─────────────────────────────────────────────────────────
function buildSidebar() {
  const pageId = getCurrentPageId();
  const items = MANUAL_PAGES.map(p => {
    const active = p.id === pageId ? ' active' : '';
    const url = resolveUrl(p.file);
    return `<li class="sidebar-item${active}">
      <a href="${url}">
        <span class="sidebar-icon">${p.icon}</span>
        <span class="sidebar-num">${p.num}</span>
        <span class="sidebar-text">${p.title}</span>
      </a>
    </li>`;
  }).join('');

  return `
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <span class="sidebar-label">Contenido del Manual</span>
      </div>
      <ul class="sidebar-nav">
        ${items}
      </ul>
    </nav>`;
}

// ── BUILD FOOTER ──────────────────────────────────────────────────────────
function buildFooter() {
  const idx = getCurrentIndex();
  const prev = idx > 0 ? MANUAL_PAGES[idx - 1] : null;
  const next = idx < MANUAL_PAGES.length - 1 ? MANUAL_PAGES[idx + 1] : null;

  const prevHtml = prev
    ? `<a class="ft-btn ft-btn-prev" id="btn-prev" href="${resolveUrl(prev.file)}"><span class="arr">\u2190</span> Anterior</a>`
    : `<span class="ft-btn ft-btn-prev disabled" id="btn-prev"><span class="arr">\u2190</span> Anterior</span>`;

  const nextHtml = next
    ? `<a class="ft-btn ft-btn-next" id="btn-next" href="${resolveUrl(next.file)}">Siguiente <span class="arr">\u2192</span></a>`
    : `<span class="ft-btn ft-btn-next disabled" id="btn-next">Siguiente <span class="arr">\u2192</span></span>`;

  const indiceUrl = resolveUrl('pages/indice.html');

  return `
    <footer class="site-footer">
      ${prevHtml}
      <button class="ft-btn ft-btn-mid" onclick="openSearch()">🔍 Buscar</button>
      <a class="ft-btn ft-btn-mid" href="${indiceUrl}">📑 Indice</a>
      ${nextHtml}
    </footer>`;
}

// ── BUILD SEARCH OVERLAY ──────────────────────────────────────────────────
function buildSearchOverlay() {
  return `
    <div id="search-overlay">
      <div class="search-box-wrap">
        <div class="search-input-row">
          <input id="search-input" type="text" placeholder="Buscar en el manual..." oninput="doSearch(this.value)" autocomplete="off"/>
          <button class="search-close" onclick="closeSearch()">\u2715</button>
        </div>
      </div>
      <div class="search-results" id="search-results">
        <div class="sr-empty">Escribe para buscar en todas las secciones del manual</div>
      </div>
    </div>`;
}

// ── INJECT SHELL ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('shell-header');
  const sidebar = document.getElementById('shell-sidebar');
  const footer = document.getElementById('shell-footer');
  const search = document.getElementById('shell-search');

  if (header) header.innerHTML = buildHeader();
  if (sidebar) sidebar.innerHTML = buildSidebar();
  if (footer) footer.innerHTML = buildFooter();
  if (search) search.innerHTML = buildSearchOverlay();

  document.body.style.opacity = '1';
});
