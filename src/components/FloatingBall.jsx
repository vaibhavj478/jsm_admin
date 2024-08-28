import React, { useEffect, useRef, useState } from 'react';
import './styles/FloatingBall.css'; // You can style the ball as per your preference


import { styled } from '@mui/material/styles';


import { useDispatch, useSelector } from "react-redux"

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';


import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';

import { blue } from '@mui/material/colors';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getAllList } from '../app/billSlice';
import DatePicker from './DatePicker';

dayjs.extend(utc);
dayjs.extend(timezone);

const columns = [
    { id: 'customer', label: 'Customer', minWidth: 130 },
    { id: 'total', label: 'Total', minWidth: 70 },
    {
        id: 'due',
        label: 'Due',
        minWidth: 40,
        align: 'right'
    },
    {
        id: 'date',
        label: 'Date',
        minWidth: 40,
        align: 'right'

    },
    {
        id: 'items',
        label: 'Items',
        minWidth: 90,
        align: 'right',

    },


];


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


const FloatingBall = () => {

    const dispatch = useDispatch();

    const { listAll, billStatus } = useSelector((state) => state.bill);

    const { billUserId, billUser } = useSelector((state) => state.user)

    const [open, setOpen] = useState(false);

    const [word, setWord] = useState("");



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);

    };


    // ball 
    const [ballPosition, setBallPosition] = useState(getPosition());

    const ref = useRef(null);

    const [seDate, setSeDate] = useState(dayjs());

    const refDate = useRef(null);

    const [from, setFrom] = useState(dayjs().subtract(1, 'day'));
    const [to, setTo] = useState(dayjs());

    const refFrom = useRef(null);
    const refTo = useRef(null);




    const handleBallTouchStart = (event, name) => {

        event.preventDefault()
        event.stopPropagation()

        console.log("touch start");

        const ballRef = ref.current
        const rect = ballRef.getBoundingClientRect();

        const offsetX = event.targetTouches[0].clientX - rect.left
        const offsetY = event.targetTouches[0].clientY - rect.top

        const mouseMove = (e) => {
            e.preventDefault()
            e.stopPropagation()

            console.log("touch move");

            console.log(e);
           

            const newX = e.targetTouches[0].clientX - offsetX;
            const newY = e.targetTouches[0].clientY - offsetY;

            ballRef.style.left = `${newX}px`
            ballRef.style.top = `${newY}px`
        }

        const mouseUp = (e) => {
            e.preventDefault()
            e.stopPropagation()
 console.log("touch end");
           

            const screenWidth = window.innerWidth;
            const halfScreenWidth = screenWidth / 2;

            e.target.removeEventListener("touchend", mouseUp)
            e.target.removeEventListener("touchmove", mouseMove)
            // checking left or right

            const rectFinal = ballRef.getBoundingClientRect();
            const ballX = rectFinal.left;

            setBallPosition({ x: 0, y: rectFinal.top });

            console.log(rectFinal);
            if (ballX <= halfScreenWidth) {
                ballRef.style.left = `0px`
                setBallPosition({ x: 0, y: rectFinal.top });
                localStorage.setItem("ballPosition", JSON.stringify({ x: 0, y: rectFinal.top }))
            } else {
                ballRef.style.left = `${screenWidth - rectFinal.width - 10}px`
                setBallPosition({ x: screenWidth - rectFinal.width - 10, y: rectFinal.top }); // Adjust 100 according to ball size
                localStorage.setItem("ballPosition", JSON.stringify({ x: screenWidth - rectFinal.width - 10, y: rectFinal.top }))
            }
        }

        event.target.addEventListener("touchend", mouseUp)
        event.target.addEventListener("touchmove", mouseMove)

    };
    const handleBallDrag = (event, name) => {

        event.stopPropagation()
        console.log(" start");
        const ballRef = ref.current
        const rect = ballRef.getBoundingClientRect();

        const offsetX = event.clientX - rect.left
        const offsetY = event.clientY - rect.top

        // console.log(ballRef.getBoundingClientRect().left + "left", ballRef.getBoundingClientRect().top + "top");

        const mouseMove = (e) => {
            e.stopPropagation()

            console.log("move");
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;

            ballRef.style.left = `${newX}px`
            ballRef.style.top = `${newY}px`
        }

        const mouseUp = (e) => {

            e.stopPropagation()
            console.log("up");
            const screenWidth = window.innerWidth;
            const halfScreenWidth = screenWidth / 2;
            e.target.removeEventListener("mouseup", mouseUp)
            e.target.removeEventListener("mousemove", mouseMove)

            // checking left or right
            const rectFinal = ballRef.getBoundingClientRect();
            const ballX = rectFinal.left;

            if (ballX <= halfScreenWidth) {
                ballRef.style.left = `0px`
                setBallPosition({ x: 0, y: rectFinal.top });
                localStorage.setItem("ballPosition", JSON.stringify({ x: 0, y: rectFinal.top }))
            } else {
                ballRef.style.left = `${screenWidth - rectFinal.width - 10}px`
                setBallPosition({ x: screenWidth - rectFinal.width - 10, y: rectFinal.top }); // Adjust 100 according to ball size

                localStorage.setItem("ballPosition", JSON.stringify({ x: screenWidth - rectFinal.width - 10, y: rectFinal.top }))
            }

        }

        event.target.addEventListener("mouseup", mouseUp)
        event.target.addEventListener("mousemove", mouseMove)

    };



    useEffect(() => {
        console.log("I am calling")
        dispatch(getAllList());

    }, [billStatus, billUserId, billUser]);


    // console.log("hello date")
    // console.log(dayjs())
    // console.log(dayjs().subtract(1, 'day'));



    return (
        <>
            <div
                className="floating-ball"
                style={{ left: ballPosition.x, top: ballPosition.y }}
                onMouseDown={(e) => handleBallDrag(e, "mouse down")}
                // onMouseUp={handleBallRelease}
                onTouchStart={(e) => handleBallTouchStart(e, "touch start")}
                // onTouchEnd={handleBallRelease}

                ref={ref}

            >
                <div className="ball" style={{}} onClick={handleClickOpen} > Bills</div>
            </div>


            <Dialog maxWidth={"md"} style={{ padding: "0.5rem" }} onClose={handleClose} open={open}>
                <DialogTitle>  Bills</DialogTitle>


                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                        my: 2,
                        mx: 'auto',
                        p: 2
                    }}
                >
                    <Stack direction={"row"} sx={{ justifyContent: "space-evenly" }} >

                        <Typography variant="h5"  >
                            <Stack spacing={2}>

                                <em onClick={() => refFrom.current.click()}  >From - {from.tz('Asia/Kolkata').format('YYYY-MM-DD')}</em>

                            </Stack>

                        </Typography>

                        <Typography variant="h5"  >
                            <Stack spacing={2}>

                                <em onClick={() => refTo.current.click()}  >To - {to.tz('Asia/Kolkata').format('YYYY-MM-DD')}</em>

                            </Stack>

                        </Typography>

                    </Stack>

                    <FormControl sx={{ mt: 2, px: 2, marginBottom: "0", width: "100%" }}>
                        {/* value={prodTypeVal}  */}
                        <TextField value={word} onChange={(e) => console.log(e.target.value)} fullWidth label="Name Work Number" size="small" />
                    </FormControl>


                    {
                        listAll.length === 0 ? <>   <Typography variant="h5"  >No Bill's Today</Typography>  </>
                            : <>

                                <Paper sx={{ width: '100%', overflow: 'hidden' ,  my:2}}>
                                    {/* sx={{ maxHeight: 440 }} */}
                                    <TableContainer >
                                        <Table size={true ? 'small' : 'medium'} stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    {columns.map((column) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{ minWidth: column.minWidth }}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {listAll.map((el, ind) => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={el._id}>

                                                            <TableCell >

                                                                <span>{el.customer.name} {el.customer.fatherName != 'none' ? ('S/O ' + el.customer.fatherName) : ""} {el.customer.post != "none" ? ('-' + el.customer.post) : ""} {el.customer.villageName != "none" ? ('-' + el.customer.villageName) : ""}</span>
                                                            </TableCell>
                                                            <TableCell align={'right'} >
                                                                {el.totalAmount}

                                                            </TableCell>
                                                            <TableCell align={'center'}  >

                                                                {
                                                                    el.installment ? (el.totalAmount - el.installment.reduce((acc, el) => (acc + el.amount), 0)) : el.totalAmount
                                                                }



                                                            </TableCell>
                                                            <TableCell align={'right'}>
                                                                {el.createdAt.split("T")[0]}
                                                            </TableCell>



                                                            <TableCell align={'center'}>

                                                                {el.productsCount}
                                                            </TableCell>



                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </Paper>



                            </>
                    }





                </Box>


            </Dialog>

            <DatePicker value={from} setValue={setFrom} minDate={dayjs().subtract(10, 'year')} maxDate={dayjs().subtract(1, 'day')} refDate={refFrom} />
            <DatePicker value={to} setValue={setTo} minDate={from} maxDate={dayjs()} refDate={refTo} />

        </>
    );
};

export default FloatingBall;


const getPosition = () => {

    if (JSON.parse(localStorage.getItem("ballPosition"))) return JSON.parse(localStorage.getItem("ballPosition"));

    return { x: 0, y: 0 };
}