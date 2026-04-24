// =======================
// LOGIN FUNCTION
// =======================
async function login() {
  // Get user input
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  // Clear previous messages
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
    if (email === "test@test.com" && password === "123") {
      // Save session data
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("user_name", "TestUser");

      // Redirect to main page
      window.location.href = "main.html";
    } else {
      message.textContent = "Email or password is invalid";
    }
    return;
  }

  // =======================
  // REAL BACKEND MODE
  // =======================
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    // Check backend response
    if (data.message === "login successful") {
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("user_name", data.user_name);

      window.location.href = "main.html";
    } else {
      message.textContent = "Email or password is invalid";
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
  const email = document.getElementById("email").value.trim();
  const user_name = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  message.textContent = "";

  // Validation
  if (!email || !user_name || !password) {
    message.textContent = "Please fill in all fields";
    return;
  }

  // =======================
  // MOCK MODE
  // =======================
  if (USE_MOCK_DATA) {
    if (email === "test@test.com") {
      message.textContent = "The email already exists";
    } else {
      alert("Registration successful. Please login.");
      window.location.href = "login.html";
    }
    return;
  }

  // =======================
  // REAL BACKEND
  // =======================
  try {
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