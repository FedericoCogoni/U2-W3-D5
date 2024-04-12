let URL = "https://striveschool-api.herokuapp.com/api/product/"

window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form")

  form.addEventListener("submit", event => {
    event.preventDefault()

    const newProduct = {
      name: document.getElementById("name").value,
      brand: document.getElementById("brand").value,
      description: document.getElementById("description").value,
      price: document.getElementById("price").value,
      imageUrl: document.getElementById("imageUrl").value,
    }
    console.log(newProduct)
    fetch(URL, {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZGQyMjdmMzA0NjAwMWFlNTlmNTMiLCJpYXQiOjE3MTI5MDU1MDYsImV4cCI6MTcxNDExNTEwNn0.u_Q2h2D6D8xFSk2HBeRvL6b7Ps0j1Sqys6uY_rxs8NU",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Unable to add")
        }
        return response.json()
      })
      .then(product => {
        console.log(`Product {id: ${product["_id"]}} added successfully!`)
        showResponse("Product added successfully!")
      })
      .catch(error => {
        console.log("Error:", error)
        showResponse("An error occurred while adding the product")
      })
  })

  const urlParams = new URLSearchParams(window.location.search)
  const productId = urlParams.get("id")

  if (productId) {
    const submitButton = document.getElementById("submitButton")
    const editButton = document.getElementById("editButton")
    const deleteButton = document.getElementById("deleteButton") // Aggiunto il pulsante "Delete"

    submitButton.classList.add("d-none")
    editButton.classList.remove("d-none")
    deleteButton.classList.remove("d-none") // Mostrare il pulsante "Delete"

    editButton.addEventListener("click", () => {
      editProduct(productId)
    })

    deleteButton.addEventListener("click", () => {
      // Aggiunto event listener per il pulsante "Delete"
      deleteProduct(productId)
    })

    fetch(URL + productId, {
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
        console.log("Product details:", product)
        formProductDetails(product)
      })
      .catch(error => {
        console.log("Error:", error)
      })
  }

  function deleteProduct(productId) {
    fetch(URL + productId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZGQyMjdmMzA0NjAwMWFlNTlmNTMiLCJpYXQiOjE3MTI5MDU1MDYsImV4cCI6MTcxNDExNTEwNn0.u_Q2h2D6D8xFSk2HBeRvL6b7Ps0j1Sqys6uY_rxs8NU",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Unable to delete product")
        }
        showResponse("Product deleted successfully!")
      })
      .catch(error => {
        console.error("Error:", error)
      })
  }

  function editProduct(productId) {
    const updatedProduct = {
      name: document.getElementById("name").value,
      brand: document.getElementById("brand").value,
      description: document.getElementById("description").value,
      price: document.getElementById("price").value,
      imageUrl: document.getElementById("imageUrl").value,
    }

    fetch(URL + productId, {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZGQyMjdmMzA0NjAwMWFlNTlmNTMiLCJpYXQiOjE3MTI5MDU1MDYsImV4cCI6MTcxNDExNTEwNn0.u_Q2h2D6D8xFSk2HBeRvL6b7Ps0j1Sqys6uY_rxs8NU",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Unable to edit product")
        }
        return response.json()
      })
      .then(product => {
        console.log(`Product {id: ${product["_id"]}} edited successfully!`)
        showResponse("Product edited successfully!")
      })
      .catch(error => {
        console.error("Error:", error)
        showResponse("An error occurred while editing the product")
      })
  }

  function formProductDetails(product) {
    document.getElementById("name").value = product.name
    document.getElementById("brand").value = product.brand
    document.getElementById("description").value = product.description
    document.getElementById("imageUrl").value = product.imageUrl
    document.getElementById("price").value = product.price
  }
})

function showResponse(message) {
  const alertResponse = document.createElement("div")
  alertResponse.className = `alert bg-info p-3 mb-3`
  alertResponse.textContent = message
  alertResponse.style.opacity = "0.7"
  alertResponse.style.color = "black"
  const form = document.querySelector("form")
  form.parentNode.insertBefore(alertResponse, form.nextSibling)
  form.reset()
  setTimeout(() => {
    alertResponse.remove()
  }, 3000)
}
