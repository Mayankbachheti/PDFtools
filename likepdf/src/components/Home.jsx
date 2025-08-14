import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import './Home.css';
import Features from './Features';
import { BsFiletypePdf } from "react-icons/bs";



const HomePage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get('http://localhost:5000/');
        setMessage(response.data); 
      } catch (error) {
        console.error('Error fetching message:', error);
        setMessage('Failed to load message from server');
      }
    };

    fetchMessage();
  }, []); 
  console.log(message);

  return (
    <div>
      
      <div className='head shadow-sm bg-body-tertiary'>
      <h1 className='heading'>PDF Tools: Convert, Compress, Secure, Simplify!</h1>
      <h4 className='discription'>Explore a range of powerful PDF tools to easily convert, compress, encrypt, decrypt, and manage your PDF files.<br/> Fast, secure, and user-friendly for all your PDF needs.</h4>
      <Features></Features>
      </div>
      <div className="about-us-container">
      <div className="about-us-content">
        <h1>About Us</h1>
        <h4>We provide a suite of PDF tools to simplify your document management, including conversion, compression, encryption, and decryption. Our goal is to offer fast, secure, and user-friendly solutions to handle PDF tasks effortlessly.</h4>
        <button type="button" className="btn btn-dark">Learn More</button>
      </div>
      <BsFiletypePdf size={300} className="about-us-icon" />
    </div>

      
      
      
      <Outlet>
      
      </Outlet>
    </div>
  );
};

export default HomePage;
