/**
 * DaniRev SMP — Плавные переходы между страницами
 */

(function () {
  // ── Создаём оверлей для анимации ──
  const overlay = document.createElement('div');
  overlay.id = 'page-overlay';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: #0a0a0a;
    z-index: 99999;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.35s ease;
  `;
  document.body.appendChild(overlay);

  // ── Появление страницы (fade in) ──
  function fadeIn() {
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'none';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.opacity = '0';
      });
    });
  }

  // ── Уход со страницы (fade out) → переход ──
  function fadeOut(url) {
    overlay.style.pointerEvents = 'all';
    overlay.style.opacity = '1';
    setTimeout(() => {
      window.location.href = url;
    }, 370);
  }

  // ── Перехватываем все внутренние ссылки ──
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Пропускаем: внешние ссылки, якоря (#), target="_blank"
    const isExternal  = href.startsWith('http') || href.startsWith('//');
    const isAnchor    = href.startsWith('#');
    const isBlank     = link.target === '_blank';
    const isMailTel   = href.startsWith('mailto:') || href.startsWith('tel:');

    if (isExternal || isAnchor || isBlank || isMailTel) return;

    // Плавный переход
    e.preventDefault();
    fadeOut(href);
  });

  // ── При загрузке страницы — fade in ──
  window.addEventListener('pageshow', fadeIn);
  fadeIn(); // на случай если pageshow уже отработал
})();
