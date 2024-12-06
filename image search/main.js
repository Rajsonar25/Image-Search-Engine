const accessKey = "opYmfP5DxV819mX6x7HPhd-lXViEuPzZe4ms3682pp4";
const form = document.getElementById("search-form");
const box = document.getElementById("search-box");
const result = document.getElementById("search-result");
const showMore = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = box.value.trim();
    if (!keyword) {
        alert("Please enter a search term");
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${encodeURIComponent(
        keyword
    )}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        if (page === 1) {
            result.innerHTML = ""; // Clear results for new search
        }

        // Populate images
        data.results.forEach((photo) => {
            const img = document.createElement("img");
            img.src = photo.urls.small;
            img.alt = photo.alt_description || ""; // Avoid display of "undefined"
            img.className = "image";
            result.appendChild(img);
        });

        // Show or hide "Show More" button
        if (data.results.length > 0) {
            showMore.style.display = "block";
        } else if (page === 1) {
            result.innerHTML = `<p>No results found for "${keyword}".</p>`;
            showMore.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        result.innerHTML = `<p>Something went wrong. Please try again.</p>`;
        showMore.style.display = "none";
    }
}

// Event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1; // Reset page for a new search
    searchImages();
});

// Event listener for "Show More" button
showMore.addEventListener("click", () => {
    page++; // Increment page for pagination
    searchImages();
});

// Optional: Hide the "Show More" button initially
showMore.style.display = "none";
