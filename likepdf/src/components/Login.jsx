import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaTools } from "react-icons/fa";
import "./Login.css";

function Login() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      
      <button type="button" class="btn btn-outline-light " onClick={handleShow}>LogIn</button>
    
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
        <FaTools size={50} />
        </Modal.Header>
        <Modal.Body>

        <form>
   
    <h1 class="h3 mb-3 fw-normal">Login to your account</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
      <label for="floatingPassword">Password</label>
    </div>

    <div class="form-check text-start my-3">
      <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
      <label class="form-check-label" for="flexCheckDefault">
        Remember me
      </label>
    </div>
    <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
    
  </form>

        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default Login;