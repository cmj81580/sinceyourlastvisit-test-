async function filterAttractions() {
  const dateInput = document.getElementById("visitDate").value;
  if (!dateInput) return;

  const visitDate = new Date(dateInput);
  const response = await fetch("data.json");
  const data = await response.json();

  const newAttractions = data
    .filter(item => item.status === "new" && new Date(item.date.split("/").reverse().join("-")) > visitDate)
    .sort((a, b) => new Date(b.date.split("/").reverse().join("-")) - new Date(a.date.split("/").reverse().join("-")));

  const container = document.getElementById("attractionList");
  container.innerHTML = "";

  if (newAttractions.length === 0) {
    container.innerHTML = "<p>No new attractions since your last visit!</p>";
    return;
  }

  newAttractions.forEach(attraction => {
    const card = document.createElement("div");
    card.className = "attraction-card";

    card.innerHTML = `
      <img src="${attraction.image}" alt="${attraction.title}" />
      <div class="info">
        <h3>${attraction.title}</h3>
        <p><strong>Opened:</strong> ${attraction.date}</p>
        <p>${attraction.description}</p>
      </div>
    `;

    container.appendChild(card);
  });
}
