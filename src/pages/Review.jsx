import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from "react-redux"

import Navbar from "../components/Navbar"

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import BlockIcon from '@mui/icons-material/Block';


import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


// produt slice 
import { setNikeName, seacrhProduct, setSearchProd, setSPStatus } from '../app/productSlice';

// bill slice
import { setCU, setProducts, setBillStatus, addBill } from '../app/billSlice';

// user slice
import { searchUser, setBillUser, setBillUserID, setSearchUsers } from '../app/userSlice';


import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

import List from '@mui/material/List';

// for notification
import { ToastContainer, toast } from 'react-toastify';
import { notify } from "../assets/constant"
import 'react-toastify/dist/ReactToastify.css';


import './styles/Bill.css';
import BillHeader from '../components/BillHeader';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


const columns = [
    { id: 'product', label: 'Product', minWidth: 130 },
    { id: 'price', label: 'Price', minWidth: 70 },
    {
        id: 'qty',
        label: 'Qty',
        minWidth: 40,
        align: 'right'
    },
    {
        id: 'total',
        label: 'Total',
        minWidth: 90,
        align: 'right',

    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 50,
        align: 'center',

    },
    {
        id: 'code',
        label: 'Code',
        minWidth: 50,
        align: 'right',
        format: (value) => value.toFixed(2),
    },

];




const initProduct = {
    
}


const CButton = styled(Button)({
    boxShadow: 'none',

    border: '2px solid #3C3633',

    backgroundColor: '#3C3633',
    color: '#EEEDEB',

    '&:hover': {
        backgroundColor: '#E0CCBE',
        color: '#3C3633',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#E0CCBE',
        color: '#3C3633',

    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});

const RButton = styled(Button)({
    boxShadow: 'none',
    border: '2px solid #3C3633',
    backgroundColor: '#3C3633',
    color: '#B80000',

    '&:hover': {
        backgroundColor: 'rgba(60,54,51,0.5)',
        color: '#B80000',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: 'rgba(60,54,51,0.5)',
        color: '#B80000',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});


function RenderRow(props) {

    const dispatch = useDispatch();

    const { index, style, data } = props;
    const item = data[index];

    const father = item.fatherName === 'none' ? '' : `s/o ${item.fatherName}`
    const post = item.post === 'none' ? '' : `| ${item.post}`
    const village = item.villageName === 'none' ? '' : `| ${item.villageName}`


    const handleClick = (itm) => {

        let id = itm._id;

        dispatch(setCU(`${id}`));
        let { name, fatherName, post, villageName, number } = itm;

        if (name == 'none') {
            name = ''
        }
        if (fatherName == 'none') {
            fatherName = ''
        }
        if (post == 'none') {
            post = ''
        }
        if (villageName == 'none') {
            villageName = ''
        }
        if (number == 'none') {
            number = ''
        }

        dispatch(setBillUser({ name, fatherName, post, villageName, number }));

        notify('Exiting Customer selected', 'info')
    }

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                {/* <ListItemText primary={`Item ${index + 1}`} /> */}

                <Chip label={`${item.name} ${father} ${post} ${village}`} onClick={() => handleClick(item)} style={{ color: 'rgb(238, 237, 235)', background: "rgb(116, 114, 100)" }} />
            </ListItemButton>
        </ListItem>
    );
}

const Review = () => {
    return (
        <>
            < Navbar />

            <Box sx={{ paddingBottom: "80px", mx: 'auto', minHeight: "100dvh" }} >

                <h1>Review Section</h1>

                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                        my: 2,
                        mx: 'auto'
                    }}
                >

                    <Typography variant="h5"  >Add Review's</Typography>
                    <h2></h2>
                </Box>
                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                        my: 2,
                        mx: 'auto'
                    }}
                >
                    <FormControl sx={{ width: "100%" }}>
                        {/* value={prodTypeVal}  */}
                        <TextField fullWidth label="Enter Youtude Url" size="small" />
                    </FormControl>
                </Box>
                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                        my: 2,
                        mx: 'auto'
                    }}
                >
                    <FormControl sx={{ width: "100%" }}>
                        {/* value={prodTypeVal}  */}
                        <TextField fullWidth label="Enter Title" size="small" />
                    </FormControl>
                </Box>

                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                        my: 2,
                        mx: 'auto'
                    }}
                >
                    <FormControl sx={{ width: "100%" }}>
                        {/* value={prodTypeVal}  */}
                        <TextField fullWidth label="Enter Meta Text" size="small" />
                    </FormControl>
                </Box>

                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                        my: 2,
                        mx: 'auto'
                    }}
                >
                    <FormControl sx={{ width: "100%" }}>
                        {/* value={prodTypeVal}  */}
                        <TextField fullWidth label="Enter Star (Rating)" size="small" />
                    </FormControl>
                </Box>
                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                        my: 2,
                        mx: 'auto'
                    }}
                >
                    <FormControl sx={{ width: "100%" }}>
                        {/* value={prodTypeVal}  */}
                        <TextField type='number' label="Enter Number" size="small" />
                    </FormControl>
                </Box>

                <FormControl sx={{ margin: "0", width: "100%" }}>
                    <CButton variant="contained">Add Review</CButton>
                </FormControl>


            </Box>


        </>
    )
}

export default Review