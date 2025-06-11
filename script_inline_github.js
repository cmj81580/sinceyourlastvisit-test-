// Inline version of script.js to work on GitHub Pages without fetch()

const attractions = [
  {
    title: "Fire in the Hole (New Version)",
    date: "2024-03-30",
    status: "opened",
    description: "A reimagined version of the classic indoor coaster with advanced effects and storytelling.",
    image: "https://www.silverdollarcity.com/wp-content/uploads/2023/08/fire-in-the-hole-gallery-1.jpg"
  },
  {
    title: "Fire in the Hole (Original)",
    date: "2023-12-30",
    status: "closed",
    description: "The original version of this iconic ride closed after more than 50 years of operation.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/48/Fire_in_the_Hole_Exterior.jpg"
  },
  {
    title: "Mystic River Falls",
    date: "2020-07-21",
    status: "opened",
    description: "A high-tech river rapids ride featuring the tallest raft drop in the Western Hemisphere.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/92/Mystic_River_Falls_Silver_Dollar_City.jpg"
  },
  {
    title: "Lost River of the Ozarks",
    date: "2018-08-15",
    status: "closed",
    description: "A popular river rapids ride that was removed to make way for Mystic River Falls.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Lost_River_of_the_Ozarks.jpg"
  }
];

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

  const newAttractions = attractions
    .filter(item => item.status === "opened" && new Date(item.date) > lastVisitDate)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const closedAttractions = attractions
    .filter(item => item.status === "closed" && new Date(item.date) > lastVisitDate)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  document.getElementById("new-results").innerHTML = newAttractions.map(formatCard).join("") || "<p>No new attractions found.</p>";
  document.getElementById("closed-results").innerHTML = closedAttractions.map(formatCard).join("") || "<p>No closures found.</p>";
};
