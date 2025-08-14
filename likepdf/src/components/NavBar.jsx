import React from 'react';
import { Link } from 'react-router-dom';
import { MdPictureAsPdf } from "react-icons/md";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { HiLockClosed } from "react-icons/hi2";
import { HiLockOpen } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";
import { FaTools } from "react-icons/fa";
import "./Navbar.css";
import Login from './Login';


function NavBar() {
  return (

<nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div class="container-fluid">
    <Link class="navbar-brand" to="#"><center><FaTools size={30} /></center> <h4>PDFtools</h4></Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 icons">
        
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/"><IoHome /> Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/convert_pdf_to_word"><MdPictureAsPdf />  PDF to Word</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/compress"><FaCompressArrowsAlt /> Compress</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/decrypt_pdf"><HiLockOpen /> Decrypt</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/encrypt_pdf"><HiLockClosed /> Encrypt</Link>
        </li>
        
        
      </ul>
      <div class="d-flex" >
        {/*<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>*/}
        <Login></Login>
        <button class="btn btn-outline-danger" >Sign up</button>
      </div>
    </div>
  </div>
</nav>

  )
}

export default NavBar


