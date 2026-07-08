document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 40);
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const observerOptions = { rootMargin: '-30% 0px -60% 0px' };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  const fadeElements = document.querySelectorAll(
    '.section__header, .product-card, .why__card, .gallery__item, .about__content, .about__images, .order__content, .order__visual, .testimonial__wrapper'
  );

  fadeElements.forEach(el => el.classList.add('fade-in'));

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeElements.forEach(el => fadeObserver.observe(el));

  const ytPlayer = document.getElementById('ytPlayer');
  const testimonialCover = document.getElementById('testimonialCover');
  const testimonialCoverImg = document.getElementById('testimonialCoverImg');
  const testimonialNowTitle = document.getElementById('testimonialNowTitle');
  const testimonialNowName = document.getElementById('testimonialNowName');
  const testimonialCards = document.querySelectorAll('.testimonial__card');
  const testimonialPlayer = document.getElementById('testimonialPlayer');

  let activeVideoId = 'ki4muMsW8Yg';

  const getYoutubeEmbedUrl = (videoId, autoplay = true) =>
    `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1&playsinline=1`;

  const getYoutubeThumbnail = (videoId, quality = 'maxresdefault') =>
    `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;

  const playTestimonial = (videoId, title, name, scrollToPlayer = false) => {
    if (!ytPlayer || !testimonialCover) return;

    activeVideoId = videoId;
    ytPlayer.src = getYoutubeEmbedUrl(videoId, true);
    testimonialCover.classList.add('is-hidden');

    if (testimonialCoverImg) {
      testimonialCoverImg.src = getYoutubeThumbnail(videoId, 'maxresdefault');
      testimonialCoverImg.onerror = () => {
        testimonialCoverImg.src = getYoutubeThumbnail(videoId, 'hqdefault');
      };
    }

    if (testimonialNowTitle) testimonialNowTitle.textContent = title;
    if (testimonialNowName) testimonialNowName.textContent = name;

    testimonialCards.forEach(card => {
      card.classList.toggle('is-active', card.dataset.videoId === videoId);
    });

    if (scrollToPlayer && testimonialPlayer) {
      testimonialPlayer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  testimonialCards.forEach(card => {
    card.addEventListener('click', () => {
      playTestimonial(
        card.dataset.videoId,
        card.dataset.title,
        card.dataset.name,
        window.innerWidth <= 768
      );
    });
  });

  if (testimonialCover) {
    testimonialCover.addEventListener('click', () => {
      const activeCard = document.querySelector('.testimonial__card.is-active') || testimonialCards[0];
      if (!activeCard) return;

      playTestimonial(
        activeCard.dataset.videoId,
        activeCard.dataset.title,
        activeCard.dataset.name
      );
    });
  }
});