/* ════════════════════════════════════════════════════
   SSP COUTURE — About Page  (v2 — complete rewrite)
   Smooth scroll + scroll-hero frames + chapter reveals
   ════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════
     1. SCROLL-HERO  —  frame crossfade & canvas engine
     ══════════════════════════════════════════════════ */

  const hero = document.querySelector('.scroll-hero');

  if (hero) {
    const track = hero.querySelector('.scroll-hero__track');
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas?.getContext('2d');
    const captions = hero.querySelectorAll('.scroll-hero__caption');
    const progress = document.getElementById('hero-progress');
    const cue = document.getElementById('hero-cue');
    const loader = document.getElementById('hero-loader');
    const loadFill = document.getElementById('hero-loading-fill');

    const frameCount = 240;
    const images = [];
    let loadedCount = 0;
    let activeFrameIndex = 0;
    let activeCaption = 0;
    let raf = null;

    // Canvas scaling to match viewport
    let lastWidth = window.innerWidth;
    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      renderFrame(activeFrameIndex);
    }
    // Prevent iOS Safari jumpy resize when scrolling hides URL bar
    window.addEventListener('resize', () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        resizeCanvas();
      }
    });

    // Draw image covering the whole canvas properly
    function drawImageScaled(img) {
      if (!img || !img.complete || img.naturalHeight === 0 || !ctx) return;
      const hRatio = canvas.width / img.naturalWidth;
      const vRatio = canvas.height / img.naturalHeight;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.naturalWidth * ratio) / 2;
      const centerShift_y = (canvas.height - img.naturalHeight * ratio) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, centerShift_x, centerShift_y, img.naturalWidth * ratio, img.naturalHeight * ratio);
    }

    const currentFrame = (idx) => `/static/images/about-us/about-frames/frame_${String(idx).padStart(4, '0')}.png`;

    // Preload all 240 frames efficiently
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      images.push(img);
      
      const onImageLoadedOrError = () => {
        loadedCount++;
        if (loadFill) loadFill.style.width = `${(loadedCount / frameCount) * 100}%`;
        
        if (loadedCount === frameCount) {
          if (loader) loader.classList.add('is-hidden');
          canvas.classList.add('is-ready');
        }
      };

      img.onload = () => {
        if (i === 1) resizeCanvas();
        if (i - 1 === activeFrameIndex) renderFrame(activeFrameIndex);
        onImageLoadedOrError();
      };
      
      img.onerror = () => {
        console.warn(`Frame ${i} failed to load from ${img.src}`);
        onImageLoadedOrError();
      };

      // Start loading
      img.src = currentFrame(i);
    }

    function renderFrame(index) {
      if (images[index]) {
        drawImageScaled(images[index]);
      }
    }

    function tick() {
      const rect = track.getBoundingClientRect();
      const scroll = -rect.top;                         // px scrolled inside track
      const range = track.offsetHeight - window.innerHeight;
      const pct = Math.max(0, Math.min(1, scroll / range));   // 0 → 1

      /* progress bar */
      if (progress) progress.style.height = (pct * 100) + '%';

      /* scroll cue */
      if (cue) cue.classList.toggle('is-hidden', pct > 0.04);

      /* which frame? */
      const fi = Math.min(frameCount - 1, Math.floor(pct * frameCount));
      if (fi !== activeFrameIndex) {
        activeFrameIndex = fi;
        renderFrame(activeFrameIndex);
      }

      /* which caption? */
      const ci = Math.min(captions.length - 1, Math.floor(pct * captions.length));
      if (ci !== activeCaption) {
        captions.forEach((c, i) => {
          c.classList.toggle('is-active', i === ci);
        });
        activeCaption = ci;
      }

      raf = null;
    }

    window.addEventListener('scroll', () => {
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });

    tick();                     // initial state
  }


  /* ══════════════════════════════════════════════════
     2. CHAPTER REVEALS  (IntersectionObserver)
     ══════════════════════════════════════════════════ */

  const revealEls = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    });

    revealEls.forEach((el) => obs.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('revealed'));
  }


  /* ══════════════════════════════════════════════════
     3. HEADER SCROLL STATE
     ══════════════════════════════════════════════════ */

  const header = document.getElementById('site-header');

  if (header) {
    let scrolled = false;
    let lastY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentY = window.scrollY;
      const isScrolled = currentY > 60;
      
      if (isScrolled !== scrolled) {
        header.classList.toggle('scrolled', isScrolled);
        scrolled = isScrolled;
      }
      
      // Smart Nav logic: Hide on scroll down, show on scroll up
      if (currentY > 400 && currentY > lastY) {
         header.classList.add('hidden');
      } else if (currentY < lastY) {
         header.classList.remove('hidden');
      }
      
      lastY = currentY;
    }, { passive: true });
  }


  /* ══════════════════════════════════════════════════
     4. IMAGE PARALLAX ON CHAPTERS (subtle)
     ══════════════════════════════════════════════════ */

  const chapterImages = document.querySelectorAll('.chapter__image img');

  if (chapterImages.length && window.matchMedia('(min-width: 768px)').matches) {
    let parallaxRaf;

    function updateParallax() {
      chapterImages.forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const ratio = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          const shift = (ratio - 0.5) * 30;        // ±15 px
          img.style.transform = `translateY(${shift}px) scale(1.04)`;
        }
      });
      parallaxRaf = null;
    }

    window.addEventListener('scroll', () => {
      if (!parallaxRaf) parallaxRaf = requestAnimationFrame(updateParallax);
    }, { passive: true });
  }


  console.log('✨ About v2 initialized');
})();
