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

// Mantém o cabeçalho legível sobre o hero e com contraste após a rolagem.
const updateHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

if (navToggle && navPanel) {
  navToggle.addEventListener("click", () => {
    const isOpen = navPanel.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navPanel?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Abrir menu");
  });
});

// Atualiza o link ativo conforme a seção mais próxima do topo visível.
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

// Revela os blocos conforme entram na área visível da tela.
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
    threshold: 0.16
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Anima números de prova social apenas uma vez, quando o bloco aparece.
const animateCounter = (element) => {
  const target = Number(element.dataset.counter);
  const duration = 1200;
  const startTime = performance.now();

  const step = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(target * easedProgress);

    element.textContent = currentValue;

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
