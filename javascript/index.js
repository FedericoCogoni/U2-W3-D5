let URL = "https://striveschool-api.herokuapp.com/api/product/"
window.addEventListener("DOMContentLoaded", () => {
  loadProductCards()
})
function loadProductCards() {
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
        throw new Error("Unable to fetch products")
      }
      return response.json()
    })
    .then(products => {
      products.forEach(product => {
        renderProductCard(product)
      })
    })
    .catch(error => {
      console.log("Error:", error)
    })
}

function renderProductCard(product) {
  const card = document.createElement("div")
  card.classList.add("col-md-4", "mb-4")
  card.innerHTML = `
          <div class="card d-flex shadow-lg">
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text">Brand: ${product.brand}</p>
              <div class="d-flex bd-highlight mb-1">
              <span class="badge bg-primary me-auto bd-highlight"><p class="card-text p-1 h5"> € ${product.price}</p></span>
              <a href="details.html?id=${product._id}" class="btn btn-primary  bd-highlight">Details</a>
              <a href="backoffice.html?id=${product._id}" class="btn btn-secondary  bd-highlight">Edit</a>
              </div>
            </div>
          </div>
        `
  const productCardsContainer = document.getElementById("productCards")
  productCardsContainer.appendChild(card)
}
