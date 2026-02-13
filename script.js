// ============================================
// CURTAIN OPENING EFFECT
// ============================================
window.addEventListener("load", () => {
  const curtains = document.getElementById("curtains");
  const nav = document.querySelector("nav");
  const heroContent = document.querySelector(".hero-content");

  // Start opening after a brief moment
  setTimeout(() => {
    curtains.classList.add("opening");

    // Reveal hero content as curtains open
    setTimeout(() => {
      heroContent.classList.add("revealed");
    }, 800);

    // Show navigation after curtains start opening
    setTimeout(() => {
      nav.classList.add("visible");
    }, 1200);

    // Remove curtains from DOM after animation
    setTimeout(() => {
      curtains.classList.add("opened");
    }, 2800);
  }, 1200);
});

// Mobile Menu Toggle
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      document.getElementById("navLinks").classList.remove("active");
    }
  });
});

// Scroll Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// Add stagger animation delay to cards
document
  .querySelectorAll(
    ".color-step, .contact-card, .character-card, .school-item, .practical-item, .education-box",
  )
  .forEach((card, index) => {
    card.style.setProperty("--delay", `${(index % 4) * 0.1}s`);
  });

// ============================================
// MIRROR EMOJI ANIMATION
// ============================================
const mirrorEmojis = [
  "&#x1F60A;",
  "&#x1F622;",
  "&#x1F621;",
  "&#x1F628;",
  "&#x1F970;",
  "&#x1F60E;",
  "&#x1F914;",
  "&#x1F633;",
  "&#x1F929;",
  "&#x1F61E;",
];
let emojiIndex = 0;
let emojiInterval = null;

function animateMirrorEmoji() {
  const mirrorEmoji = document.querySelector(".mirror-emoji");
  if (!mirrorEmoji) return;

  // Shrink out
  mirrorEmoji.classList.add("shrink-out");
  mirrorEmoji.classList.remove("grow-in");

  setTimeout(() => {
    // Change emoji
    emojiIndex = (emojiIndex + 1) % mirrorEmojis.length;
    mirrorEmoji.innerHTML = mirrorEmojis[emojiIndex];

    // Grow in with tilt
    mirrorEmoji.classList.remove("shrink-out");
    mirrorEmoji.classList.add("grow-in");

    // Remove grow-in class after animation
    setTimeout(() => {
      mirrorEmoji.classList.remove("grow-in");
    }, 600);
  }, 500);
}

const mirrorObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !emojiInterval) {
      emojiInterval = setInterval(animateMirrorEmoji, 3000);
    } else if (!entry.isIntersecting && emojiInterval) {
      clearInterval(emojiInterval);
      emojiInterval = null;
    }
  });
});

const mirrorEl = document.querySelector(".mirror-frame");
if (mirrorEl) mirrorObserver.observe(mirrorEl);

// ============================================
// BOOKLET INTERACTIVE HOVER EFFECT
// ============================================
const bookletFlipper = document.getElementById("bookletFlipper");
const bookletBack = document.getElementById("bookletBack");

const bookletActivities = [
  {
    emoji: "&#x1F3A8;",
    title: "Check Your Body",
    text: "Color where you feel emotions in your body",
  },
  {
    emoji: "&#x1FA9E;",
    title: "Observe Your Face",
    text: "Draw your expressions in mirror frames",
  },
  {
    emoji: "&#x1F50D;",
    title: "Word Search Puzzle",
    text: "Find all 13 feelings hidden in the puzzle",
  },
  {
    emoji: "&#x1F483;",
    title: "Healthy Choices",
    text: "Dance, breathe, draw, hug, walk, write, shake, pray, or rest",
  },
  {
    emoji: "&#x1F58D;",
    title: "Draw Your Feeling",
    text: "Give your feeling a body and a face as a character",
  },
  {
    emoji: "&#x1F4DD;",
    title: "My Own Way",
    text: "Write your own way to feel better",
  },
];

let currentActivityIndex = 0;

if (bookletFlipper && bookletBack) {
  bookletFlipper.addEventListener("mouseenter", () => {
    // Change to next activity
    currentActivityIndex =
      (currentActivityIndex + 1) % bookletActivities.length;
    const activity = bookletActivities[currentActivityIndex];

    bookletBack.querySelector(".booklet-mockup-emoji").innerHTML =
      activity.emoji;
    bookletBack.querySelector(".booklet-mockup-title").textContent =
      activity.title;
    bookletBack.querySelector(".booklet-mockup-text").textContent =
      activity.text;
  });
}

// ============================================
// GALLERY MODAL FUNCTIONALITY
// ============================================
const galleryModal = document.getElementById("galleryModal");
const galleryModalImage = document.getElementById("galleryModalImage");
const galleryModalTitle = document.getElementById("galleryModalTitle");
const galleryModalDescription = document.getElementById(
  "galleryModalDescription",
);
const galleryModalClose = document.querySelector(".gallery-modal-close");
const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    const caption = item.querySelector(".gallery-caption").textContent;
    const description = item.getAttribute("data-description");

    galleryModalImage.src = img.src;
    galleryModalImage.alt = img.alt;
    galleryModalTitle.textContent = caption;
    galleryModalDescription.textContent = description;

    galleryModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// Close modal
if (galleryModalClose) {
  galleryModalClose.addEventListener("click", () => {
    galleryModal.classList.remove("active");
    document.body.style.overflow = "";
  });
}

// Close modal on backdrop click
if (galleryModal) {
  galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) {
      galleryModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    galleryModal &&
    galleryModal.classList.contains("active")
  ) {
    galleryModal.classList.remove("active");
    document.body.style.overflow = "";
  }
});
