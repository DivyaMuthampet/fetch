const url = "https://fakestoreapi.com/products";
let startIndex = 0;
const itemsPerPage = 8;
const loadMoreBtn = document.getElementById("loadMoreBtn");
const cardContainer = document.getElementById("cardContainer");

loadMoreBtn.addEventListener("click", loadMore);

function loadMore() {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // for(let item in data)
            // console.log(data[item].image);
            // console.log(data)
            displayCards(data);
        })
        .catch((error) => {
            console.log("Error" + error);
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
        // Check if the title length exceeds a certain limit
        const maxTitleLength = 20; // Maximum characters for the title
        title.textContent = truncateText(data[i].title, maxTitleLength);

        const price = document.createElement("p");
        price.textContent = "Price: $" + data[i].price;

        const description = document.createElement("p");
        const truncatedDescription = data[i].description.substring(0, 50); // Truncate description
        description.textContent = truncatedDescription;
        
        const showMoreButton = document.createElement("button");
        showMoreButton.textContent = "Show More";
        showMoreButton.addEventListener("click", function() {
            if (description.textContent === truncatedDescription) {
                description.textContent = data[i].description;
                showMoreButton.textContent = "Show Less";
            } else {
                description.textContent = truncatedDescription;
                showMoreButton.textContent = "Show More";
            }
        });

        const category = document.createElement("p");
        category.textContent = "Category: " + data[i].category;

        const rating = document.createElement("p");
        // Check if the rating property exists before accessing its properties
        if (data[i].rating) {
            rating.textContent = "Rating: " + data[i].rating.rate + " (" + data[i].rating.count + " reviews)";
        } else {
            rating.textContent = "Rating: Not available";
        }

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(description);
        card.appendChild(showMoreButton); // Append show more button
        card.appendChild(category);
        card.appendChild(rating);

        cardContainer.appendChild(card);
    }
    startIndex += itemsPerPage;
}

// Function to truncate text and add ellipsis
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

loadMore();





