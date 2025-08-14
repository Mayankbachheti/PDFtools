from flask import Flask, request, send_file, jsonify
from flask_cors import CORS  
from werkzeug.utils import secure_filename
from pdf2docx import Converter  
import os
import PyPDF2
import pikepdf

app = Flask(__name__)

# Enable CORS for the entire app (allowing requests from React frontend)
CORS(app)

# Define the upload folder path
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Allowed file extensions
ALLOWED_EXTENSIONS = {'pdf'}

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    """Check if the file has a valid extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def home():
    return "Backend Working"

# PDF to Word conversion route
@app.route('/convert_pdf_to_word', methods=['POST'])
def convert_pdf_to_word():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Convert PDF to Word
        output_word_path = file_path.rsplit('.', 1)[0] + '.docx'
        cv = Converter(file_path)
        cv.convert(output_word_path, start=0, end=None)  # Converts PDF to Word
        cv.close()

        # Ensure the file is sent with the correct content type and filename
        return send_file(output_word_path, as_attachment=True, download_name=filename.rsplit('.', 1)[0] + '.docx')

    return jsonify({"error": "Invalid file format. Only PDF files are allowed."}), 400

@app.route('/compress', methods=['POST'])
def compress_pdf():
    if 'pdf' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['pdf']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Compress the PDF using pikepdf
        output_pdf_path = file_path.rsplit('.', 1)[0] + '_compressed.pdf'

        try:
            with pikepdf.open(file_path) as pdf:
                pdf.save(output_pdf_path, compress_streams=True)  # Compress PDF

            # Send the compressed PDF back as a downloadable file
            return send_file(output_pdf_path, as_attachment=True, download_name=filename.rsplit('.', 1)[0] + '_compressed.pdf')

        except Exception as e:
            return jsonify({"error": f"Error during compression: {str(e)}"}), 500

    return jsonify({"error": "Invalid file format. Only PDF files are allowed."}), 400


@app.route('/decrypt_pdf', methods=['POST'])
def decrypt_pdf():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    password = request.form.get('password')

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if not password:
        return jsonify({"error": "Password is required to decrypt the PDF"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        try:
            # Use pikepdf to handle decryption
            with pikepdf.open(file_path, password=password) as pdf:
                decrypted_pdf_path = os.path.join(app.config['UPLOAD_FOLDER'], f"decrypted_{filename}")
                pdf.save(decrypted_pdf_path)

            # Send the decrypted PDF back to the user
            return send_file(decrypted_pdf_path, as_attachment=True, download_name=f"decrypted_{filename}")

        except pikepdf._qpdf.PasswordError:
            return jsonify({"error": "Failed to decrypt the PDF. Incorrect password."}), 400
        except Exception as e:
            return jsonify({"error": f"Error decrypting PDF: {str(e)}"}), 500

    return jsonify({"error": "Invalid file format. Only PDF files are allowed."}), 400

@app.route('/encrypt_pdf', methods=['POST'])
def encrypt_pdf():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    password = request.form.get('password')

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if not password:
        return jsonify({"error": "Password is required to encrypt the PDF"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        try:
            # Use pikepdf to handle encryption
            with pikepdf.open(file_path) as pdf:
                pdf.save(os.path.join(app.config['UPLOAD_FOLDER'], f"encrypted_{filename}"), encryption=pikepdf.Encryption(owner=password, user=password, R=4))

            # Send the encrypted PDF back to the user
            encrypted_pdf_path = os.path.join(app.config['UPLOAD_FOLDER'], f"encrypted_{filename}")
            return send_file(encrypted_pdf_path, as_attachment=True, download_name=f"encrypted_{filename}")

        except Exception as e:
            return jsonify({"error": f"Error encrypting PDF: {str(e)}"}), 500

    return jsonify({"error": "Invalid file format. Only PDF files are allowed."}), 400



if __name__ == '__main__':
    app.run(debug=True)