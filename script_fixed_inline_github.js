async function filterAttractions() {
  const dateInput = document.getElementById("visitDate").value;
  if (!dateInput) return;

  const visitDate = new Date(dateInput);
  const sheetURL = "https://docs.google.com/spreadsheets/d/1AifnMTd7E5G06-pAU4np2kO_IjXSe9xiAJGbJlW_exc/gviz/tq?tqx=out:csv";

  try {
    const response = await fetch(sheetURL);
    const csvText = await response.text();

    const rows = csvText
      .trim()
      .split("\n")
      .map(r =>
        r
          .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
          .map(cell => cell.replace(/^"|"$/g, "").trim())
      );

    // Skip header row
    const entries = rows.slice(1);

    const filtered = entries
      .filter(row => row[4]) // Opening Date
      .filter(row => {
        const parts = row[4].split("/");
        if (!parts || parts.length !== 3) return false;
        const itemDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        return itemDate > visitDate;
      })
      .sort((a, b) => {
        const aDate = new Date(a[4].split("/").reverse().join("-"));
        const bDate = new Date(b[4].split("/").reverse().join("-"));
        return bDate - aDate;
      });

    const container = document.getElementById("attractionList");
    container.innerHTML = "";

    if (filtered.length === 0) {
      container.innerHTML = "<p>No new attractions since your last visit!</p>";
      return;
    }

    filtered.forEach(row => {
      const name = row[1];
      const category = row[2];
      const area = row[3];
      const date = row[4];
      const description = row[6];
      const image = row[7];
      const video = row[8];
      const source = row[9];

      const card = document.createElement("div");
      card.className = "attraction-card";

      card.innerHTML = `
        <img src="${image}" alt="${name}" />
        <div class="info">
          <h3>${name}</h3>
          <p><strong>Opened:</strong> ${date}</p>
          <p><strong>Type:</strong> ${category || "N/A"}</p>
          <p><strong>Area:</strong> ${area || "N/A"}</p>
          <p>${description}</p>
          ${video ? `<p><a href="${video}" target="_blank">Watch video</a></p>` : ""}
          ${source ? `<p><a href="${source}" target="_blank">More info</a></p>` : ""}
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    const container = document.getElementById("attractionList");
    container.innerHTML = "<p>Oops! We couldn't load updates from the database.</p>";
  }
}
