// שלב 2: הגדרת הקבועים לגישה לאלמנטים ב-HTML
const html = document.documentElement;
const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');

// הגדרת מאזין לאירוע שליחת הטופס (אסינכרוני)
registerForm.addEventListener('submit', async (event) => {
    // שלב 3: מניעת רענון ברירת המחדל של הדף
    event.preventDefault();

    // שליפת הערכים מתיבות הקלט
    const username = document.getElementById('userInput').value;
    const email = document.getElementById('mailInput').value;
    const password = document.getElementById('passInput').value;
    const confirmPassword = document.getElementById('confirmInput').value;
    const dob = document.getElementById('dateInput').value;

    // איפוס הודעת החיווי לפני בדיקה חדשה
    registerMessage.textContent = "";

    // בדיקה לאימות סיסמה - האם שתי הסיסמאות זהות?
    if (password !== confirmPassword) {
        registerMessage.textContent = "Passwords do not match.";
        registerMessage.classList.remove("text-green-500");
        registerMessage.classList.add("text-red-500");
        return; // יציאה מהפונקציה במקרה של שגיאה
    }

    // שימוש בבלוק try..catch לטיפול בשגיאות כתיבה לזיכרון
    try {
        // שליפת מערך המשתמשים הקיים או יצירת מערך ריק אם לא קיים
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // בדיקה האם שם המשתמש או האימייל כבר קיימים במערכת
        if (users.some(user => user.username === username || user.email === email)) {
            registerMessage.textContent = "Username or email already exists.";
            registerMessage.classList.remove("text-green-500");
            registerMessage.classList.add("text-red-500");
            return;
        }

        // הוספת המשתמש החדש למערך
        users.push({ username, email, password, dob });

        // שמירת המערך המעודכן ב-Local Storage (הפיכה לטקסט באמצעות JSON.stringify)
        localStorage.setItem('users', JSON.stringify(users));

        // הצגת הודעת הצלחה
        registerMessage.textContent = "Registration successful! (Data stored in local storage)";
        registerMessage.classList.remove("text-red-500");
        registerMessage.classList.add("text-green-500");

    } catch (error) {
        // טיפול בשגיאת I/O או שגיאה בלתי צפויה אחרת
        registerMessage.textContent = "An error occurred during registration.";
        registerMessage.classList.remove("text-green-500");
        registerMessage.classList.add("text-red-500");
    }
});