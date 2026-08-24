// ==============================
// SCROLL DOUX
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", function (event) {

    const href = this.getAttribute("href");

    if (!href || href === "#") {
      return;
    }

    const target = document.querySelector(href);

    if (target) {

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });

    }

  });

});



// ==============================
// LIGHTBOX GALERIE
// ==============================

const galleryImages = Array.from(
  document.querySelectorAll(".album-gallery img")
);


if (galleryImages.length > 0) {

  let currentIndex = 0;


  // Création de la lightbox

  const lightbox = document.createElement("div");

  lightbox.className = "lightbox";

  lightbox.innerHTML = `
    <button
      class="lightbox-close"
      aria-label="Fermer la photo"
    >
      ×
    </button>

    <button
      class="lightbox-prev"
      aria-label="Photo précédente"
    >
      ‹
    </button>

    <img
      class="lightbox-image"
      src=""
      alt=""
    >

    <button
      class="lightbox-next"
      aria-label="Photo suivante"
    >
      ›
    </button>

    <div class="lightbox-counter"></div>
  `;

  document.body.appendChild(lightbox);


  const lightboxImage =
    lightbox.querySelector(".lightbox-image");

  const closeButton =
    lightbox.querySelector(".lightbox-close");

  const previousButton =
    lightbox.querySelector(".lightbox-prev");

  const nextButton =
    lightbox.querySelector(".lightbox-next");

  const counter =
    lightbox.querySelector(".lightbox-counter");



  // Affiche une photo

  function showImage(index) {

    currentIndex = index;

    const image = galleryImages[currentIndex];

    lightboxImage.src = image.src;

    lightboxImage.alt =
      image.alt || "Photographie";

    counter.textContent =
      `${currentIndex + 1} / ${galleryImages.length}`;

  }



  // Ouvre la lightbox

  function openLightbox(index) {

    showImage(index);

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

  }



  // Ferme la lightbox

  function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

  }



  // Photo suivante

  function nextImage() {

    currentIndex++;

    if (currentIndex >= galleryImages.length) {
      currentIndex = 0;
    }

    showImage(currentIndex);

  }



  // Photo précédente

  function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = galleryImages.length - 1;
    }

    showImage(currentIndex);

  }



  // Clic sur les photos

  galleryImages.forEach((image, index) => {

    image.addEventListener("click", function () {

      openLightbox(index);

    });

  });



  // Boutons

  closeButton.addEventListener(
    "click",
    closeLightbox
  );

  nextButton.addEventListener(
    "click",
    nextImage
  );

  previousButton.addEventListener(
    "click",
    previousImage
  );



  // Clic sur le fond noir

  lightbox.addEventListener(
    "click",
    function (event) {

      if (event.target === lightbox) {
        closeLightbox();
      }

    }
  );



  // Clavier

  document.addEventListener(
    "keydown",
    function (event) {

      if (!lightbox.classList.contains("active")) {
        return;
      }

      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }

    }
  );

}