const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
navLinks.forEach((link) => {
  const page = link.dataset.page || link.getAttribute("href");
  link.classList.toggle("active", page === currentPage);
});

const revealElements = Array.from(document.querySelectorAll(".reveal"));
if ("IntersectionObserver" in window && revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealElements.forEach((el, index) => {
    el.style.animationDelay = `${80 + index * 70}ms`;
    revealObserver.observe(el);
  });
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

const meterFills = Array.from(document.querySelectorAll(".meter-fill"));
if (meterFills.length) {
  const animateBars = () => {
    meterFills.forEach((bar, index) => {
      const level = Number.parseInt(bar.dataset.level || "0", 10);
      const safeLevel = Number.isFinite(level) ? Math.max(0, Math.min(100, level)) : 0;
      setTimeout(() => {
        bar.style.width = `${safeLevel}%`;
      }, 150 + index * 100);
    });
  };

  if ("IntersectionObserver" in window) {
    const barsParent = document.querySelector(".skill-bars");
    if (barsParent) {
      const meterObserver = new IntersectionObserver(
        (entries, obs) => {
          if (entries[0]?.isIntersecting) {
            animateBars();
            obs.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      meterObserver.observe(barsParent);
    } else {
      animateBars();
    }
  } else {
    animateBars();
  }
}
