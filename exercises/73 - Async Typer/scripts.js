const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

function getRandomBetween(min = 20, max = 150, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

// async for loop
// async function draw(el) {
//   const text = el.textContent;
//   let soFar = '';
//   const { typeMin, typeMax } = el.dataset
//   for (const letter of text) {
//     const amountOfTimeToWait = getRandomBetween(typeMin, typeMax)
//     soFar += letter;
//     await wait(amountOfTimeToWait);
//     console.log(soFar);
//     el.textContent = soFar;
//   }
// }
  
// recursion

function draw(el) {
  let index = 1
  const text = el.textContent
  const { typeMin, typeMax } = el.dataset
  
  async function drawLetter() {
    el.textContent = text.slice(0, index)
    index += 1
    const amountOfTimeToWait = getRandomBetween(typeMin, typeMax)
    await wait(amountOfTimeToWait);
    if(index <= text.length) {
      drawLetter()
    }
  }

  drawLetter()
}

document.querySelectorAll('[data-type]').forEach(draw);
