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
    ".feeling-card, .color-step, .choice-card, .contact-card",
  )
  .forEach((card, index) => {
    card.style.setProperty("--delay", `${(index % 4) * 0.1}s`);
  });

// Mirror emoji animation with shrink/grow effect
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
// EXPLORE FEELINGS SECTION COLOR CHANGE
// ============================================
const feelingsListSection = document.querySelector(
  ".feelings-list-section",
);
const feelingTags = document.querySelectorAll(".feeling-tag");

feelingTags.forEach((tag) => {
  tag.addEventListener("mouseenter", () => {
    const bgColor = tag.dataset.color;
    const textColor = tag.dataset.text;
    feelingsListSection.style.background = bgColor;
    feelingsListSection.querySelector(".section-title").style.color =
      textColor;
    feelingsListSection.querySelector(".section-subtitle").style.color =
      textColor;
  });
  // No mouseleave - keeps the last hovered color
});

// ============================================
// WEATHER EFFECTS FOR FEELINGS SECTION
// ============================================
const sunnyCard = document.getElementById("sunnyCard");
const rainyCard = document.getElementById("rainyCard");
const messagesCard = document.getElementById("messagesCard");
const sunEffect = document.getElementById("sunEffect");
const warmOverlay = document.getElementById("warmOverlay");
const darkOverlay = document.getElementById("darkOverlay");
const magicOverlay = document.getElementById("magicOverlay");
const rainContainer = document.getElementById("rainContainer");
const hillsContainer = document.getElementById("hillsContainer");
const cloudsContainer = document.getElementById("cloudsContainer");
const clouds = cloudsContainer.querySelectorAll(".cloud");
const lightningContainer = document.getElementById("lightningContainer");
const lightningBolts =
  lightningContainer.querySelectorAll(".lightning-bolt");
const messagesBubbles = document.getElementById("messagesBubbles");
const feelingsSection = document.querySelector(".feelings-section");

// Create realistic sun rays
const sunRays = document.getElementById("sunRays");
for (let i = 0; i < 16; i++) {
  const ray = document.createElement("div");
  ray.className = i % 2 === 0 ? "sun-ray long" : "sun-ray";
  ray.style.transform = `rotate(${i * 22.5}deg) translateY(-100px)`;
  ray.style.opacity = 0.4 + Math.random() * 0.4;
  sunRays.appendChild(ray);
}

// Create sun particles (dust in sunlight)
const sunParticles = document.getElementById("sunParticles");
for (let i = 0; i < 20; i++) {
  const particle = document.createElement("div");
  particle.className = "sun-particle";
  particle.style.left = `${30 + Math.random() * 60}%`;
  particle.style.top = `${Math.random() * 80}%`;
  particle.style.animationDelay = `${Math.random() * 8}s`;
  particle.style.animationDuration = `${6 + Math.random() * 4}s`;
  sunParticles.appendChild(particle);
}

// Create realistic rain drops
function createRainDrops() {
  rainContainer.innerHTML = "";
  for (let i = 0; i < 100; i++) {
    const drop = document.createElement("div");
    const isHeavy = Math.random() > 0.7;
    drop.className = isHeavy ? "rain-drop heavy" : "rain-drop";
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.height = `${15 + Math.random() * 25}px`;
    drop.style.animationDuration = `${0.4 + Math.random() * 0.4}s`;
    drop.style.animationDelay = `${Math.random() * 2}s`;
    rainContainer.appendChild(drop);
  }
}
createRainDrops();

// Create rain splashes
const rainSplash = document.getElementById("rainSplash");
function createSplashes() {
  for (let i = 0; i < 15; i++) {
    const splash = document.createElement("div");
    splash.className = "splash";
    splash.style.left = `${Math.random() * 100}%`;
    splash.style.animationDelay = `${Math.random() * 2}s`;
    splash.style.animationDuration = `${0.8 + Math.random() * 0.4}s`;
    rainSplash.appendChild(splash);
  }
}
createSplashes();

// Create message bubbles
const messages = [
  "I need rest",
  "I feel loved",
  "I am okay",
  "Listen to me",
  "I matter",
  "Be gentle",
  "I am safe",
];
messages.forEach((msg, i) => {
  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.textContent = msg;
  bubble.style.left = `${10 + i * 12}%`;
  bubble.style.top = `${20 + (i % 3) * 25}%`;
  bubble.style.animationDelay = `${i * 0.5}s`;
  messagesBubbles.appendChild(bubble);
});

// Lightning timing pattern: 5, 10, 7, 12 seconds
const lightningPattern = [5000, 10000, 7000, 12000];
let lightningPatternIndex = 0;
let lightningTimeout = null;
let isRaining = false;
let cloudTimeouts = [];

function triggerLightning() {
  if (!isRaining) return;

  // Pick a random bolt from the 10 positions
  const randomBoltIndex = Math.floor(Math.random() * 10);
  const bolt = lightningBolts[randomBoltIndex];

  // Flash the bolt
  bolt.classList.add("flash");

  // Flash the screen
  darkOverlay.classList.add("lightning-flash");
  setTimeout(() => {
    darkOverlay.classList.remove("lightning-flash");
  }, 150);

  setTimeout(() => bolt.classList.remove("flash"), 400);

  // Schedule next lightning
  lightningTimeout = setTimeout(() => {
    lightningPatternIndex =
      (lightningPatternIndex + 1) % lightningPattern.length;
    triggerLightning();
  }, lightningPattern[lightningPatternIndex]);
}

// Sunny card hover
sunnyCard.addEventListener("mouseenter", () => {
  sunEffect.classList.add("visible");
  warmOverlay.classList.add("active");
  sunParticles.style.opacity = "1";
  hillsContainer.classList.add("active");
});

sunnyCard.addEventListener("mouseleave", () => {
  sunEffect.classList.remove("visible");
  warmOverlay.classList.remove("active");
  sunParticles.style.opacity = "0";
  hillsContainer.classList.remove("active");
});

// Rainy card hover
const rainMist = document.getElementById("rainMist");

rainyCard.addEventListener("mouseenter", () => {
  isRaining = true;
  feelingsSection.classList.add("rainy-active");
  darkOverlay.classList.add("active");
  rainContainer.classList.add("active");
  cloudsContainer.classList.add("active");
  lightningContainer.classList.add("active");
  rainSplash.style.opacity = "1";
  rainMist.style.opacity = "1";

  // Clear any existing cloud timeouts
  cloudTimeouts.forEach((t) => clearTimeout(t));
  cloudTimeouts = [];

  // Show clouds one by one from left to right
  clouds.forEach((cloud, i) => {
    const timeout = setTimeout(() => {
      cloud.classList.add("visible");
    }, i * 400);
    cloudTimeouts.push(timeout);
  });

  // Start lightning after clouds appear
  setTimeout(() => {
    if (isRaining) triggerLightning();
  }, 2000);
});

rainyCard.addEventListener("mouseleave", () => {
  isRaining = false;
  feelingsSection.classList.remove("rainy-active");
  darkOverlay.classList.remove("active");
  rainContainer.classList.remove("active");
  cloudsContainer.classList.remove("active");
  lightningContainer.classList.remove("active");
  rainSplash.style.opacity = "0";
  rainMist.style.opacity = "0";

  // Clear cloud timeouts
  cloudTimeouts.forEach((t) => clearTimeout(t));
  cloudTimeouts = [];

  // Hide all clouds
  clouds.forEach((cloud) => cloud.classList.remove("visible"));

  // Remove flash from all bolts
  lightningBolts.forEach((bolt) => bolt.classList.remove("flash"));

  if (lightningTimeout) {
    clearTimeout(lightningTimeout);
    lightningTimeout = null;
  }
  lightningPatternIndex = 0;
});

// Messages card hover - magical sparkles effect
let sparkleInterval = null;
let messageRotationInterval = null;
const allMessages = [
  [
    "I need rest",
    "I feel loved",
    "I am okay",
    "Listen to me",
    "I matter",
    "Be gentle",
    "I am safe",
  ],
  [
    "Take a breath",
    "You are enough",
    "Feel it all",
    "Be patient",
    "I am strong",
    "It will pass",
    "I belong",
  ],
  [
    "Trust yourself",
    "Let it out",
    "I am heard",
    "Stay calm",
    "I can cope",
    "Be kind",
    "I am worthy",
  ],
];
let currentMessageSet = 0;

function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.left = `${Math.random() * 100}%`;
  sparkle.style.top = `${Math.random() * 100}%`;
  sparkle.style.background = ["#FFD93D", "#9B4DB5", "#FF6B6B", "#4ECDC4"][
    Math.floor(Math.random() * 4)
  ];
  sparkle.style.boxShadow = `0 0 10px ${sparkle.style.background}`;
  feelingsSection.appendChild(sparkle);

  setTimeout(() => sparkle.classList.add("twinkle"), 10);
  setTimeout(() => sparkle.remove(), 1500);
}

function rotateMessages() {
  currentMessageSet = (currentMessageSet + 1) % allMessages.length;
  const bubbles = messagesBubbles.querySelectorAll(".message-bubble");
  bubbles.forEach((bubble, i) => {
    bubble.style.opacity = "0";
    bubble.style.transform = "scale(0.5)";
    setTimeout(() => {
      bubble.textContent = allMessages[currentMessageSet][i];
      bubble.style.opacity = "";
      bubble.style.transform = "";
    }, 300);
  });
}

messagesCard.addEventListener("mouseenter", () => {
  magicOverlay.classList.add("active");
  messagesBubbles.classList.add("active");
  sparkleInterval = setInterval(createSparkle, 200);
  messageRotationInterval = setInterval(rotateMessages, 4000);
});

messagesCard.addEventListener("mouseleave", () => {
  magicOverlay.classList.remove("active");
  messagesBubbles.classList.remove("active");
  if (sparkleInterval) clearInterval(sparkleInterval);
  if (messageRotationInterval) clearInterval(messageRotationInterval);
});

// ============================================
// HEALTHY CHOICES SECTION PARTICLES (CIRCLES ONLY)
// ============================================
const choicesParticles = document.getElementById("choicesParticles");
const choicesSectionEl = document.getElementById("choicesSection");
const circleColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#F5A623",
  "#9B59B6",
  "#7CB342",
  "#4A90D9",
  "#E91E63",
  "#00BCD4",
];

// Create floating circles
for (let i = 0; i < 30; i++) {
  const circle = document.createElement("div");
  circle.className = "choice-particle circle";

  const size = 8 + Math.random() * 25;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.background =
    circleColors[Math.floor(Math.random() * circleColors.length)];
  circle.style.left = `${Math.random() * 100}%`;
  circle.style.top = `${Math.random() * 100}%`;
  circle.style.animationDuration = `${8 + Math.random() * 12}s`;
  circle.style.animationDelay = `${Math.random() * 5}s`;

  choicesParticles.appendChild(circle);
}

// Background color change on card hover (smooth like feelings list section)
const choiceCards = document.querySelectorAll(".choice-card");
const choicesSectionTitle =
  choicesSectionEl.querySelector(".section-title");
const choicesSectionSubtitle =
  choicesSectionEl.querySelector(".section-subtitle");

choiceCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const bgColor = card.dataset.color;
    const textColor = card.dataset.text;
    choicesSectionEl.style.background = bgColor;
    choicesSectionTitle.style.color = textColor;
    choicesSectionSubtitle.style.color = textColor;
  });
  // No mouseleave - keeps the last hovered color (same as feelings list section)
});

// Create rising circles periodically when section is visible
function createRisingCircle() {
  const circle = document.createElement("div");
  circle.className = "choice-particle circle";
  const size = 5 + Math.random() * 20;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.background =
    circleColors[Math.floor(Math.random() * circleColors.length)];
  circle.style.left = `${Math.random() * 100}%`;
  circle.style.bottom = "-30px";
  circle.style.opacity = "0.4";
  circle.style.animation = "none";

  choicesParticles.appendChild(circle);

  let posY = -30;
  const speed = 0.5 + Math.random() * 1;
  const wobble = Math.random() * 40;
  const startX = parseFloat(circle.style.left);

  function rise() {
    posY += speed;
    const wobbleX = Math.sin(posY / 25) * wobble;
    circle.style.bottom = `${posY}px`;
    circle.style.left = `${startX + wobbleX / 10}%`;

    if (posY < window.innerHeight + 50) {
      requestAnimationFrame(rise);
    } else {
      circle.remove();
    }
  }
  rise();
}

let circleInterval = null;
const choicesObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !circleInterval) {
      circleInterval = setInterval(createRisingCircle, 400);
    } else if (!entry.isIntersecting && circleInterval) {
      clearInterval(circleInterval);
      circleInterval = null;
    }
  });
});


if (choicesSectionEl) choicesObserver.observe(choicesSectionEl);

// ============================================
// BOOKLET INTERACTIVE HOVER EFFECT
// ============================================
const bookletFlipper = document.getElementById('bookletFlipper');
const bookletBack = document.getElementById('bookletBack');

const bookletActivities = [
  { emoji: '&#x1F3A8;', title: 'Check Your Body', text: 'Color where you feel emotions in your body' },
  { emoji: '&#x1FA9E;', title: 'Observe Your Face', text: 'Draw your expressions in mirror frames' },
  { emoji: '&#x1F50D;', title: 'Word Search Puzzle', text: 'Find all 13 feelings hidden in the puzzle' },
  { emoji: '&#x1F483;', title: 'Healthy Choices', text: 'Dance, breathe, draw, hug, walk, write, shake, pray, or rest' },
  { emoji: '&#x1F58D;', title: 'Draw Your Feeling', text: 'Give your feeling a body and a face as a character' },
  { emoji: '&#x1F4DD;', title: 'My Own Way', text: 'Write your own way to feel better' }
];

let currentActivityIndex = 0;

if (bookletFlipper && bookletBack) {
  bookletFlipper.addEventListener('mouseenter', () => {
    // Change to next activity
    currentActivityIndex = (currentActivityIndex + 1) % bookletActivities.length;
    const activity = bookletActivities[currentActivityIndex];

    bookletBack.querySelector('.booklet-mockup-emoji').innerHTML = activity.emoji;
    bookletBack.querySelector('.booklet-mockup-title').textContent = activity.title;
    bookletBack.querySelector('.booklet-mockup-text').textContent = activity.text;
  });
}

// ============================================
// GALLERY MODAL FUNCTIONALITY
// ============================================
const galleryModal = document.getElementById('galleryModal');
const galleryModalImage = document.getElementById('galleryModalImage');
const galleryModalTitle = document.getElementById('galleryModalTitle');
const galleryModalDescription = document.getElementById('galleryModalDescription');
const galleryModalClose = document.querySelector('.gallery-modal-close');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption').textContent;
    const description = item.getAttribute('data-description');

    galleryModalImage.src = img.src;
    galleryModalImage.alt = img.alt;
    galleryModalTitle.textContent = caption;
    galleryModalDescription.textContent = description;

    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
if (galleryModalClose) {
  galleryModalClose.addEventListener('click', () => {
    galleryModal.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// Close modal on backdrop click
if (galleryModal) {
  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
      galleryModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && galleryModal && galleryModal.classList.contains('active')) {
    galleryModal.classList.remove('active');
    document.body.style.overflow = '';
  }
});
