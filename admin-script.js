// ============================================
// MOBILE MENU TOGGLE
// ============================================
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("navLinks").classList.remove("active");
    }
  });
});

// ============================================
// SCROLL FADE-IN ANIMATION
// ============================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// ============================================
// GALLERY MODAL
// ============================================
const galleryModal = document.getElementById("galleryModal");
const galleryModalImage = document.getElementById("galleryModalImage");
const galleryModalTitle = document.getElementById("galleryModalTitle");
const galleryModalDescription = document.getElementById("galleryModalDescription");
const galleryModalClose = document.querySelector(".gallery-modal-close");

document.querySelectorAll(".gallery-item").forEach((item) => {
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

if (galleryModalClose) {
  galleryModalClose.addEventListener("click", () => {
    galleryModal.classList.remove("active");
    document.body.style.overflow = "";
  });
}

if (galleryModal) {
  galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) {
      galleryModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && galleryModal && galleryModal.classList.contains("active")) {
    galleryModal.classList.remove("active");
    document.body.style.overflow = "";
  }
});
