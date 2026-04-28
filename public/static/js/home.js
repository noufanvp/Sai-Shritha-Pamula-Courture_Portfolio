/* ═══════════════════════════════════════════════════
   SSP COUTURE — Homepage Interactions (Cinematic)
   Advanced scroll reveals, parallax, text animations
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. Cinematic Scroll Reveal ── */
  const cinRevealElements = document.querySelectorAll('.cin-reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.delay || '0', 10);

            setTimeout(() => {
              el.classList.add('is-visible');
            }, delay);

            revealObserver.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    cinRevealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback — show everything immediately
    cinRevealElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* ── 2. Character-by-character reveal ── */
  const charRevealElements = document.querySelectorAll('.char-reveal');

  charRevealElements.forEach((el) => {
    // Preserve HTML structure while wrapping individual characters
    const originalHTML = el.innerHTML;
    const fragment = document.createDocumentFragment();

    // Process text nodes and preserve HTML tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;

    let charIndex = 0;
    const processNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const wrapper = document.createDocumentFragment();
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            wrapper.appendChild(document.createTextNode(' '));
          } else {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = text[i];
            span.style.transitionDelay = `${charIndex * 0.025}s`;
            charIndex++;
            wrapper.appendChild(span);
          }
        }
        node.parentNode.replaceChild(wrapper, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Process children of HTML elements (like <em>)
        const childNodes = Array.from(node.childNodes);
        childNodes.forEach(processNode);
      }
    };

    const childNodes = Array.from(tempDiv.childNodes);
    childNodes.forEach(processNode);
    el.innerHTML = tempDiv.innerHTML;

    // Observe for visibility
    if ('IntersectionObserver' in window) {
      const charObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              charObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      charObserver.observe(el);
    } else {
      el.classList.add('is-visible');
    }
  });

  /* ── 3. Header scroll state ── */
  const header = document.getElementById('site-header');

  if (header) {
    let ticking = false;

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            if (window.scrollY > 80) {
              header.classList.add('scrolled');
            } else {
              header.classList.remove('scrolled');
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* ── 4. Parallax on hero background ── */
  const heroBg = document.getElementById('hero-parallax');

  if (heroBg && window.matchMedia('(min-width: 768px)').matches) {
    let rafId;

    const updateParallax = () => {
      const scrolled = window.scrollY;
      const heroHeight = document.getElementById('hero').offsetHeight;

      if (scrolled < heroHeight * 1.5) {
        const rate = scrolled * 0.35;
        heroBg.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0001})`;
      }
    };

    window.addEventListener(
      'scroll',
      () => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updateParallax);
      },
      { passive: true }
    );
  }

  /* ── 5. Magnetic hover on design cards ── */
  const designCards = document.querySelectorAll('.design-card');

  designCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      card.style.transform = `translateY(-6px) rotateX(${-deltaY * 2}deg) rotateY(${deltaX * 2}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
      card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease-out';
    });
  });

  /* ── 6. Smooth section scroll progress ── */
  const sections = document.querySelectorAll('section[id]');

  if ('IntersectionObserver' in window && sections.length) {
    const progressObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Update active nav link
            const id = entry.target.id;
            document.querySelectorAll('.site-nav__link').forEach((link) => {
              link.classList.remove('is-active');
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => progressObserver.observe(section));
  }
})();
