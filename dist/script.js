const data = window.HOMEPAGE_DATA;

function byId(id) {
  return document.getElementById(id);
}

function setText(id, value) {
  const target = byId(id);
  if (target) target.textContent = value || "";
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined && text !== null) element.textContent = text;
  return element;
}

function applyExternalLinkAttrs(anchor, href) {
  if (/^https?:\/\//.test(href)) {
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
  }
}

function makeLink(link, className) {
  const anchor = makeElement("a", className, link.label);
  anchor.href = link.href;
  applyExternalLinkAttrs(anchor, link.href);
  return anchor;
}

function getPrimaryHref(project) {
  return project.productUrl || project.detailUrl || "#projects";
}

function renderHero() {
  const profile = data.profile;
  setText("site-brand", profile.name);
  setText("profile-eyebrow", profile.eyebrow);
  setText("profile-name", `${profile.name} · ${profile.nameEn}`);
  setText("profile-headline", profile.headline);
  setText("profile-intro", profile.intro);
  const actions = byId("hero-actions");
  profile.actions.forEach((item) => {
    actions.appendChild(makeLink(item, item.variant === "ghost" ? "button button--ghost" : "button"));
  });

  const metrics = byId("hero-metrics");
  profile.metrics.forEach((item) => {
    const block = makeElement("div");
    block.appendChild(makeElement("strong", "", item.value));
    block.appendChild(makeElement("span", "", item.label));
    metrics.appendChild(block);
  });

  const facts = byId("profile-facts");
  profile.facts.forEach((item) => {
    const row = makeElement("div");
    row.appendChild(makeElement("dt", "", item.label));
    row.appendChild(makeElement("dd", "", item.value));
    facts.appendChild(row);
  });
}

function renderProjects() {
  const grid = byId("project-grid");
  const evidence = byId("evidence-links");

  data.projects.forEach((project, index) => {
    const card = makeElement("article", `project-card reveal${project.featured ? " project-card--wide" : ""}`);

    const media = makeElement("a", "project-card__media");
    const primaryHref = getPrimaryHref(project);
    media.href = primaryHref;
    applyExternalLinkAttrs(media, primaryHref);
    media.setAttribute("aria-label", `查看${project.title}详情`);
    const image = makeElement("img");
    image.src = project.image;
    image.alt = project.alt;
    image.loading = "lazy";
    media.appendChild(image);
    card.appendChild(media);

    const body = makeElement("div", "project-card__body");
    body.appendChild(makeElement("span", "tag", project.category));
    body.appendChild(makeElement("span", "status", project.status));
    body.appendChild(makeElement("h3", "", project.title));
    body.appendChild(makeElement("p", "", project.summary));

    if (project.contribution && project.featured) {
      const contribution = makeElement("p", "project-card__contribution", project.contribution);
      body.appendChild(contribution);
    }

    const chips = makeElement("ul", "chips");
    project.chips.forEach((chip) => chips.appendChild(makeElement("li", "", chip)));
    body.appendChild(chips);

    if (project.highlights?.length) {
      const highlights = makeElement("ul", "project-highlights");
      project.highlights.forEach((item) => highlights.appendChild(makeElement("li", "", item)));
      body.appendChild(highlights);
    }

    const links = makeElement("div", "project-links");
    project.links.forEach((link) => links.appendChild(makeLink(link)));
    body.appendChild(links);
    card.appendChild(body);
    grid.appendChild(card);

    const evidenceLink = makeElement("a", "evidence-link reveal");
    evidenceLink.href = primaryHref;
    applyExternalLinkAttrs(evidenceLink, primaryHref);
    evidenceLink.appendChild(makeElement("span", "", String(index + 1).padStart(2, "0")));
    evidenceLink.appendChild(makeElement("strong", "", project.title));
    evidenceLink.appendChild(makeElement("em", "", `${project.category} · ${project.status}`));
    evidence.appendChild(evidenceLink);
  });
}

function renderTimeline() {
  const timeline = byId("timeline");
  data.timeline.forEach((item) => {
    const row = makeElement("li", "reveal");
    row.appendChild(makeElement("time", "", item.time));
    const content = makeElement("div");
    content.appendChild(makeElement("h3", "", item.title));
    content.appendChild(makeElement("p", "", item.body));
    row.appendChild(content);
    timeline.appendChild(row);
  });
}

function renderSkillsAndHonors() {
  const clusters = byId("capability-clusters");
  data.capabilityGroups.forEach((cluster) => {
    const card = makeElement("article", "capability-card reveal");
    card.appendChild(makeElement("h4", "", cluster.title));
    const chips = makeElement("ul", "chips");
    cluster.items.forEach((item) => chips.appendChild(makeElement("li", "", item)));
    card.appendChild(chips);
    clusters.appendChild(card);
  });

  const honors = byId("honor-list");
  honors.appendChild(makeElement("h4", "", "主要荣誉"));
  const list = makeElement("ul");
  data.honors.forEach((item) => list.appendChild(makeElement("li", "", item)));
  honors.appendChild(list);
}

function renderPublications() {
  const list = byId("publication-list");
  data.publications.forEach((paper, index) => {
    const item = makeElement("article", "publication-item reveal");
    item.appendChild(makeElement("span", "publication-item__num", String(index + 1).padStart(2, "0")));
    const content = makeElement("div");
    content.appendChild(makeElement("h3", "", paper.title));
    content.appendChild(makeElement("p", "", paper.authors));
    content.appendChild(makeElement("p", "publication-meta", `${paper.venue} · ${paper.note}`));
    if (paper.doi) {
      const doi = makeElement("a", "", `DOI: ${paper.doi}`);
      doi.href = `https://doi.org/${paper.doi}`;
      applyExternalLinkAttrs(doi, doi.href);
      content.appendChild(doi);
    }
    item.appendChild(content);
    list.appendChild(item);
  });
}

function renderNotes() {
  const list = byId("note-list");
  data.notes.forEach((note, index) => {
    const card = makeElement("article", "list-card reveal");
    card.appendChild(makeElement("span", "list-card__num", String(index + 1).padStart(2, "0")));
    const content = makeElement("div");
    if (note.image) {
      const image = makeElement("img", "list-card__image");
      image.src = note.image;
      image.alt = note.title;
      image.loading = "lazy";
      content.appendChild(image);
    }
    content.appendChild(makeElement("time", "", note.time));
    content.appendChild(makeElement("h3", "", note.title));
    content.appendChild(makeElement("p", "", note.body));
    if (note.href) {
      const links = makeElement("div", "project-links");
      links.appendChild(makeLink({ label: "查看图文主题", href: note.href }));
      content.appendChild(links);
    }
    card.appendChild(content);
    list.appendChild(card);
  });
}

function renderResearch() {
  const grid = byId("research-grid");
  data.research.forEach((item) => {
    const card = makeElement("article", "research-card reveal");
    card.appendChild(makeElement("span", "tag", item.tag));
    card.appendChild(makeElement("h3", "", item.title));
    card.appendChild(makeElement("p", "", item.body));
    grid.appendChild(card);
  });
}

function renderContact() {
  setText("contact-title", data.contact.title);
  const list = byId("contact-list");
  data.contact.items.forEach((item) => list.appendChild(makeElement("li", "", item)));
  const action = byId("contact-action");
  action.textContent = data.contact.actionLabel;
  action.href = data.contact.actionHref;
}

function updateProgress() {
  const progress = byId("progress");
  if (!progress) return;
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - doc.clientHeight;
  const value = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
  progress.style.width = `${value}%`;
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  items.forEach((item) => observer.observe(item));
}

function renderPage() {
  if (!data) return;
  renderHero();
  renderProjects();
  renderTimeline();
  renderSkillsAndHonors();
  renderPublications();
  renderNotes();
  renderResearch();
  renderContact();
  initReveal();
  updateProgress();
}

renderPage();
document.addEventListener("scroll", updateProgress, { passive: true });
