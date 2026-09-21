(() => {
  const nav = document.getElementById('siteNav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const toast = document.getElementById('toast');

  window.addEventListener('scroll', () => nav.classList.toggle('solid', window.scrollY > 30), {passive:true});

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  const filters = [...document.querySelectorAll('.filter')];
  const projects = [...document.querySelectorAll('[data-tags]')];
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const value = btn.dataset.filter;
    projects.forEach(card => {
      const tags = (card.dataset.tags || '').split(' ');
      card.classList.toggle('is-hidden', value !== 'all' && !tags.includes(value));
    });
  }));

  let toastTimer;
  document.querySelectorAll('.pending-resource').forEach(link => link.addEventListener('click', (event) => {
    event.preventDefault();
    clearTimeout(toastTimer);
    toast.textContent = `${link.dataset.resource}: exact URL will be added when you provide the repository or slides.`;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }));

  // Make every image in Selected Work open in an accessible lightbox.
  const workImages = [...document.querySelectorAll('#work img')];
  let lastFocusedImage = null;

  if (workImages.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Expanded project image');
    lightbox.innerHTML = `
      <button class="lightbox-close" type="button" aria-label="Close expanded image">&times;</button>
      <div class="lightbox-content">
        <img class="lightbox-image" alt="">
        <p class="lightbox-caption" hidden></p>
      </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeButton = lightbox.querySelector('.lightbox-close');

    const openLightbox = (image) => {
      lastFocusedImage = image;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt || '';

      const figureCaption = image.closest('figure')?.querySelector('figcaption')?.textContent?.trim();
      const caption = figureCaption || image.alt?.trim() || '';
      lightboxCaption.textContent = caption;
      lightboxCaption.hidden = !caption;

      lightbox.classList.add('is-open');
      document.body.classList.add('lightbox-open');
      closeButton.focus();
    };

    const closeLightbox = () => {
      if (!lightbox.classList.contains('is-open')) return;
      lightbox.classList.remove('is-open');
      document.body.classList.remove('lightbox-open');
      lightboxImage.removeAttribute('src');
      if (lastFocusedImage) lastFocusedImage.focus();
    };

    workImages.forEach(image => {
      image.classList.add('zoomable-image');
      image.setAttribute('tabindex', '0');
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `${image.alt || 'Project image'}. Open larger view`);
      image.addEventListener('click', () => openLightbox(image));
      image.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(image);
        }
      });
    });

    closeButton.addEventListener('click', closeLightbox);
    lightboxImage.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeLightbox();
    });
  }

  const journey = [
    {lat:0.3517, lng:-78.1223},
    {lat:-0.1807, lng:-78.4678},
    {lat:4.7110, lng:-74.0721},
    {lat:45.4642, lng:9.1900},
    {lat:48.7136, lng:2.2075}
  ];

  if (window.L) {
    const map = L.map('heroMap', {zoomControl:false, attributionControl:true, dragging:false, scrollWheelZoom:false, doubleClickZoom:false, boxZoom:false, keyboard:false, touchZoom:false}).setView([28,-34],2.35);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap contributors',maxZoom:8}).addTo(map);
    const latlngs = journey.map(p => [p.lat,p.lng]);
    L.polyline(latlngs,{color:'#147d78',weight:1.4,opacity:.58,dashArray:'4 7'}).addTo(map);
    journey.forEach((p,i) => L.circleMarker([p.lat,p.lng],{radius:i===3?6:4,color:i===3?'#b18435':'#147d78',weight:1.4,fillColor:i===3?'#b18435':'#147d78',fillOpacity:.8}).addTo(map));
  }
})();
