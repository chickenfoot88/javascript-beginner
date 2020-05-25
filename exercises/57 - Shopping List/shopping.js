const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

let items = [];

function displayItems() {
  const html = items
    .map(
      ({ name, id, complete }) =>
        `<li class="shopping-item">
          <input
            type="checkbox"
            value="${id}"
            ${complete ? 'checked' : ''} 
          >
          <span class="itemName">${name}</span>
          <button
            aria-label="Remove ${name}"
            value="${id}"
          >&times;
          </button>
        </li>`
    )
    .join('');
  list.innerHTML = html;
}

function handleSubmit(event) {
  event.preventDefault();
  const name = event.currentTarget.item.value;
  if (!name) return;

  const item = {
    name,
    id: Date.now(),
    complete: false,
  };

  console.log(item);

  items.push(item);
  event.target.reset();
  list.dispatchEvent(new CustomEvent('itemsUpdate'));
}

function mirrorToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems.length) {
    items.push(...lsItems);
    list.dispatchEvent(new CustomEvent('itemsUpdate'));
  }
}

function markAsComplete(id) {
  const itemRef = items.find(item => item.id === id);
  itemRef.complete = !itemRef.complete;
  console.log(itemRef);
  list.dispatchEvent(new CustomEvent('itemsUpdate'));
}

function deleteItem(id) {
  const newItems = items.filter(item => item.id !== id);
  items = newItems;
  list.dispatchEvent(new CustomEvent('itemsUpdate'));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdate', displayItems);
list.addEventListener('itemsUpdate', mirrorToLocalStorage);
list.addEventListener('click', event => {
  const id = parseInt(event.target.value);

  if (event.target.matches('button')) {
    deleteItem(id);
  }

  if (event.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});
restoreFromLocalStorage();
