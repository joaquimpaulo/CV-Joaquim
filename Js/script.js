document.addEventListener('DOMContentLoaded', function () {

  // ── 1. INJECT PRINT BUTTON ──────────────────
  const btn = document.createElement('button');
  btn.className = 'print-btn';
  btn.setAttribute('aria-label', 'Imprimir ou guardar como PDF');
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 6 2 18 2 18 9"/>
      <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
      <rect x="6" y="14" width="12" height="8"/>
    </svg>
    Imprimir / Guardar PDF
  `;
  btn.addEventListener('click', function () {
    window.print();
  });
  document.body.appendChild(btn);


  // ── 2. FADE-IN ANIMATION ON LOAD ────────────
  const cvPage = document.querySelector('.cv-page');
  if (cvPage) {
    cvPage.style.opacity = '0';
    cvPage.style.transform = 'translateY(16px)';
    cvPage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        cvPage.style.opacity = '1';
        cvPage.style.transform = 'translateY(0)';
      });
    });
  }


  // ── 3. STAGGERED SECTION REVEAL ─────────────
  const sections = document.querySelectorAll('.cv-section');
  sections.forEach(function (section, index) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(12px)';
    section.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    section.style.transitionDelay = (0.15 + index * 0.1) + 's';

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      });
    });
  });


  // ── 4. TIMELINE DOT HOVER HIGHLIGHT ─────────
  const dots = document.querySelectorAll('.tl-dot');
  dots.forEach(function (dot) {
    const item = dot.closest('.timeline-item');
    if (!item) return;
    item.addEventListener('mouseenter', function () {
      dot.style.background = '#2e3a4e';
      dot.style.transition = 'background 0.2s';
    });
    item.addEventListener('mouseleave', function () {
      dot.style.background = '#fff';
    });
  });


  // ── 5. DOCUMENTOS ────────────────────────────

  const docs = [
    { name: 'Automação Residencial',      file: 'Automação residencial.png',                         type: 'image' },
    { name: 'BI de Gui de Paulo',         file: 'BI de Gui de Paulo.pdf',                            type: 'pdf'   },
    { name: 'Certificado Webinar',        file: 'Certificado 2 Webinar - Joaquim Paulo Joaquim.pdf', type: 'pdf'   },
    { name: 'Certificado Read2work',      file: 'certificado do Read2work.pdf',                      type: 'pdf'   },
    { name: 'certificado da 12ª classe',  file: 'certificado da 12ª classe.pdf',                     type: 'pdf' },
    { name: 'certificado da 10ª classe',  file: 'certificado da 10ª classe',                         type: 'pdf' },
    { name: 'CV Alternativo',             file: 'CV_alternativo.pdf',                                type: 'pdf'   },
    { name: 'Nuit-Gui de Paulo',          file: 'Nuit-Gui de Paulo.pdf',                             type: 'pdf' },
    { name: 'Recenseamento Militar',      file: 'Recenseamento Militar.pdf',                         type: 'pdf' },
    { name: 'Sistema Rodoviário',         file: 'Sistema rodoviario.png',                            type: 'image' },
    { name: 'Sistema de Inundação',       file: 'Sistema de inundação.png',                          type: 'image' },
  ];

  // ── Botão "Ver Documentos" ──
  const docsBtn = document.createElement('button');
  docsBtn.className = 'docs-btn no-print';
  docsBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
    Outros Documentos
  `;
  docsBtn.addEventListener('click', openDocsModal);
  document.body.appendChild(docsBtn);


  // ── Modal lista de documentos ──
  function openDocsModal() {
    const existing = document.getElementById('docs-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'docs-modal';
    modal.innerHTML = `
      <div class="docs-overlay" id="docs-overlay"></div>
      <div class="docs-panel">
        <div class="docs-panel-header">
          <span class="docs-panel-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            Os Meus Documentos
          </span>
          <button class="docs-close" id="docs-close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="docs-grid">
          ${docs.map(function(doc) {
            const icon = doc.type === 'pdf'
              ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="32" height="32"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>`
              : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="32" height="32"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;
            return `
              <div class="docs-card" data-file="docs/${doc.file}" data-type="${doc.type}" data-name="${doc.name}">
                <div class="docs-card-icon ${doc.type === 'pdf' ? 'icon-pdf' : 'icon-img'}">${icon}</div>
                <div class="docs-card-name">${doc.name}</div>
                <div class="docs-card-badge">${doc.type === 'pdf' ? 'PDF' : 'PNG'}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('docs-overlay').addEventListener('click', closeDocsModal);
    document.getElementById('docs-close').addEventListener('click', closeDocsModal);

    modal.querySelectorAll('.docs-card').forEach(function(card) {
      card.addEventListener('click', function() {
        openViewer(card.dataset.file, card.dataset.type, card.dataset.name);
      });
    });
  }

  function closeDocsModal() {
    const modal = document.getElementById('docs-modal');
    if (modal) modal.remove();
  }


  // ── Viewer de documento ──
  function openViewer(filePath, type, name) {
    closeDocsModal();
    const existing = document.getElementById('doc-viewer');
    if (existing) existing.remove();

    const viewer = document.createElement('div');
    viewer.id = 'doc-viewer';

    const content = type === 'pdf'
      ? `<iframe src="${filePath}" title="${name}"></iframe>`
      : `<div class="viewer-img-wrap"><img src="${filePath}" alt="${name}" /></div>`;

    viewer.innerHTML = `
      <div class="viewer-overlay" id="viewer-overlay"></div>
      <div class="viewer-panel">
        <div class="viewer-header">
          <button class="viewer-back" id="viewer-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="15" height="15"><polyline points="15 18 9 12 15 6"/></svg>
            Voltar
          </button>
          <span class="viewer-title">${name}</span>
          <button class="viewer-print-btn" id="viewer-print">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="15" height="15"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Imprimir
          </button>
          <button class="viewer-close" id="viewer-close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="viewer-body">${content}</div>
      </div>
    `;
    document.body.appendChild(viewer);

    document.getElementById('viewer-overlay').addEventListener('click', closeViewer);
    document.getElementById('viewer-close').addEventListener('click', closeViewer);

    document.getElementById('viewer-back').addEventListener('click', function() {
      closeViewer();
      openDocsModal();
    });

    document.getElementById('viewer-print').addEventListener('click', function() {
      const win = window.open(filePath, '_blank');
      if (win) win.focus();
    });
  }

  function closeViewer() {
    const viewer = document.getElementById('doc-viewer');
    if (viewer) viewer.remove();
  }

});