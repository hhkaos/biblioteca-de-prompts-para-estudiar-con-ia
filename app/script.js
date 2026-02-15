import { collaborationConfig } from "./collab-config.js";

const phaseRadios = document.getElementById("phase-radios");
const phaseDescription = document.getElementById("phase-description");
const exampleCardsFooter = document.getElementById("example-cards-footer");
const panelRight = document.getElementById("panel-right");
const exampleView = document.getElementById("example-view");
const detailTabs = document.getElementById("detail-tabs");
const tabSummary = document.getElementById("tab-summary");
const promptTextarea = document.getElementById("prompt-textarea");
const promptAdjustments = document.getElementById("prompt-adjustments");
const copyButton = document.getElementById("copy-button");
const copyFeedback = document.getElementById("copy-feedback");
const collaborationBar = document.getElementById("collaboration-bar");
const collabMailto = document.getElementById("collab-mailto");
const collabSocialLinks = document.getElementById("collab-social-links");
const collabTelegram = document.getElementById("collab-telegram");

const APP_TITLE = "Biblioteca de Prompts Educativos";
const DEFAULT_DESCRIPTION =
  "Biblioteca interactiva de prompts educativos por fases del aprendizaje para alumnado y familias.";
const VALID_TABS = new Set(["summary", "prompt"]);
const SOCIAL_NETWORK_DEFINITIONS = [
  {
    id: "x",
    label: "X",
    iconClass: "fa-brands fa-x-twitter",
    formatMention: (handle) => `@${handle.replace(/^@+/, "")}`,
    buildUrl: ({ message }) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    iconClass: "fa-brands fa-linkedin",
    formatMention: (profileOrHandle) => {
      if (!profileOrHandle) {
        return "";
      }
      if (/^https?:\/\//i.test(profileOrHandle)) {
        return profileOrHandle;
      }
      return `https://www.linkedin.com/in/${profileOrHandle.replace(/^@+/, "")}`;
    },
    buildUrl: ({ exampleUrl, message }) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(exampleUrl)}&summary=${encodeURIComponent(message)}`
  },
  {
    id: "bluesky",
    label: "Bluesky",
    iconClass: "fa-brands fa-bluesky",
    formatMention: (handle) => `@${handle.replace(/^@+/, "")}`,
    buildUrl: ({ message }) => `https://bsky.app/intent/compose?text=${encodeURIComponent(message)}`
  }
];

let phases = [];
let exampleById = {};
let currentPhase = null;
let currentExampleId = "";
let promptTextareaAutoResizeEnabled = true;
let promptTextareaPointerDownHeight = null;

async function loadData() {
  const [phasesRes, examplesRes] = await Promise.all([
    fetch("../content/phases.json"),
    fetch("../content/examples/index.json")
  ]);

  const phaseData = await phasesRes.json();
  const examplesData = await examplesRes.json();

  phases = phaseData.phases;
  exampleById = Object.fromEntries(examplesData.examples.map((item) => [item.id, item]));
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function linesToHtml(lines) {
  let html = "";
  let inList = false;

  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };

  for (const line of lines) {
    if (!line.trim()) {
      closeList();
      continue;
    }

    if (line.startsWith("- ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inlineMarkdown(line.slice(2))}</li>`;
      continue;
    }

    closeList();
    html += `<p>${inlineMarkdown(line)}</p>`;
  }

  closeList();
  return html;
}

function parseMarkdownSections(markdown) {
  const lines = markdown.split("\n");
  const sectionMap = {};
  let title = "";
  let currentSection = "";

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("# ")) {
      title = line.slice(2).trim();
      continue;
    }

    if (line.startsWith("## ")) {
      currentSection = line.slice(3).trim();
      if (!sectionMap[currentSection]) {
        sectionMap[currentSection] = [];
      }
      continue;
    }

    if (currentSection) {
      sectionMap[currentSection].push(line);
    }
  }

  return { title, sectionMap };
}

function extractPromptTemplate(markdown) {
  const sectionMatch = markdown.match(/##\s+Prompt plantilla\s*\n([\s\S]*?)(?:\n##\s+|$)/i);
  const sectionContent = sectionMatch ? sectionMatch[1] : markdown;
  const fencedMatch = sectionContent.match(/```(?:text|txt)?\s*([\s\S]*?)```/i);
  const rawTemplate = fencedMatch ? fencedMatch[1] : sectionContent;
  return collapseRepeatedTemplate(rawTemplate);
}

function collapseRepeatedTemplate(text) {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) {
    return "";
  }

  const length = normalized.length;
  for (let unitSize = 120; unitSize <= Math.floor(length / 2); unitSize += 1) {
    if (length % unitSize !== 0) {
      continue;
    }
    const unit = normalized.slice(0, unitSize);
    if (!unit.includes("\n")) {
      continue;
    }
    if (unit.repeat(length / unitSize) === normalized) {
      return unit.trim();
    }
  }

  return normalized;
}

function ensureMetaTag(attr, key) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  return tag;
}

function setMetaContentByName(name, content) {
  ensureMetaTag("name", name).setAttribute("content", content);
}

function setMetaContentByProperty(property, content) {
  ensureMetaTag("property", property).setAttribute("content", content);
}

function syncMetaUrl() {
  setMetaContentByProperty("og:url", window.location.href);
}

function updatePageMetadata({ title, description, imageUrl }) {
  document.title = title;
  setMetaContentByName("description", description);
  setMetaContentByProperty("og:type", "website");
  setMetaContentByProperty("og:title", title);
  setMetaContentByProperty("og:description", description);
  setMetaContentByProperty("og:image", imageUrl || "");
  setMetaContentByName("twitter:title", title);
  setMetaContentByName("twitter:description", description);
  setMetaContentByName("twitter:image", imageUrl || "");
  setMetaContentByName("twitter:card", imageUrl ? "summary_large_image" : "summary");
  syncMetaUrl();
}

function buildAbsoluteImageUrl(imagePath) {
  if (!imagePath || !imagePath.trim()) {
    return "";
  }
  return new URL(`../${encodeURI(imagePath.trim())}`, window.location.href).href;
}

function getCurrentTabId() {
  const active = detailTabs.querySelector(".tab-button.active");
  if (!active) {
    return "summary";
  }
  return VALID_TABS.has(active.dataset.tab) ? active.dataset.tab : "summary";
}

function readUrlState() {
  const params = new URLSearchParams(window.location.search);
  const phaseId = params.get("phase") || "";
  const exampleId = params.get("example") || "";
  const tabParam = params.get("tab") || "";
  const tabId = VALID_TABS.has(tabParam) ? tabParam : "summary";
  return { phaseId, exampleId, tabId };
}

function writeUrlState({ phaseId, exampleId, tabId }, { mode = "push" } = {}) {
  const url = new URL(window.location.href);

  if (phaseId) {
    url.searchParams.set("phase", phaseId);
  } else {
    url.searchParams.delete("phase");
  }

  if (exampleId) {
    url.searchParams.set("example", exampleId);
    if (VALID_TABS.has(tabId)) {
      url.searchParams.set("tab", tabId);
    } else {
      url.searchParams.delete("tab");
    }
  } else {
    url.searchParams.delete("example");
    url.searchParams.delete("tab");
  }

  const next = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (next !== current) {
    const historyMethod = mode === "replace" ? "replaceState" : "pushState";
    window.history[historyMethod](null, "", next);
  }
  syncMetaUrl();
}

function activateTab(tabId, { updateUrl = false, urlMode = "push" } = {}) {
  const safeTabId = VALID_TABS.has(tabId) ? tabId : "summary";
  for (const button of detailTabs.querySelectorAll(".tab-button")) {
    button.classList.toggle("active", button.dataset.tab === safeTabId);
  }

  for (const panel of detailTabs.querySelectorAll(".tab-panel")) {
    panel.classList.toggle("active", panel.id === `tab-${safeTabId}`);
  }

  if (safeTabId === "prompt") {
    requestAnimationFrame(() => autosizePromptTextarea({ force: true }));
  }

  if (updateUrl && currentPhase) {
    writeUrlState(
      {
        phaseId: currentPhase.id,
        exampleId: currentExampleId,
        tabId: safeTabId
      },
      { mode: urlMode }
    );
  }

  if (currentExampleId) {
    const currentExample = exampleById[currentExampleId];
    if (currentExample) {
      updateCollaborationBar(currentExample);
    }
  }
}

function setActiveExample(exampleId) {
  for (const card of document.querySelectorAll(".card")) {
    card.classList.toggle("active", card.dataset.exampleId === exampleId);
  }
}

function resetDetail() {
  panelRight.classList.add("is-hidden");
  detailTabs.classList.add("hidden");
  collaborationBar.classList.add("hidden");
  copyFeedback.textContent = "";
  copyFeedback.classList.add("hidden");
}

function scrollToDetailPanel() {
  requestAnimationFrame(() => {
    panelRight.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

function autosizePromptTextarea({ force = false } = {}) {
  if (!force && !promptTextareaAutoResizeEnabled) {
    return;
  }
  promptTextarea.style.overflowY = "hidden";
  promptTextarea.style.height = "auto";
  promptTextarea.style.height = `${promptTextarea.scrollHeight}px`;
}

function getPhaseExamples(phase) {
  return phase.examples
    .map((id) => exampleById[id])
    .filter(Boolean);
}

function phaseContainsExample(phase, exampleId) {
  return Boolean(phase && exampleId && phase.examples.includes(exampleId));
}

function findPhaseById(phaseId) {
  return phases.find((phase) => phase.id === phaseId) || null;
}

function findFirstPhaseForExample(exampleId) {
  return phases.find((phase) => phase.examples.includes(exampleId)) || null;
}

function sanitizeHandle(handle) {
  return (handle || "").trim().replace(/^@+/, "");
}

function buildExampleUrl(phaseId, exampleId, tabId = "summary") {
  const url = new URL(window.location.href);
  url.searchParams.set("phase", phaseId);
  url.searchParams.set("example", exampleId);
  url.searchParams.set("tab", VALID_TABS.has(tabId) ? tabId : "summary");
  return url.toString();
}

function buildCollaborationMessage(example, exampleUrl, mentionText = "") {
  const mentionSuffix = mentionText ? ` (${mentionText})` : "";
  return `Sugerencia sobre "${example.title}" en la Biblioteca de Prompts: ${exampleUrl}${mentionSuffix}`;
}

function configureMailtoLink(example, exampleUrl) {
  const recipient = (collaborationConfig.email || "").trim();
  if (!recipient || recipient.includes("TU_EMAIL_AQUI")) {
    collabMailto.href = "#";
    collabMailto.setAttribute("aria-disabled", "true");
    collabMailto.title = "Configura tu email en app/collab-config.js";
    return;
  }

  collabMailto.removeAttribute("aria-disabled");
  collabMailto.removeAttribute("title");
  const subject = `Sugerencia de mejora: ${example.title}`;
  const body = `Hola,\n\nQuiero proponer una mejora para este ejemplo:\n${example.title}\n${exampleUrl}\n\nSugerencia:\n`;
  const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  collabMailto.href = mailtoUrl;
}

function renderSocialLinks(example, exampleUrl) {
  collabSocialLinks.innerHTML = "";
  let linksCount = 0;

  for (const network of SOCIAL_NETWORK_DEFINITIONS) {
    const configuredAccount = (collaborationConfig.social?.[network.id] || "").trim();
    if (!configuredAccount) {
      continue;
    }

    const mentionText = network.formatMention(configuredAccount);
    const message = buildCollaborationMessage(example, exampleUrl, mentionText);

    const link = document.createElement("a");
    link.href = network.buildUrl({ message, exampleUrl, account: configuredAccount });
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "collab-social-link";
    link.innerHTML = `<i class="${network.iconClass} icon-inline" aria-hidden="true"></i>${escapeHtml(network.label)}`;
    collabSocialLinks.appendChild(link);
    linksCount += 1;
  }

  if (linksCount === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "collab-social-empty";
    emptyState.textContent = "Configura cuentas en app/collab-config.js para activar redes.";
    collabSocialLinks.appendChild(emptyState);
  }
}

function configureTelegramLink(example, exampleUrl) {
  const username = sanitizeHandle(collaborationConfig.telegramUsername || "hhkaos");
  const message = `Hola ${username}, tengo una sugerencia para "${example.title}": ${exampleUrl}`;
  collabTelegram.href = `https://t.me/${username}?text=${encodeURIComponent(message)}`;
}

function updateCollaborationBar(example) {
  if (!currentPhase) {
    return;
  }
  const exampleUrl = buildExampleUrl(currentPhase.id, example.id, getCurrentTabId());
  configureMailtoLink(example, exampleUrl);
  renderSocialLinks(example, exampleUrl);
  configureTelegramLink(example, exampleUrl);
  collaborationBar.classList.remove("hidden");
}

function setSelectedPhaseRadio(phaseId) {
  const selectedRadio = document.getElementById(`phase-${phaseId}`);
  if (selectedRadio) {
    selectedRadio.checked = true;
  }
}

function getPhaseFallbackImage(phase) {
  const exampleWithImage = getPhaseExamples(phase).find((example) => example.image && example.image.trim());
  if (!exampleWithImage) {
    return "";
  }
  return buildAbsoluteImageUrl(exampleWithImage.image);
}

function updateMetadataForPhase(phase) {
  updatePageMetadata({
    title: `${phase.name} | ${APP_TITLE}`,
    description: phase.description || DEFAULT_DESCRIPTION,
    imageUrl: getPhaseFallbackImage(phase)
  });
}

function updateMetadataForExample(example, markdownTitle) {
  const effectiveTitle = markdownTitle || example.title;
  updatePageMetadata({
    title: `${effectiveTitle} | ${APP_TITLE}`,
    description: example.summary || DEFAULT_DESCRIPTION,
    imageUrl: buildAbsoluteImageUrl(example.image || "")
  });
}

function renderCard(example, target) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "card";
  card.dataset.exampleId = example.id;

  const hasImage = Boolean(example.image && example.image.trim());
  const mediaStyle = hasImage
    ? `background-image: linear-gradient(135deg, rgba(0,0,0,0.22), rgba(0,0,0,0.12)), url('../${example.image}'); color: #ffffff;`
    : "";
  const placeholderText = hasImage ? "" : "Imagen IA pendiente";

  card.innerHTML = `
    <div class="card-media" style="${mediaStyle}">${placeholderText}</div>
    <div class="card-body">
      <h3 class="card-title">${escapeHtml(example.title)}</h3>
      <p class="card-summary">${escapeHtml(example.summary || "")}</p>
    </div>
  `;

  card.addEventListener("click", () => {
    loadExample(example, { tabId: "summary", scroll: true, updateUrl: true, urlMode: "push" });
  });
  target.appendChild(card);
}

function renderCards(phase) {
  const examples = getPhaseExamples(phase);
  exampleCardsFooter.innerHTML = "";

  for (const example of examples) {
    renderCard(example, exampleCardsFooter);
  }
}

function setCurrentPhase(phase, { resetDetailPanel = true, updateUrl = true, urlMode = "push" } = {}) {
  currentPhase = phase;
  phaseDescription.textContent = phase.description;
  renderCards(phase);
  setSelectedPhaseRadio(phase.id);

  if (resetDetailPanel) {
    currentExampleId = "";
    setActiveExample("");
    resetDetail();
    activateTab("summary");
    updateMetadataForPhase(phase);
  } else {
    setActiveExample("");
  }

  if (updateUrl) {
    writeUrlState(
      {
        phaseId: phase.id,
        exampleId: currentExampleId,
        tabId: getCurrentTabId()
      },
      { mode: urlMode }
    );
  }
}

function renderPhaseRadios() {
  phaseRadios.innerHTML = "";
  for (const phase of phases) {
    const id = `phase-${phase.id}`;
    const option = document.createElement("div");
    option.className = "phase-option";
    option.innerHTML = `
      <input type="radio" name="phase" id="${id}" value="${phase.id}">
      <label for="${id}"><span>${escapeHtml(phase.icon || "📘")}</span> ${escapeHtml(phase.name)}</label>
    `;
    phaseRadios.appendChild(option);
  }

  phaseRadios.addEventListener("change", (event) => {
    if (!(event.target instanceof HTMLInputElement) || event.target.name !== "phase") {
      return;
    }

    const phase = findPhaseById(event.target.value);
    if (!phase) {
      return;
    }

    setCurrentPhase(phase, { resetDetailPanel: true, updateUrl: true, urlMode: "push" });
  });
}

async function loadExample(
  example,
  { tabId = "summary", scroll = true, updateUrl = true, urlMode = "push" } = {}
) {
  const res = await fetch(`../${example.file}`);
  const markdown = await res.text();

  const { title, sectionMap } = parseMarkdownSections(markdown);
  const whenHtml = linesToHtml(sectionMap["Cuándo usarlo"] || []);
  const gainsHtml = linesToHtml(sectionMap["Qué consigues"] || []);
  const adjustmentsHtml = linesToHtml(sectionMap["Ajustes rápidos"] || []);
  const imagePath = example.image && example.image.trim() ? `../${encodeURI(example.image.trim())}` : "";
  const thumbnailHtml = imagePath
    ? `<img class="example-view-thumb" src="${imagePath}" alt="${escapeHtml(example.title)}">`
    : "";

  currentExampleId = example.id;
  setActiveExample(example.id);

  exampleView.innerHTML = `
    <div class="example-view-head">
      ${thumbnailHtml}  
      <div class="example-view-text">
        <h2>${escapeHtml(title || example.title)}</h2>
        <p>${escapeHtml(example.summary || "")}</p>
      </div>
    </div>
  `;

  tabSummary.innerHTML = `
    <h3>Cuándo usarlo</h3>
    ${whenHtml || "<p>No definido.</p>"}
    <h3>Qué consigues</h3>
    ${gainsHtml || "<p>No definido.</p>"}
  `;

  promptTextarea.value = extractPromptTemplate(markdown);
  promptTextareaAutoResizeEnabled = true;
  promptTextarea.style.overflowY = "hidden";
  promptTextarea.scrollTop = 0;
  autosizePromptTextarea({ force: true });
  if (adjustmentsHtml) {
    promptAdjustments.innerHTML = `
      <h3>Ejemplo de opciones de personalización</h3>
      ${adjustmentsHtml}
    `;
    promptAdjustments.classList.remove("hidden");
  } else {
    promptAdjustments.innerHTML = "";
    promptAdjustments.classList.add("hidden");
  }
  panelRight.classList.remove("is-hidden");
  detailTabs.classList.remove("hidden");
  copyFeedback.textContent = "";
  copyFeedback.classList.add("hidden");
  activateTab(tabId);
  updateCollaborationBar(example);

  if (updateUrl && currentPhase) {
    writeUrlState(
      {
        phaseId: currentPhase.id,
        exampleId: example.id,
        tabId: getCurrentTabId()
      },
      { mode: urlMode }
    );
  }

  updateMetadataForExample(example, title);

  if (scroll) {
    scrollToDetailPanel();
  }
}

for (const button of detailTabs.querySelectorAll(".tab-button")) {
  button.addEventListener("click", () => {
    activateTab(button.dataset.tab, { updateUrl: true, urlMode: "push" });
  });
}

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(promptTextarea.value);
    copyFeedback.textContent = "Plantilla copiada al portapapeles.";
    copyFeedback.classList.remove("hidden");
  } catch (_error) {
    copyFeedback.textContent = "No se pudo copiar automáticamente. Copia manualmente desde el editor.";
    copyFeedback.classList.remove("hidden");
  }
});

promptTextarea.addEventListener("input", () => {
  autosizePromptTextarea();
});

promptTextarea.addEventListener("pointerdown", () => {
  promptTextareaPointerDownHeight = promptTextarea.offsetHeight;
});

window.addEventListener("pointerup", () => {
  if (promptTextareaPointerDownHeight == null) {
    return;
  }

  const heightChanged = Math.abs(promptTextarea.offsetHeight - promptTextareaPointerDownHeight) > 1;
  if (heightChanged) {
    promptTextareaAutoResizeEnabled = false;
    promptTextarea.style.overflowY = "auto";
  }

  promptTextareaPointerDownHeight = null;
});

window.addEventListener("resize", () => {
  if (promptTextareaAutoResizeEnabled) {
    autosizePromptTextarea({ force: true });
  }
});

async function applyUrlState({ urlMode = "replace" } = {}) {
  const { phaseId, exampleId, tabId } = readUrlState();
  const requestedExample = exampleId ? exampleById[exampleId] : null;

  let phase = findPhaseById(phaseId);
  if (requestedExample && (!phase || !phaseContainsExample(phase, requestedExample.id))) {
    phase = findFirstPhaseForExample(requestedExample.id);
  }
  if (!phase) {
    phase = phases[0] || null;
  }
  if (!phase) {
    return;
  }

  const hasValidExample = Boolean(requestedExample && phaseContainsExample(phase, requestedExample.id));

  setCurrentPhase(phase, { resetDetailPanel: !hasValidExample, updateUrl: false });

  if (hasValidExample) {
    await loadExample(requestedExample, {
      tabId,
      scroll: false,
      updateUrl: false
    });
  } else {
    updateMetadataForPhase(phase);
  }

  writeUrlState(
    {
      phaseId: phase.id,
      exampleId: hasValidExample ? requestedExample.id : "",
      tabId: hasValidExample ? tabId : "summary"
    },
    { mode: urlMode }
  );
}

window.addEventListener("popstate", () => {
  applyUrlState({ urlMode: "replace" });
});

async function init() {
  await loadData();
  renderPhaseRadios();
  await applyUrlState({ urlMode: "replace" });
}

init();
