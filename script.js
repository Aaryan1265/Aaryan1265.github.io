const projectData = {
  finguard: {
    type: "Full-stack / Risk Monitoring",
    title: "FinGuard",
    description: "A full-stack transaction risk monitoring platform designed around API-driven workflows, persistence, and containerized development.",
    highlights: [
      "REST API architecture for transaction and risk workflows",
      "Relational persistence with PostgreSQL",
      "Redis-backed infrastructure for application workflows",
      "Next.js / TypeScript front end with FastAPI backend",
      "Docker-based development and repeatable environments"
    ],
    tags: ["Next.js","TypeScript","FastAPI","PostgreSQL","Redis","Docker"],
    github: "https://github.com/Aaryan1265"
  },
  controlbridge: {
    type: "Data Engineering / ETL",
    title: "ControlBridge",
    description: "Enterprise data reconciliation and risk reporting platform focused on validation, cross-system reconciliation, ETL, exception detection, and reporting.",
    highlights: [
      "Validation and data-control workflows",
      "Cross-system reconciliation and exception detection",
      "ETL into a relational warehouse",
      "Python / Pandas processing with SQLAlchemy",
      "Pytest coverage and Dockerized development"
    ],
    tags: ["Python","Pandas","SQLAlchemy","ETL","Pytest","Docker"],
    github: "https://github.com/Aaryan1265/ControlBridge-Enterprise-Data-Reconciliation-Platform"
  },
  shadowtrace: {
    type: "Security / Backend",
    title: "ShadowTrace",
    description: "An identity and security platform focused on authentication risk, explainable scoring, security alerts, REST APIs, and database-backed workflows.",
    highlights: [
      "Explainable risk scoring for suspicious login behavior",
      "REST API workflows for authentication-risk events",
      "PostgreSQL-backed persistence",
      "Structured backend services with SQLAlchemy",
      "Dockerized application environment"
    ],
    tags: ["Python","FastAPI","PostgreSQL","SQLAlchemy","Docker"],
    github: "https://github.com/Aaryan1265"
  },
  repodoctor: {
    type: "AI / Developer Tooling",
    title: "RepoDoctor",
    description: "An AI-powered repository health analyzer combining deterministic checks with optional AI summaries for code quality, security, testing, and maintainability.",
    highlights: [
      "Deterministic repository health scoring",
      "Security and code-quality checks",
      "Optional AI-generated summaries",
      "Automated testing and CI-oriented workflow",
      "GitHub-focused developer tooling"
    ],
    tags: ["Python","FastAPI","LLMs","GitHub","Docker"],
    github: "https://github.com/Aaryan1265"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Mobile navigation
  const menu = $(".menu");
  const nav = $(".nav nav");
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
    $$("a", nav).forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
    }));
  }

  // Smooth internal navigation
  $$("[data-jump]").forEach(button => {
    button.addEventListener("click", () => {
      const target = $(button.dataset.jump);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Scroll reveal
  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(el => revealObserver.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("visible"));
  }

  // Scroll progress + active nav
  const progress = $(".scroll-progress span");
  const sections = $$("main section[id]");
  const navLinks = $$("[data-section]");
  const updateScrollUI = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (progress) progress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  };
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle("active", link.dataset.section === entry.target.id));
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Typewriter role rotation
  const roleText = $("#roleText");
  const roles = ["Software Developer", "Full-Stack Builder", "Data & ETL Developer", "Backend Problem Solver"];
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = true;
  const typeRole = () => {
    if (!roleText || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const current = roles[roleIndex];
    if (deleting) {
      charIndex--;
      if (charIndex <= 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    } else {
      charIndex++;
      if (charIndex >= roles[roleIndex].length) {
        deleting = true;
        charIndex = roles[roleIndex].length;
      }
    }
    roleText.textContent = deleting ? roles[roleIndex] : roles[roleIndex].slice(0, charIndex);
    const delay = deleting ? 45 : 80;
    setTimeout(typeRole, charIndex === 0 ? 400 : delay);
  };
  setTimeout(() => {
    roleIndex = 1;
    charIndex = 0;
    deleting = false;
    typeRole();
  }, 1800);

  // Experience accordion
  $$(".experience-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".experience-item");
      const wasOpen = item.classList.contains("open");
      $$(".experience-item").forEach(other => {
        other.classList.remove("open");
        $(".experience-trigger", other)?.setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Skill interactions
  const skillHint = $("#skillHint");
  const skillMap = {
    python: "Strongest matches: ControlBridge, ShadowTrace and RepoDoctor.",
    cpp: "Relevant to foundational programming and systems coursework.",
    javascript: "Strongest match: FinGuard and web application development.",
    typescript: "Strongest match: FinGuard front-end architecture.",
    sql: "Strongest match: ControlBridge and database-backed application work.",
    react: "Strongest match: FinGuard and component-driven UI development.",
    nextjs: "Strongest match: FinGuard full-stack application development.",
    fastapi: "Strongest matches: FinGuard, ShadowTrace and RepoDoctor.",
    postgresql: "Strongest matches: FinGuard and ShadowTrace.",
    docker: "Used across project environments for reproducible development.",
    git: "Used for version control, collaboration and project delivery.",
    pandas: "Strongest match: ControlBridge data processing and ETL workflows.",
    pytest: "Used to support reliable, testable project code.",
    llm: "Strongest match: RepoDoctor's optional AI summaries.",
    etl: "Strongest match: ControlBridge's data pipeline and reconciliation workflows."
  };
  $$("#skillCloud button").forEach(button => {
    button.addEventListener("click", () => {
      $$("#skillCloud button").forEach(b => b.classList.remove("selected"));
      button.classList.add("selected");
      if (skillHint) skillHint.textContent = skillMap[button.dataset.skill] || "Relevant across selected project work.";
    });
  });

  // Project filters
  $$(".filter").forEach(filter => {
    filter.addEventListener("click", () => {
      $$(".filter").forEach(f => f.classList.remove("active"));
      filter.classList.add("active");
      const value = filter.dataset.filter;
      $$(".project-card").forEach(card => {
        const show = value === "all" || card.dataset.category === value;
        card.classList.toggle("hidden", !show);
      });
    });
  });

  // Project modal
  const modal = $("#projectModal");
  const modalTitle = $("#modalTitle");
  const modalType = $("#modalType");
  const modalDescription = $("#modalDescription");
  const modalHighlights = $("#modalHighlights");
  const modalTags = $("#modalTags");
  const modalGithub = $("#modalGithub");

  const closeModal = () => {
    if (modal?.open) modal.close();
  };

  $$(".project-open").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".project-card");
      const data = projectData[card?.dataset.project];
      if (!data || !modal) return;
      modalType.textContent = data.type;
      modalTitle.textContent = data.title;
      modalDescription.textContent = data.description;
      modalHighlights.innerHTML = data.highlights.map(item => `<li>${item}</li>`).join("");
      modalTags.innerHTML = data.tags.map(tag => `<span>${tag}</span>`).join("");
      modalGithub.href = data.github;
      if (typeof modal.showModal === "function") modal.showModal();
      else modal.setAttribute("open", "");
    });
  });
  $(".modal-close")?.addEventListener("click", closeModal);
  $(".modal-dismiss")?.addEventListener("click", closeModal);
  modal?.addEventListener("click", event => {
    if (event.target === modal) closeModal();
  });

  // Leadership micro-interaction
  $$(".lead-card").forEach(card => {
    card.addEventListener("click", () => showToast(card.dataset.lead || "Leadership experience"));
  });

  // Copy email
  const copyEmail = $(".copy-email");
  copyEmail?.addEventListener("click", async () => {
    const email = copyEmail.dataset.email;
    if (!email || email.includes("YOUR_EMAIL")) {
      showToast("Add your real email to enable this.");
      return;
    }
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied.");
    } catch {
      showToast(email);
    }
  });

  // Desktop cursor glow
  const glow = $(".cursor-glow");
  if (glow && window.matchMedia("(pointer:fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener("pointermove", event => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  // Subtle card tilt on pointer devices
  if (window.matchMedia("(pointer:fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $$("[data-tilt]").forEach(card => {
      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-2px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  // Magnetic buttons
  if (window.matchMedia("(pointer:fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $$(".magnetic").forEach(el => {
      el.addEventListener("pointermove", event => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${(x * 0.12).toFixed(1)}px, ${(y * 0.12).toFixed(1)}px)`;
      });
      el.addEventListener("pointerleave", () => el.style.transform = "");
    });
  }

  function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
  }
});
