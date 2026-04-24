// =======================
// MOCK DATA (for testing)
// =======================
const mockSongs = [
  {
    artist: "Taylor Swift",
    title: "Love Story",
    year: "2008",
    album: "Fearless",
    image_url: "https://via.placeholder.com/300x200"
  },
  {
    artist: "Jimmy Buffett",
    title: "Margaritaville",
    year: "1974",
    album: "Living and Dying in 3/4 Time",
    image_url: "https://via.placeholder.com/300x200"
  },
  {
    artist: "Kendrick Lamar",
    title: "Bad Blood",
    year: "2015",
    album: "To Pimp a Butterfly",
    image_url: "https://via.placeholder.com/300x200"
  }
];

let mockSubscriptions = [];


// =======================
// PAGE LOAD
// =======================
function loadMainPage() {
  const email = sessionStorage.getItem("email");
  const user_name = sessionStorage.getItem("user_name");

  // Redirect if not logged in
  if (!email) {
    window.location.href = "login.html";
    return;
  }

  // Display username
  document.getElementById("username").textContent = user_name || email;

  // Load subscriptions
  loadSubscriptions();
}


// =======================
// LOGOUT
// =======================
async function logout() {
  const email = sessionStorage.getItem("email");

  // Optional backend logout
  if (!USE_MOCK_DATA && email) {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
    } catch (error) {
      console.error(error);
    }
  }

  sessionStorage.clear();
  window.location.href = "login.html";
}


// =======================
// LOAD SUBSCRIPTIONS
// =======================
async function loadSubscriptions() {
  const email = sessionStorage.getItem("email");

  if (USE_MOCK_DATA) {
    displaySubscriptions(mockSubscriptions);
    return;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/subscriptions?email=${encodeURIComponent(email)}`
    );

    const data = await response.json();
    displaySubscriptions(data.subscriptions || []);
  } catch (error) {
    console.error(error);
  }
}


// =======================
// DISPLAY SUBSCRIPTIONS
// =======================
function displaySubscriptions(subscriptions) {
  const container = document.getElementById("subscriptions");
  container.innerHTML = "";

  if (subscriptions.length === 0) {
    container.innerHTML = "<p>No subscriptions yet.</p>";
    return;
  }

  subscriptions.forEach(song => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${song.title}</h3>
      <p><strong>Artist:</strong> ${song.artist}</p>
      <p><strong>Year:</strong> ${song.year}</p>
      <p><strong>Album:</strong> ${song.album}</p>
      <img src="${song.image_url}">
      <button>Remove</button>
    `;

    card.querySelector("button").addEventListener("click", () => removeSubscription(song));
    container.appendChild(card);
  });
}


// =======================
// QUERY MUSIC
// =======================
async function queryMusic() {
  const title = document.getElementById("title").value.trim();
  const year = document.getElementById("year").value.trim();
  const artist = document.getElementById("artist").value.trim();
  const album = document.getElementById("album").value.trim();
  const message = document.getElementById("queryMessage");

  message.textContent = "";
  document.getElementById("results").innerHTML = "";

  // Validate input
  if (!title && !year && !artist && !album) {
    message.textContent = "At least one field must be completed";
    return;
  }

  // MOCK MODE
  if (USE_MOCK_DATA) {
    const results = mockSongs.filter(song => {
      return (
        (!title || song.title.toLowerCase().includes(title.toLowerCase())) &&
        (!year || song.year === year) &&
        (!artist || song.artist.toLowerCase().includes(artist.toLowerCase())) &&
        (!album || song.album.toLowerCase().includes(album.toLowerCase()))
      );
    });

    displayResults(results);
    return;
  }

  // REAL BACKEND
  try {
    const params = new URLSearchParams();

    if (title) params.append("title", title);
    if (year) params.append("year", year);
    if (artist) params.append("artist", artist);
    if (album) params.append("album", album);

    const response = await fetch(`${API_BASE_URL}/songs?${params.toString()}`);
    const data = await response.json();

    displayResults(data.results || []);
  } catch (error) {
    message.textContent = "Could not connect to backend";
    console.error(error);
  }
}


// =======================
// DISPLAY RESULTS
// =======================
function displayResults(songs) {
  const container = document.getElementById("results");
  const message = document.getElementById("queryMessage");

  container.innerHTML = "";

  if (songs.length === 0) {
    message.textContent = "No result is retrieved. Please query again";
    return;
  }

  songs.forEach(song => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${song.title}</h3>
      <p><strong>Artist:</strong> ${song.artist}</p>
      <p><strong>Year:</strong> ${song.year}</p>
      <p><strong>Album:</strong> ${song.album}</p>
      <img src="${song.image_url}">
      <button>Subscribe</button>
    `;

    card.querySelector("button").addEventListener("click", () => subscribe(song));
    container.appendChild(card);
  });
}


// =======================
// ADD SUBSCRIPTION
// =======================
async function subscribe(song) {
  const email = sessionStorage.getItem("email");

  if (USE_MOCK_DATA) {
    mockSubscriptions.push(song);
    displaySubscriptions(mockSubscriptions);
    return;
  }

  try {
    await fetch(`${API_BASE_URL}/subscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        artist: song.artist,
        title: song.title,
        year: song.year,
        album: song.album,
        image_url: song.image_url
      })
    });

    loadSubscriptions();
  } catch (error) {
    console.error(error);
  }
}


// =======================
// REMOVE SUBSCRIPTION
// =======================
async function removeSubscription(song) {
  const email = sessionStorage.getItem("email");

  if (USE_MOCK_DATA) {
    mockSubscriptions = mockSubscriptions.filter(item =>
      !(item.title === song.title &&
        item.artist === song.artist &&
        item.year === song.year)
    );

    displaySubscriptions(mockSubscriptions);
    return;
  }

  try {
    await fetch(`${API_BASE_URL}/subscriptions`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        artist: song.artist,
        title: song.title,
        year: song.year,
        album: song.album
      })
    });

    loadSubscriptions();
  } catch (error) {
    console.error(error);
  }
}