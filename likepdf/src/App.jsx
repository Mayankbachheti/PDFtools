import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Word from './components/Word'
import PDFCompressor from './components/Compress'
import DecryptPDF from './components/Decrypt'
import EncryptPDF from './components/Encrypt'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';


function App() {
  

  return (
    <>
    
    <BrowserRouter>
    <NavBar></NavBar>
    <div className='cont'>
      <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/convert_pdf_to_word" element={<Word/>}></Route>
          <Route path="/compress" element={<PDFCompressor/>}></Route>
          <Route path="/decrypt_pdf" element={<DecryptPDF/>}></Route>
          <Route path="/encrypt_pdf" element={<EncryptPDF/>}></Route>
      </Routes>
    </div>
    <Footer></Footer>
    </BrowserRouter>
      {/*<Word></Word>*/}
      {/*<PDFCompressor></PDFCompressor>*/}
      {/*<DecryptPDF></DecryptPDF>*/}
      {/*<EncryptPDF></EncryptPDF>*/}
      
    </>
  )
}

export default App
