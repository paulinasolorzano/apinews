const citySelect = document.getElementById("city");
const newsContainer = document.getElementById("news-container");
const apiKey = "464616af77c4438caadd0748f5a724b3";

function loadNews(city) {
  const url = `https://newsapi.org/v2/everything?q=${city}&apiKey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      newsContainer.innerHTML = "";
      if (data.articles && data.articles.length > 0) {
        data.articles.slice(0, 5).forEach(article => {
          const newsItem = document.createElement("div");
          newsItem.classList.add("news-item");

          newsItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || "Sin descripción disponible"}</p>
            <a href="${article.url}" target="_blank">Leer más</a>
          `;

          newsContainer.appendChild(newsItem);
        });
      } else {
        newsContainer.innerHTML = "<p>No se encontraron noticias para esta ciudad.</p>";
      }
    })
    .catch(error => console.error('Error al obtener noticias:', error));
}

// Evento para buscar noticias cuando se hace clic en el botón de búsqueda
document.getElementById("search").addEventListener("click", () => {
  const city = citySelect.value;
  if (city) {
    loadNews(city);
  } else {
    alert("Por favor, selecciona una ciudad.");
  }
});