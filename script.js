function formatCard(item) {
  return `
    <div class="result-card">
      <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/600x400?text=No+Image';"/>
      <h3>${item.title}</h3>
      <p><strong>Date:</strong> ${item.date}</p>
      <p>${item.description}</p>
    </div>
  `;
}
document.getElementById("check-button").addEventListener("click", () => {
  const lastVisitInput = document.getElementById("last-visit").value;
  if (!lastVisitInput) return;

  const lastVisitDate = new Date(lastVisitInput);
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      const attractions = data.sdc;

      const newAttractions = attractions
        .filter(item => item.status === "opened" && new Date(item.date) > lastVisitDate)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      const closedAttractions = attractions
        .filter(item => item.status === "closed" && new Date(item.date) > lastVisitDate)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      document.getElementById("new-results").innerHTML = newAttractions.map(formatCard).join("") || "<p>No new attractions found.</p>";
      document.getElementById("closed-results").innerHTML = closedAttractions.map(formatCard).join("") || "<p>No closures found.</p>";
    })
    .catch(err => {
      console.error("Data load error:", err);
    });
});