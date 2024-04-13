//SOLUZIONE RICERCA ID GOOGLATA SPUDORATAMENTE, POCHE RIGHE DI CODICE RISULTATO OTTIMO:
//const urlParams = new URLSearchParams(window.location.search):
// Questa riga crea un nuovo oggetto URLSearchParams che rappresenta i parametri della query string
// dell'URL della pagina corrente. La query string è la parte dell'URL che segue il "?" e contiene i
// parametri della richiesta.
// Utilizza il metodo get() dell'oggetto URLSearchParams per
// ottenere il valore del parametro "id" dalla query string dell'URL. Se non c'è nessun parametro "id",
// questa variabile sarà null

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search)
  const productId = urlParams.get("id")

  if (productId) {
    loadProductDetails(productId)
  } else {
    console.error("Product ID is missing in URL")
  }
})
function loadProductDetails(productId) {
  const URL = `https://striveschool-api.herokuapp.com/api/product/${productId}`

  fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZGQyMjdmMzA0NjAwMWFlNTlmNTMiLCJpYXQiOjE3MTI5MDU1MDYsImV4cCI6MTcxNDExNTEwNn0.u_Q2h2D6D8xFSk2HBeRvL6b7Ps0j1Sqys6uY_rxs8NU",
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Unable to fetch product details")
      }
      return response.json()
    })
    .then(product => {
      renderProductDetails(product)
    })
    .catch(error => {
      console.error("Error:", error)
    })
}

function renderProductDetails(product) {
  const card = document.createElement("div")
  card.style.maxWidth = "1000px"
  card.classList.add("card")
  card.innerHTML = `
  <div class="card d-flex shadow-lg">
  <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
  <div class="card-body">
    <h5 class="card-title display-4">${product.name}</h5>
    <p class="card-text display-5">${product.description}</p>
    <span class="badge bg-danger me-auto"><p class="card-text p-1 display-6"> € ${product.price}</p></span>
    
    </div>`
  const productCardContainer = document.getElementById("productCard")
  productCardContainer.appendChild(card)
}
