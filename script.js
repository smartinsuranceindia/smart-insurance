const WHATSAPP_NUMBER = "917990867269";
const INSTAGRAM_URL = "https://www.instagram.com/smartinsuranceindia/";

const cursor = document.querySelector(".cursor-glow");
if (cursor && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
} else if (cursor) cursor.style.display = "none";

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  });
}, {threshold:.14});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const open = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!open));
    mobileMenu.style.display = open ? "none" : "flex";
  });
  mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    mobileMenu.style.display = "none"; menuBtn.setAttribute("aria-expanded", "false");
  }));
}

document.querySelectorAll(".magnetic").forEach(btn => {
  btn.addEventListener("pointermove", e => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.18}px)`;
  });
  btn.addEventListener("pointerleave", () => btn.style.transform = "");
});

const count = document.querySelector("[data-count]");
if (count) {
  const countObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      const target = Number(count.dataset.count || 4); let n = 0;
      const timer = setInterval(() => { n++; count.textContent = n; if (n >= target) clearInterval(timer); }, 160);
      countObs.disconnect();
    }
  }, {threshold:.7});
  countObs.observe(count);
}

document.getElementById("year").textContent = new Date().getFullYear();

const categoryData = {
  health: {
    title:"Health Insurance", kicker:"01 / HEALTH INSURANCE", lead:"Support for medical expenses, so an unexpected health event doesn't have to become an unexpected financial burden.",
    overview:["Cashless hospital network options","Family floater and individual plans","Critical illness and hospitalisation benefits","Guidance based on your needs and budget"],
    benefits:["Helps manage eligible hospitalisation expenses","Options for individuals and families","Can include additional protection depending on the policy","Renewal and policy-support guidance"],
    faq:["Who can take health insurance?","What is a cashless hospital?","What is a waiting period?","What documents are generally needed?"], video:"How Health Insurance Works"
  },
  life: {
    title:"Life Insurance", kicker:"02 / LIFE INSURANCE", lead:"Protect the people and long-term plans that matter to you with a policy aligned to your goals.",
    overview:["Term insurance options","Long-term financial protection","Family and future planning","Guidance to understand policy choices"],
    benefits:["Financial support for nominees as per policy terms","Different protection durations and structures","Can be considered alongside long-term goals","Clear explanation before you decide"],
    faq:["What is term insurance?","How much cover may be appropriate?","What is a nominee?","How does policy tenure work?"], video:"Life Insurance Explained"
  },
  motor: {
    title:"Motor Insurance", kicker:"03 / MOTOR INSURANCE", lead:"Stay protected on the road with guidance for car and two-wheeler insurance needs.",
    overview:["Car insurance support","Two-wheeler insurance support","Renewal guidance","Help understanding coverage options"],
    benefits:["Third-party and own-damage concepts explained","Add-ons can be discussed where relevant","Renewal reminders and guidance","Simple help with your insurance requirement"],
    faq:["What is third-party cover?","What is own-damage cover?","What is an IDV?","When should I renew my policy?"], video:"Motor Insurance Tips"
  },
  accident: {
    title:"Accident Insurance", kicker:"04 / ACCIDENT INSURANCE", lead:"Financial protection designed to help when an unexpected accident affects your income, mobility or hospital expenses.",
    overview:["Personal accident cover","Accidental disability benefits","Accident-related hospitalisation benefits","Support for understanding eligible protection"],
    benefits:["Protection against specified accidental events","May provide benefits for disability as defined by policy","Can complement other insurance covers","Useful for individuals seeking additional accident protection"],
    faq:["What does personal accident insurance cover?","What is accidental disability?","Can accident insurance complement health insurance?","What exclusions should I check?"], video:"Understanding Accident Insurance"
  }
};

const modal = document.getElementById("detailModal");
const detailTitle = document.getElementById("detailTitle");
const detailKicker = document.getElementById("detailKicker");
const detailLead = document.getElementById("detailLead");
const detailBody = document.getElementById("detailBody");
const videoTitle = document.getElementById("videoTitle");
let currentCategory = "health";
let currentTab = "overview";

function renderTab(tab) {
  currentTab = tab;
  const data = categoryData[currentCategory];
  document.querySelectorAll(".detail-tabs button").forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tab));
  const items = data[tab];
  if (tab === "faq") {
    detailBody.innerHTML = items.map((q,i) => `<details class="faq-item"><summary>${q}</summary><p>${faqAnswers[currentCategory][i]}</p></details>`).join("");
  } else {
    detailBody.innerHTML = `<ul class="detail-list">${items.map(item => `<li><span>✓</span>${item}</li>`).join("")}</ul>`;
  }
}

const faqAnswers = {
  health:["Eligibility depends on the policy and insurer. We can help you understand the relevant options.","A cashless hospital is a network hospital where eligible treatment can be settled directly with the insurer/TPA as per policy terms.","A waiting period is a specified time before certain claims become payable under a policy.","Requirements vary by insurer and product; we will guide you through the applicable documents."],
  life:["Term insurance is protection for a specified period, with benefits paid according to the policy terms.","The appropriate cover depends on income, liabilities, dependants and financial goals; we can discuss your situation.","A nominee is the person nominated to receive policy benefits according to applicable rules and policy terms.","Tenure is the period for which the policy remains in force, subject to its terms and premiums."],
  motor:["Third-party cover addresses specified third-party liabilities as required by law and policy terms.","Own-damage cover can protect the insured vehicle against covered damage, subject to policy terms.","IDV means Insured Declared Value and is a key factor in comprehensive motor insurance pricing and claims.","Renewal should generally be completed before the existing policy expires to avoid a lapse."],
  accident:["Personal accident insurance generally covers specified accidental events and benefits according to the policy terms.","Accidental disability refers to disability caused by a covered accident, with benefits depending on the policy wording.","Yes. Accident insurance can complement health insurance because the benefits and purpose can differ.","Always review exclusions, waiting conditions, definitions and benefit limits before purchasing a policy."]
};

function openCategory(key) {
  const data = categoryData[key]; if (!data) return;
  currentCategory = key;
  detailTitle.textContent = data.title; detailKicker.textContent = data.kicker; detailLead.textContent = data.lead; videoTitle.textContent = data.video;
  renderTab("overview");
  modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.classList.add("modal-open");
}

document.querySelectorAll(".solution-card[data-category]").forEach(card => {
  const action = () => openCategory(card.dataset.category);
  card.addEventListener("click", e => { if (!e.target.closest("button")) action(); });
  card.querySelector("button")?.addEventListener("click", action);
  card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); action(); } });
});

document.querySelectorAll(".detail-tabs button").forEach(btn => btn.addEventListener("click", () => renderTab(btn.dataset.tab)));
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); document.body.classList.remove("modal-open"); }

document.getElementById("detailQuote").addEventListener("click", () => setTimeout(() => document.querySelector('#contact input[name="name"]')?.focus(), 250));

document.getElementById("quoteForm").addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const message = [
    "Hello Smart Insurance, I would like to enquire about insurance.",
    "", `Name: ${data.get("name")}`, `Phone: ${data.get("phone")}`, `Insurance: ${data.get("insurance")}`, `Message: ${data.get("message") || "Not provided"}`
  ].join("\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

document.querySelector(".whatsapp-float")?.addEventListener("click", () => {});

document.querySelectorAll('a[href="https://www.instagram.com/smartinsuranceindia/"]').forEach(a => a.href = INSTAGRAM_URL);
