import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [resultUrl, setResultUrl] = useState("");

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = (action) => {
        if (!selectedFile) {
            alert("Please select a file first");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        axios.post(`http://localhost:5000/${action}`, formData, { 
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType: 'blob',
        })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            setResultUrl(url);
        })
        .catch(error => {
            console.error(error);
            alert("Error uploading file.");
        });
    };

    return (
        <div>
            <h2>File Converter 333</h2>
            <input type="file" onChange={handleFileChange} />
            <div>
                <button onClick={() => handleFileUpload('convert_pdf_to_word')}>Convert PDF to Word</button>
                <button onClick={() => handleFileUpload('compress_pdf')}>Compress PDF</button>
                <button onClick={() => handleFileUpload('compress_image')}>Compress Image</button>
                {/*<button onClick={() => handleFileUpload('convert_pdf_to_ppt')}>Convert PDF to PPT</button>*/}
            </div>
            {resultUrl && (
                <a href={resultUrl} download="result">Download Result</a>
            )}
        </div>
    );
}

export default FileUpload;
