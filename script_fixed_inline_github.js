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

    const headers = rows[0].map(h => h.toLowerCase().replace(/\s+/g, ""));
    const entries = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, i) => (obj[header] = row[i]));
      return obj;
    });

    const filtered = entries
      .filter(item => item.name && item.openingdate)
      .filter(item => {
        const parts = item.openingdate?.split("/");
        if (!parts || parts.length !== 3) return false;
        const itemDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        return itemDate > visitDate;
      })
      .sort((a, b) => {
        const aDate = new Date(a.openingdate.split("/").reverse().join("-"));
        const bDate = new Date(b.openingdate.split("/").reverse().join("-"));
        return bDate - aDate;
      });

    const container = document.getElementById("attractionList");
    container.innerHTML = "";

    if (filtered.length === 0) {
      container.innerHTML = "<p>No new attractions since your last visit!</p>";
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement("div");
      card.className = "attraction-card";

      card.innerHTML = `
        <img src="${item.image_url}" alt="${item.name}" />
        <div class="info">
          <h3>${item.name}</h3>
          <p><strong>Opened:</strong> ${item.openingdate}</p>
          <p><strong>Type:</strong> ${item.category || "N/A"}</p>
          <p><strong>Area:</strong> ${item.parksection || "N/A"}</p>
          <p>${item.description}</p>
          ${item.video_url ? `<p><a href="${item.video_url}" target="_blank">Watch video</a></p>` : ""}
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
