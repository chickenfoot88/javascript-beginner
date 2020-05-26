/* eslint-disable no-use-before-define */
function Gallery(gallery) {
  if (!gallery) throw new Error('No gallery found!');

  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;

  function handleClickOutside(event) {
    if (event.target === event.currentTarget) closeModal();
  }

  function handleKeyUp(event) {
    if (event.key === 'Escape') return closeModal();
    if (event.key === 'ArrowRight') return showNextImage();
    if (event.key === 'ArrowLeft') return showPrevImage();
  }

  function openModal() {
    if (modal.matches('.open')) return;
    modal.classList.add('open');
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  function showImage(imageEl) {
    if (!imageEl) {
      console.info('No image show');
      return;
    }

    modal.querySelector('img').src = imageEl.src;
    modal.querySelector('h2').textContent = imageEl.title;
    modal.querySelector('figure p').textContent = imageEl.dataset.description;
    currentImage = imageEl;
    openModal();
  }

  images.forEach(image => {
    image.addEventListener('click', event => showImage(event.currentTarget));
    image.addEventListener('keyup', event => {
      if (event.key === 'Enter') {
        showImage(event.currentTarget);
      }
    });
  });

  modal.addEventListener('click', handleClickOutside);
}
const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
