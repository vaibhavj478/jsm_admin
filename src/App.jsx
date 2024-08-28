import { useEffect, useState } from 'react'

import './App.css'

import { useDispatch, useSelector } from "react-redux";


import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Product from "./pages/Product"




import { Route, Routes } from "react-router-dom"
import { display } from '@mui/system';
// import FloatingBall from './components/FloatingBall';
import BillView from './pages/BillView';
import Review from './pages/Review';
import Media from './pages/Media';

// for notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from './pages/Contact';

function App() {

  const state = useSelector((state) => state)

  const dispatch = useDispatch();


  useEffect(() => {

  
    console.log("Call at home");

  }, []);

  return (
    <>




      <CssBaseline />
      {/* <FloatingBall /> */}
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#EEEDEB', height: '100%', p: 1 }} >


          <span style={{ display: "inline-block", height: "20px", width: "20px", border: "2px solid black", background: "#EEEDEB" }} ></span>
          <span style={{ display: "inline-block", height: "20px", width: "20px", border: "2px solid black", background: "#E0CCBE" }} ></span>
          <span style={{ display: "inline-block", height: "20px", width: "20px", border: "2px solid black", background: "#747264" }} ></span>
          <span style={{ display: "inline-block", height: "20px", width: "20px", border: "2px solid black", background: "#3C3633" }} ></span>

          <Routes>

            <Route path='/login' element={<Login />} >  </Route>
            <Route path='/sign-up' element={<Signup />} >  </Route>

            <Route path='/' element={<Product />} ></Route>
            {/* <Route path='/:billId' element={<BillView />} ></Route> */}
            {/* <Route path='/product' element={} ></Route> */}
            {/* <Route path='/user' element={<User />} ></Route> */}
            {/* <Route path='/profile' element={<Profile />} ></Route> */}
            <Route path='/review' element={<Review />} ></Route>
            <Route path='/media' element={<Media />} ></Route>
            <Route path='/contact' element={<Contact />} ></Route>



          </Routes>




        </Box>
      </Container>




      {/* for notification */}
      < ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />



    </>
  )
}

export default App
