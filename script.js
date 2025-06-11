
    const data = [
        {
            "title": "Mystic River Falls",
            "date": "21/07/2020",
            "status": "opened",
            "description": "River‑raft adventure with rotating lift & tallest raft drop in Western Hemisphere.",
            "image": "https://upload.wikimedia.org/wikipedia/commons/9/92/Mystic_River_Falls_Silver_Dollar_City.jpg"
        },
        {
            "title": "Fire in the Hole (original)",
            "date": "30/12/2023",
            "status": "closed",
            "description": "Iconic indoor coaster that ran since 1972 closed after 2023 season.",
            "image": "https://upload.wikimedia.org/wikipedia/commons/..."
        },
        // Additional attractions here
    ];

    function renderData() {
        const openedSection = document.getElementById('opened');
        const closedSection = document.getElementById('closed');

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p><strong>Date:</strong> ${item.date}</p>
                <p>${item.description}</p>
            `;
            if (item.status === 'opened') {
                openedSection.appendChild(card);
            } else {
                closedSection.appendChild(card);
            }
        });
    }

    window.onload = renderData;
    