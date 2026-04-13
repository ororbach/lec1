const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameOrEmail = document.getElementById('userInput').value;
    const password = document.getElementById('passInput').value;
    
    // שליפת כל המשתמשים
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // חיפוש משתמש שתואם גם לשם/מייל וגם לסיסמה
    let user = users.find(u => 
        (u.username === usernameOrEmail || u.email === usernameOrEmail) && 
        u.password === password
    );

    if (user) {
        // שמירת המשתמש הנוכחי (ללא הסיסמה) בנפרד ב-LocalStorage
        const userToSave = { ...user };
        delete userToSave.password; 
        localStorage.setItem('currentUser', JSON.stringify(userToSave));

        // בדיקה: אם הוא אדמין, שלח אותו לדף הניהול. אחרת, הודעת הצלחה.
        if (user.role === 'admin') {
            window.location.href = '/src/userManagement.html';
        } else {
            loginMessage.textContent = `Login successful! Welcome ${user.username}.`;
            loginMessage.className = "mt-2 text-green-500 text-center text-sm";
        }
    } else {
        loginMessage.textContent = 'Invalid username/email or password.';
        loginMessage.className = "mt-2 text-red-500 text-center text-sm";
    }
});