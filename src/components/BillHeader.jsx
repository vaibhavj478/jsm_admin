import React from 'react'

import Box from '@mui/material/Box';

import Paper from '@mui/material/Paper';


import { useDispatch, useSelector } from "react-redux"

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';


import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useRef } from 'react';

const BillHeader = (prop) => {

    const { billUser, billUserId } = useSelector((state) => state.user);

     const ref  =  useRef(null);

    //  billUser: {
    //     name: "",
    //     fatherName: "",
    //     post: "",
    //     villageName: "",
    //     number: ""
    // },

    // console.log(prop)

    const handleDownload = () => {
        const svgContent = `<svg id="SvgjsSvg1001" width="56" height="56" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"><defs id="SvgjsDefs1002"></defs><g id="SvgjsG1008"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="56" height="56"><path fill="#fcc72d" d="M40.44 44.01c-2.26 1.71-10.69 2.04-10.69 2.04l-3.93-6.36-1.32-2.14 13.6-4.04c.95.22 1.79.63 2.5 1.19l.02.02c.49.37.91.82 1.28 1.32 1.6 2.18.8 6.26-1.46 7.97z" className="colorfcc72d svgShape"></path><path fill="#efb014" d="M40.44 44.01c-2.26 1.71-10.69 2.04-10.69 2.04l-3.93-6.36c3.61-.12 4.77 2.94 4.77 2.94s7 1.37 9.25-2.6c2.09-3.69.95-5.12.78-5.31.49.37.91.82 1.28 1.32 1.6 2.18.8 6.26-1.46 7.97z" className="colorefb014 svgShape"></path><path fill="#ef966a" d="M13.35 12.59c-2.34.06-3.99-2.08-3.99-2.08s-1.04 2.38 0 3.62c1.04 1.25.06 3.09 1.11 4.4 1.04 1.31 2.8 1.78 2.68 3.8-.12 2.02 5.43-1.32 5.43-1.32l.19-4.57-1.99-1.62c-.02.01-1.09-2.29-3.43-2.23zm24.79-2.08s-1.66 2.14-3.99 2.08c-2.34-.06-3.41 2.24-3.41 2.24l-2.66 1.18.86 5s5.55 3.34 5.43 1.32 1.63-2.49 2.68-3.8c1.04-1.31.06-3.15 1.11-4.4 1.02-1.25-.02-3.62-.02-3.62zm-3.68 20.47v3.61l-2.19 1.46c-1.72 1.87-3.37 3.66-6.26 3.97-.33.03-1.76-.17-2.1-.16l-3.75-.08-6.73-5.03.3-7.65 1.25-2.29c.9-1.06 2.06-1.95 3.4-2.61.29-.14.58-.27.89-.39h.13l8.71-.01h.12c.31.12.61.26.9.4 1.22.59 2.29 1.39 3.15 2.32l2.18 6.46z" className="coloref966a svgShape"></path><path fill="#ff2936" d="M29.12 22.21v5.07c0 .42-.14 1.23-.16 1.32a5.383 5.383 0 0 1-5.21 4.08c-2.96 0-5.37-2.41-5.37-5.37v-5.09c.29-.14.58-.27.89-.39h.13v5.48c0 2.4 1.95 4.35 4.35 4.35 1.98 0 3.72-1.35 4.21-3.27.04-.18.14-.83.14-1.1v-5.47h.12c.31.11.62.24.9.39z" className="colorff2936 svgShape"></path><path fill="#ffbd9c" d="M29.41 16.64s1.15 2.9-1.09 5.09c-.4.39-.9.76-1.54 1.08h-6.06c-.66-.34-1.19-.72-1.58-1.12-.01 0-.01-.01-.02-.01-2.17-2.19-1.04-5.04-1.04-5.04l-.82-2.55.89-3.1 8.82.19 3.33 2.53-.89 2.93zM15.44 25.49v6.81l-4.9-2.87v-3.28l.84-.25 1.45-.8 1.45.55z" className="colorffbd9c svgShape"></path><path fill="#f4a989" d="M20.18 45.85c-1.02 1.19-.23 1.65-.23 1.65h4.19l1.21-1.23.8-1.83-2.01-1.81-3.39 1.1-.57 2.12z" className="colorf4a989 svgShape"></path><path fill="#fcc72d" d="M31.52 8.3c-1.14-5.42-5.43-6.09-5.43-6.09S25.14.5 23.75.5 21.4 2.22 21.4 2.22s-4.29.66-5.43 6.09c-1.14 5.42 2.1 8.33 2.1 8.33s-.18-1.85 1.51-3.44c1.69-1.59 4.17-.35 4.17-.35s2.48-1.23 4.17.35 1.51 3.44 1.51 3.44 3.23-2.92 2.09-8.34z" className="colorfcc72d svgShape"></path><path fill="#ffbd9c" d="M20.72 19.68V25c0 3.35 3.74 5.46 6.76 3.81l.98-.53 1.81-.99c.9-.49 2.11-.09 2.36.87.02.07.03.14.03.21.05.84-.23 1.85.32 1.85s1.05-.72 1.19-1.22c0 0 1.55.25 1.96-.19.41-.44-1.46-1.5-1.6-1.72s-1.63-2.8-3.46-3.02c-.98-.12-2.16.15-2.84.28-.81.15-1.47-.72-1.47-1.53v-3.09" className="colorffbd9c svgShape"></path><path fill="#424852" d="M19.6 16.63c.55-.09.92.07 1.24.29.3.25.56.55.63 1.11-.55.09-.92-.07-1.24-.29-.31-.24-.56-.55-.63-1.11zm8.3 0c-.07.56-.33.86-.63 1.11-.32.22-.69.38-1.24.29.07-.56.33-.86.63-1.11.32-.21.68-.38 1.24-.29z" className="color424852 svgShape"></path><path fill="#efb118" d="M17.65 10.12c.03-1.3.5-2.68 1.48-3.67.47-.5 1.03-.93 1.65-1.25.62-.33 1.25-.56 1.98-.69h.07c.62-.01 1.24-.01 1.86 0h.07c.73.13 1.36.36 1.98.69.61.32 1.18.74 1.65 1.25.98.99 1.45 2.38 1.47 3.67-.23-.62-.42-1.23-.79-1.74-.32-.54-.74-1-1.2-1.39-.46-.39-.99-.71-1.54-.96-.55-.24-1.16-.43-1.71-.52h.07c-.62.01-1.24.01-1.86 0h.07c-.55.09-1.16.28-1.71.52-.55.25-1.07.57-1.54.96s-.88.85-1.2 1.39c-.37.52-.57 1.12-.8 1.74z" className="colorefb118 svgShape"></path><path fill="#ffbd9c" d="M15.4 31.5v-1.58c0-1.01.82-1.83 1.83-1.83h.03v2.83a3.82 3.82 0 1 1-7.64 0v-4.39" className="colorffbd9c svgShape"></path><path fill="#ffbd9c" d="M11.07 28.74v-2.69c0-.4-.33-.73-.73-.73-.4 0-.73.33-.73.73v3.17" className="colorffbd9c svgShape"></path><path fill="#ffbd9c" d="M12.53 28.74v-3.43c0-.4-.33-.73-.73-.73-.4 0-.73.33-.73.73v.73m2.92 2.7v-4.01c0-.4-.33-.73-.73-.73-.4 0-.73.33-.73.73v.59" className="colorffbd9c svgShape"></path><path fill="#ffbd9c" d="M15.44 29.43v-3.94c0-.4-.33-.73-.73-.73-.4 0-.73.33-.73.73m22.66 9.47v-2.69c0-.4.33-.73.73-.73.4 0 .73.33.73.73v3.38a2.76 2.76 0 0 1-2.76 2.76h-.31a2.76 2.76 0 0 1-2.76-2.76v-3.94c0-.4.33-.73.73-.73.4 0 .73.33.73.73" className="colorffbd9c svgShape"></path><path fill="#ffbd9c" d="M35.19 34.96v-3.43c0-.4.33-.73.73-.73.4 0 .73.33.73.73v.73m-2.92 2.7v-4.01c0-.4.33-.73.73-.73.4 0 .73.33.73.73v.59m-6.15 10.38c-.13-.77-.72-1.38-1.48-1.55l-3.42-.77-.78-.24-1.08 4.19s1.53-.86 2.52.51c.99 1.38-.22 3.43 2.15 3.43s2.81-1.45 2.81-1.45l-.72-4.12z" className="colorffbd9c svgShape"></path><path fill="#fcc72d" d="M24.13 38.78s-.37 1.43-.91 2.83c-.4 1.05-.9 2.08-1.4 2.46-1.16.88-2.48 3.43-4.08 3.43S5.61 44.07 5.28 40.01c-.19-2.35.8-3.79 2.41-4.54l.01-.01c2.35-1.13 6-.82 9.11.16 5.23 1.65 7.32 3.16 7.32 3.16z" className="colorfcc72d svgShape"></path><path fill="#ff2936" d="M23.16 13.91h1.02v2.1h-1.02zM21.53 14.41h1.02v1.09h-1.02zM24.79 14.41h1.02v1.09h-1.02z" className="colorff2936 svgShape"></path><path fill="#ffbd9c" d="m33.35 31.71.71-.13 1.34-.16 1.48.87.66 3.16-1.12 1.21-3.49-3.91z" className="colorffbd9c svgShape"></path><circle cx="23.75" cy="34.96" r=".71" fill="#ba5e36" className="colorba5e36 svgShape"></circle><path fill="#e5a20c" d="M26.3 8.52c0 1.36-1.14 2.47-2.56 2.47s-2.56-1.11-2.56-2.47 2.56-4.73 2.56-4.73 2.56 3.36 2.56 4.73z" className="colore5a20c svgShape"></path><circle cx="23.67" cy="8.41" r="1.22" fill="#ff2936" className="colorff2936 svgShape"></circle><path fill="#f4a989" d="M20.72 19.91v2.9c-.66-.34-1.19-.72-1.58-1.12 1.39.81 1.58-1.78 1.58-1.78zM28.32 21.73c-.4.39-.9.76-1.54 1.08v-2.74c-.01 1.89 1.35 1.69 1.54 1.66z" className="colorf4a989 svgShape"></path><path fill="#efb014" d="M23.22 41.61c-.4 1.05-.9 2.08-1.4 2.46-1.16.88-2.48 3.43-4.08 3.43S5.61 44.07 5.28 40.01c-.19-2.35.8-3.79 2.41-4.54-.28.3-2 2.27.42 3.89 2.62 1.76 11.23 4.57 12.61 4.07.73-.26 1.72-1.1 2.5-1.82z" className="colorefb014 svgShape"></path></svg></g></svg>`;
        // Create a Blob from the SVG content
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        // Create a link element
        const link = document.createElement('a');
        // Set the download attribute with the desired file name
        link.download = 'downloaded.svg';
        // Create a URL for the Blob and set it as the href attribute
        link.href = window.URL.createObjectURL(blob);
        // Append the link to the document
        document.body.appendChild(link);
        // Trigger a click event on the link to start the download
        link.click();
        // Remove the link from the document
        document.body.removeChild(link);
    };



    return (
        <>
            <Card sx={{ maxWidth: '100%', my: 0, padding: "0.5rem" }} variant="outlined">
                <Box sx={{ maxWidth: '100%', my: 0, padding: "0.25rem" }} >
                    {/* <button > Download SVG </button> */}
                </Box>
                <Box sx={{ maxWidth: '100%', my: 0, margin: "0", display: "flex", justifyContent: "space-between" }} >
                    <div  style={{width:"30%"}} >
                        <h3 style={{ margin: "0 0 0.25rem 0" }} >{billUser.name ? billUser.name  : "Name"}</h3>
                        <Typography sx={{ fontSize: "small" }} >{billUser.fatherName ?  billUser.fatherName : "Father"} </Typography>
                        <Typography sx={{ fontSize: "small" }} > {billUser.number ? billUser.number : "Number" }</Typography>
                    </div>
                    <div className='icon' style={{ width: 'fit-content' }} onClick={handleDownload} >
                        <svg id="SvgjsSvg1001" width="56" height="56" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnssvgjs="http://svgjs.com/svgjs"><defs id="SvgjsDefs1002"></defs><g id="SvgjsG1008"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="56" height="56"><path fill="#fcc72d" d="M40.44 44.01c-2.26 1.71-10.69 2.04-10.69 2.04l-3.93-6.36-1.32-2.14 13.6-4.04c.95.22 1.79.63 2.5 1.19l.02.02c.49.37.91.82 1.28 1.32 1.6 2.18.8 6.26-1.46 7.97z" className="colorfcc72d svgShape"></path><path fill="#efb014" d="M40.44 44.01c-2.26 1.71-10.69 2.04-10.69 2.04l-3.93-6.36c3.61-.12 4.77 2.94 4.77 2.94s7 1.37 9.25-2.6c2.09-3.69.95-5.12.78-5.31.49.37.91.82 1.28 1.32 1.6 2.18.8 6.26-1.46 7.97z" className="colorefb014 svgShape"></path><path fill="#ef966a" d="M13.35 12.59c-2.34.06-3.99-2.08-3.99-2.08s-1.04 2.38 0 3.62c1.04 1.25.06 3.09 1.11 4.4 1.04 1.31 2.8 1.78 2.68 3.8-.12 2.02 5.43-1.32 5.43-1.32l.19-4.57-1.99-1.62c-.02.01-1.09-2.29-3.43-2.23zm24.79-2.08s-1.66 2.14-3.99 2.08c-2.34-.06-3.41 2.24-3.41 2.24l-2.66 1.18.86 5s5.55 3.34 5.43 1.32 1.63-2.49 2.68-3.8c1.04-1.31.06-3.15 1.11-4.4 1.02-1.25-.02-3.62-.02-3.62zm-3.68 20.47v3.61l-2.19 1.46c-1.72 1.87-3.37 3.66-6.26 3.97-.33.03-1.76-.17-2.1-.16l-3.75-.08-6.73-5.03.3-7.65 1.25-2.29c.9-1.06 2.06-1.95 3.4-2.61.29-.14.58-.27.89-.39h.13l8.71-.01h.12c.31.12.61.26.9.4 1.22.59 2.29 1.39 3.15 2.32l2.18 6.46z" className="coloref966a svgShape"></path><path fill="#ff2936" d="M29.12 22.21v5.07c0 .42-.14 1.23-.16 1.32a5.383 5.383 0 0 1-5.21 4.08c-2.96 0-5.37-2.41-5.37-5.37v-5.09c.29-.14.58-.27.89-.39h.13v5.48c0 2.4 1.95 4.35 4.35 4.35 1.98 0 3.72-1.35 4.21-3.27.04-.18.14-.83.14-1.1v-5.47h.12c.31.11.62.24.9.39z" className="colorff2936 svgShape"></path><path fill="#ffbd9c" d="M29.41 16.64s1.15 2.9-1.09 5.09c-.4.39-.9.76-1.54 1.08h-6.06c-.66-.34-1.19-.72-1.58-1.12-.01 0-.01-.01-.02-.01-2.17-2.19-1.04-5.04-1.04-5.04l-.82-2.55.89-3.1 8.82.19 3.33 2.53-.89 2.93zM15.44 25.49v6.81l-4.9-2.87v-3.28l.84-.25 1.45-.8 1.45.55z" className="colorffbd9c svgShape"></path><path fill="#f4a989" d="M20.18 45.85c-1.02 1.19-.23 1.65-.23 1.65h4.19l1.21-1.23.8-1.83-2.01-1.81-3.39 1.1-.57 2.12z" className="colorf4a989 svgShape"></path><path fill="#fcc72d" d="M31.52 8.3c-1.14-5.42-5.43-6.09-5.43-6.09S25.14.5 23.75.5 21.4 2.22 21.4 2.22s-4.29.66-5.43 6.09c-1.14 5.42 2.1 8.33 2.1 8.33s-.18-1.85 1.51-3.44c1.69-1.59 4.17-.35 4.17-.35s2.48-1.23 4.17.35 1.51 3.44 1.51 3.44 3.23-2.92 2.09-8.34z" className="colorfcc72d svgShape"></path><path fill="#ffbd9c" d="M20.72 19.68V25c0 3.35 3.74 5.46 6.76 3.81l.98-.53 1.81-.99c.9-.49 2.11-.09 2.36.87.02.07.03.14.03.21.05.84-.23 1.85.32 1.85s1.05-.72 1.19-1.22c0 0 1.55.25 1.96-.19.41-.44-1.46-1.5-1.6-1.72s-1.63-2.8-3.46-3.02c-.98-.12-2.16.15-2.84.28-.81.15-1.47-.72-1.47-1.53v-3.09" className="colorffbd9c svgShape"></path><path fill="#424852" d="M19.6 16.63c.55-.09.92.07 1.24.29.3.25.56.55.63 1.11-.55.09-.92-.07-1.24-.29-.31-.24-.56-.55-.63-1.11zm8.3 0c-.07.56-.33.86-.63 1.11-.32.22-.69.38-1.24.29.07-.56.33-.86.63-1.11.32-.21.68-.38 1.24-.29z" className="color424852 svgShape"></path><path fill="#efb118" d="M17.65 10.12c.03-1.3.5-2.68 1.48-3.67.47-.5 1.03-.93 1.65-1.25.62-.33 1.25-.56 1.98-.69h.07c.62-.01 1.24-.01 1.86 0h.07c.73.13 1.36.36 1.98.69.61.32 1.18.74 1.65 1.25.98.99 1.45 2.38 1.47 3.67-.23-.62-.42-1.23-.79-1.74-.32-.54-.74-1-1.2-1.39-.46-.39-.99-.71-1.54-.96-.55-.24-1.16-.43-1.71-.52h.07c-.62.01-1.24.01-1.86 0h.07c-.55.09-1.16.28-1.71.52-.55.25-1.07.57-1.54.96s-.88.85-1.2 1.39c-.37.52-.57 1.12-.8 1.74z" className="colorefb118 svgShape"></path><path fill="#ffbd9c" d="M15.4 31.5v-1.58c0-1.01.82-1.83 1.83-1.83h.03v2.83a3.82 3.82 0 1 1-7.64 0v-4.39" className="colorffbd9c svgShape"></path><path fill="#ffbd9c" d="M11.07 28.74v-2.69c0-.4-.33-.73-.73-.73-.4 0-.73.33-.73.73v3.17" className="colorffbd9c svgShape"></path><path fill="#ffbd9c" d="M12.53 28.74v-3.43c0-.4-.33-.73-.73-.73-.4 0-.73.33-.73.73v.73m2.92 2.7v-4.01c0-.4-.33-.73-.73-.73-.4 0-.73.33-.73.73v.59" className="colorffbd9c svgShape"></path><path fill="#ffbd9c" d="M15.44 29.43v-3.94c0-.4-.33-.73-.73-.73-.4 0-.73.33-.73.73m22.66 9.47v-2.69c0-.4.33-.73.73-.73.4 0 .73.33.73.73v3.38a2.76 2.76 0 0 1-2.76 2.76h-.31a2.76 2.76 0 0 1-2.76-2.76v-3.94c0-.4.33-.73.73-.73.4 0 .73.33.73.73" className="colorffbd9c svgShape"></path><path fill="#ffbd9c" d="M35.19 34.96v-3.43c0-.4.33-.73.73-.73.4 0 .73.33.73.73v.73m-2.92 2.7v-4.01c0-.4.33-.73.73-.73.4 0 .73.33.73.73v.59m-6.15 10.38c-.13-.77-.72-1.38-1.48-1.55l-3.42-.77-.78-.24-1.08 4.19s1.53-.86 2.52.51c.99 1.38-.22 3.43 2.15 3.43s2.81-1.45 2.81-1.45l-.72-4.12z" className="colorffbd9c svgShape"></path><path fill="#fcc72d" d="M24.13 38.78s-.37 1.43-.91 2.83c-.4 1.05-.9 2.08-1.4 2.46-1.16.88-2.48 3.43-4.08 3.43S5.61 44.07 5.28 40.01c-.19-2.35.8-3.79 2.41-4.54l.01-.01c2.35-1.13 6-.82 9.11.16 5.23 1.65 7.32 3.16 7.32 3.16z" className="colorfcc72d svgShape"></path><path fill="#ff2936" d="M23.16 13.91h1.02v2.1h-1.02zM21.53 14.41h1.02v1.09h-1.02zM24.79 14.41h1.02v1.09h-1.02z" className="colorff2936 svgShape"></path><path fill="#ffbd9c" d="m33.35 31.71.71-.13 1.34-.16 1.48.87.66 3.16-1.12 1.21-3.49-3.91z" className="colorffbd9c svgShape"></path><circle cx="23.75" cy="34.96" r=".71" fill="#ba5e36" className="colorba5e36 svgShape"></circle><path fill="#e5a20c" d="M26.3 8.52c0 1.36-1.14 2.47-2.56 2.47s-2.56-1.11-2.56-2.47 2.56-4.73 2.56-4.73 2.56 3.36 2.56 4.73z" className="colore5a20c svgShape"></path><circle cx="23.67" cy="8.41" r="1.22" fill="#ff2936" className="colorff2936 svgShape"></circle><path fill="#f4a989" d="M20.72 19.91v2.9c-.66-.34-1.19-.72-1.58-1.12 1.39.81 1.58-1.78 1.58-1.78zM28.32 21.73c-.4.39-.9.76-1.54 1.08v-2.74c-.01 1.89 1.35 1.69 1.54 1.66z" className="colorf4a989 svgShape"></path><path fill="#efb014" d="M23.22 41.61c-.4 1.05-.9 2.08-1.4 2.46-1.16.88-2.48 3.43-4.08 3.43S5.61 44.07 5.28 40.01c-.19-2.35.8-3.79 2.41-4.54-.28.3-2 2.27.42 3.89 2.62 1.76 11.23 4.57 12.61 4.07.73-.26 1.72-1.1 2.5-1.82z" className="colorefb014 svgShape"></path></svg></g></svg>
                    </div>
                    <div   style={{width:"30%"}}  >
                        <h3 style={{ margin: "0 0 0.25rem 0" }} >Mansa Trader</h3>
                        <Typography sx={{ fontSize: "small" }}  >Parthem Sen</Typography>
                        <Typography sx={{ fontSize: "small" }}  >+91-9414964708</Typography>
                        {/* <em    >  { prop.billDate.utcOffset('+05:30').toString().split(',')[1].slice(0,12)}</em> */}
                        <em   onClick={()=> ref.current.click()}  >  { prop.billDate.tz('Asia/Kolkata').format('YYYY-MM-DD')}</em>
                    </div>
                </Box>
            </Card>
            <LocalizationProvider  dateAdapter={AdapterDayjs} sx={{ width: "fit-content" }}  >
                <DemoContainer
                    components={[
                        'MobileDatePicker',
                    ]}
                >
                    {/* onChange={(e)=> handleDate(e)}    */}
                    <MobileDatePicker  ref={ref} sx={{ width: "fit-content" ,  display:"none" }} maxDate={dayjs()} onChange={(e)=> prop.setBillDate(e)} value={prop.billDate}  views={['year', 'month', 'day']} />
                </DemoContainer>
            </LocalizationProvider>
        </>
    )
}

export default BillHeader