function Slider(slider) {
  if (!(slider instanceof Element)) throw new Error('No slider passed in');
  let current;
  let prev;
  let next;

  const slides = slider.querySelector('.slides');
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');
  console.log(slider);

  function startSlider() {
    current = slider.querySelector('.current') || slides.firstElementChild;
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slider.firstElementChild;
  }

  function applyClasses() {
    current.classList.add('.current');
    prev.classList.add('.prev');
    next.classList.add('.next');
  }

  startSlider();
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));
