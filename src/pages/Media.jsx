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


// redux function 

import { getCat, getCatLine, delCat, createCat, addProd } from '../app/productSlice';


import 'react-toastify/dist/ReactToastify.css';
import useIncDec from '../hook/useIncDec';
import { notify } from '../assets/constant';
import url from '../app/url';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

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


const Media = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const [allImages, setAllImages] = useState([])

    const [imagesStatus, setImagesStatus] = useState('success');

    const [deleteStatus, setDeleteStatus] = useState("");
    const [deleteMsg, setDeleteMsg] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
        } else {
            alert('Please select a valid image file');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            notify("No file selected", "error");
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:8080/api-v1/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully:', response.data);
            if (response.data.message.length) {
                notify("Image is uploaded", "success");
            }
            setSelectedFile(null);

        } catch (error) {
            console.error('Error uploading file:', error);
            setSelectedFile(null);
        }
    };

    const getAllImagesApi = async () => {
        try {
            setImagesStatus('loading');
            const res = await axios.get(`${url}/get-images`)

            if (res.data.success) {
                setAllImages(res.data.images)
                console.log(allImages);
            }
            setImagesStatus('success');

        } catch (error) {
            setAllImages([]);
            setImagesStatus('error');
        }
    }

    const handleCopy = (val) => {

        navigator.clipboard.writeText(val);
        notify("URL copied to clipboard", "success")

    }

    const handleDelete = async (val) => {
      //  notify(`${val}`, "success")
        try {
            let res = await axios.post(`${url}/delete-images`, { url: val })
            console.log(res.data);

            if (res.data.success == false) {

                if (res.data?.data.length > 0) {
                    let key = val.split("/").pop();
                    setDeleteStatus(key);
                    setDeleteMsg(res.data?.data);
                    notify(`${res.data.message}`, "error");
                }

            } else if(res.data.success == true) {

                setDeleteStatus("");
                setDeleteMsg([]);
                notify(`${res.data.message}`, "success");
            }
            getAllImagesApi();

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getAllImagesApi();
    }, [selectedFile])


    return (
        <>

            < Navbar />

            <Box sx={{ paddingBottom: "80px", minHeight: "100dvh" }} >

                <h1>Media Section</h1>

                <Divider flexItem />

                <Typography variant="h5"  >Upload</Typography>


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
                        <TextField fullWidth value={""} label="Enter" size="small" />
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

                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file" onChange={handleFileChange} accept="image/*" />
                    </Button>

                </Box>

                <FormControl sx={{ margin: "0", width: "100%" }}>
                    <CButton onClick={handleUpload} disabled={!selectedFile} variant="contained">Upload</CButton>
                </FormControl>

                <h1>Image's Section</h1>

                <Divider flexItem />


                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                        my: 2,
                        mx: 'auto'
                    }}
                >

                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {allImages.map((value, ind) => (
                            <ListItem
                                key={ind}

                                disableGutters
                            // secondaryAction={

                            // }
                            >
                                {/* <ListItemText primary={`${value}`} /> */}

                                <Box>
                                    <Box>
                                        <img src={`${value}`} width={"100%"} alt="" />
                                    </Box>
                                    <Box sx={{padding:"0.5rem"}}>
                                          {
                                            value.split("/")[value.split("/").length - 1] == deleteStatus ? 
                                            <>
                                                {
                                                    deleteMsg.map((el,ind)=> <p style={{color:"#C40C0C", fontWeight:600 }} >❤ {el}</p>)
                                                }
                                            </>
                                            : <></> 

                                          }
                                    </Box>
                                    <Box>
                                        <IconButton onClick={() => handleDelete(value)} aria-label="comment">
                                            <DeleteIcon />
                                        </IconButton>

                                        <IconButton onClick={() => handleCopy(value)} aria-label="comment">
                                            <ContentCopyIcon />
                                        </IconButton>

                                    </Box>
                                </Box>

                            </ListItem>
                        ))}
                    </List>


                </Box >

            </Box >



        </>
    )
}

export default Media


