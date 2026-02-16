import { collaborationConfig } from "./collab-config.js";

const phaseRadios = document.getElementById("phase-radios");
const phaseSelect = document.getElementById("phase-select");
const layout = document.querySelector(".layout");
const galleryTitle = document.getElementById("gallery-title");
const galleryDescription = document.getElementById("gallery-description");
const exampleCardsFooter = document.getElementById("example-cards-footer");
const examplesCount = document.getElementById("examples-count");
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
const panelToggleButton = document.getElementById("panel-toggle-button");
const aboutButtons = document.querySelectorAll("#about-button, #about-button-mobile");
const aboutModal = document.getElementById("about-modal");
const aboutCloseButton = document.getElementById("about-close-button");
const installHelloBar = document.getElementById("install-hello-bar");
const installFromBarButton = document.getElementById("install-from-bar-button");
const installHelloDismissButton = document.getElementById("install-hello-dismiss-button");
const installFromModalButton = document.getElementById("install-from-modal-button");
const installHelpText = document.getElementById("install-help-text");
const installFeedback = document.getElementById("install-feedback");
const updateHelloBar = document.getElementById("update-hello-bar");
const updateNowButton = document.getElementById("update-now-button");
const updateDismissButton = document.getElementById("update-dismiss-button");
const searchInput = document.getElementById("search-input");
const searchClear = document.getElementById("search-clear");
const searchPhaseNotice = document.getElementById("search-phase-notice");

const APP_TITLE = "Prompts Estudio";
const DEFAULT_DESCRIPTION =
  "Prompts para estudiar con IA por fases del aprendizaje para alumnado y familias.";
const UNDER_CONSTRUCTION_LABEL = "En construcción";
const FILTER_TOOLTIP_MESSAGE =
  "Para filtrar por fase del estudio, pulsa una de las fases que aparecen arriba.";
const INSTALL_HELLO_DISMISSED_KEY = "prompts-estudio.install-hello-dismissed";
const INSTALL_COMPLETED_KEY = "prompts-estudio.install-completed";
const UPDATE_HELLO_DISMISSED_KEY = "prompts-estudio.update-hello-dismissed";
const SPECIAL_COLLAB_CARD = {
  id: "__missing-example__",
  title: "¿Echas en falta alguna?",
  summary: "¡Comparte tu experiencia! Buscamos personas que colaboren para ampliar y mejorar esta biblioteca.",
  chip: "Colabora",
  image: "content/examples/images/colabora-echas-alguna-en-falta-squared.webp"
};
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
let allExamples = [];
let currentPhase = null;
let currentExampleId = "";
let promptTextareaAutoResizeEnabled = true;
let promptTextareaPointerDownHeight = null;
let modalLastFocus = null;
let deferredInstallPrompt = null;
let currentSearchQuery = "";
let waitingServiceWorker = null;
let updateReloadInProgress = false;
let shouldReloadAfterControllerChange = false;
let updateControllerChangeFallbackTimeout = null;

const UPDATE_BUTTON_DEFAULT_HTML =
  '<i class="fa-solid fa-rotate-right icon-inline" aria-hidden="true"></i> Actualizar ahora';
const UPDATE_BUTTON_APPLYING_HTML =
  '<i class="fa-solid fa-rotate-right icon-inline" aria-hidden="true"></i> Aplicando...';

async function loadData() {
  const [phasesRes, examplesRes] = await Promise.all([
    fetch("../content/phases.json"),
    fetch("../content/examples/index.json")
  ]);

  const phaseData = await phasesRes.json();
  const examplesData = await examplesRes.json();

  phases = phaseData.phases;
  allExamples = examplesData.examples;
  exampleById = Object.fromEntries(examplesData.examples.map((item) => [item.id, item]));
}

function normalizeText(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function levenshteinDistance(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

function fuzzyMatchScore(query, text) {
  if (!query) return 0;
  if (text.includes(query)) return 1;

  const words = text.split(/\s+/);
  let bestScore = 0;

  for (const word of words) {
    if (word.includes(query) || query.includes(word)) {
      bestScore = Math.max(bestScore, 0.9);
      continue;
    }
    const distance = levenshteinDistance(query, word);
    const maxLen = Math.max(query.length, word.length);
    const similarity = 1 - distance / maxLen;
    if (similarity >= 0.55) {
      bestScore = Math.max(bestScore, similarity);
    }
  }

  return bestScore;
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

  if (updateUrl) {
    writeUrlState(
      {
        phaseId: currentPhase ? currentPhase.id : "",
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
  setPanelVisibility(false);
  detailTabs.classList.add("hidden");
  collaborationBar.classList.add("hidden");
  copyFeedback.textContent = "";
  copyFeedback.classList.add("hidden");
}

function isPanelVisible() {
  return !panelRight.classList.contains("is-hidden") && !(layout && layout.classList.contains("is-empty"));
}

function updatePanelToggleButton() {
  if (!panelToggleButton) {
    return;
  }

  if (!currentExampleId) {
    panelToggleButton.classList.add("hidden");
    return;
  }

  const visible = isPanelVisible();
  if (!visible) {
    panelToggleButton.classList.add("hidden");
    return;
  }

  panelToggleButton.classList.remove("hidden");
  const actionLabel = visible ? "Ocultar panel" : "Mostrar panel";
  panelToggleButton.setAttribute("aria-label", actionLabel);
  panelToggleButton.setAttribute("title", actionLabel);
  const srOnlyLabel = panelToggleButton.querySelector(".sr-only");
  if (srOnlyLabel) {
    srOnlyLabel.textContent = actionLabel;
  }
  panelToggleButton.setAttribute("aria-expanded", String(visible));
}

function setPanelVisibility(visible) {
  panelRight.classList.toggle("is-hidden", !visible);
  if (layout) {
    layout.classList.toggle("is-empty", !visible);
  }
  updatePanelToggleButton();
}

function openAboutModal() {
  if (!aboutModal) {
    return;
  }
  modalLastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  aboutModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  if (aboutCloseButton) {
    aboutCloseButton.focus();
  }
}

function closeAboutModal() {
  if (!aboutModal || aboutModal.classList.contains("hidden")) {
    return;
  }
  aboutModal.classList.add("hidden");
  document.body.style.overflow = "";
  if (modalLastFocus) {
    modalLastFocus.focus();
  }
  modalLastFocus = null;
}

function getStoredBoolean(key) {
  try {
    return window.localStorage.getItem(key) === "true";
  } catch (_error) {
    return false;
  }
}

function setStoredBoolean(key, value) {
  try {
    window.localStorage.setItem(key, value ? "true" : "false");
  } catch (_error) {
    // Ignore storage failures (private mode / blocked storage).
  }
}

function isStandaloneMode() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function getManualInstallHint() {
  const userAgent = window.navigator.userAgent || "";
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);
  const isSafari = /Safari/i.test(userAgent) && !/CriOS|FxiOS|EdgiOS|OPiOS|Chrome|Chromium/i.test(userAgent);

  if (isIOS && isSafari) {
    return "En Safari, pulsa Compartir y luego \"Añadir a pantalla de inicio\" para instalarla manualmente.";
  }

  if (isAndroid) {
    return "En el menú del navegador busca \"Instalar app\" o \"Añadir a pantalla de inicio\" para instalarla manualmente.";
  }

  return "Si tu navegador no muestra el botón, prueba desde su menú (Instalar app / Añadir a pantalla de inicio) o abre esta web en Chrome o Safari.";
}

function setInstallFeedback(message, { isError = false } = {}) {
  if (!installFeedback) {
    return;
  }
  installFeedback.textContent = message;
  installFeedback.classList.remove("hidden");
  installFeedback.classList.toggle("is-error", isError);
}

function hideInstallFeedback() {
  if (!installFeedback) {
    return;
  }
  installFeedback.textContent = "";
  installFeedback.classList.add("hidden");
  installFeedback.classList.remove("is-error");
}

function shouldShowInstallHelloBar() {
  if (!installHelloBar || isStandaloneMode()) {
    return false;
  }
  const dismissed = getStoredBoolean(INSTALL_HELLO_DISMISSED_KEY);
  return !dismissed;
}

function hideInstallHelloBar() {
  if (installHelloBar) {
    installHelloBar.classList.add("hidden");
  }
}

function hideUpdateHelloBar() {
  if (updateHelloBar) {
    updateHelloBar.classList.add("hidden");
  }
}

function showUpdateHelloBar() {
  if (!updateHelloBar) {
    return;
  }
  if (getStoredBoolean(UPDATE_HELLO_DISMISSED_KEY)) {
    return;
  }
  updateHelloBar.classList.remove("hidden");
}

function setWaitingServiceWorker(worker) {
  waitingServiceWorker = worker;
  if (!worker) {
    hideUpdateHelloBar();
    return;
  }
  setStoredBoolean(UPDATE_HELLO_DISMISSED_KEY, false);
  showUpdateHelloBar();
}

async function clearBrowserCaches() {
  if (!("caches" in window)) {
    return;
  }
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => caches.delete(key)));
}

function reloadWithCacheBust() {
  const url = new URL(window.location.href);
  url.searchParams.set("updated", Date.now().toString());
  window.location.replace(url.toString());
}

function setUpdateApplyingUi() {
  if (updateNowButton) {
    updateNowButton.setAttribute("disabled", "true");
    updateNowButton.setAttribute("aria-busy", "true");
    updateNowButton.innerHTML = UPDATE_BUTTON_APPLYING_HTML;
  }
  if (updateDismissButton) {
    updateDismissButton.setAttribute("disabled", "true");
  }
}

function resetUpdateUi() {
  if (updateNowButton) {
    updateNowButton.removeAttribute("disabled");
    updateNowButton.removeAttribute("aria-busy");
    updateNowButton.innerHTML = UPDATE_BUTTON_DEFAULT_HTML;
  }
  if (updateDismissButton) {
    updateDismissButton.removeAttribute("disabled");
  }
}

async function forceRefreshToLatestVersion() {
  try {
    setUpdateApplyingUi();
    await clearBrowserCaches();

    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.update()));
    }
  } finally {
    reloadWithCacheBust();
  }
}

function beginUpdateFlow() {
  if (updateReloadInProgress) {
    return;
  }

  updateReloadInProgress = true;
  setUpdateApplyingUi();

  if (waitingServiceWorker) {
    shouldReloadAfterControllerChange = true;
    waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
    updateControllerChangeFallbackTimeout = window.setTimeout(() => {
      forceRefreshToLatestVersion();
    }, 2500);
    return;
  }

  forceRefreshToLatestVersion();
}

function updateInstallUi() {
  const isInstalled = isStandaloneMode() || getStoredBoolean(INSTALL_COMPLETED_KEY);
  const canPromptInstall = Boolean(deferredInstallPrompt);

  if (isInstalled) {
    hideInstallHelloBar();
    if (installFromBarButton) {
      installFromBarButton.disabled = true;
      installFromBarButton.textContent = "App instalada";
    }
    if (installFromModalButton) {
      installFromModalButton.classList.add("hidden");
      installFromModalButton.disabled = true;
      installFromModalButton.textContent = "App instalada";
    }
    if (installHelpText) {
      installHelpText.textContent = "La aplicación ya está instalada en este dispositivo.";
    }
    return;
  }

  if (installFromBarButton) {
    installFromBarButton.disabled = !canPromptInstall;
    installFromBarButton.textContent = canPromptInstall ? "Instalar app" : "Instalación no disponible aún";
  }
  if (installFromModalButton) {
    if (canPromptInstall) {
      installFromModalButton.classList.remove("hidden");
      installFromModalButton.disabled = false;
      installFromModalButton.textContent = "Instalar Prompts Estudio";
    } else {
      installFromModalButton.classList.add("hidden");
      installFromModalButton.disabled = true;
    }
  }
  if (installHelpText) {
    installHelpText.textContent = canPromptInstall
      ? "Puedes instalar la app en cualquier momento desde este botón."
      : getManualInstallHint();
  }

  if (!canPromptInstall) {
    hideInstallHelloBar();
  }
}

async function installApp(source = "modal") {
  hideInstallFeedback();

  if (!deferredInstallPrompt) {
    setInstallFeedback(
      "La instalación aún no está disponible en este navegador. Inténtalo más tarde desde este botón.",
      { isError: true }
    );
    updateInstallUi();
    return;
  }

  deferredInstallPrompt.prompt();
  const choiceResult = await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  updateInstallUi();

  if (choiceResult.outcome === "accepted") {
    setStoredBoolean(INSTALL_HELLO_DISMISSED_KEY, true);
    hideInstallHelloBar();
    setInstallFeedback("Instalación iniciada. Si no finaliza, vuelve a intentarlo desde este botón.");
    return;
  }

  if (source === "bar") {
    setInstallFeedback("Instalación cancelada. Puedes retomarla cuando quieras desde Sobre la app.");
  } else {
    setInstallFeedback("Instalación cancelada. Puedes volver a intentarlo cuando quieras.");
  }
}

function setupInstallExperience() {
  hideInstallHelloBar();
  updateInstallUi();

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    setStoredBoolean(INSTALL_COMPLETED_KEY, false);
    deferredInstallPrompt = event;
    if (shouldShowInstallHelloBar()) {
      installHelloBar.classList.remove("hidden");
    }
    updateInstallUi();
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    setStoredBoolean(INSTALL_COMPLETED_KEY, true);
    setStoredBoolean(INSTALL_HELLO_DISMISSED_KEY, true);
    hideInstallHelloBar();
    updateInstallUi();
    setInstallFeedback("Prompts Estudio ya está instalada en este dispositivo.");
  });

  if (installFromBarButton) {
    installFromBarButton.addEventListener("click", () => {
      installApp("bar");
    });
  }

  if (installHelloDismissButton) {
    installHelloDismissButton.addEventListener("click", () => {
      setStoredBoolean(INSTALL_HELLO_DISMISSED_KEY, true);
      hideInstallHelloBar();
      setInstallFeedback("Aviso cerrado. Podrás instalarla más adelante desde Sobre la app.");
    });
  }

  if (installFromModalButton) {
    installFromModalButton.addEventListener("click", () => {
      installApp("modal");
    });
  }
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }
  try {
    const registration = await navigator.serviceWorker.register("./service-worker.js");

    if (registration.waiting) {
      setWaitingServiceWorker(registration.waiting);
    }

    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing;
      if (!newWorker) {
        return;
      }
      newWorker.addEventListener("statechange", () => {
        if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
          setWaitingServiceWorker(newWorker);
        }
      });
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!shouldReloadAfterControllerChange) {
        return;
      }
      if (updateControllerChangeFallbackTimeout) {
        window.clearTimeout(updateControllerChangeFallbackTimeout);
        updateControllerChangeFallbackTimeout = null;
      }
      reloadWithCacheBust();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        registration.update();
      }
    });

    window.setInterval(() => {
      registration.update();
    }, 5 * 60 * 1000);
  } catch (_error) {
    // App works without service worker.
  }
}

function setupUpdateExperience() {
  hideUpdateHelloBar();

  if (updateNowButton) {
    resetUpdateUi();
    updateNowButton.addEventListener("click", () => {
      beginUpdateFlow();
    });
  }

  if (updateDismissButton) {
    updateDismissButton.addEventListener("click", () => {
      setStoredBoolean(UPDATE_HELLO_DISMISSED_KEY, true);
      hideUpdateHelloBar();
    });
  }
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

function isExampleUnderConstruction(example) {
  return (example.status || "").trim().toLowerCase() === "under-construction";
}

function isExampleLoadable(example) {
  return Boolean(example && example.file && !isExampleUnderConstruction(example));
}

function phaseContainsExample(phase, exampleId) {
  if (!exampleId) {
    return false;
  }
  if (!phase) {
    return Boolean(exampleById[exampleId]);
  }
  return phase.examples.includes(exampleId);
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
  if (phaseId) {
    url.searchParams.set("phase", phaseId);
  } else {
    url.searchParams.delete("phase");
  }
  url.searchParams.set("example", exampleId);
  url.searchParams.set("tab", VALID_TABS.has(tabId) ? tabId : "summary");
  return url.toString();
}

function buildCollaborationMessage(example, exampleUrl, mentionText = "") {
  const mentionSuffix = mentionText ? ` (${mentionText})` : "";
  return `Sugerencia sobre "${example.title}" en Prompts Estudio: ${exampleUrl}${mentionSuffix}`;
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
  const exampleUrl = buildExampleUrl(currentPhase ? currentPhase.id : "", example.id, getCurrentTabId());
  configureMailtoLink(example, exampleUrl);
  renderSocialLinks(example, exampleUrl);
  configureTelegramLink(example, exampleUrl);
  collaborationBar.classList.remove("hidden");
}

function setSelectedPhaseRadio(phaseId) {
  for (const radio of phaseRadios.querySelectorAll('input[name="phase"]')) {
    radio.checked = false;
  }

  const selectedRadio = document.getElementById(`phase-${phaseId}`);
  if (selectedRadio) {
    selectedRadio.checked = true;
  }

  if (phaseSelect) {
    phaseSelect.value = phaseId || "";
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
  if (!phase) {
    updatePageMetadata({
      title: APP_TITLE,
      description: DEFAULT_DESCRIPTION,
      imageUrl: buildAbsoluteImageUrl(allExamples.find((example) => example.image && example.image.trim())?.image || "")
    });
    return;
  }

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
  const isUnderConstruction = isExampleUnderConstruction(example);

  if (isUnderConstruction) {
    card.classList.add("is-under-construction");
    card.disabled = true;
    card.setAttribute("aria-disabled", "true");
    card.title = UNDER_CONSTRUCTION_LABEL;
  }

  const hasImage = Boolean(example.image && example.image.trim());
  const mediaStyle = hasImage
    ? `background-image: linear-gradient(135deg, rgba(0,0,0,0.22), rgba(0,0,0,0.12)), url('../${example.image}'); color: #ffffff;`
    : "";
  const placeholderText = hasImage ? "" : "Imagen IA pendiente";
  const chipHtml = isUnderConstruction
    ? `<span class="card-chip card-chip-overlay">${UNDER_CONSTRUCTION_LABEL}</span>`
    : "";

  card.innerHTML = `
    <div class="card-media" style="${mediaStyle}">${chipHtml}${placeholderText}</div>
    <div class="card-body">
      <h3 class="card-title">${escapeHtml(example.title)}</h3>
      <p class="card-summary">${escapeHtml(example.summary || "")}</p>
    </div>
  `;

  card.addEventListener("click", () => {
    if (isUnderConstruction) {
      return;
    }
    loadExample(example, { tabId: "summary", scroll: true, updateUrl: true, urlMode: "push" });
  });
  target.appendChild(card);
}

function renderSpecialCollaborationCard(target) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "card card-special";
  card.dataset.exampleId = SPECIAL_COLLAB_CARD.id;
  const mediaStyle = `background-image: linear-gradient(135deg, rgba(0,0,0,0.22), rgba(0,0,0,0.08)), url('../${SPECIAL_COLLAB_CARD.image}'); color: #ffffff;`;
  card.innerHTML = `
    <div class="card-media card-media-tight-image" style="${mediaStyle}">
      <span class="card-chip card-chip-overlay">${escapeHtml(SPECIAL_COLLAB_CARD.chip)}</span>
    </div>
    <div class="card-body">
      <h3 class="card-title">${escapeHtml(SPECIAL_COLLAB_CARD.title)}</h3>
      <p class="card-summary">${escapeHtml(SPECIAL_COLLAB_CARD.summary)}</p>
    </div>
  `;

  card.addEventListener("click", () => {
    openAboutModal();
  });

  target.appendChild(card);
}

function filterExamplesBySearch(examples, query) {
  if (!query) {
    return examples;
  }
  const normalizedQuery = normalizeText(query);
  const scored = [];

  for (const example of examples) {
    const title = normalizeText(example.title || "");
    const summary = normalizeText(example.summary || "");
    const titleScore = fuzzyMatchScore(normalizedQuery, title);
    const summaryScore = fuzzyMatchScore(normalizedQuery, summary);
    const bestScore = Math.max(titleScore, summaryScore);
    if (bestScore > 0) {
      scored.push({ example, score: bestScore });
    }
  }

  scored.sort((a, b) => {
    const aUnder = isExampleUnderConstruction(a.example) ? 1 : 0;
    const bUnder = isExampleUnderConstruction(b.example) ? 1 : 0;
    if (aUnder !== bUnder) return aUnder - bUnder;
    return b.score - a.score;
  });
  return scored.map((item) => item.example);
}

function renderNoResults(container, query) {
  const wrapper = document.createElement("div");
  wrapper.className = "search-no-results";

  let html = `<p>No se encontraron ejemplos para "<strong>${escapeHtml(query)}</strong>".</p>`;

  if (currentPhase) {
    html += `<p>Estás filtrando por la fase "<strong>${escapeHtml(currentPhase.name)}</strong>". Prueba a buscar en todas las fases.</p>`;
    html += `<button type="button" class="search-no-results-button" data-action="clear-phase"><i class="fa-solid fa-filter-circle-xmark icon-inline" aria-hidden="true"></i> Quitar filtro de fase</button>`;
  }

  wrapper.innerHTML = html;

  const clearPhaseButton = wrapper.querySelector('[data-action="clear-phase"]');
  if (clearPhaseButton) {
    clearPhaseButton.addEventListener("click", () => {
      setCurrentPhase(null, { resetDetailPanel: true, updateUrl: true, urlMode: "push" });
    });
  }

  container.appendChild(wrapper);
}

function updateSearchPhaseNotice(phase, visibleMatchesCount) {
  if (!searchPhaseNotice) {
    return;
  }

  if (!phase || !currentSearchQuery) {
    searchPhaseNotice.classList.add("hidden");
    searchPhaseNotice.innerHTML = "";
    return;
  }

  const allMatchesCount = filterExamplesBySearch(allExamples, currentSearchQuery).length;
  const hiddenMatchesCount = Math.max(0, allMatchesCount - visibleMatchesCount);

  if (hiddenMatchesCount === 0) {
    searchPhaseNotice.classList.add("hidden");
    searchPhaseNotice.innerHTML = "";
    return;
  }

  const noun = hiddenMatchesCount === 1 ? "coincidencia" : "coincidencias";
  searchPhaseNotice.innerHTML = `
    <p>
      Hay <strong>${hiddenMatchesCount}</strong> ${noun} más fuera de la fase
      "<strong>${escapeHtml(phase.name)}</strong>".
    </p>
    <button type="button" class="search-phase-notice-button" data-action="clear-phase-filter">
      <i class="fa-solid fa-filter-circle-xmark icon-inline" aria-hidden="true"></i>
      Ver todas las fases
    </button>
  `;
  searchPhaseNotice.classList.remove("hidden");

  const clearButton = searchPhaseNotice.querySelector('[data-action="clear-phase-filter"]');
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      setCurrentPhase(null, { resetDetailPanel: true, updateUrl: true, urlMode: "push" });
      searchInput.focus();
    });
  }
}

function renderCards(phase) {
  const examples = phase ? getPhaseExamples(phase) : allExamples;
  const filtered = filterExamplesBySearch(examples, currentSearchQuery);
  exampleCardsFooter.innerHTML = "";
  updateSearchPhaseNotice(phase, filtered.length);

  if (examplesCount) {
    const label = filtered.length === 1 ? "ejemplo" : "ejemplos";
    examplesCount.textContent = `🔍 ${filtered.length} ${label} mostrados`;
  }

  if (filtered.length === 0 && currentSearchQuery) {
    renderNoResults(exampleCardsFooter, currentSearchQuery);
  } else {
    for (const example of filtered) {
      renderCard(example, exampleCardsFooter);
    }
  }
  renderSpecialCollaborationCard(exampleCardsFooter);
}

function closeFilterTooltip() {
  if (!galleryDescription) {
    return;
  }

  const wrapper = galleryDescription.querySelector(".phase-filter-tooltip-wrap.is-open");
  if (!wrapper) {
    return;
  }

  wrapper.classList.remove("is-open");
  const trigger = wrapper.querySelector("[data-filter-tooltip-trigger]");
  if (trigger instanceof HTMLElement) {
    trigger.setAttribute("aria-expanded", "false");
  }
}

function setGalleryDescription(phase) {
  if (!galleryDescription) {
    return;
  }

  if (phase) {
    galleryDescription.textContent = phase.description;
    return;
  }

  galleryDescription.innerHTML = `
    <span class="phase-filter-hint">Mostrando todos los ejemplos</span>
    <span class="phase-filter-tooltip-wrap">
      <button
        type="button"
        class="phase-filter-tooltip-trigger"
        data-filter-tooltip-trigger
        aria-label="Cómo filtrar por fase"
        aria-expanded="false"
        aria-describedby="phase-filter-tooltip"
      >
        <i class="fa-solid fa-circle-info icon-inline" aria-hidden="true"></i>
      </button>
      <span id="phase-filter-tooltip" class="phase-filter-tooltip" role="tooltip">
        ${escapeHtml(FILTER_TOOLTIP_MESSAGE)}
      </span>
    </span>
  `;
}

function setCurrentPhase(phase, { resetDetailPanel = true, updateUrl = true, urlMode = "push" } = {}) {
  currentPhase = phase || null;
  if (galleryTitle) {
    galleryTitle.textContent = currentPhase
      ? `Galería de ejemplos para ${currentPhase.name.toLowerCase()}`
      : "Galería de ejemplos";
  }
  setGalleryDescription(currentPhase);
  renderCards(currentPhase);
  setSelectedPhaseRadio(currentPhase ? currentPhase.id : "");

  if (resetDetailPanel) {
    currentExampleId = "";
    setActiveExample("");
    resetDetail();
    activateTab("summary");
    updateMetadataForPhase(currentPhase);
  } else {
    setActiveExample("");
  }

  if (updateUrl) {
    writeUrlState(
      {
        phaseId: currentPhase ? currentPhase.id : "",
        exampleId: currentExampleId,
        tabId: getCurrentTabId()
      },
      { mode: urlMode }
    );
  }
}

function renderPhaseRadios() {
  phaseRadios.innerHTML = "";
  if (phaseSelect) {
    phaseSelect.innerHTML = "";
    const allPhasesOption = document.createElement("option");
    allPhasesOption.value = "";
    allPhasesOption.textContent = "Todas las fases";
    phaseSelect.appendChild(allPhasesOption);
  }

  for (const phase of phases) {
    const id = `phase-${phase.id}`;
    const option = document.createElement("div");
    option.className = "phase-option";
    option.innerHTML = `
      <input type="radio" name="phase" id="${id}" value="${phase.id}">
      <label for="${id}"><span>${escapeHtml(phase.icon || "📘")}</span> ${escapeHtml(phase.name)}</label>
    `;
    phaseRadios.appendChild(option);

    if (phaseSelect) {
      const selectOption = document.createElement("option");
      selectOption.value = phase.id;
      selectOption.textContent = `${phase.icon || "📘"} ${phase.name}`;
      phaseSelect.appendChild(selectOption);
    }
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

  phaseRadios.addEventListener("click", (event) => {
    let input = null;
    if (event.target instanceof HTMLInputElement && event.target.name === "phase") {
      input = event.target;
    } else if (event.target instanceof Element) {
      const label = event.target.closest("label");
      const forId = label ? label.getAttribute("for") : "";
      if (forId) {
        const associated = document.getElementById(forId);
        if (associated instanceof HTMLInputElement && associated.name === "phase") {
          input = associated;
        }
      }
    }

    if (!input || !currentPhase || input.value !== currentPhase.id) {
      return;
    }

    event.preventDefault();
    setCurrentPhase(null, { resetDetailPanel: true, updateUrl: true, urlMode: "push" });
  });

  if (phaseSelect) {
    phaseSelect.addEventListener("change", (event) => {
      if (!(event.target instanceof HTMLSelectElement)) {
        return;
      }

      if (!event.target.value) {
        setCurrentPhase(null, { resetDetailPanel: true, updateUrl: true, urlMode: "push" });
        return;
      }

      const phase = findPhaseById(event.target.value);
      if (!phase) {
        return;
      }

      setCurrentPhase(phase, { resetDetailPanel: true, updateUrl: true, urlMode: "push" });
    });
  }
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
  setPanelVisibility(true);
  detailTabs.classList.remove("hidden");
  copyFeedback.textContent = "";
  copyFeedback.classList.add("hidden");
  activateTab(tabId);
  updateCollaborationBar(example);

  if (updateUrl) {
    writeUrlState(
      {
        phaseId: currentPhase ? currentPhase.id : "",
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

if (panelToggleButton) {
  panelToggleButton.addEventListener("click", () => {
    if (!currentExampleId) {
      return;
    }
    const shouldShow = !isPanelVisible();
    setPanelVisibility(shouldShow);
    if (shouldShow) {
      scrollToDetailPanel();
    }
  });
}

if (aboutButtons.length) {
  aboutButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openAboutModal();
    });
  });
}

if (aboutCloseButton) {
  aboutCloseButton.addEventListener("click", () => {
    closeAboutModal();
  });
}

if (aboutModal) {
  aboutModal.addEventListener("click", (event) => {
    if (event.target === aboutModal) {
      closeAboutModal();
    }
  });
}

if (galleryDescription) {
  galleryDescription.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const trigger = event.target.closest("[data-filter-tooltip-trigger]");
    if (!(trigger instanceof HTMLElement)) {
      return;
    }

    event.preventDefault();
    const wrapper = trigger.closest(".phase-filter-tooltip-wrap");
    if (!(wrapper instanceof HTMLElement)) {
      return;
    }

    const shouldOpen = !wrapper.classList.contains("is-open");
    closeFilterTooltip();
    if (!shouldOpen) {
      return;
    }

    wrapper.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  });

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Node) || galleryDescription.contains(event.target)) {
      return;
    }
    closeFilterTooltip();
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeFilterTooltip();
    closeAboutModal();
    if (document.activeElement === searchInput && currentSearchQuery) {
      clearSearch();
      searchInput.blur();
    }
  }
});

function clearSearch() {
  currentSearchQuery = "";
  searchInput.value = "";
  searchClear.classList.add("hidden");
  renderCards(currentPhase);
}

searchInput.addEventListener("input", () => {
  currentSearchQuery = searchInput.value.trim();
  searchClear.classList.toggle("hidden", !currentSearchQuery);
  renderCards(currentPhase);
});

searchClear.addEventListener("click", () => {
  clearSearch();
  searchInput.focus();
});

async function applyUrlState({ urlMode = "replace" } = {}) {
  const { phaseId, exampleId, tabId } = readUrlState();
  const requestedExample = exampleId ? exampleById[exampleId] : null;

  let phase = findPhaseById(phaseId);
  if (requestedExample && phase && !phaseContainsExample(phase, requestedExample.id)) {
    phase = findFirstPhaseForExample(requestedExample.id);
  }
  if (!phases.length && !allExamples.length) {
    return;
  }

  const hasValidExample = Boolean(
    requestedExample && phaseContainsExample(phase, requestedExample.id) && isExampleLoadable(requestedExample)
  );

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
      phaseId: phase ? phase.id : "",
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
  setupInstallExperience();
  setupUpdateExperience();
  registerServiceWorker();
  await loadData();
  renderPhaseRadios();
  await applyUrlState({ urlMode: "replace" });
}

init();
