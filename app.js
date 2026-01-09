const $ = (sel) => document.querySelector(sel);

const state = {
  // 요청한 Firm Snapshot 4개 구성으로 고정
  kpis: [
    { label: "AUM", value: "94.2K USD", sub: "Indicative (internally managed)" },
    { label: "IRR", value: "24.7%", sub: "Illustrative placeholder" },
    { label: "Team", value: "17", sub: "Core headcount" },
    { label: "Operating History", value: "12+ months", sub: "Live trading experience" },
  ],
};

function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function renderKpis(){
  const grid = $("#kpiGrid");
  if (!grid) return;
  grid.innerHTML = state.kpis.map(k => `
    <div class="kpi">
      <div class="kpiLabel">${escapeHtml(k.label)}</div>
      <div class="kpiVal">${escapeHtml(k.value)}</div>
      <div class="kpiSub">${escapeHtml(k.sub)}</div>
    </div>
  `).join("");
}

function setTheme(theme){
  if (theme === "light") document.documentElement.setAttribute("data-theme","light");
  else document.documentElement.removeAttribute("data-theme");
  localStorage.setItem("iam_theme", theme);
}
function initTheme(){
  const saved = localStorage.getItem("iam_theme");
  setTheme(saved || "dark");
}

function initMobileDrawer(){
  const btn = $("#mobileMenuBtn");
  const drawer = $("#mobileDrawer");
  const closeBtn = $("#mobileCloseBtn");
  if (!btn || !drawer || !closeBtn) return;

  const open = () => {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
  };
  const close = () => {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
  };

  btn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);

  drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
}

function init(){
  initTheme();
  renderKpis();
  initMobileDrawer();

  const themeBtn = $("#themeBtn");
  themeBtn?.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    setTheme(isLight ? "dark" : "light");
  });

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
}

init();
