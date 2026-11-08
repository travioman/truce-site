/* Truce Games site motion. No tracking, no storage, no network:
   reveals sections as they scroll in, moves the hero glow with the pointer,
   and shades the header once the page scrolls. Honors reduced motion. */
(function () {
  window.__truceMotion = true;
  var root = document.documentElement;
  root.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var items = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  var hero = document.querySelector(".hero");
  if (hero && !reduce && window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("pointermove", function (ev) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", ((ev.clientX - r.left) / r.width * 100).toFixed(1) + "%");
      hero.style.setProperty("--my", ((ev.clientY - r.top) / r.height * 100).toFixed(1) + "%");
    });
  }

  // Team player cards: 3D tilt toward the pointer and a foil glare that follows it.
  if (!reduce && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".member").forEach(function (card) {
      card.addEventListener("pointermove", function (ev) {
        var r = card.getBoundingClientRect();
        var x = (ev.clientX - r.left) / r.width, y = (ev.clientY - r.top) / r.height;
        card.style.transition = "transform .08s ease-out, box-shadow .3s ease";
        card.style.transform = "perspective(900px) rotateX(" + ((0.5 - y) * 14).toFixed(2) + "deg) rotateY(" +
          ((x - 0.5) * 16).toFixed(2) + "deg) translateY(-6px)";
        card.style.setProperty("--px", (110 - x * 120).toFixed(1) + "%");
      });
      card.addEventListener("pointerleave", function () {
        card.style.transition = "transform .5s cubic-bezier(.2, .8, .2, 1), box-shadow .3s ease";
        card.style.transform = "";
      });
    });
  }

  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
