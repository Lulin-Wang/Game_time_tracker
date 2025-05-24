document.addEventListener('DOMContentLoaded', () => {
    const registerFormContainer = document.getElementById('register-form');
    const loginFormContainer = document.getElementById('login-form');

    const showLoginLink = document.getElementById('show-login');
    const showRegisterLink = document.getElementById('show-register');

    const registrationForm = document.getElementById('registrationForm');
    console.log('registrationForm element:', registrationForm);
    const loginForm = document.getElementById('loginForm');
    console.log('loginForm element:', loginForm);

    // --- Helper Functions ---
    function showRegister() {
        registerFormContainer.style.display = 'block';
        loginFormContainer.style.display = 'none';
    }

    function showLogin() {
        registerFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
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

        if (!username || !password) {
            // console.error('Please enter both username and password.');
            alert('Please enter both username and password.');
            return;
        }

        if (localStorage.getItem(username)) {
            // console.error('Username already exists. Please choose another one or login.');
            alert('Username already exists. Please choose another one or login.');
            return;
        }

        localStorage.setItem(username, password);
        // console.log('Registration successful for user:', username);
        alert('Registration successful! Please login.');
        showLogin();
        registrationForm.reset();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            sessionStorage.setItem('loggedInUser', username); // Store logged-in state
            // console.log('Login successful for user:', username);
            window.location.href = 'index.html'; // Redirect to the game ban tracker page
        } else {
            // console.error('Invalid username or password.');
            alert('Invalid username or password.');
        }
    });

    // --- Initial State Check ---
    if (sessionStorage.getItem('loggedInUser')) {
        window.location.href = 'index.html';
    } else {
        showRegister(); // Default to register form if not logged in
    }
});
