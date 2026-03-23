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


  // ── 2. PHOTO UPLOAD ─────────────────────────
  const avatarInput  = document.getElementById('avatar-input');
  const avatarImg    = document.getElementById('avatar-img');
  const avatarInit   = document.getElementById('avatar-initials');
  const avatarCircle = document.getElementById('avatar-circle');

  // Clicar no círculo também abre o seletor de ficheiro
  avatarCircle.addEventListener('click', function () {
    avatarInput.click();
  });

  avatarInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor escolha um ficheiro de imagem (JPG, PNG, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      avatarImg.src = event.target.result;
      avatarImg.style.display = 'block';
      avatarInit.style.display = 'none';

      // Guarda a foto para que persista ao recarregar a página
      try {
        localStorage.setItem('cv_avatar', event.target.result);
      } catch (err) {}
    };
    reader.readAsDataURL(file);
  });

  // Restaura a foto guardada ao abrir a página
  try {
    const saved = localStorage.getItem('cv_avatar');
    if (saved) {
      avatarImg.src = saved;
      avatarImg.style.display = 'block';
      avatarInit.style.display = 'none';
    }
  } catch (err) {}


  // ── 3. FADE-IN ANIMATION ON LOAD ────────────
  const cvPage = document.querySelector('.cv-page');
  if (cvPage) {
    cvPage.style.opacity = '0';
    cvPage.style.transform = 'translateY(16px)';
    cvPage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    // Trigger after a tiny delay so transition fires
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        cvPage.style.opacity = '1';
        cvPage.style.transform = 'translateY(0)';
      });
    });
  }


  // ── 4. STAGGERED SECTION REVEAL ─────────────
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


  // ── 5. TIMELINE DOT HOVER HIGHLIGHT ─────────
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

});