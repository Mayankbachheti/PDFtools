import React from 'react';
import { Link } from 'react-router-dom';
import './Features.css';
import { GrDocumentWord } from "react-icons/gr";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { HiLockOpen } from "react-icons/hi2";
import { HiLockClosed } from "react-icons/hi2";

const Features = () => {
  return (
    <div className="features-container">
      {/* Box 1 */}
      <Link to="/convert_pdf_to_word" className="feature-box">
      <GrDocumentWord size={50}/>
      <br/>
        <h3>PDF to Word</h3>
        <p>Convert your PDF files to Word documents with ease.</p>
      </Link>

      {/* Box 2 */}
      <Link to="/compress" className="feature-box">
      <FaCompressArrowsAlt size={50}/>
      <br/>
        <h3>Compress PDF</h3>
        <p>Reduce the size of your PDF files without losing quality.</p>
      </Link>

      {/* Box 3 */}
      <Link to="/decrypt_pdf" className="feature-box">
      <HiLockOpen size={50}/>
      <br/>
        <h3>Decrypt PDF</h3>
        <p>Remove password protection from PDF files.</p>
      </Link>

      {/* Box 4 */}
      <Link to="/encrypt_pdf" className="feature-box">
      <HiLockClosed size={50}/>
      <br/>
        <h3>Encrypt PDF</h3>
        <p>Protect your PDF files with a password.</p>
      </Link>
    </div>
  );
};

export default Features;
