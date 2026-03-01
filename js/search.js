// ── SEARCH INDEX ──────────────────────────────────────────────────────────
const SEARCH_INDEX = [
  {pageId:'portada',       sec:'Portada',     title:'Portada del manual',           text:'ClickUp Mobile gesti\u00F3n de tareas manual usuario 2026 Universidad del Valle'},
  {pageId:'indice',        sec:'Secci\u00F3n 01', title:'\u00CDndice de contenido',   text:'\u00EDndice contenido navegaci\u00F3n secciones'},
  {pageId:'introduccion',  sec:'Secci\u00F3n 02', title:'Introducci\u00F3n',          text:'ClickUp plataforma gesti\u00F3n proyectos productividad objetivo alcance p\u00FAblico objetivo usuarios equipo'},
  {pageId:'requisitos',    sec:'Secci\u00F3n 03', title:'Requisitos del sistema',     text:'Android iOS versi\u00F3n m\u00EDnima almacenamiento RAM conexi\u00F3n internet cuenta plan free'},
  {pageId:'instalacion',   sec:'Secci\u00F3n 04', title:'Instalaci\u00F3n',           text:'instalar Play Store App Store descargar registro cuenta workspace permisos notificaciones'},
  {pageId:'interfaz',      sec:'Secci\u00F3n 05', title:'Descripci\u00F3n de la interfaz', text:'men\u00FA lateral inbox FAB spaces notificaciones men\u00FA contextual barra navegaci\u00F3n bot\u00F3n'},
  {pageId:'tareas',        sec:'Secci\u00F3n 06', title:'Creaci\u00F3n de tareas',    text:'crear tarea nuevo task formulario nombre descripci\u00F3n asignado assignee fecha l\u00EDmite due date prioridad urgente alta normal subtarea adjunto tag estado to do in progress done'},
  {pageId:'problemas',     sec:'Secci\u00F3n 07', title:'Soluci\u00F3n de problemas', text:'error problema sincronizaci\u00F3n adjunto fecha l\u00EDmite bot\u00F3n m\u00E1s FAB something went wrong tarea no aparece'},
  {pageId:'mantenimiento', sec:'Secci\u00F3n 08', title:'Mantenimiento y actualizaciones', text:'actualizar cach\u00E9 almacenamiento seguridad 2FA Play Store App Store versi\u00F3n'},
  {pageId:'soporte',       sec:'Secci\u00F3n 09', title:'Soporte t\u00E9cnico',       text:'soporte chat correo email help.clickup.com universidad community estado servicio contacto'},
  {pageId:'glosario',      sec:'Secci\u00F3n 10', title:'Glosario de t\u00E9rminos',  text:'workspace space folder list task subtask assignee due date priority status FAB tag inbox CTA'},
  {pageId:'apendices',     sec:'Secci\u00F3n 11', title:'Ap\u00E9ndices',             text:'gestos acciones r\u00E1pidas comparativa planes free unlimited business referencias documentaci\u00F3n'},
];

// ── SEARCH FUNCTIONS ──────────────────────────────────────────────────────
function openSearch() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) {
    overlay.classList.add('open');
    setTimeout(() => {
      const input = document.getElementById('search-input');
      if (input) input.focus();
    }, 100);
  }
}

function closeSearch() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    const input = document.getElementById('search-input');
    if (input) input.value = '';
    const results = document.getElementById('search-results');
    if (results) results.innerHTML = '<div class="sr-empty">Escribe para buscar en todas las secciones del manual</div>';
  }
}

function doSearch(q) {
  const container = document.getElementById('search-results');
  if (!container) return;

  if (!q.trim()) {
    container.innerHTML = '<div class="sr-empty">Escribe para buscar en todas las secciones del manual</div>';
    return;
  }

  const terms = q.toLowerCase().split(' ').filter(Boolean);
  const results = SEARCH_INDEX.filter(item =>
    terms.some(t => item.text.toLowerCase().includes(t) || item.title.toLowerCase().includes(t))
  );

  if (!results.length) {
    container.innerHTML = '<div class="sr-empty">No se encontraron resultados para "<strong>' + q + '</strong>"</div>';
    return;
  }

  container.innerHTML = results.map(r => {
    const page = MANUAL_PAGES.find(p => p.id === r.pageId);
    const url = page ? resolveUrl(page.file) : '#';
    const snippet = r.text.split(' ').slice(0, 12).join(' ') + '\u2026';
    return `<div class="sr-item" onclick="window.location.href='${url}'">
      <div class="sr-sec">${r.sec}</div>
      <div class="sr-title">${r.title}</div>
      <div class="sr-snippet">${snippet}</div>
    </div>`;
  }).join('');
}
