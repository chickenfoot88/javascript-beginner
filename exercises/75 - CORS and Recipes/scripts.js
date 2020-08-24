const baseEndpoint = 'http://www.recipepuppy.com/api';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const form = document.querySelector('form.search');
const recipesGrid = document.querySelector('.recipes');

function displayRecepies(recipes) {
  const html = recipes.map(
    recipe =>
      `
        <div class="recipe">
          <h2>${recipe.title}</h2>
          <p>${recipe.ingredients}</p>
          ${recipe.thumbnail &&
            `<img
              src="${recipe.thumbnail}"
              alt="${recipe.title}"
            />`}
          <a href="${recipe.href}">View Recipe</a>
        </div>
      `
  );
  recipesGrid.innerHTML = html.join('');
}

async function fetchRecipes(query) {
  const res = await fetch(`${proxy}${baseEndpoint}/?q=${query}`);
  const data = await res.json();
  return data;
}

async function fetchAndDisplay(searchTerm) {
  const recipes = await fetchRecipes(searchTerm);
  displayRecepies(recipes.results);
}

async function handleSubmit(event) {
  event.preventDefault();
  form.submit.disabled = true;
  await fetchAndDisplay(form.query.value);
  form.submit.disabled = false;
}

form.addEventListener('submit', handleSubmit);

fetchAndDisplay('pizza');
