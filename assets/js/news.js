document.addEventListener("DOMContentLoaded", function () {
    fetch("assets/data/news.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load news.json");
            return response.json();
        })
        .then(newsData => {
            console.log("✅ News data loaded:", newsData);
            updateExistingNews(newsData);
        })
        .catch(error => console.error("❌ ERROR:", error));

    function updateExistingNews(newsArray) {
        const newsElements = document.querySelectorAll(".single-news");

        newsElements.forEach((newsEl, index) => {
            if (index < newsArray.length) {
                const newsItem = newsArray[index];

                // Update image
                const imgElement = newsEl.querySelector(".image a img.thumb");
                if (imgElement) imgElement.src = newsItem.image;

                // Update author image
                const authorImgElement = newsEl.querySelector(".meta-details img.thumb");
                if (authorImgElement) authorImgElement.src = newsItem.author_image;

                // Update author name
                const authorSpan = newsEl.querySelector(".meta-details span");
                if (authorSpan) authorSpan.textContent = `BY ${newsItem.author.toUpperCase()}`;

                // Update title
                const titleElement = newsEl.querySelector(".content-body h4.title a");
                if (titleElement) {
                    titleElement.textContent = newsItem.title;
                    if (newsItem.link) titleElement.href = newsItem.link;
                }

                // Update description
                const descriptionElement = newsEl.querySelector(".content-body p");
                if (descriptionElement) descriptionElement.textContent = newsItem.description;
            }
        });
    }
});
