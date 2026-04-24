// =======================
// LOGIN FUNCTION
// =======================
async function login() {
  // Get values from input fields
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  // Clear previous message
  message.textContent = "";

  // Basic validation
  if (!email || !password) {
    message.textContent = "Please enter email and password";
    return;
  }

  // =======================
  // MOCK MODE (no backend)
  // =======================
  if (USE_MOCK_DATA) {
    // Fake login check
    if (email === "test@test.com" && password === "123") {
      // Store session data
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("user_name", "TestUser");

      // Redirect to main page
      window.location.href = "main.html";
    } else {
      message.textContent = "email or password is invalid";
    }
    return;
  }

  // =======================
  // REAL BACKEND MODE
  // =======================
  try {
    // Call backend login API
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    // Check response message
    if (data.message === "login successful") {
      // Save user session
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("user_name", data.user_name);

      // Redirect
      window.location.href = "main.html";
    } else {
      message.textContent = "email or password is invalid";
    }
  } catch (error) {
    message.textContent = "Could not connect to backend";
    console.error(error);
  }
}


// =======================
// REGISTER FUNCTION
// =======================
async function register() {
  // Get input values
  const email = document.getElementById("email").value.trim();
  const user_name = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  // Clear message
  message.textContent = "";

  // Validation
  if (!email || !user_name || !password) {
    message.textContent = "Please complete all fields";
    return;
  }

  // =======================
  // MOCK MODE
  // =======================
  if (USE_MOCK_DATA) {
    // Fake duplicate check
    if (email === "test@test.com") {
      message.textContent = "The email already exists";
    } else {
      alert("Registration successful. Please login.");
      window.location.href = "login.html";
    }
    return;
  }

  // =======================
  // REAL BACKEND MODE
  // =======================
  try {
    // Call register API
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, user_name, password })
    });

    const data = await response.json();

    if (data.message === "registered") {
      alert("Registration successful. Please login.");
      window.location.href = "login.html";
    } else {
      message.textContent = "The email already exists";
    }
  } catch (error) {
    message.textContent = "Could not connect to backend";
    console.error(error);
  }
}