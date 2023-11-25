document.addEventListener('DOMContentLoaded', function () {
    const signupPage = document.getElementById('signup-page');
    const profilePage = document.getElementById('profile-page');
    const logoutBtn = document.getElementById('logout-btn');

   
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        showProfilePage();
    } else {
        showSignupPage();
    }

    function showSignupPage() {
        signupPage.style.display = 'block';
        profilePage.style.display = 'none';
        clearMessages();
    }

    function showProfilePage() {
        signupPage.style.display = 'none';
        profilePage.style.display = 'block';
        displayUserProfile();
        clearMessages();
    }

    function displayUserProfile() {
        const user = JSON.parse(localStorage.getItem('user'));
        document.getElementById('user-name').innerText = user.name;
        document.getElementById('user-email').innerText = user.email;
    }

    function signup() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        
        if (!name || !email || !password) {
            showError('All fields are mandatory.');
            return;
        }


        
        const accessToken = generateAccessToken();

        
        const user = { name, email, accessToken };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);

        
        showSuccess('Signup successful!');
        clearSignupForm();
        showProfilePage();
    }

    function logout() {
        
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        showSignupPage();
    }

    function generateAccessToken() {
        
        return Math.random().toString(36).substring(2, 18);
    }

    function showError(message) {
        document.getElementById('error-message').innerText = message;
    }

    function showSuccess(message) {
        document.getElementById('message').innerText = message;
    }

    function clearMessages() {
        document.getElementById('message').innerText = '';
        document.getElementById('error-message').innerText = '';
    }

    function clearSignupForm() {
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password').value = '';
    }

    document.getElementById('signup-btn').addEventListener('click', signup);
    logoutBtn.addEventListener('click', logout);


    if (!accessToken && !window.location.href.includes('signup.html')) {
        window.location.href = 'signup.html';
    } else if (accessToken && window.location.href.includes('signup.html')) {
        window.location.href = 'profile.html';
    }
});
