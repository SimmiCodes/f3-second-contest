document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("app");

    
    const isLoggedIn = localStorage.getItem("accessToken") !== null;

    const isSignupPage = window.location.pathname.includes("signup.html");
    const isProfilePage = window.location.pathname.includes("profile.html");

    if (!isLoggedIn && isProfilePage) {
        
        redirectToSignup("You need to log in to access the Profile page.", "error");
    } else if (isLoggedIn && isSignupPage) {
       
        redirectToProfile("You are already logged in. Redirecting to Profile page...", "info");
    } else if (isLoggedIn) {
        
        renderProfilePage();
    } else {
        
        redirectToSignup();
    }




    function redirectToSignup(message = "", messageType = "") {
        app.innerHTML = `
            <div class="container">
                 <h4>Welcome back!👋🏾<h4>
                <h2>Sign up to your account</h2>
                <form id="signupForm">
                    <label for="username" class="inputclass">Your name</label><br>

                    <input type="text" id="username" class="inputclass" required><br>

                    <label for="useremail" class="inputclass">Your email</label><br>

                    <input type="email" id="useremail" class="inputclass" required><br>

                    <label for="password" class="inputclass">Password</label><br>

                    <input type="password" id="password" class="inputclass" required><br>

                    <label for="password" class="inputclass">Confirm Password</label><br>

                    <input type="password" id="confirmpassword" class="inputclass" required><br>

                    <button type="submit" class="inputclass" id="signupbutton">Continue</button>
                </form>
                <p id="signupMessage" class="${messageType}">${message}</p>

            </div>
        `;

        const signupForm = document.getElementById("signupForm");
        const signupMessage = document.getElementById("signupMessage");

        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const useremail = document.getElementById("useremail").value;
            const password = document.getElementById("password").value;
            const confirmpassword = document.getElementById("confirmpassword").value;
            
            
            const accessToken = generateAccessToken();

            
            localStorage.setItem("username", username);
            localStorage.setItem("useremail", useremail);
            localStorage.setItem("password", password); 
            localStorage.setItem("accessToken", accessToken);

            
            signupMessage.textContent = "Signup successful!";
            signupMessage.className = "success";
            setTimeout(() => {
                redirectToProfile("Signup successful! Redirecting to Profile page...", "success");

                renderProfilePage();
            }, 1000);
        });
    }

    function renderProfilePage() {
        const username = localStorage.getItem("username");
        const useremail = localStorage.getItem("useremail");
        const password = localStorage.getItem("password");
        app.innerHTML = `
           <h2 id="text">Signup Successfully</h2>
            <div class="container">

                <h2 class="center">Profile</h2>
                <p class="center">Full Name: ${username}</p>
                <p class="center">Email:${useremail}</p>
                <p class="center">Password: ${password}</p> 
                <button id="logoutBtn">Logout</button>
                
            </div>
        `;

        const logoutBtn = document.getElementById("logoutBtn");

        logoutBtn.addEventListener("click", function () {
            
            localStorage.clear();
           
            redirectToSignup();
        });
    }
     
    function redirectToProfile(message = "", messageType = "") {
        app.innerHTML = `
            <div class="container">
                <h2 id="text">${message}</h2>
                <h2 class="center">Profile</h2>
                <div class="image-container">
                <img src="./asset/Vectorcircle.png" alt="my pic">
                <img src="./asset/Vectorvector.png" alt="my pic">
                </div>
                <p class="center">Full Name: ${username}</p>
                <p class="center">Email:${useremail}</p>
                <p class="center">Password: ${password}</p> 
                <button id="logoutBtn">Logout</button>
            </div>
        `;

        const logoutBtn = document.getElementById("logoutBtn");

        logoutBtn.addEventListener("click", function () {
            
            localStorage.clear();
            
            redirectToSignup();
        });
    }

    function generateAccessToken() {
        
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let accessToken = "";
        for (let i = 0; i < 16; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            accessToken += charset[randomIndex];
        }
        return accessToken;
    }
});