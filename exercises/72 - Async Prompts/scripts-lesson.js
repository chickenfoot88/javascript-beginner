function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  let myPopup = popup;
  popup.classList.remove('open');
  await wait(1000);
  popup.remove();
  myPopup = null;
}

function ask(options) {
  return new Promise(async resolve => {
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML(
      'afterbegin',
      `<fieldset>
        <label>${options.title}</label>
        <input type="text" name="input"></input>
        <button type="submit">Submit</button>
      </fieldset>`
    );

    if (options.cancel) {
      const skipButton = document.createElement('button');
      skipButton.type = 'button';
      skipButton.textContent = 'Cancel';
      popup.firstElementChild.appendChild(skipButton);
      skipButton.addEventListener(
        'click',
        function() {
          resolve(null);
          destroyPopup(popup);
        },
        { once: true }
      );
    }

    popup.addEventListener(
      'submit',
      function(event) {
        event.preventDefault();
        resolve(event.target.input.value);
        destroyPopup(popup);
      },
      { once: true }
    );

    document.body.appendChild(popup);
    await wait(50);
    popup.classList.add('open');
  });
}

async function askQuestion(event) {
  const button = event.currentTarget;
  const answer = await ask({
    title: button.dataset.question,
    cancel: 'cancel' in button.dataset,
  });
}

const buttons = document.querySelectorAll('[data-question]');
buttons.forEach(button => button.addEventListener('click', askQuestion));
