const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navPanel = document.querySelector(".nav-panel");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-counter]");
const yearTarget = document.getElementById("current-year");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const updateHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

const closeMenu = () => {
  if (!navToggle || !navPanel) {
    return;
  }

  navPanel.classList.remove("is-open");
  navToggle.classList.remove("is-active");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Abrir menu");
};

const openMenu = () => {
  if (!navToggle || !navPanel) {
    return;
  }

  navPanel.classList.add("is-open");
  navToggle.classList.add("is-active");
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "Fechar menu");
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

if (navToggle && navPanel) {
  navToggle.addEventListener("click", () => {
    const isOpen = navPanel.classList.contains("is-open");

    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  });

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    if (!navPanel.contains(target) && !navToggle.contains(target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 760) {
      closeMenu();
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const currentId = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        const isMatch = link.getAttribute("href") === `#${currentId}`;
        link.classList.toggle("is-active", isMatch);
      });
    });
  },
  {
    rootMargin: "-45% 0px -45% 0px",
    threshold: 0
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const animateCounter = (element) => {
  const target = Number(element.dataset.counter);
  const startTime = performance.now();
  const duration = 1100;

  const step = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(target * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.5
  }
);

counters.forEach((counter) => counterObserver.observe(counter));
