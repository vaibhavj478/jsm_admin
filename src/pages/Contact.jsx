import React, { useEffect, useState } from 'react'

import axios from 'axios';

import { useDispatch, useSelector } from "react-redux"

import Navbar from "../components/Navbar"

import { styled } from '@mui/material/styles';

import RecursiveChipList from "../components/RecursiveChipList"

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';


import TextField from '@mui/material/TextField';


import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormLabel from '@mui/material/FormLabel';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';

import { DataGrid } from '@mui/x-data-grid';

// redux function 

import {  getCat, getCatLine, delCat, createCat, addProd } from '../app/productSlice';


import 'react-toastify/dist/ReactToastify.css';
import useIncDec from '../hook/useIncDec';
import { notify } from '../assets/constant';
import url from '../app/url';

const Contact = () => {


    const [contact, setContact ] =  useState([]);
    const [status,  setStatus] =  useState("success")
    const getContact =  async () =>{

        try {
            setStatus("loading")

            let res =  await axios(`${url}/get-contact`)

            if( res.data.success){
                setContact([ ...res.data.contacts]);
            }

            setStatus("success")
            
            console.log(contact);

        } catch (error) {
            console.log(error.message)
            notify(`${error.message}` ,  "success");
            setStatus("success")
        }


    }

    useEffect(()=>{
        getContact();
    }, []);



  return (
    <>

    < Navbar />

    <Box sx={{ paddingBottom: "80px", minHeight: "100dvh" }} >

        <h1>Contacts</h1>

        <Divider  />


        {/* <Typography variant="h5"  >Upload</Typography> */}



        <Divider  />
        <Box >

            Hi
        </Box >


        

    </Box >



</>
  )
}

export default Contact