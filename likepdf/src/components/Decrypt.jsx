import React, { useEffect,useState } from 'react';
import axios from 'axios';
import './En-De.css';

const DecryptPDF = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
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

  useEffect(() => {
    if (error) {
      alert("Incorrect Password"); 
    }
  }, [error]);

  // Handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle PDF decryption
  const handleFileDecrypt = async (e) => {
    e.preventDefault();

    if (!file || !password) {
      setError('Please select a file and enter the password');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password); // Attach password as form data

    try {
      setIsDecrypting(true);
      const response = await axios.post('http://localhost:5000/decrypt_pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Important to handle binary data (file download)
      });

      if (response.status === 200) {
        // Create a URL for the decrypted Blob (PDF file)
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const downloadUrl = URL.createObjectURL(blob);

        // Create a link element to trigger the file download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'decrypted_file.pdf'; // Name of the downloaded file
        link.click();

        // Reset file input after successful decryption
        setFile(null);
        setPassword('');
      } else {
        setError('Error during file decryption');
      }
    } catch (err) {
      setError('Error uploading file');
      console.error(err);
    } finally {
      setIsDecrypting(false);
    }
  };

  return (
    <div className="decrypt-pdf-container">
      <h1>Decrypt PDF Files</h1>
      <p>Decrypt your PDF files securely keeping sensitive data confidential.</p>
      <form onSubmit={handleFileDecrypt}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="application/pdf" 
          disabled={isDecrypting} // Disable file input during decryption
        />
        <input 
          type="password" 
          value={password} 
          onChange={handlePasswordChange} 
          placeholder="Enter PDF password" 
          disabled={isDecrypting}
        />
        <button type="submit" disabled={isDecrypting || !file || !password}>
          {isDecrypting ? 'Decrypting...' : 'Decrypt'}
        </button>
      </form>
      {/*error && alert(error)*/}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DecryptPDF;
