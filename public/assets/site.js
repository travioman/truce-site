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
  // Pointer glow: one element moved by transform, at most once per frame
  // (repainting the hero background on every mouse move was too slow without a GPU).
  if (hero && !reduce && window.matchMedia("(pointer: fine)").matches) {
    var glow = document.createElement("div");
    glow.className = "hero-glow"; glow.setAttribute("aria-hidden", "true");
    hero.insertBefore(glow, hero.firstChild);
    var gx = 0, gy = 0, queued = false;
    hero.addEventListener("pointermove", function (ev) {
      var r = hero.getBoundingClientRect();
      gx = ev.clientX - r.left; gy = ev.clientY - r.top;
      if (!queued) {
        queued = true;
        requestAnimationFrame(function () {
          glow.style.transform = "translate3d(" + gx + "px," + gy + "px,0)";
          queued = false;
        });
      }
    });
  }

  // Team player cards: 3D tilt toward the pointer and a foil glare that follows it.
  if (!reduce && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".member").forEach(function (card) {
      var pending = null;
      card.addEventListener("pointermove", function (ev) {
        if (pending) { pending = ev; return; }
        pending = ev;
        requestAnimationFrame(function () { tilt(pending); pending = null; });
      });
      function tilt(ev) {
        var r = card.getBoundingClientRect();
        var x = (ev.clientX - r.left) / r.width, y = (ev.clientY - r.top) / r.height;
        card.style.transition = "transform .08s ease-out, box-shadow .3s ease";
        card.style.transform = "perspective(900px) rotateX(" + ((0.5 - y) * 14).toFixed(2) + "deg) rotateY(" +
          ((x - 0.5) * 16).toFixed(2) + "deg) translateY(-6px)";
        card.style.setProperty("--px", (110 - x * 120).toFixed(1) + "%");
      }
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
