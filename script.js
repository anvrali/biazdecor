// ============ CONFIG ============
// Replace with the real WhatsApp business number (country code + number, no + or spaces)
const WHATSAPP_NUMBER = "918891133631";

function waLink(message){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.addEventListener("DOMContentLoaded", () => {

  // ---------- year ----------
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // ---------- header scroll state ----------
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if(!header) return;
    if(window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();

  // ---------- mobile nav ----------
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  if(hamburger && mobileNav){
    hamburger.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
      document.body.style.overflow = mobileNav.classList.contains("open") ? "hidden" : "";
    });
    mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      document.body.style.overflow = "";
    }));
  }

  // ---------- scroll reveal ----------
  const revealEls = document.querySelectorAll(".reveal, .kerf");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  revealEls.forEach(el => io.observe(el));

  // stagger index for grouped reveals
  document.querySelectorAll(".reveal-stagger").forEach(group => {
    [...group.children].forEach((child, i) => child.style.setProperty("--i", i));
  });

  // ---------- product WhatsApp order buttons ----------
  document.querySelectorAll("[data-order]").forEach(btn => {
    const name = btn.getAttribute("data-order");
    const price = btn.getAttribute("data-price") || "";
    const msg = `Hi Biaz Decor, I would like to order the ${name}${price ? " (₹" + price + ")" : ""}.`;
    btn.href = waLink(msg);
    btn.target = "_blank";
    btn.rel = "noopener";
  });

  // ---------- generic whatsapp links (customization banner, header, footer, floating) ----------
  document.querySelectorAll("[data-wa-message]").forEach(el => {
    el.href = waLink(el.getAttribute("data-wa-message"));
    el.target = "_blank";
    el.rel = "noopener";
  });

  // ---------- contact form ----------
  const form = document.querySelector("#contact-form");
  if(form){
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("#name")?.value.trim();
      const phone = form.querySelector("#phone")?.value.trim();
      const service = form.querySelector("#service")?.value.trim();
      const message = form.querySelector("#message")?.value.trim();

      const waMsg = `Hi Biaz Decor, my name is ${name}.\nPhone: ${phone}\nInterested in: ${service}\nMessage: ${message}`;
      const success = document.querySelector("#form-success");
      if(success){
        success.classList.add("show");
        success.querySelector("a").href = waLink(waMsg);
      }
      form.reset();
    });
  }

  // ---------- product row vertical stack scale-on-scroll ----------
  const rows = document.querySelectorAll(".product-row");
  const rowIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.style.transition = "opacity .7s cubic-bezier(.16,.84,.32,1), transform .7s cubic-bezier(.16,.84,.32,1)";
      if(entry.isIntersecting){
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0) scale(1)";
      }
    });
  }, { threshold: 0.2 });
  rows.forEach((row, i) => {
    row.style.opacity = "0";
    row.style.transform = "translateY(40px) scale(.98)";
    rowIO.observe(row);
  });
});
