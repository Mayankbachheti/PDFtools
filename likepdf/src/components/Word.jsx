import React, { useState } from 'react';
import axios from 'axios';
import './Word.css';

const Word = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
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

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      const response = await axios.post('http://localhost:5000/convert_pdf_to_word', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Important to handle binary data (file download)
      });

      // Check if the response is OK (successful)
      if (response.status === 200) {
        // Create a URL for the Blob (converted Word file)
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const downloadUrl = URL.createObjectURL(blob);

        // Create a link element to trigger the file download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'converted_file.docx'; // Name of the downloaded file
        link.click();

        // Reset file input after successful upload
        setFile(null);
      } else {
        setError('Error during file conversion');
      }
    } catch (err) {
      setError('Error uploading file');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="converter-container">
      <h1>PDF to WORD Converter</h1>
      <p>Convert your PDF to WORD documents with incredible accuracy.</p>
      <form onSubmit={handleFileUpload}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="application/pdf" 
          disabled={isUploading}
        />
        <button type="submit" disabled={isUploading || !file}>
          {isUploading ? 'Converting...' : 'Convert'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Word;
