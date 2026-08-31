// Lightweight enhancements only. The form is Netlify-compatible and works without JS.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


// Photo magnifier / lightbox viewer
(() => {
  const lightbox = document.getElementById('photoLightbox');
  if (!lightbox) return;
  const img = document.getElementById('lightboxImage');
  const caption = document.getElementById('lightboxCaption');
  const stage = lightbox.querySelector('.lightbox-stage');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  let scale = 1, x = 0, y = 0, dragging = false, lastX = 0, lastY = 0;

  function apply() { img.style.transform = `translate(${x}px, ${y}px) scale(${scale})`; }
  function reset() { scale = 1; x = 0; y = 0; apply(); lightbox.querySelector('[data-zoom="reset"]').textContent = '100%'; }
  function setScale(next) {
    scale = Math.max(1, Math.min(5, next));
    if (scale === 1) { x = 0; y = 0; }
    apply();
    lightbox.querySelector('[data-zoom="reset"]').textContent = `${Math.round(scale*100)}%`;
  }
  function openPhoto(source) {
    img.src = source.currentSrc || source.src;
    img.alt = source.alt || '';
    const figure = source.closest('figure');
    const figcap = figure && figure.querySelector('figcaption');
    caption.textContent = figcap ? figcap.textContent : (source.alt || '');
    reset();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closePhoto() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    img.src = '';
  }

  document.querySelectorAll('.tired-gallery img, .proof-photo img, .hero-visual img').forEach(source => {
    source.setAttribute('tabindex','0');
    source.setAttribute('role','button');
    source.setAttribute('aria-label', `Enlarge photo: ${source.alt || 'detail photo'}`);
    source.addEventListener('click', () => openPhoto(source));
    source.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPhoto(source); } });

    const parent = source.parentElement;
    if (parent && getComputedStyle(parent).position === 'static') parent.style.position = 'relative';
    if (parent && !parent.querySelector('.photo-zoom-badge')) {
      const badge = document.createElement('span'); badge.className='photo-zoom-badge'; badge.setAttribute('aria-hidden','true'); badge.textContent='⌕'; parent.appendChild(badge);
    }
  });

  closeBtn.addEventListener('click', closePhoto);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closePhoto(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.classList.contains('open')) closePhoto(); });
  lightbox.querySelector('[data-zoom="in"]').addEventListener('click', () => setScale(scale + .35));
  lightbox.querySelector('[data-zoom="out"]').addEventListener('click', () => setScale(scale - .35));
  lightbox.querySelector('[data-zoom="reset"]').addEventListener('click', reset);
  stage.addEventListener('wheel', e => { e.preventDefault(); setScale(scale + (e.deltaY < 0 ? .2 : -.2)); }, {passive:false});
  stage.addEventListener('pointerdown', e => { if (scale <= 1) return; dragging=true; lastX=e.clientX; lastY=e.clientY; stage.classList.add('dragging'); stage.setPointerCapture(e.pointerId); });
  stage.addEventListener('pointermove', e => { if (!dragging) return; x += e.clientX-lastX; y += e.clientY-lastY; lastX=e.clientX; lastY=e.clientY; apply(); });
  stage.addEventListener('pointerup', e => { dragging=false; stage.classList.remove('dragging'); try { stage.releasePointerCapture(e.pointerId); } catch(_) {} });
})();
