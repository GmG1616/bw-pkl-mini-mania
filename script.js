// ELEMENTS
const slider = document.getElementById("slider");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.getElementById("dots");
const cards = Array.from(document.querySelectorAll(".card"));

let currentIndex = 0;
let autoSlideInterval = null;
const slideStep = () => {
  // scroll to next card index
  currentIndex = (currentIndex + 1) % cards.length;
  scrollToCard(currentIndex);
  updateActiveDot();
};

// CREATE DOTS DYNAMICALLY
function createDots() {
  dotsContainer.innerHTML = "";
  cards.forEach((_, idx) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (idx === 0) dot.classList.add("active");
    dot.dataset.index = idx;
    dot.addEventListener("click", () => {
      currentIndex = idx;
      scrollToCard(idx);
      resetAutoSlide();
      updateActiveDot();
    });
    dotsContainer.appendChild(dot);
  });
}
createDots();

// SCROLL UTILITY
function scrollToCard(index) {
  const card = cards[index];
  if (!card) return;
  // offsetLeft is relative to slider, so scrollLeft -> card.offsetLeft
  slider.scrollTo({ left: card.offsetLeft - 0, behavior: "smooth" });
}

// UPDATE ACTIVE DOT BASED ON NEAREST CARD
function updateActiveDot() {
  const dots = Array.from(dotsContainer.children);
  let closestIndex = 0;
  let smallest = Infinity;
  const currentScroll = slider.scrollLeft;
  cards.forEach((card, idx) => {
    const distance = Math.abs(card.offsetLeft - currentScroll);
    if (distance < smallest) {
      smallest = distance;
      closestIndex = idx;
    }
  });
  // sync currentIndex
  currentIndex = closestIndex;
  dots.forEach((d, i) => d.classList.toggle("active", i === closestIndex));
}

// NEXT / PREV BUTTONS
nextBtn.addEventListener("click", () => {
  currentIndex = Math.min(cards.length - 1, currentIndex + 1);
  if (currentIndex >= cards.length) currentIndex = cards.length - 1;
  scrollToCard(currentIndex);
  updateActiveDot();
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  currentIndex = Math.max(0, currentIndex - 1);
  scrollToCard(currentIndex);
  updateActiveDot();
  resetAutoSlide();
});

// SYNC DOTS WHEN USER SCROLLS (drag or wheel)
let scrollDebounce;
slider.addEventListener("scroll", () => {
  // update active dot while scrolling (debounced for performance)
  clearTimeout(scrollDebounce);
  scrollDebounce = setTimeout(updateActiveDot, 80);
});

// AUTO-SLIDE
function startAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => {
    // if at last card, go to first; otherwise next
    currentIndex = (currentIndex + 1) % cards.length;
    scrollToCard(currentIndex);
    updateActiveDot();
  }, 3000);
}
function stopAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
}
function resetAutoSlide() {
  stopAutoSlide();
  // restart after short delay so user interaction doesn't immediately resume
  setTimeout(startAutoSlide, 1500);
}

// Pause auto-slide on hover / focus for better UX
slider.addEventListener("mouseenter", stopAutoSlide);
slider.addEventListener("mouseleave", startAutoSlide);

// Start auto slide initially
startAutoSlide();

// Accessibility: allow arrow keys to navigate when slider focused
slider.setAttribute("tabindex", "0");
slider.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    currentIndex = Math.min(cards.length - 1, currentIndex + 1);
    scrollToCard(currentIndex);
    updateActiveDot();
    resetAutoSlide();
  } else if (e.key === "ArrowLeft") {
    currentIndex = Math.max(0, currentIndex - 1);
    scrollToCard(currentIndex);
    updateActiveDot();
    resetAutoSlide();
  }
});
