/**
 * Takes the page back to the top.
 *
 * `html` carries `scroll-behavior: smooth`, so this would glide anyway — it is
 * spelled out here so the one case that should not glide can say so. A reader
 * who has asked for reduced motion gets the jump instead.
 */
export function scrollToTop() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
}
