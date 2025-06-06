document.getElementById("check-button").addEventListener("click", () => {
  const selectedPark = document.getElementById("park-select").value;
  const lastVisitDate = new Date(document.getElementById("last-visit").value);
  const resultsSection = document.getElementById("results");

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const updates = data[selectedPark]
        .filter((item) => new Date(item.date) > lastVisitDate)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      if (updates.length === 0) {
        resultsSection.innerHTML = "<p>No new changes since your last visit.</p>";
      } else {
        resultsSection.innerHTML = updates.map((item) => `
          <div class="update">
            <h3>${item.title} (${item.date})</h3>
            <p>${item.description}</p>
            ${item.image ? `<img src="${item.image}" alt="${item.title}" width="100%">` : ""}
            ${item.video ? `<video controls width="100%"><source src="${item.video}" type="video/mp4"></video>` : ""}
          </div>
        `).join("");
      }
    })
    .catch((error) => {
      resultsSection.innerHTML = "<p>Error loading updates. Please try again later.</p>";
      console.error("Error:", error);
    });
});
