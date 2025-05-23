document.addEventListener('DOMContentLoaded', () => {
    const registerFormContainer = document.getElementById('register-form');
    const loginFormContainer = document.getElementById('login-form');
    const loggedInArea = document.getElementById('logged-in-area');
    const welcomeUsername = document.getElementById('welcome-username');

    const showLoginLink = document.getElementById('show-login');
    const showRegisterLink = document.getElementById('show-register');

    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logout-button');

    // --- Helper Functions ---
    function showRegister() {
        registerFormContainer.style.display = 'block';
        loginFormContainer.style.display = 'none';
        loggedInArea.style.display = 'none';
    }

    function showLogin() {
        registerFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
        loggedInArea.style.display = 'none';
    }

    function showLoggedIn(username) {
        registerFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'none';
        loggedInArea.style.display = 'block';
        welcomeUsername.textContent = username;
    }

    // --- Event Listeners ---
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showLogin();
    });

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        showRegister();
    });

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        // Basic validation (can be expanded)
        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }

        // Check if user already exists (using localStorage)
        if (localStorage.getItem(username)) {
            alert('Username already exists. Please choose another one or login.');
            return;
        }

        // Store user credentials (insecure, for demo purposes only!)
        localStorage.setItem(username, password);
        alert('Registration successful! Please login.');
        showLogin(); // Switch to login form after registration
        registrationForm.reset();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        // Check if user exists and password matches
        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            // Simulate login session
            sessionStorage.setItem('loggedInUser', username);
            showLoggedIn(username);
            loginForm.reset();
        } else {
            alert('Invalid username or password.');
        }
    });

    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('loggedInUser');
        showLogin(); // Show login form after logout
    });

    // --- Initial State Check ---
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
        showLoggedIn(loggedInUser);
    } else {
        showRegister(); // Default to register form if not logged in
    }
});
