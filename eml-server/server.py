from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tempfile
import webbrowser
import base64

app = Flask(__name__)
CORS(app)

@app.route('/create-draft', methods=['POST'])
def create_draft():
    data = request.form
    subject = data.get('subject', '')
    recipients = data.get('recipients', '')
    body = data.get('body', '')
    file = request.files.get('file')

    # פיצול הנמענים לפי פסיק/רווח/שורה חדשה
    recipient_list = [r.strip() for r in recipients.replace(';', ',').replace('\n', ',').split(',') if r.strip()]
    eml_paths = []

    for recipient in recipient_list:
        eml_content = f"""Subject: {subject}
To: {recipient}
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="sep"

--sep
Content-Type: text/plain; charset="utf-8"

{body}
"""
        if file:
            filename = file.filename
            file_content = file.read()
            file.seek(0)  # reset pointer for next iteration
            encoded_content = base64.b64encode(file_content).decode('ascii')
            eml_content += f"""
--sep
Content-Type: application/octet-stream; name="{filename}"
Content-Disposition: attachment; filename="{filename}"
Content-Transfer-Encoding: base64

{encoded_content}
--sep--
"""
        else:
            eml_content += "\n--sep--\n"

        with tempfile.NamedTemporaryFile(delete=False, suffix='.eml') as tmp:
            tmp.write(eml_content.encode('utf-8'))
            tmp_path = tmp.name
            eml_paths.append(tmp_path)
            print(f'EML file created at: {tmp_path}', flush=True)
            webbrowser.open(tmp_path)

    return jsonify({'status': 'ok', 'eml_paths': eml_paths})

if __name__ == '__main__':
    app.run(port=5000)
