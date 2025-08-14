import React, { useState } from 'react';
import axios from 'axios';
import './En-De.css';

const EncryptPDF = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      setFile(null); // Clear the file input if it's not a PDF
    } else {
      setFile(selectedFile);
      setError(null); // Reset error on new valid file selection
    }
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle PDF encryption
  const handleFileEncrypt = async (e) => {
    e.preventDefault();

    if (!file || !password) {
      setError('Please select a file and enter the password');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password); // Attach password as form data

    try {
      setIsEncrypting(true);
      const response = await axios.post('http://localhost:5000/encrypt_pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Important to handle binary data (file download)
      });

      if (response.status === 200) {
        // Create a URL for the encrypted Blob (PDF file)
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const downloadUrl = URL.createObjectURL(blob);

        // Create a link element to trigger the file download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'encrypted_file.pdf'; // Name of the downloaded file
        link.click();

        // Reset file input after successful encryption
        setFile(null);
        setPassword('');
      } else {
        setError('Error during file encryption');
      }
    } catch (err) {
      setError('Error uploading file');
      console.error(err);
    } finally {
      setIsEncrypting(false);
    }
  };

  return (
    <div className="decrypt-pdf-container">
      <h1>Encrypt PDF Files</h1>
      <p>Encrypt your PDF with a password to keep sensitive data confidential.</p>
      <form onSubmit={handleFileEncrypt}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="application/pdf" 
          disabled={isEncrypting} // Disable file input during encryption
        />
        <input 
          type="password" 
          value={password} 
          onChange={handlePasswordChange} 
          placeholder="Enter PDF password" 
          disabled={isEncrypting}
        />
        <button type="submit" disabled={isEncrypting || !file || !password}>
          {isEncrypting ? 'Encrypting...' : 'Encrypt'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EncryptPDF;
