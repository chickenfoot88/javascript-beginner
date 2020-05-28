/* eslint-disable no-use-before-define */
function Gallery(gallery) {
  if (!gallery) throw new Error('No gallery found!');

  this.gallery = gallery;

  this.images = Array.from(gallery.querySelectorAll('img'));
  this.modal = document.querySelector('.modal');
  this.prevButton = this.modal.querySelector('.prev');
  this.nextButton = this.modal.querySelector('.next');

  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);

  this.images.forEach(image => {
    image.addEventListener('click', event =>
      this.showImage(event.currentTarget)
    );
    image.addEventListener('keyup', event => {
      if (event.key === 'Enter') {
        this.showImage(event.currentTarget);
      }
    });
  });

  this.modal.addEventListener('click', this.handleClickOutside);
}

Gallery.prototype.handleClickOutside = function(event) {
  if (event.target === event.currentTarget) this.closeModal();
};

Gallery.prototype.handleKeyUp = function(event) {
  if (event.key === 'Escape') return this.closeModal();
  if (event.key === 'ArrowRight') return this.showNextImage();
  if (event.key === 'ArrowLeft') return this.showPrevImage();
};

Gallery.prototype.openModal = function() {
  if (this.modal.matches('.open')) return;
  this.modal.classList.add('open');
  window.addEventListener('keyup', this.handleKeyUp);
  this.nextButton.addEventListener('click', this.showNextImage);
  this.prevButton.addEventListener('click', this.showPrevImage);
};

Gallery.prototype.closeModal = function() {
  this.modal.classList.remove('open');
  window.removeEventListener('keyup', this.handleKeyUp);
  this.nextButton.removeEventListener('click', this.showNextImage);
  this.prevButton.removeEventListener('click', this.showPrevImage);
};

Gallery.prototype.showNextImage = function() {
  this.showImage(
    this.currentImage.nextElementSibling || this.gallery.firstElementChild
  );
};

Gallery.prototype.showPrevImage = function() {
  this.showImage(
    this.currentImage.previousElementSibling || this.gallery.lastElementChild
  );
};

Gallery.prototype.showImage = function(imageEl) {
  if (!imageEl) {
    console.info('No image show');
    return;
  }

  this.modal.querySelector('img').src = imageEl.src;
  this.modal.querySelector('h2').textContent = imageEl.title;
  this.modal.querySelector('figure p').textContent =
    imageEl.dataset.description;
  this.currentImage = imageEl;
  this.openModal();
};

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));
console.dir(gallery1);
