const menuContainer = document.getElementById("burger-menu")
const customForm = document.getElementById("custom-burger")
const orderForm = document.getElementById("order-list")
const container = document.querySelector(".container")
let addBtn = document.getElementsByClassName("button")

//add button adds item to Order List
menuContainer.addEventListener("click", function (e) {
  if (e.target.className === "button") {
    let burgerId = e.target.dataset.id
    fetch(`http://localhost:3000/burgers/${burgerId}`)
      .then(response => response.json())
      .then(burger => {
        orderForm.insertAdjacentHTML("beforeend", `<li>${burger.name}</li>`)
      })
    // orderForm.insertAdjacentHTML("beforeend", `<li>${e.target.parentElement.children[0].innerText}</li>`)
  }
})


document.addEventListener("DOMContentLoaded", () => {
  fetchBurgers()

})

//get burgers from API
function fetchBurgers() {
  fetch("http://localhost:3000/burgers")
    .then(response => response.json())
    .then(json => renderBurgers(json))
}

//render burgers to the page
function renderBurgers(burgers) {
  burgers.forEach(burger => {
    menuContainer.insertAdjacentHTML("beforeend",
      `<div class="burger"> <h3 class="burger-title">${burger.name}</h3>
    <img src=${burger.image}><p class="burger-description">${burger.description}</p>
      <button data-id=${burger.id} class="button">Add to Order</button>
    </div>`)
  })
}
//add a custom burger to the page
customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  return fetch("http://localhost:3000/burgers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: e.target.name.value,
      description: e.target.description.value,
      image: e.target.url.value
    })
  })
    .then(response => response.json())
    .then(burger => {
      menuContainer.insertAdjacentHTML("beforeend",
        `< div class= "burger" > <h3 class="burger-title">${burger.name}</h3>
    <img src=${burger.image}><p class="burger-description">${burger.description}</p>
      <button data-id=${burger.id} class="button">Add to Order</button>
        </div>`)
      e.target.name.value = ""
      e.target.description.value = ""
      e.target.url.value = ""
    });
})



// postData('http://example.com/answer', { answer: 42 })
//   .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
//   .catch(error => console.error(error));

// function postData(url = '', data = {}) {
//   // Default options are marked with *
//   return fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, cors, *same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json',
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrer: 'no-referrer', // no-referrer, *client
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   })
//     .then(response => response.json()); // parses JSON response into native JavaScript objects 
// }