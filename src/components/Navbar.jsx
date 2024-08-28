




import React from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';

import { NavLink } from "react-router-dom"


import "./styles/Navbar.css"

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#EEEDEB",
  fontWeight: "500",
  backgroundColor: "#3C3633",
  '&:hover': {
    backgroundColor: "#747264",
    color: "#3C3633",
    borderColor: '#3C3633',
    fontWeight: "600",
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#747264',
    color: "#3C3633",
    fontWeight: "600",
    borderColor: '#3C3633',
  },


}));


const BottamContainer = styled(Container)({

  marginLeft: "auto",
  boxSizing: "border-box",
  marginRight: "auto",

  paddingLeft: "16px",
  paddingRight: "16px",
  // transform: "translateY( calc(100dvh - 10dvh))",
  bottom: "0",
  right: "0",
  width:"100vw !important",
  maxWidth:"none !important",
  position: "fixed",
  zIndex: "100000"

})

const Navbar = () => {
  return (

    <>

      <CssBaseline />
      <BottamContainer maxWidth="sm"  sx={{maxHeight:"80px"}}   >
        <Box sx={{
          bgcolor: '#747264', height: '10dvh', mx: -4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: 1,
          },

        }} >



          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <NavLink to={"/"} >   <ColorButton>Category/Product</ColorButton></NavLink>
            {/* <NavLink to={"/product"} >  <ColorButton>  Category </ColorButton></NavLink> */}
            {/* <NavLink to={"/user"} >  <ColorButton>   User</ColorButton></NavLink> */}
            {/* <NavLink to={"/profile"} >  <ColorButton>Profile</ColorButton></NavLink> */}
            <NavLink to={"/review"} >  <ColorButton>Review</ColorButton></NavLink>
            <NavLink to={"/media"} >  <ColorButton> Media </ColorButton></NavLink>
            <NavLink to={"/contact"} >  <ColorButton> Contact </ColorButton></NavLink>
          </ButtonGroup>


        </Box>
      </BottamContainer>




    </>
  )
}

export default Navbar