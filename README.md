# Email Draft Application

A web application that creates Outlook email drafts with attachments directly from your browser.

## ✨ Features

- 📧 Create email drafts with multiple recipients
- 📎 Attach files directly to the draft
- ✅ Form validation and error handling
- 🎨 Clean and responsive UI
- 🔄 Automatic draft opening in Outlook

## 🚀 Getting Started

### Prerequisites

- Python 3.7 or higher (for the backend)
- Node.js (for the React frontend)
- Outlook (or default email client configured for .eml files)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/brachaRubin/outlook-draft-web.git
   cd email-draft-app
   ```

2. **Set up the React Frontend**
   ```bash
   cd auto-draft-mailer
   npm install
   ```

3. **Set up the Python Backend**
   ```bash
   cd ../eml-server
   pip install flask flask-cors
   ```

## 🏃 Running the Application

1. **Start the Python Backend**
   ```bash
   # From the eml-server directory
   python server.py
   ```

2. **Start the React Frontend**
   ```bash
   # From the auto-draft-mailer directory
   npm run dev
   ```

3. **Open the Application**
   - Open your browser and navigate to: [http://localhost:5173](http://localhost:5173)

## 🛠 Technologies Used

- Frontend: React with TypeScript
- Backend: Python with Flask
- Styling: CSS

## 📝 Usage

1. Fill in the email subject
2. Enter recipient email addresses (separate multiple with commas)
3. Write your email message
4. Attach a file (optional)
5. Click "צור טיוטה" to create the draft(s)
6. The draft(s) will open automatically in your default email client (Outlook).

## ⚠️ Troubleshooting

- Make sure Outlook is set as your default email client
- Check that .eml files are associated with Outlook
- Ensure the backend server is running on port 5000

## ℹ️ מידע טכנולוגי והסבר על הפתרון

### למה לא השתמשתי ב-mailto?
פקודת mailto: מאפשרת לפתוח טיוטת מייל בדפדפן, אך אינה תומכת בהוספת קובץ מצורף אוטומטית, במיוחד כאשר הקובץ נבחר מהדפדפן. בנוסף, mailto לא תומך ביצירת טיוטות מרובות (אחת לכל נמען) ולא מאפשר שליטה מלאה על תוכן ההודעה.

### למה אפליקציית Web לא יכולה לפתוח את Outlook ישירות?
דפדפן אינטרנט מוגבל בגישה למשאבים ולתוכנות מקומיות (כמו Outlook) מסיבות אבטחה. לכן, לא ניתן לפתוח טיוטה ישירות מתוך JavaScript בדפדפן.

### איך בכל זאת פתרתי את הבעיה?
הפתרון משלב אפליקציית Web (React) עם שרת Python (Flask):
- המשתמש ממלא טופס בדפדפן ושולח את הנתונים לשרת המקומי.
- השרת יוצר קובץ .eml (פורמט טיוטת מייל) עבור כל נמען, כולל קובץ מצורף.
- השרת פותח אוטומטית את קובץ ה-.eml ב-Outlook המקומי, כך שהמשתמש יכול לערוך ולשלוח בעצמו.

### יתרונות הפתרון
- שליטה מלאה על תוכן ההודעה והקבצים המצורפים.
- אפשרות לפתוח טיוטות מרובות (אחת לכל נמען).
- חוויית משתמש נוחה – כל טיוטה נפתחת אוטומטית ב-Outlook.

### מגבלות ודרישות
- יש להפעיל את השרת המקומי (Flask) במחשב המשתמש.
- יש להגדיר את Outlook כברירת מחדל לפתיחת קבצי .eml.
- הפתרון מתאים לסביבה סגורה/ארגונית שבה ניתן לבצע התקנות מקומיות.

## 📄 License

This project is licensed under the MIT License.



