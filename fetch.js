const url = "https://fakestoreapi.com/products";
let startIndex = 0;
const itemsPerPage = 8;
const loadMoreBtn = document.getElementById("loadMoreBtn");
const cardContainer = document.getElementById("cardContainer");

loadMoreBtn.addEventListener("click", loadMore);

function loadMore() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayCards(data);
        })
        .catch(error => {
            console.log("Error: " + error);
        });
}

function displayCards(data) {
    for (let i = startIndex; i < startIndex + itemsPerPage; i++) {
        if (i >= data.length) {
            loadMoreBtn.style.display = "none";
            break;
        }
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = data[i].image;
        img.alt = data[i].title;

        const title = document.createElement("h2");
        title.textContent = data[i].title;

        const price = document.createElement("p");
        price.textContent = "Price: $" + data[i].price;

        const description = document.createElement("p");
        description.textContent = data[i].description;

        const category = document.createElement("p");
        category.textContent = "Category: " + data[i].category;

        const rating = document.createElement("p");
        rating.textContent = "Rating: " + data[i].rating.rate + " (" + data[i].rating.count + " reviews)";

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(description);
        card.appendChild(category);
        card.appendChild(rating);

        cardContainer.appendChild(card);
    }
    startIndex += itemsPerPage;
}

loadMore();
