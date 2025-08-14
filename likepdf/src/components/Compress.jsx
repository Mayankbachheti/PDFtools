import React, { useState } from 'react';
import axios from 'axios';
import './Word.css';

const PDFCompressor = () => {
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
    formData.append('pdf', file);

    try {
      setIsUploading(true);
      const response = await axios.post('http://localhost:5000/compress', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Important to handle binary data (file download)
      });

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const downloadUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'compressed_file.pdf'; // Name of the downloaded file
        link.click();

        setFile(null); // Reset file input after successful upload
      } else {
        setError('Error during file compression');
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
      <h1 >Compress PDF files</h1>
      <p>Reduce file size while optimizing for maximal PDF quality.</p>
      <form onSubmit={handleFileUpload}>
        <input
          type="file"
          onChange={handleFileChange}
          accept="application/pdf"
          disabled={isUploading} // Disable file input during upload
        />
        <button type="submit" disabled={isUploading || !file}>
          {isUploading ? 'compressing...' : 'Compress'}
        </button>
      </form>
      {error && <p sclassName="error-message">{error}</p>}
    </div>
  );
};

export default PDFCompressor;

