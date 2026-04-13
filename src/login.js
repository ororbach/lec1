const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // מונע מהדף להתרענן

    const usernameOrEmail = document.getElementById('userInput').value;
    const password = document.getElementById('passInput').value;

    // שליפת המשתמשים מהזיכרון של הדפדפן
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // חיפוש משתמש מתאים
    let user = users.find(u => u.username === usernameOrEmail || u.email === usernameOrEmail);

    let nameOrEmail = 'test'; 
    let pass = 'password';

    if (user != undefined) {
        nameOrEmail = user.username;
        pass = user.password;
    }

    // בדיקת תקינות
    if (usernameOrEmail === nameOrEmail && password === pass) {
        loginMessage.textContent = 'Login successful!';
        loginMessage.className = 'mt-2 text-green-500 text-center text-sm';
    } else {
        loginMessage.textContent = 'Invalid username/email or password.';
        loginMessage.className = 'mt-2 text-red-500 text-center text-sm';
    }
});