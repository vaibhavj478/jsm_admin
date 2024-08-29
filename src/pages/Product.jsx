import React, { useEffect, useState } from 'react'

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
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';


import TextField from '@mui/material/TextField';


import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';



import { useTheme } from '@mui/material/styles';





// redux function 

import { getCat, getCatLine, delCat, createCat, addProd } from '../app/productSlice';

//self assets 
import truck_gif from '../assets/images/truck.gif';
import camel_gif from '../assets/images/camel.gif';


// for notification


import useIncDec from '../hook/useIncDec';
import { notify } from '../assets/constant';
import axios from 'axios';
import url from '../app/url';


const initCat = {
  title: "",
  nickname: "",
  description: "",
  bannerType: "",
  bannerUrl: "",
  "products": [],
  "_id": "",
  "name": "",
  "level": 2,
  "ancestors": "",
  "__v": 0,
  menus: []

}

const initProd = {

  title: "",
  subtitle: "",
  // category: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Category',
  //   required: true,
  // },
  desc1: "",
  desc2: "",
  desc3: "",
  notes: "",
  isActive: 'active',
  isBuyable: 'no',
  price: '1500',
  discountPrice: '1000',
  rating: "0",
  media: [{ picUrl: "", picType: "", }],
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



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const names = [
  'menu1',
  'menu2',
  'menu3',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function extractNumeric(input) {
  // Use regular expression to match numeric values
  const numericValues = input.replace(/[^0-9]/g, '');
  return numericValues;
}

const Product = () => {

  ////// Edit category section constant's  only and function   ///////

  const [currEditCat, setCurrEditCat] = useState("");
  const [currEditCatDataStatus, setCurrEditCatDataStatus] = useState("success");


  const [currCatData, setCurrCatData] = useState(initCat);

  const [catMenusStatus, setCatMenusStatus] = useState("success");
  const [catBasicDetailStatus, setCatBasicDetailStatus] = useState("success");
  const [catBannerDetailStatus, setCatBannerDetailStatus] = useState("success");

  const [prodAddData, setProdAddData] = useState(initProd); // new product 
  const [isProdAddSubmitted, setIsProdAddSubmitted] = useState(false);
  const [prodAddStatus, setProdAddStatus] = useState("success")

  const [expanded, setExpanded] = useState('panel1');
  const handleChangeExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  // other product variable of product CURD 

  const [isDisable, setIsDisable] = useState(false);


  //multi select 
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleMultipleSelect = (event) => {
    const {
      target: { value },
    } = event;
    setCurrCatData(
      // On autofill we get a stringified value.
      {
        ...currCatData,
        "menus": typeof value === 'string' ? value.split(',') : value,
      }
    );
  };


  //multi select 



  const getCatAllData = async () => {

    console.log(currEditCat)
    if (!currEditCat) {
      setCurrEditCatDataStatus("success");
      return
    }

    try {
      setCurrEditCatDataStatus('loading')

      let res = await axios.get(`${url}/cat-by-name/${currEditCat}`);

      console.log("getCatByName")
      console.log(res.data);

      setCurrCatData({ ...initCat, ...res.data });


      setCurrEditCatDataStatus('success')

    } catch (error) {
      setCurrEditCatDataStatus('success')
      notify("Try again", "error");
      console.log(error.message);
    }

  }
  const handleSetMenus = async () => {

    try {
      setCatMenusStatus("loading");

      const { menus } = currCatData;
      let res = await axios.post(`${url}/cat-by-name-menus/${currEditCat}`, { menus });


      if (res.data.success) {
        notify("Updated.", "success")
        // getCatAllData();
        setCurrCatData({ ...initCat, ...res.data.category })

        setCatMenusStatus("success");
      } else {
        getCatAllData();
        notify("Please try again.", "error")
      }

    } catch (error) {
      setCatMenusStatus("success");
      console.log(error.message);
    }

  }
  const handleSetBasicDetail = async () => {

    try {
      setCatBasicDetailStatus("loading")
      const { title, nickname, description } = currCatData;
      let res = await axios.post(`${url}/cat-by-name-basic/${currEditCat}`, { title, nickname, description });

      if (res.data.success) {
        notify("Updated.", "success")
        // getCatAllData();
        setCurrCatData({ ...initCat, ...res.data.category })

        setCatBasicDetailStatus("success");
      } else {
        getCatAllData();
        notify("Please try again.", "error")
      }

    } catch (error) {
      setCatBasicDetailStatus("success");
      console.log(error.message);
    }
  }

  const handleSetBannerDetail = async () => {

    try {
      setCatBannerDetailStatus("loading")
      const { bannerType, bannerUrl } = currCatData;

      let res = await axios.post(`${url}/cat-by-name-banner/${currEditCat}`, { bannerType, bannerUrl });

      if (res.data.success) {
        notify("Updated.", "success")
        // getCatAllData();
        setCurrCatData({ ...initCat, ...res.data.category })

        setCatBannerDetailStatus("success");
      } else {
        getCatAllData();
        notify("Please try again.", "error")
      }

    } catch (error) {
      setCatBannerDetailStatus("success");
      console.log(error.message);
    }
  }

  // add new product to category 

  const handleAddProdToCat = async () => {

    try {
      setProdAddStatus("loading")

      setIsProdAddSubmitted(true);
      console.log(prodAddData);

      let isError = false

      //  media: [{ picUrl: "", picType: "", }],

      if (prodAddData.title == "" || prodAddData.subtitle == "" || prodAddData.isBuyable == "" || prodAddData.desc1 == "" || prodAddData.rating == "") {

        isError = true
      }

      if (prodAddData.isBuyable == "yes") {

        if (prodAddData.price == "") {
          isError = true;
        }
      }

      if (prodAddData.media) {
        prodAddData.media.forEach((el, ind) => {
          if (el.picType == "" || el.picUrl == "") {
            isError = true
          }
        })
      }

      if (isError) {
        notify("Please check fields", "error");
        retrun
      }


      let res = await axios.post(`${url}/cat-by-name-add-prod/${currEditCat}`, prodAddData)

      console.log("data", res.data)

      if (res.data.success) {

        setProdAddData(initProd);

        setCurrCatData({ ...initCat, ...res.data.category })
        notify("Product Added.", "success");

      } else {
        getCatAllData();
        notify("Please try again!", "error");
      }

      // /cat-by-name-add-prod/:name 
      setIsProdAddSubmitted(false);
      setProdAddStatus("success")

    } catch (error) {
      setProdAddStatus("success")

      setIsProdAddSubmitted(false);
      console.log(error.message);
    }
  }

  // product util function

  // for product only 
  const handleChangeMedia = (value, fieldname, index) => {

    const newData = [...prodAddData.media]
    newData[index][fieldname] = value

    setProdAddData({ ...prodAddData, "media": newData })

  }

  const handleAddMediaRow = () => {
    let len = prodAddData.media.length - 1
    if (prodAddData.media[len].picUrl != "" && prodAddData.media[len].picType != "") {
      let newMedia = [...prodAddData.media, { picUrl: "", picType: "", }];
      setProdAddData((prev) => ({ ...prev, "media": newMedia }));
    }

    return

  }
  const handleRemoveMediaRow = () => {

    let len = prodAddData.media.length - 1
    if (prodAddData.media[len].picUrl == "" && prodAddData.media.length > 1) {
      let newMedia = prodAddData.media.filter((el, ind) => len != ind)
      setProdAddData((prev) => ({ ...prev, "media": newMedia }));
    }

  }

  // Placeholder functions for edit, delete, and add
  const handleCatEdit = (category, catId) => {
    console.log(`Edit category: ${category.name} ,  ${catId}`);
    // Implement your edit logic 
    setValue(1);
    setCurrEditCat(category.name);
    setExpanded("panel1");
  };



  ////// End  ///////
  const { prodType, status, cat, catStatus, catLine } = useSelector((state) => state.prod);




  const dispatch = useDispatch();

  const [value, setValue] = useState(0);


  // for categories 
  const [catData, setCatData] = useState({
    parent: "",
    category: ""
  })


  // for Product's



  // const [purchasePriceVal, purchasePriceInc, purchasePriceDec, purchasePriceSet] = useIncDec(prodData.purchasePrice);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // for categories 


  const handleCatData = (val, type) => {
    setCatData({ ...catData, [type]: val });
  }

  const handleCatSubmit = () => {

    const { category, parent } = catData

    if (category.trim() == "") {
      notify('Category is empty', 'error');
    } else {

      dispatch(createCat({ category, parent }));

      notify('Category created', 'success');
    }

  }

  const handleCatDelete = (category) => {
    console.log(`Delete category: `, category);

    if (category.products.length) {
      notify('Category has products', 'error')
      return 
    }
    if (category.children.length) {
      notify('Category has children', 'error')
      return
    }
      dispatch(delCat(category._id));
    
    // Implement your delete logic
  };

  const handleCatAdd = (category) => {
    console.log(`Add child to category: ${category.name}`);
    // Implement your add logic

  };


  //  for Product's

  const handleProductDelete = async (prodId) => {

    try {

      setIsDisable(true)

      let res = await axios.post(`${url}/prod-delete/${prodId}`);

      if (res.data.success) {
        setCurrCatData({ ...initCat, ...res.data.category })
        notify(`${res.data.message}`, "success");
      } else {
        getCatAllData();
        notify("Failed To Delete", "error");
      }

      setIsDisable(false)
    } catch (error) {
      console.log(error)
      setIsDisable(false)
    }



  }

  const handleProductStatus = async (prodId) => {

    try {

      setIsDisable(true)

      let res = await axios.post(`${url}/prod-status/${prodId}`);

      if (res.data.success) {
        setCurrCatData({ ...initCat, ...res.data.category })
        notify(`${res.data.message}`, "success");
      } else {
        getCatAllData();
        notify("Failed To change Status", "error");
      }

      setIsDisable(false)
    } catch (error) {
      console.log(error)
      getCatAllData();
      setIsDisable(false)
    }
  }




  useEffect(() => {

    console.log("call get_cat")

    dispatch(getCat());
    dispatch(getCatLine());
  }, [dispatch, catStatus]);

  useEffect(() => {
    getCatAllData();
  }, [currEditCat])


  // console.log(prodData);


  //// update all the product  methods  ////

  const handleAddMediaRowToProducts = ( index)=>{
    const data = [...currCatData.products]
    data[index]['media'] = [ ...data[index]['media'] ,{ picUrl: "", picType: "", }];

    setCurrCatData({ ...currCatData, 'products': data });

  }
  const handleRemoveMediaRowToProducts = ( index)=>{
    const data = [...currCatData.products]
    const picUrl = data[index]['media'][data[index]['media'].length - 1].picUrl
      if( picUrl.trim() != "" ){
        notify("Please Remove the URL of Last","error")
        return 
      }

    data[index]['media'] = [ ...data[index]['media']].filter((_, ind) => ind !== data[index]['media'].length - 1 )

    setCurrCatData({ ...currCatData, 'products': data });

  }

  const handleProductsState = (key, value, index) => {
    const data = [...currCatData.products]
    data[index][key] = value;
    // console.log(key , value,  index)
    // console.log(data);
    // return
    setCurrCatData({ ...currCatData, 'products': data });
  }

  const handleProductMedaiState =  (key , value , productIndex, index ) =>{

    const prods  =  [...currCatData.products]

       const newProdMedias =  prods[productIndex]['media']

       newProdMedias[index][key] = value

       prods[productIndex]['media'] = newProdMedias

       setCurrCatData({ ...currCatData ,  'products': prods });
  }

  const updateTitleG = async (prodId, index) => {

    try {
      let obj = {
        title: currCatData.products[index]['title'],
        subtitle: currCatData.products[index]['subtitle'],
      }

      if (obj.title.trim() == "" || obj.subtitle.trim() == "") {
        notify("Fields are empty", "error");
        return;
      }

      let res = await axios.post(`${url}/prod-title/${prodId}`, obj);

      if (res.data.success) {
        setCurrCatData({ ...initCat, ...res.data.category })
        notify(`${res.data.message}`, "success");
      } else {
        getCatAllData();
        notify("Failed To change Status", "error");
      }
    } catch (error) {
      getCatAllData();
      console.log(error);
    }
  }
  const updatePriceG = async (prodId, index) => {

    try {
      let obj = {
        isBuyable: currCatData.products[index]['isBuyable'],
        price: currCatData.products[index]['price'],
        discountPrice: currCatData.products[index]['discountPrice'],
        rating: currCatData.products[index]['rating'],
      }

      if (obj.isBuyable.trim() == "yes") {
        if (Number(obj.price.trim()) < 0) {
          notify("Price should be positive", "error")
          return
        } else {
          if (Number(obj.price.trim()) < Number(obj.discountPrice.trim())) {
            notify("Discount price should be lesser", "error")
            return
          }
        }
      }

      let res = await axios.post(`${url}/prod-price/${prodId}`, obj);

      if (res.data.success) {
        setCurrCatData({ ...initCat, ...res.data.category })
        notify(`${res.data.message}`, "success");
      } else {
        getCatAllData();
        notify("Failed To change Status", "error");
      }
    } catch (error) {
      getCatAllData();
      console.log(error);
    }

  }
  const updateDescG = async (prodId, index) => {

    try {
      let obj = {
        desc1: currCatData.products[index]['desc1'],
        desc2: currCatData.products[index]['desc2'],
        desc3: currCatData.products[index]['desc3'],
        notes: currCatData.products[index]['notes'],
      }

      if (obj.desc1.trim() == "") {
        notify("Please enter Desc 1", "error");
        return
      }

      let res = await axios.post(`${url}/prod-desc/${prodId}`, obj);

      if (res.data.success) {
        setCurrCatData({ ...initCat, ...res.data.category })
        notify(`${res.data.message}`, "success");
      } else {
        getCatAllData();
        notify("Failed To change Status", "error");
      }

    } catch (error) {
      getCatAllData();
      console.log(error);
    }
  }
  const updateMediaG =  async (prodId , index ) =>  {

    try {
      let obj = {
        media: currCatData.products[index]['media'],
     
      }

      let res = await axios.post(`${url}/prod-media/${prodId}`, obj);

      if (res.data.success) {
        setCurrCatData({ ...initCat, ...res.data.category })
        notify(`${res.data.message}`, "success");
      } else {
        getCatAllData();
        notify("Failed To change Status", "error");
      }

    } catch (error) {
      getCatAllData();
      console.log(error);
    }

  }

  return (
    <>
      < Navbar />

      <Box sx={{ paddingBottom: "80px", minHeight: "100dvh" }} >

        <h1>Product Section</h1>

        <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper', display: "flex", justifyContent: "center", margin: "auto" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Add Category" />
            <Tab label="Edit Category" disabled />
            <Tab label="Extra (Future use)" />

          </Tabs>
        </Box>


        {value == 0 && <Box>


          <Accordion defaultExpanded >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              Catogory's
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  my: 2
                }}
              >
                {/* value={prodTypeVal}  */}
                <FormControl sx={{ m: 1, width: "100%" }}>

                  <TextField
                    id="outlined-password-input"
                    label="Please enter catogory"
                    type="text"

                    value={catData.category}
                    onChange={(e) => { handleCatData(e.target.value, "category") }}

                  />

                </FormControl>

                <FormControl sx={{ m: 1, width: "100%" }}>
                  <InputLabel id="select-cat-label">Parent Catogory's</InputLabel>
                  <Select
                    labelId="select-cat-label"
                    id="select-cat-label"
                    value={catData.parent}

                    label="Parent Catogory's"
                    onChange={(e) => { handleCatData(e.target.value, "parent") }}
                  >
                    <MenuItem value=""  >
                      <em>None</em>
                    </MenuItem>
                    {
                      catLine.map((el) => <MenuItem
                        value={el.name}
                        key={el._id}
                        className=''
                      >  <em>{el.name}</em> </MenuItem>
                      )
                    }
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, width: "100%" }}>
                  <CButton onClick={handleCatSubmit} variant="contained">Add Catogory</CButton>
                </FormControl>
              </Box>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  my: 1,
                }}
              >
                {catStatus === "loading" ? (
                  // Shimmer effect using Skeleton
                  <>
                    <Paper sx={{ padding: "1rem" }} >
                      <Skeleton animation="wave" height={35} width="80%" mb={1} />
                      <Skeleton sx={{ my: 1 }} animation="wave" height={25} variant="rounded" width="25%" />
                      <Skeleton sx={{ my: 1, ml: 4 }} animation="wave" height={25} variant="rounded" width="25%" />
                      <Skeleton sx={{ my: 1, ml: 4 }} animation="wave" height={25} variant="rounded" width="25%" />
                      <Skeleton sx={{ my: 1, ml: 7 }} animation="wave" height={25} variant="rounded" width="25%" />
                      <Skeleton sx={{ my: 1 }} animation="wave" height={25} variant="rounded" width="25%" />
                      <Skeleton sx={{ my: 1, ml: 4 }} animation="wave" height={25} variant="rounded" width="25%" />
                    </Paper>

                  </>
                ) : (
                  // Your content when data is loaded
                  <div>
                    <Typography variant="h6" sx={{ fontWeight: 600 }} > Catogory's </Typography>
                    <RecursiveChipList
                      categories={cat}
                      onEdit={handleCatEdit}
                      onDelete={handleCatDelete}
                      onAdd={handleCatAdd}
                    />
                  </div>
                )}
              </Box>


            </AccordionDetails>
          </Accordion>


          {/* ///  below  Accordion is for ref only  */}


        </Box>
        }
        {value == 1 && <Box>

          {/* single category section  */}

          <Accordion defaultExpanded expanded={expanded === 'panel1'} onChange={handleChangeExpand('panel1')} >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >


              <h1>Edit Catogory ( {currEditCat} ) </h1>

              <Divider flexItem />
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  my: 2,
                }}

              >
                {/* value={prodTypeVal}  */}
                <h3>Title, Nick-name, Meta Detail's</h3>
                <Divider />

                <FormControl sx={{ m: 1, width: "100%" }}>
                  <TextField
                    id="outlined-password-input"
                    label="Please enter Title -  Tab Detail's"
                    type="text"
                    value={currCatData.title}
                    onChange={(e) => setCurrCatData({ ...currCatData, "title": e.target.value })}
                  />

                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }}>

                  <TextField
                    id="outlined-password-input"
                    label="Please enter Nick-Name"
                    type="text"
                    value={currCatData.nickname}
                    onChange={(e) => setCurrCatData({ ...currCatData, "nickname": e.target.value })}
                  />

                </FormControl>
                <FormControl sx={{ m: 1, width: "100%", }}>

                  <TextField
                    id="outlined-password-input"
                    label="Discerption -  for SEO"
                    type="text"
                    multiline
                    rows={6}
                    value={currCatData.description}

                    onChange={(e) => setCurrCatData({ ...currCatData, "description": e.target.value })}

                  />

                </FormControl>

                <FormControl sx={{ m: 1, py: 1 }}>
                  <CButton onClick={() => handleSetBasicDetail()} variant="contained">Update </CButton>
                </FormControl>

                <Divider />

              </Box>

              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  my: 2,
                }}
              >
                <h3>Category | Select place for category</h3>
                <Divider />
                {/* checkbox */}

                <FormControl sx={{ m: 1, width: "100%" }} >
                  <InputLabel id="demo-multiple-chip-label">Select Menu</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={currCatData.menus}
                    onChange={handleMultipleSelect}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, currCatData.menus, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>


                <FormControl sx={{ m: 1, py: 1 }}>
                  <CButton onClick={handleSetMenus} variant="contained">Update</CButton>
                </FormControl>
                <Divider />

              </Box>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  my: 2,
                }}
              >
                <h3>Banner Detail's</h3>
                <Divider />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Banner Type</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="image"
                    name="radio-buttons-group"
                    value={currCatData.bannerType}
                    onChange={(e) => setCurrCatData({ ...currCatData, "bannerType": e.target.value })}
                    row
                  >
                    <FormControlLabel value="image" control={<Radio />} label="Image" />
                    <FormControlLabel value="video" control={<Radio />} label="Video" />
                  </RadioGroup>
                </FormControl>

                <FormControl sx={{ m: 1, width: "100%" }}>
                  <TextField
                    id="outlined-password-input"
                    label="Please enter Url"
                    type="text"
                    value={currCatData.bannerUrl}
                    onChange={(e) => setCurrCatData({ ...currCatData, "bannerUrl": e.target.value })}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, py: 1 }}>
                  <CButton onClick={() => handleSetBannerDetail()} variant="contained">Update</CButton>
                </FormControl>
                <Divider />

              </Box>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  my: 2,
                }}

              >

                {/* single add product  */}
                <h3>Add Product To Category:- "{currEditCat}" </h3>
                <Divider />

                <FormControl sx={{ m: 1, width: "100%" }}>
                  <TextField
                    id="outlined-password-input"
                    label="Please enter Product Title"
                    type="text"
                    value={prodAddData.title}
                    onChange={(e) => setProdAddData({ ...prodAddData, "title": e.target.value })}
                    error={isProdAddSubmitted && prodAddData.title === ''}
                    helperText={isProdAddSubmitted && prodAddData.title === '' ? 'Required.' : ''}
                  />

                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <TextField
                    id="outlined-password-input"
                    label="Please enter Sub Title"
                    type="text"
                    multiline
                    rows={2}
                    value={prodAddData.subtitle}
                    onChange={(e) => setProdAddData({ ...prodAddData, "subtitle": e.target.value })}
                    error={isProdAddSubmitted && prodAddData.subtitle === ''}
                    helperText={isProdAddSubmitted && prodAddData.subtitle === '' ? 'Required.' : ''}

                  />

                </FormControl>


                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Is Buyable ?</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    // defaultValue="no"
                    name="radio-buttons-group"
                    value={prodAddData.isBuyable}
                    onChange={(e) => setProdAddData({ ...prodAddData, 'isBuyable': e.target.value })}
                    row
                  >
                    <FormControlLabel value="no" control={<Radio />} label="No (no)" />
                    <FormControlLabel value="yes" control={<Radio />} label="Yes (yes)" />
                  </RadioGroup>
                </FormControl>


                <FormControl sx={{ m: 1, width: "100%" }}>
                  <TextField
                    id="outlined-password-input"
                    label="Please enter Price"
                    type="text"
                    value={prodAddData.price}
                    onChange={(e) => setProdAddData({ ...prodAddData, "price": extractNumeric(e.target.value) })}

                    error={isProdAddSubmitted && prodAddData.isBuyable == 'yes' && (prodAddData.price === '' || Number(prodAddData.price) < 1)}
                    helperText={isProdAddSubmitted && prodAddData.isBuyable == 'yes' && (prodAddData.price === '' || Number(prodAddData.price) < 1) ? 'Required.' : ''}

                  />

                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <TextField
                    id="outlined-password-input"
                    label="Please enter Discount Price"
                    type="text"
                    value={prodAddData.discountPrice}
                    onChange={(e) => setProdAddData({ ...prodAddData, "discountPrice": extractNumeric(e.target.value) })}


                  // error={isProdAddSubmitted && prodAddData.discountPrice === ''}
                  // helperText={isProdAddSubmitted && prodAddData.discountPrice === '' ? 'Required.' : ''}
                  />

                </FormControl>

                <FormControl sx={{ m: 1, width: "100%" }}>
                  <InputLabel id="select-cat-label">Rating of item</InputLabel>
                  <Select
                    labelId="select-cat-label"
                    id="select-cat-label"
                    value={prodAddData.rating}

                    label="Rating"
                    onChange={(e) => { setProdAddData({ ...prodAddData, "rating": e.target.value }) }}
                  >
                    <MenuItem value="0"  >
                      <em>0</em>
                    </MenuItem>
                    <MenuItem value="1"  >
                      <em>1</em>
                    </MenuItem>
                    <MenuItem value="1.5"  >
                      <em>1.5</em>
                    </MenuItem>
                    <MenuItem value="2"  >
                      <em>2</em>
                    </MenuItem>
                    <MenuItem value="2.5"  >
                      <em>2.5</em>
                    </MenuItem>
                    <MenuItem value="3"  >
                      <em>3</em>
                    </MenuItem>
                    <MenuItem value="3.5"  >
                      <em>3.5</em>
                    </MenuItem>
                    <MenuItem value="4"  >
                      <em>4</em>
                    </MenuItem>
                    <MenuItem value="4.5"  >
                      <em>4.5</em>
                    </MenuItem>
                    <MenuItem value="5"  >
                      <em>5</em>
                    </MenuItem>

                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, width: "100%" }}>
                  <TextField
                    id="outlined-password-input"
                    label="Please enter Desc 1"
                    type="text"
                    value={prodAddData.desc1}
                    multiline
                    rows={3}
                    onChange={(e) => setProdAddData({ ...prodAddData, "desc1": e.target.value })}

                    error={isProdAddSubmitted && prodAddData.desc1 === ''}
                    helperText={isProdAddSubmitted && prodAddData.desc1 === '' ? 'Required.' : ''}

                  />

                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <TextField
                    id="outlined-password-input"
                    label="Please enter Desc 2"
                    type="text"
                    value={prodAddData.desc2}
                    multiline
                    rows={6}
                    onChange={(e) => setProdAddData({ ...prodAddData, "desc2": e.target.value })}
                  />

                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <TextField
                    id="outlined-password-input"
                    label="Please enter Desc 3"
                    type="text"
                    value={prodAddData.desc3}
                    multiline
                    rows={3}
                    onChange={(e) => setProdAddData({ ...prodAddData, "desc3": e.target.value })}
                  />

                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <TextField
                    id="outlined-password-input"
                    label="Please enter Notes"
                    type="text"
                    value={prodAddData.notes}
                    multiline
                    rows={8}
                    onChange={(e) => setProdAddData({ ...prodAddData, "notes": e.target.value })}
                  />

                </FormControl>

                {/* media: [{picUrl: "", picType: "",}], */}
                <Typography mt={2} variant="h5" sx={{ fontWeight: 600 }} > Media's , <small> <span style={{ fontSize: "1rem" }}  > <span style={{ color: "red" }}  >Caution</span>  Every URL has 2 feilds to fill </span> </small> </Typography>
                <Box>
                  <Divider />
                  {prodAddData.media.map((el, index) => {

                    return (<React.Fragment key={index}>

                      <Box p={1} >
                        <Typography variant="h6" sx={{ fontWeight: 400 }} > Image/Vedio {index + 1} </Typography>
                        <FormControl sx={{ m: 1, width: "100%" }}
                          error={isProdAddSubmitted && el.picType === ''}  >
                          <FormLabel id="demo-radio-buttons-group-label">Media Type</FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="image"
                            name="radio-buttons-group"
                            value={el.picType}
                            row
                            onChange={(e) => handleChangeMedia(e.target.value, "picType", index)}

                          // onChange={(e) => setCurrCatData({ ...currCatData, "bannerType": e.target.value })}

                          >
                            <FormControlLabel value="image" control={<Radio size="small" />} label="Image" />
                            <FormControlLabel value="video" control={<Radio size="small" />} label="Video" />
                          </RadioGroup>

                          {isProdAddSubmitted && el.picType === '' ? <FormHelperText>Required.</FormHelperText> : <></>}

                        </FormControl>

                        <FormControl sx={{ m: 1, width: "100%" }}>

                          <TextField
                            id="outlined-password-input"
                            label="Please enter Url of media"
                            type="text"

                            value={el.picUrl}
                            size="small"
                            onChange={(e) => handleChangeMedia(e.target.value, "picUrl", index)}
                            // onChange={(e) => setCurrCatData({ ...currCatData, "bannerUrl": e.target.value })}


                            error={isProdAddSubmitted && el.picUrl === ''}
                            helperText={isProdAddSubmitted && el.picUrl === '' ? 'Required.' : ''}

                          />

                        </FormControl>

                      </Box>
                    </React.Fragment>)

                  })}

                  <FormControl sx={{ m: 1, }}>
                    <CButton sx={{ color: "#06FF00", fontWeight: "600" }} onClick={() => handleAddMediaRow()} variant="contained">+ Add</CButton>
                  </FormControl>
                  <FormControl sx={{ m: 1, }}>
                    <CButton sx={{ color: "#FF1E00", fontWeight: "600" }} onClick={() => handleRemoveMediaRow()} variant="contained">- Remove</CButton>
                  </FormControl>
                  <Divider />
                </Box>

                <FormControl sx={{ m: 1, py: 1 }}>
                  <CButton sx={{ p: 0 }} onClick={() => handleAddProdToCat()} variant="contained">
                    <img style={{ width: "1.5rem" }} src={truck_gif} alt="gif" />
                    Add Product
                  </CButton>
                </FormControl>
                <Divider />
              </Box>

            </AccordionDetails>
          </Accordion>

          {
            [...currCatData.products].reverse().map((el, ind) => {
              console.log("Product")
              console.log(el)
              return (

                <Accordion key={el._id} expanded={expanded === `panel${ind + 2}`} onChange={handleChangeExpand(`panel${ind + 2}`)} >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${ind + 2}-content`}
                    id={`panel${ind + 2}-header`}

                    sx={{ backgroundColor: "#EEEDEB", border: "0.5rem solid #3C3633" }}

                  >
                    <h3>( {el.title} )</h3>

                    <Box onClick={(e) => { e.stopPropagation() }} sx={{ p: 0, marginLeft: "auto", marginRight: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }} >

                      <CButton sx={{ p: 0 }} onClick={(e) => { e.stopPropagation(); handleProductDelete(el._id); }} variant="contained">
                        Delete
                      </CButton>

                      <CButton sx={{ p: 0 }} onClick={(e) => { e.stopPropagation(); handleProductStatus(el._id); }} variant="contained">
                        {el.isActive}
                      </CButton>
                    </Box>
                    <Divider flexItem />
                  </AccordionSummary>

                  <AccordionDetails>
                    <Box
                      sx={{
                        width: 500,
                        maxWidth: '100%',
                        my: 2,
                      }}
                    >
                      <Divider />
                      <Typography variant="h6" sx={{ fontWeight: 400 }} > Title/Sub-title  </Typography>
                      <FormControl sx={{ m: 1, width: "100%" }}>
                        <TextField
                          id="outlined-password-input"
                          label="Please enter Product Title"
                          type="text"
                          value={el.title}
                          onChange={(e) => handleProductsState("title", e.target.value, currCatData.products.length - 1 - ind)}
                        // onChange={(e) => setProdAddData({ ...prodAddData, "title": e.target.value })}
                        // error={isProdAddSubmitted && prodAddData.title === ''}
                        // helperText={isProdAddSubmitted && prodAddData.title === '' ? 'Required.' : ''}
                        />
                      </FormControl>
                      <FormControl sx={{ m: 1, width: "100%" }}>
                        <TextField
                          id="outlined-password-input"
                          label="Please enter Sub Title"
                          type="text"
                          multiline
                          rows={2}
                          value={el.subtitle}
                          onChange={(e) => handleProductsState("subtitle", e.target.value, currCatData.products.length - 1 - ind)}

                        //  onChange={(e) => setProdAddData({ ...prodAddData, "subtitle": e.target.value })}
                        // error={isProdAddSubmitted && prodAddData.subtitle === ''}
                        // helperText={isProdAddSubmitted && prodAddData.subtitle === '' ? 'Required.' : ''}
                        />

                      </FormControl>

                      <FormControl sx={{ m: 1, py: 1 }}>
                        <CButton
                          onClick={(e) => updateTitleG(el._id, currCatData.products.length - 1 - ind)}
                          variant="contained">Update</CButton>
                      </FormControl>

                      <Divider />
                      <Divider />
                      <Typography variant="h6" sx={{ fontWeight: 400 }} > Price/Rating  </Typography>

                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Is Buyable ?</FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          // defaultValue="no"
                          name="radio-buttons-group"
                          value={el.isBuyable}
                          // onChange={(e) => setProdAddData({ ...prodAddData, 'isBuyable': e.target.value })}
                          onChange={(e) => handleProductsState("isBuyable", e.target.value, currCatData.products.length - 1 - ind)}
                          row
                        >
                          <FormControlLabel value="no" control={<Radio />} label="No (no)" />
                          <FormControlLabel value="yes" control={<Radio />} label="Yes (yes)" />
                        </RadioGroup>
                      </FormControl>

                      <FormControl sx={{ m: 1, width: "100%" }}>
                        <TextField
                          id="outlined-password-input"
                          label="Please enter Price"
                          type="text"
                          value={el.price}
                          // onChange={(e) => setProdAddData({ ...prodAddData, "price": extractNumeric(e.target.value) })}

                          // error={isProdAddSubmitted && prodAddData.isBuyable == 'yes' && (prodAddData.price === '' || Number(prodAddData.price) < 1)}
                          // helperText={isProdAddSubmitted && prodAddData.isBuyable == 'yes' && (prodAddData.price === '' || Number(prodAddData.price) < 1) ? 'Required.' : ''}
                          onChange={(e) => handleProductsState("price", e.target.value, currCatData.products.length - 1 - ind)}
                        />

                      </FormControl>
                      <FormControl sx={{ m: 1, width: "100%" }}>
                        <TextField
                          id="outlined-password-input"
                          label="Please enter Discount Price"
                          type="text"
                          value={el.discountPrice}
                          // onChange={(e) => setProdAddData({ ...prodAddData, "discountPrice": extractNumeric(e.target.value) })}
                          onChange={(e) => handleProductsState("discountPrice", e.target.value, currCatData.products.length - 1 - ind)}

                        // error={isProdAddSubmitted && prodAddData.discountPrice === ''}
                        // helperText={isProdAddSubmitted && prodAddData.discountPrice === '' ? 'Required.' : ''}
                        />

                      </FormControl>

                      <FormControl sx={{ m: 1, width: "100%" }}>
                        <InputLabel id="select-cat-label">Rating of item</InputLabel>
                        <Select
                          labelId="select-cat-label"
                          id="select-cat-label"
                          value={el.rating}
                          onChange={(e) => handleProductsState("rating", e.target.value, currCatData.products.length - 1 - ind)}
                          label="Rating"
                        // onChange={(e) => { setProdAddData({ ...prodAddData, "rating": e.target.value }) }}
                        >
                          <MenuItem value="0"  >
                            <em>0</em>
                          </MenuItem>
                          <MenuItem value="1"  >
                            <em>1</em>
                          </MenuItem>
                          <MenuItem value="1.5"  >
                            <em>1.5</em>
                          </MenuItem>
                          <MenuItem value="2"  >
                            <em>2</em>
                          </MenuItem>
                          <MenuItem value="2.5"  >
                            <em>2.5</em>
                          </MenuItem>
                          <MenuItem value="3"  >
                            <em>3</em>
                          </MenuItem>
                          <MenuItem value="3.5"  >
                            <em>3.5</em>
                          </MenuItem>
                          <MenuItem value="4"  >
                            <em>4</em>
                          </MenuItem>
                          <MenuItem value="4.5"  >
                            <em>4.5</em>
                          </MenuItem>
                          <MenuItem value="5"  >
                            <em>5</em>
                          </MenuItem>

                        </Select>
                      </FormControl>

                      <FormControl sx={{ m: 1, py: 1 }}>
                        <CButton
                          onClick={(e) => updatePriceG(el._id, currCatData.products.length - 1 - ind)}
                          variant="contained">Update</CButton>
                      </FormControl>

                      <Divider />
                      <Divider />
                      <Typography variant="h6" sx={{ fontWeight: 400 }} > Discription's/Note  </Typography>

                      <FormControl sx={{ m: 1, width: "100%" }}>
                        <TextField
                          id="outlined-password-input"
                          label="Please enter Desc 1"
                          type="text"
                          value={el.desc1}
                          multiline
                          rows={3}
                          onChange={(e) => handleProductsState("desc1", e.target.value, currCatData.products.length - 1 - ind)}
                        // onChange={(e) => setProdAddData({ ...prodAddData, "desc1": e.target.value })}

                        // error={isProdAddSubmitted && prodAddData.desc1 === ''}
                        // helperText={isProdAddSubmitted && prodAddData.desc1 === '' ? 'Required.' : ''}
                        />

                      </FormControl>
                      <FormControl sx={{ m: 1, width: "100%" }}>
                        <TextField
                          id="outlined-password-input"
                          label="Please enter Desc 2"
                          type="text"
                          value={el.desc2}
                          onChange={(e) => handleProductsState("desc2", e.target.value, currCatData.products.length - 1 - ind)}
                          multiline
                          rows={6}
                        // onChange={(e) => setProdAddData({ ...prodAddData, "desc2": e.target.value })}
                        />

                      </FormControl>
                      <FormControl sx={{ m: 1, width: "100%" }}>
                        <TextField
                          id="outlined-password-input"
                          label="Please enter Desc 3"
                          type="text"
                          value={el.desc3}
                          onChange={(e) => handleProductsState("desc3", e.target.value, currCatData.products.length - 1 - ind)}
                          multiline
                          rows={3}
                        // onChange={(e) => setProdAddData({ ...prodAddData, "desc3": e.target.value })}
                        />
                      </FormControl>
                      <FormControl sx={{ m: 1, width: "100%" }}>
                        <TextField
                          id="outlined-password-input"
                          label="Please enter Notes"
                          type="text"
                          value={el.notes}
                          onChange={(e) => handleProductsState("notes", e.target.value, currCatData.products.length - 1 - ind)}
                          multiline
                          rows={8}
                        // onChange={(e) => setProdAddData({ ...prodAddData, "notes": e.target.value })}
                        />

                      </FormControl>
                      <FormControl sx={{ m: 1, py: 1 }}>
                        <CButton
                          onClick={(e) => updateDescG(el._id, currCatData.products.length - 1 - ind)}
                          variant="contained">Update</CButton>
                      </FormControl>

                      <Divider />
                      <Divider />
                      <Typography variant="h6" sx={{ fontWeight: 400 }} > Media  </Typography>

                      {el.media.map((mediaEle, index) => {

                        return (<React.Fragment key={index}>

                          <Box p={1} >
                            <Typography variant="h6" sx={{ fontWeight: 400 }} > Image/Vedio {index + 1} </Typography>
                            <FormControl sx={{ m: 1, width: "100%" }}
                            // error={isProdAddSubmitted && mediaEle.picType === ''}  
                            >
                              <FormLabel id="demo-radio-buttons-group-label">Media Type</FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="image"
                                name="radio-buttons-group"
                                value={mediaEle.picType}
                                row
                                onChange={(e)=>handleProductMedaiState("picType" , e.target.value ,  currCatData.products.length - 1 - ind , index )  }
                              // onChange={(e) => handleChangeMedia(e.target.value, "picType", index)}
                              >
                                <FormControlLabel value="image" control={<Radio size="small" />} label="Image" />
                                <FormControlLabel value="video" control={<Radio size="small" />} label="Video" />
                              </RadioGroup>

                              {/* {isProdAddSubmitted && el.picType === '' ? <FormHelperText>Required.</FormHelperText> : <></>} */}
                            </FormControl>

                            <FormControl sx={{ m: 1, width: "100%" }}>

                              <TextField
                                id="outlined-password-input"
                                label="Please enter Url of media"
                                type="text"
                                value={mediaEle.picUrl}
                                size="small"

                                onChange={(e)=>handleProductMedaiState("picUrl" , e.target.value ,  currCatData.products.length - 1 - ind , index )  }
                              // orignal onChange={(e) => handleChangeMedia(e.target.value, "picUrl", index)}
                              // onChange={(e) => setCurrCatData({ ...currCatData, "bannerUrl": e.target.value })}
                              // error={isProdAddSubmitted && el.picUrl === ''}
                              // helperText={isProdAddSubmitted && el.picUrl === '' ? 'Required.' : ''}
                              />

                            </FormControl>

                          </Box>
                          <Box>
                            <img src={mediaEle.picUrl} width={"100px"} alt="image" />
                          </Box>



                        </React.Fragment>)

                      })}

                      <FormControl sx={{ m: 1, }}>
                        <CButton sx={{ color: "#06FF00", fontWeight: "600" }}
                          // onClick={() => handleAddMediaRow()} 
                          onClick={() => handleAddMediaRowToProducts(currCatData.products.length - 1 - ind)} 
                          variant="contained">+ Add</CButton>
                      </FormControl>
                      <FormControl sx={{ m: 1, }}>
                        <CButton sx={{ color: "#FF1E00", fontWeight: "600" }}
                          // onClick={() => handleRemoveMediaRow()} 
                          onClick={() => handleRemoveMediaRowToProducts(currCatData.products.length - 1 - ind)} 
                          variant="contained">- Remove</CButton>
                      </FormControl>
                      <Divider />

                      <FormControl sx={{ m: 1, py: 1 }}>
                        <CButton
                          onClick={()=> updateMediaG(el._id, currCatData.products.length - 1 - ind)}
                          variant="contained">Update</CButton>
                      </FormControl>

                      <Divider />

                    </Box>

                  </AccordionDetails>
                </Accordion>

              )
            })
          }


        </Box>
        }
        {value == 2 && <Box>
          {/* start  master */}

          three

        </Box>
        }

      </Box>

    </>
  )
}

export default Product
