document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  const navLogo = document.querySelector(".nav-logo img");
  const hero = document.querySelector(".hero");
  const navLinks = [...document.querySelectorAll('.nav-link, a[href^="#"]:not(.btn-site)')];
  const sections = [...document.querySelectorAll("main section[id], header[id]")];
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");
  const galleryItems = [...document.querySelectorAll(".gallery-item")];
  const track = document.getElementById("testimonials-track");
  const testimonialItems = track ? [...track.querySelectorAll(".testimonial-item")] : [];
  const dotsEl = document.getElementById("t-dots");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let currentGalleryIndex = -1;
  let currentSlide = 0;
  let autoPlay;

  function setNavbarState() {
    const isScrolled = window.scrollY > 50;
    navbar.classList.toggle("scrolled", isScrolled);

    if (navLogo) {
      const logoSrc = isScrolled || navbar.classList.contains("menu-open")
        ? navLogo.dataset.logoScrolled
        : navLogo.dataset.logoDefault;

      if (logoSrc && navLogo.getAttribute("src") !== logoSrc) {
        navLogo.setAttribute("src", logoSrc);
      }
    }

    if (hero && !reduceMotion && window.innerWidth > 991) {
      const offset = Math.min(window.scrollY * 0.35, 220);
      hero.style.backgroundPosition = `center calc(50% + ${offset}px)`;
    }
  }

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 140;
    let currentId = sections[0] ? sections[0].id : "";

    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) {
        currentId = section.id;
      }
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  }

  function closeMenu() {
    menu.classList.remove("open");
    navbar.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    navbar.classList.toggle("menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      closeMenu();
    });
  });

  function animateCount(element) {
    const target = Number(element.dataset.target || 0);
    const duration = 1800;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      element.textContent = `+${value}`;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        element.textContent = `+${target}`;
      }
    }

    requestAnimationFrame(frame);
  }

  const countObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".count-up").forEach((element) => countObserver.observe(element));

  function openLightbox(index) {
    if (!galleryItems.length) {
      return;
    }

    currentGalleryIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentGalleryIndex];
    const image = item.querySelector("img");
    lightboxImg.src = item.dataset.full || (image ? image.src : "");
    lightboxImg.alt = image ? image.alt : "Imagem ampliada da clínica";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function showGalleryStep(step) {
    if (!galleryItems.length || currentGalleryIndex < 0) {
      return;
    }

    openLightbox(currentGalleryIndex + step);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    lightboxImg.alt = "Imagem ampliada da clínica";
    currentGalleryIndex = -1;
    document.body.classList.remove("modal-open");
  }

  lightboxClose.addEventListener("click", closeLightbox);

  lightboxPrev.addEventListener("click", (event) => {
    event.stopPropagation();
    showGalleryStep(-1);
  });

  lightboxNext.addEventListener("click", (event) => {
    event.stopPropagation();
    showGalleryStep(1);
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    } else if (event.key === "ArrowLeft" && lightbox.classList.contains("open")) {
      showGalleryStep(-1);
    } else if (event.key === "ArrowRight" && lightbox.classList.contains("open")) {
      showGalleryStep(1);
    }
  });

  function goToSlide(index) {
    currentSlide = (index + testimonialItems.length) % testimonialItems.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dotsEl.querySelectorAll(".t-dot").forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === currentSlide);
    });
  }

  function resetAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  testimonialItems.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = `t-dot${index === 0 ? " active" : ""}`;
    dot.addEventListener("click", () => {
      goToSlide(index);
      resetAutoPlay();
    });
    dotsEl.appendChild(dot);
  });

  document.querySelector(".t-prev").addEventListener("click", () => {
    goToSlide(currentSlide - 1);
    resetAutoPlay();
  });

  document.querySelector(".t-next").addEventListener("click", () => {
    goToSlide(currentSlide + 1);
    resetAutoPlay();
  });

  autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000);

  setNavbarState();
  updateActiveLink();

  window.addEventListener("scroll", () => {
    setNavbarState();
    updateActiveLink();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 991) {
      closeMenu();
    }
    setNavbarState();
  });
});
