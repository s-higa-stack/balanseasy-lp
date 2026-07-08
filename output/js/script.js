// バランス イージー LP — インタラクション（FAQアコーディオン／下部固定CTA／図解フェードイン）
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  initAccordion();
  initStickyCta();
  initDiagramReveal();
});

/* ---------- FAQアコーディオン ---------- */
function initAccordion() {
  var accordion = document.getElementById("accordion");
  if (!accordion) return;

  var items = accordion.querySelectorAll(".accordion-item");
  items.forEach(function (item) {
    var trigger = item.querySelector(".accordion-trigger");
    var icon = item.querySelector(".accordion-icon");

    trigger.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      item.classList.toggle("is-open", !isOpen);
      trigger.setAttribute("aria-expanded", String(!isOpen));
      if (icon) icon.textContent = !isOpen ? "－" : "＋";
    });
  });
}

/* ---------- モバイル下部固定CTA ---------- */
function initStickyCta() {
  var sticky = document.getElementById("stickyCta");
  var fv = document.getElementById("fv");
  var ctaFinal = document.getElementById("cta-final");
  if (!sticky || !fv) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.target === fv) {
          // FVが画面外に出たら表示する
          sticky.classList.toggle("is-visible", !entry.isIntersecting);
        }
        if (entry.target === ctaFinal && entry.isIntersecting) {
          // 最終CTAセクションに到達したら固定CTAは隠す（二重表示を避ける）
          sticky.classList.remove("is-visible");
        }
      });
    },
    { threshold: 0 }
  );

  observer.observe(fv);
  if (ctaFinal) observer.observe(ctaFinal);
}

/* ---------- 仕組み説明セクションの図解：控えめなフェードイン ---------- */
function initDiagramReveal() {
  var diagram = document.getElementById("diagram");
  if (!diagram) return;

  if (!("IntersectionObserver" in window)) {
    diagram.classList.add("is-visible");
    return;
  }

  var observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          diagram.classList.add("is-visible");
          obs.unobserve(diagram);
        }
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(diagram);
}
