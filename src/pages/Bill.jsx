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
  _id: "",
  sellQty: '1',
  nikename: "",
  company: "",
  purchasePrice: "",
  sellPrice: "",
  qty: "",
  categoryInfo: "",
  category: "",
  color: "",
  weight: "",
  unit: "",
  productType: "",
  createdAt: "",
  updatedAt: "",

  __v: 0,
  score: 0,
  price: "0"



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

const Bill = () => {
  // store states
  const { billUser, searchUsers, billUserId } = useSelector((state) => state.user);
  const { searchProd, sPStatus, nikeName } = useSelector((state) => state.prod);
  const { bill, bills, billStatus } = useSelector((state) => state.bill)


  // local state
  const [billDate, setBillDate] = useState(dayjs());

  const [editFeild, setEditFeild] = useState("");
  const [editFeildVal, setEditFeildVal] = useState("");

  const [total, setTotal] = useState(0);
  const [paid, setPaid] = useState(0);
  const [paidEdit, setPaidEdit] = useState(false);

  const [isGst, setIsGst] = useState(false)

  const [product, setProduct] = useState(initProduct)

  const enableEditFeilds = (field, value) => {
    if (editFeild) {
      return
    }

    setEditFeild(field);
    setEditFeildVal(value);
  }

  const dispatch = useDispatch();

  const setBillUserAndSearchUser = (val, field) => {

    dispatch(setBillUser({ ...billUser, [field]: val }));

    dispatch(setCU(``));

    if (bill?.customer) {
      notify("Adding New Customer", "info");
      dispatch(setCU(``));
    }

    setTimeout(() => {
      dispatch(searchUser())
    }, 1000);

  }

  const handleClearCu = () => {

    dispatch(setBillUserID(``));

    dispatch(setSearchUsers([]));

    dispatch(setBillUser({ name: "", fatherName: "", post: "", villageName: "", number: "" }));

    notify('Customer Cleared', 'info')
  }

  // product function 
  // for closeing the 

  const cancelBox = () => {
    setTimeout(() => { setEditFeild(""); setEditFeildVal('') }, 100);
  }

  const okBox = () => {
    if (!editFeildVal) {
      return
    }
    purchasePriceQtySet(editFeildVal.trim(), editFeild)

    setTimeout(() => { setEditFeild(""); setEditFeildVal('') }, 100);
  }

  const setNikeNameAndSearchProd = (val, field = null) => {
    if (val == "") {
      dispatch(setNikeName(""));
      return;
    }
    dispatch(setNikeName(val));
    if (nikeName.length > 2) {
      setTimeout(() => {
        dispatch(seacrhProduct());
      }, 1000);
    }
  }

  const purchasePriceQtySet = (val, type) => {

    let newData = bill.products.map((el) => {

      if (el._id == type.split('/')[0]) {
        el = { ...el, [type.split('/')[1]]: val }
      }
      return el
    })

    dispatch(setProducts([...newData]));
  }

  const deletePurchase = (id) => {
    let newData = bill.products.filter((el) => el._id !== id);
    dispatch(setProducts([...newData]));
  }

  const addProdToList = (value) => {
    // console.log(value);
    if (bill.products.find((element) => element._id === value._id)) {
      notify('Already Added', 'error')
      return
    }

    setProduct({ ...product, ...value, price: `${value.sellPrice}` });

    // dispatch(setProducts([...bill.products, { ...value, "sellQty": '1', price: `${value.sellPrice}` }]));

    dispatch(setSPStatus('success'));

    dispatch(setSearchProd([]));
  }

  const addToListNow = () => {

    dispatch(setProducts([...bill.products, product]));

    dispatch(setNikeName(""));

    clearProductCallList();

    notify('Product Added', 'success')

  }

  const clearProductCallList = () => {
    setProduct(initProduct);
    dispatch(seacrhProduct());
  }


  useEffect(() => {
    dispatch(seacrhProduct());

  }, [nikeName]);
  useEffect(() => {

    const sumWithInitial = bill.products.reduce(
      (accumulator, currentValue) => accumulator + (Number(currentValue.price) * Number(currentValue.sellQty)), 0,);

    // console.log(sumWithInitial);
    setTotal(sumWithInitial);

  }, [bill.products]);

  useEffect(() => {
    if (total < paid || !bill.products.length) {
      setPaid(0);
    }
  }, [total, bill.products.length]);


  const addBillNow = () => {

    // console.log(bill)
    // console.log(billUser, billUserId);
    // console.log(total, paid, billDate.tz('Asia/Kolkata').format());

    console.log("Going to add bill")
    if (!bill?.customer && !billUser.name) {
      notify("Add Customer", "info");
      return
    }


    if (!bill.products.length) {
      notify("Add Product", "info");
      return
    }

    let obj = {
      customer: {
        id: bill.customer,
        ...billUser
      },
      products: bill.products,
      totalAmount: total,
      paid,
      createdAt: billDate.tz('Asia/Kolkata').format()

    }

    dispatch(setBillStatus("loading"))

    dispatch(addBill(obj));


    //   customer:
    // products:
    // totalAmount: 
    // paid: 

    // installment: [
    //     {
    //         amount: ,
    //         date: ,
    // createdAt

    // continue

  }
  dispatch(setBillStatus("success"))


  return (
    <>
      <Navbar />


      {
        billStatus == 'loading' ?



          <video style={{ display: "block", width: "100%" }} autoPlay loop muted >
            <source src="https://cdnl.iconscout.com/lottie/premium/thumb/home-5730380-4787666.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>




          :

          <Box sx={{ paddingBottom: "80px", mx: 'auto', minHeight: "100dvh" }} >

            <h1>Bill Section</h1>

            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
                my: 2,
                mx: 'auto'
              }}
            >

              <Typography variant="h5"  >Add Customer's</Typography>
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
                <TextField fullWidth value={billUser.name} onChange={(e) => setBillUserAndSearchUser(e.target.value, 'name')} label="Enter User Name" size="small" />
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
                <TextField fullWidth value={billUser.fatherName} onChange={(e) => setBillUserAndSearchUser(e.target.value, 'fatherName')} label="Enter Father Name" size="small" />
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
                <TextField fullWidth value={billUser.post} onChange={(e) => setBillUserAndSearchUser(e.target.value, 'post')} label="Enter Post" size="small" />
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
                <TextField fullWidth value={billUser.villageName} onChange={(e) => setBillUserAndSearchUser(e.target.value, 'villageName')} label="Enter Village Name" size="small" />
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
                <TextField type='number' fullWidth value={billUser.number} label="Enter Number" onChange={(e) => setBillUserAndSearchUser(e.target.value, 'number')} size="small" />
              </FormControl>
            </Box>

            <FormControl sx={{ margin: "0", width: "100%" }}>
              <CButton onClick={handleClearCu} variant="contained">Customer  Clear</CButton>
            </FormControl>

            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
                my: 2,
                mx: 'auto'
              }}
            >

              {searchUsers.length ? <Box
                sx={{ width: '100%', mx: 'auto', height: 200, maxWidth: 350, bgcolor: 'rgb(224, 204, 190);' }}
              >
                <FixedSizeList
                  height={200}
                  // width={360}
                  itemSize={40}
                  itemCount={searchUsers.length}
                  overscanCount={5}
                  itemData={searchUsers}
                >
                  {RenderRow}

                </FixedSizeList>
              </Box> : <Typography sx={{ textAlign: "center" }} variant="h3"  >No customer found</Typography>}

            </Box>

            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
                my: 2,
                mx: 'auto'
              }}
            >
              <FormControl sx={{ mt: 2, marginBottom: "0", width: "100%" }}>
                {/* value={prodTypeVal}  */}
                <TextField value={nikeName} onChange={(e) => setNikeNameAndSearchProd(e.target.value)} fullWidth label="Company prod-type category" size="small" />
              </FormControl>
            </Box>

            <Box
              sx={{

                maxWidth: '100%',
                m: 0,
                mx: 'auto',
                marginTop: "0"
              }}
            >
              {sPStatus === 'loading' && <h1>Loading...</h1>}

              {sPStatus === 'success' &&

                <>

                  {
                    product._id ? <>
                      <Box
                        sx={{
                          maxWidth: '100%',
                          my: 2,
                          border: "1px solid #747264",
                          mx: 'auto',
                          padding: "0.5rem",
                          backgroundColor: "white"
                        }}
                      >

                        <Stack spacing={2}>
                          <Box sx={{ fontWeight: "600" }}  >  <span>{product.nikename} </span>  </Box>
                          <Box>
                            <Stack direction="row" spacing={2} >
                              <Box> <b> Oty:</b> <span>{product.sellQty}   <TextField
                                sx={{ width: "100%" }}
                                label={`Set Qty`}
                                type="number"
                                size="small"
                                value={product.sellQty}
                                inputmode="numeric" pattern="[0-9]*"

                                onChange={(e) => setProduct({ ...product, sellQty: e.target.value.trim() })}
                              />   </span>    </Box>
                              <Box>  <b> Price: </b><span>{product.price}

                                <TextField
                                  sx={{ width: "100%" }}
                                  label={`Set Price`}
                                  type="number"
                                  inputmode="numeric" pattern="[0-9]*"
                                  size="small"
                                  value={product.price}
                                  onChange={(e) => setProduct({ ...product, price: e.target.value.trim() })}
                                />

                              </span>   </Box>
                            </Stack>
                          </Box>
                          <Box>
                            <Stack direction="row" spacing={2} >

                              <RButton sx={{ color: "red", fontWeight: "600", width: "100%" }} variant="contained" onClick={() => clearProductCallList()}  >   Clear  </RButton>
                              <RButton sx={{ color: "green", fontWeight: "600", width: "100%" }} variant="contained" onClick={() => addToListNow()} >   Add  </RButton>

                            </Stack>
                          </Box>

                        </Stack>


                      </Box>


                    </> :

                      <List sx={{ width: '100%', margin: "0.5rem auto ", maxWidth: 360, bgcolor: 'background.paper' }} >
                        {searchProd.map((value, ind) => (
                          <ListItem
                            key={value._id}
                            sx={{ margin: "0.5rem auto", padding: "0.2rem", }}
                            disableGutters
                          // secondaryAction={
                          //   <IconButton >
                          //     <ChildFriendlyIcon />
                          //   </IconButton>
                          // }
                          >
                            {/* onClick={handleToggle(value)} */}
                            <ListItemButton
                              sx={{ fontWeight: "600", margin: "0", padding: "0" }}
                              role={undefined} onClick={() => addProdToList(value)} dense>
                              <ListItemText primary={`${value.nikename} - ${value.qty} units`} />
                            </ListItemButton>

                          </ListItem>
                        ))}
                      </List>
                  }




                </>
              }
            </Box>
            <Divider />

            <h2>Bill</h2>

            <Divider />
            <Box
              sx={{
                maxWidth: '100%',
                my: 2,
                border: "2px solid #747264",
                borderRadius: "0.25rem",
                padding: "0.25rem"
              }}
            >

              <BillHeader billDate={billDate} setBillDate={setBillDate}  {...bill}   {...billUser} />

              <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
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
                      {bill.products.map((el, ind) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={el._id}>

                            <TableCell >

                              <span>{el.nikename}</span>
                            </TableCell>
                            <TableCell align={'right'} >

                              {editFeild === `${el._id}/price` ? <TextField
                                sx={{ width: "120px" }}
                                label={`${editFeild.split("/")[1]}`}

                                size="small"
                                value={editFeildVal}
                                onChange={(e) => setEditFeildVal(e.target.value.trim())}
                                type="number"
                                inputmode="numeric" pattern="[0-9]*"

                              /> : <Typography onDoubleClick={() => enableEditFeilds(`${el._id}/price`, el.price)}  > {el.price} </Typography>}
                            </TableCell>
                            <TableCell align={'right'}  >
                              {editFeild === `${el._id}/sellQty` ?
                                <TextField
                                  sx={{ width: "100px" }}
                                  label={`${editFeild.split("/")[1]}`}

                                  size="small"
                                  value={editFeildVal}

                                  type="number"
                                  inputmode="numeric" pattern="[0-9]*"

                                  onChange={(e) => setEditFeildVal(e.target.value.trim())}
                                /> : <Typography onDoubleClick={() => enableEditFeilds(`${el._id}/sellQty`, el.sellQty)}  > {el.sellQty} </Typography>}
                            </TableCell>
                            <TableCell align={'right'}>
                              <span className='highlighted yellow'  > {Number(el.sellQty) * Number(el.price)}</span>
                            </TableCell>



                            <TableCell align={'center'}>
                              <div style={{ display: 'flex', justifyContent: "space-between", padding: "0 1rem", alignItems: "center" }}  >
                                <span>
                                  {editFeild.split("/")[0] === `${el._id}` ? <RButton sx={{ color: "red", fontWeight: "400", marginRight: "0.25rem" }} variant="contained" onClick={() => okBox()}  >   <TaskAltIcon style={{ color: "green" }} />   </RButton> : <div></div>}
                                  {editFeild.split("/")[0] === `${el._id}` ? <RButton sx={{ color: "red", fontWeight: "400" }} variant="contained" onClick={() => cancelBox()}  >   <BlockIcon style={{ color: "red" }} />  </RButton> : <div></div>}
                                </span>
                                <DeleteIcon onClick={() => deletePurchase(el._id)} style={{ color: "red" }} />

                              </div>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: Number(el.price) - Number(el.purchasePrice) > 1 ? "#9BCF53" : "#D24545" }} align={'right'}>

                              <span>#MS{Number(el.price) - Number(el.purchasePrice)}{getRandomTwoChars()}</span>
                            </TableCell>

                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>

              </Paper>

              <Card sx={{ maxWidth: '100%', my: 0, padding: "0.5rem" }} variant="outlined">
                <Divider />
                <Box
                  sx={{
                    maxWidth: '100%',
                    padding: "0.25rem",
                    marginBottom: "0.5rem",
                    display: "flex"
                  }}
                >
                  <div style={{ width: "60%" }} ></div>
                  <div style={{ width: "40%" }} >
                    <h4> Total Amount: <span> {total} </span></h4>
                    <h4> Paid: {paidEdit ? <span style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}  > <TextField
                      sx={{ width: "100px" }}
                      label={`Paid`}
                      type="text"
                      value={paid}
                      onChange={(e) => setPaid(Number(e.target.value.trim()))}

                    />  <RButton sx={{ color: "red", fontWeight: "500", marginLeft: "0.25rem" }} variant="contained" onClick={() => setPaidEdit(false)}  >Save</RButton> </span> : <span onDoubleClick={() => setPaidEdit(true)} > {paid} </span>}</h4>
                    <h4> Due:<span> {total - paid} </span> </h4>
                  </div>
                </Box>

              </Card >



            </Box>

            <Divider />

            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
                my: 2,
                mx: "auto"
              }}
            >
              <FormControl sx={{ width: "100%" }}>
                <CButton onClick={() => addBillNow()} variant="contained"> Add Bill  </CButton>
              </FormControl>
            </Box>

          </Box>

      }







      {/* for notification */}
      <ToastContainer
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

export default Bill


// for notification
// const notify = (msg, type) => {
//   toast[type](`🦄 ${msg}`, {
//     position: "top-left",
//     autoClose: 3000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//   });

// }


function getRandomTwoChars() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const randomChars = [];

  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomChars.push(characters.charAt(randomIndex));
  }

  return randomChars.join('');
}