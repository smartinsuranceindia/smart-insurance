const cursor = document.querySelector(".cursor-glow");
if (window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
} else {
  cursor.style.display = "none";
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.14});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
menuBtn.addEventListener("click", () => {
  const open = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!open));
  mobileMenu.style.display = open ? "none" : "flex";
});
mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  mobileMenu.style.display = "none";
  menuBtn.setAttribute("aria-expanded", "false");
}));

document.querySelectorAll(".magnetic").forEach(btn => {
  btn.addEventListener("pointermove", e => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2) * .18;
    const y = (e.clientY - r.top - r.height/2) * .18;
    btn.style.transform = `translate(${x}px,${y}px)`;
  });
  btn.addEventListener("pointerleave", () => btn.style.transform = "");
});

const count = document.querySelector("[data-count]");
if (count) {
  const countObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      let n = 0;
      const timer = setInterval(() => {
        n++;
        count.textContent = n;
        if (n >= 3) clearInterval(timer);
      }, 180);
      countObs.disconnect();
    }
  }, {threshold:.7});
  countObs.observe(count);
}

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("quoteForm");
const toast = document.querySelector(".toast");
form.addEventListener("submit", e => {
  e.preventDefault();
  // Replace this with your WhatsApp number or Formspree/EmailJS endpoint later.
  const data = new FormData(form);
  const text = `Smart Insurance enquiry%0A%0AName: ${encodeURIComponent(data.get("name"))}%0APhone: ${encodeURIComponent(data.get("phone"))}%0AInsurance: ${encodeURIComponent(data.get("insurance"))}%0AMessage: ${encodeURIComponent(data.get("message") || "")}`;
  // IMPORTANT: replace 91XXXXXXXXXX with the business WhatsApp number.
  const whatsappNumber = "91XXXXXXXXXX";
  if (!whatsappNumber.includes("X")) {
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  } else {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4500);
  }
});

document.querySelector(".whatsapp-float").addEventListener("click", e => {
  const whatsappNumber = "91XXXXXXXXXX";
  if (whatsappNumber.includes("X")) {
    e.preventDefault();
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4500);
  }
});
