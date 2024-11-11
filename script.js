const citySelect = document.getElementById("city");
const newsContainer = document.getElementById("news-container");

function loadNews(city) {
  const url = `https://api.gdeltproject.org/api/v2/geo/geo?query=${city}&format=json`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      newsContainer.innerHTML = "";

      // Verifica si hay resultados
      if (data.features && data.features.length > 0) {
        data.features.slice(0, 5).forEach(feature => {
          const newsItem = document.createElement("div");
          newsItem.classList.add("news-item");

          newsItem.innerHTML = `
            <h3>${feature.properties.name || "Sin título"}</h3>
            <p>${feature.properties.shared_name || "Descripción no disponible"}</p>
            <a href="${feature.properties.url}" target="_blank">Leer más</a>
          `;

          newsContainer.appendChild(newsItem);
        });
      } else {
        newsContainer.innerHTML = "<p>No se encontraron noticias para esta ciudad.</p>";
      }
    })
    .catch(error => {
      console.error('Error al obtener noticias:', error);
      newsContainer.innerHTML = "<p>Error al obtener noticias. Intenta de nuevo más tarde.</p>";
    });
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
