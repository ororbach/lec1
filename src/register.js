const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // שליפת הנתונים מהטופס
    const username = document.getElementById('userInput').value;
    const email = document.getElementById('mailInput').value;
    const password = document.getElementById('passInput').value;
    const confirmPassword = document.getElementById('confirmInput').value;
    const dob = document.getElementById('dateInput').value;

    registerMessage.textContent = "";

    // בדיקת אימות סיסמה
    if (password !== confirmPassword) {
        registerMessage.textContent = "Passwords do not match.";
        registerMessage.className = "mt-2 text-red-500 text-center text-sm";
        return;
    }

    try {
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // בדיקה אם המשתמש כבר קיים
        if (users.some(user => user.username === username || user.email === email)) {
            registerMessage.textContent = "Username or email already exists.";
            registerMessage.className = "mt-2 text-red-500 text-center text-sm";
            return;
        }

        // לוגיקה: המשתמש הראשון שנרשם הוא אדמין, השאר יוזרים רגילים
        const role = users.length === 0 ? 'admin' : 'user';

        // הוספת המשתמש החדש עם השדה role
        users.push({ 
            username, 
            email, 
            password, 
            dob, 
            role: role 
        });

        localStorage.setItem('users', JSON.stringify(users));

        registerMessage.textContent = `Registration successful! You are registered as ${role}.`;
        registerMessage.className = "mt-2 text-green-500 text-center text-sm";

        // מעבר אוטומטי לדף התחברות לאחר 2 שניות
        setTimeout(() => {
            window.location.href = '/src/login.html';
        }, 2000);

    } catch (error) {
        registerMessage.textContent = "An error occurred during registration.";
        registerMessage.className = "mt-2 text-red-500 text-center text-sm";
    }
});