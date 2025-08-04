document.addEventListener("DOMContentLoaded", () => {
  const tripContainer = document.getElementById("trip-container");
  const backToTop = document.getElementById("back-to-top");
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  fetch("itinerary.json?_=" + Date.now()) // prevent cache
    .then(res => res.json())
    .then(data => renderItinerary(data));

  function renderItinerary(itinerary) {
    tripContainer.innerHTML = "";
    itinerary.forEach(day => {
      const card = document.createElement("div");
      card.className = "trip-card";
      card.innerHTML = `<h2>${day.date} ${day.city}行程</h2>
                        <p>${day.city}：${day.weather}</p>
                        <ul>${day.places.map(p => `<li>${p}</li>`).join("")}</ul>`;
      tripContainer.appendChild(card);
    });
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });
  backToTop.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    darkModeToggle.textContent = document.body.classList.contains("dark") ? "🌞" : "🌙";
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
});
