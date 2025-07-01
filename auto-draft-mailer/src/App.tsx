import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [subject, setSubject] = useState('');
  const [recipients, setRecipients] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');


  const validateEmails = (emails: string) => {
    const emailArray = emails.split(',').map(e => e.trim());
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailArray.every(email => emailRegex.test(email));
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    if (!validateEmails(recipients)) {
      setError('אחת או יותר מכתובות המייל אינן תקינות.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('subject', subject);
      formData.append('recipients', recipients);
      formData.append('body', body);
      if (file) {
        formData.append('file', file);
      }
      const response = await fetch('http://localhost:5000/create-draft', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setSuccess(true);
        setSubject('');
        setRecipients('');
        setBody('');
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        setError('שליחה נכשלה. ודא שהשרת המקומי פועל.');
      }
    } catch (err) {
      setError('שגיאה בשליחה: ' + (err instanceof Error ? err.message : ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="form-outer-container">
        <header className="form-header">
          <h1>יצירת טיוטות מייל ב-Outlook</h1>
          <p>טופס זה ייצור אוטומטית טיוטת מייל חדשה ב-Outlook עם הפרטים שהזנת, כולל קובץ מצורף</p>
        </header>
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <label>
              נושא המייל:
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                required
                placeholder="לדוג' קורות חיים למשרת..."
              />
            </label>
            <label>
              כתובת/ות הנמען (מופרדות בפסיק):
              <input
                type="text"
                //  multiple
                value={recipients}
                onChange={e => setRecipients(e.target.value)}
                required
                placeholder="example1@mail.com, example2@mail.com"
                //  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                title="נא להזין כתובת מייל תקינה (ניתן להפריד כמה כתובות בפסיק)"
              />
            </label>
            <label>
              גוף ההודעה:
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                required
                placeholder="שלום, מצורפים קורות החיים של..."
              />
            </label>
            <label>
              קובץ קורות חיים מצורף:
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                ref={fileInputRef}
                onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
                required
              />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? 'שולח...' : 'צור טיוטה'}
            </button>
          </form>
          {success && <p className="success-msg">הטיוטה נשלחה ל-Outlook בהצלחה!</p>}
          {error && <p className="error-msg">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
