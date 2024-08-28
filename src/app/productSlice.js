

import { createSlice } from "@reduxjs/toolkit";
import url from './url';
import axios from "axios";


const initialState = {
    status: "success",
    prodType: [],
    catStatus: "success",
    cat: [],
    catLine: [],
    prods: [],
    prodStatus: "success",
    searchProd: [],
    sPStatus: "",
    nikeName: ""
}


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        },

        setCatStatus: (state, action) => {
            state.catStatus = action.payload
        },
        setProdStatus: (state, action) => {
            state.prodStatus = action.payload
        },

        setCat: (state, action) => {
            state.cat = action.payload
        },
        setCatLine: (state, action) => {
            state.catLine = action.payload
        },

        setProdType: (state, action) => {
            state.prodType = action.payload
        },


        setSPStatus: (state, action) => {
            state.sPStatus = action.payload


        },

        setSearchProd: (state, action) => {
            state.searchProd = action.payload
        },


        setNikeName: (state, action) => {
            state.nikeName = action.payload
        }


    }

})


export const { setStatus, setProdType, setCat, setCatLine, setCatStatus, setProdStatus, setSPStatus, setSearchProd, setNikeName } = productSlice.actions

export default productSlice.reducer








export const getCat = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(`${url}/cat`);
        if (res.data.success) {
            const categoriesWithIsOpen = addIsOpenProperty(res.data.category);
            dispatch(setCat(categoriesWithIsOpen));
        } else {
            throw new Error('Network error | Not found');
        }
    } catch (error) {
        console.error(error.message);
    }
};


export const getCatLine = () => {

    return async (dispatch, getState) => {

        try {
            const res = await axios.get(`${url}/cat-list`);

            if (res?.data?.success) {
                dispatch(setCatLine(res.data.category))
            } else {
                throw new Error("Network error | Not found");
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}


export const createCat = (val) => async (dispatch, getState) => {
    try {
        dispatch(setCatStatus("loading"))
        const res = await axios.post(`${url}/create-cat`, val);

        if (res.data.success) {
            return dispatch(setCatStatus("success"));
        }
        throw new Error('Network error | Not found');
    } catch (error) {
        dispatch(setCatStatus("error"));
     dispatch(setCatStatus("success"));
        console.log(error.message);
    }
}



export const delCat = (id) => async (dispatch, getState) => {

    try {
        dispatch(setCatStatus("loading"))
        // console.log(id);
        const res = await axios.delete(`${url}/del-cat/${id}`);
        if (res.data.success) {
            return dispatch(setCatStatus("success"));
        }
        throw new Error('Network error | Not found');
    } catch (error) {
        //dispatch(setCatStatus("error"));
        dispatch(setCatStatus("success"));
        console.error(error.message);
    }
}


export const addProd = (val) => async (dispatch, getState) => {

    try {

        dispatch(setProdStatus("loading"))


        const res = await axios.post(`${url}/create-prod`, { ...val });


        if (res.data.success) {
            return dispatch(setProdStatus("success"));
        }


        throw new Error('Network error | Not Added');

    } catch (error) {
        dispatch(setProdStatus("error"));
        console.error(error.message);

    }
}


export const seacrhProduct = (val) => {

    return async (dispatch, getState) => {
        try {

            let data = getState();

            if( data.prod.nikeName.length < 3){

                return
            }

            dispatch(setSPStatus('loading'))

            const res = await axios.post(`${url}/search-prod`, { nikename: data.prod.nikeName });

            // console.log(res.data);

            if (res.data.success) {
                
                dispatch(setSearchProd(res.data.matchingProducts));

            } else {
                dispatch(setSearchProd([]));
            }

            dispatch(setSPStatus('success'))


        } catch (error) {
            dispatch(setSPStatus('error'))

            console.log(error.message);
        }
    }

}

function addIsOpenProperty(arr) {
    return arr.map((el) => {
        el.isOpen = false;
        if (el.children.length > 0) {
            el.children = addIsOpenProperty(el.children);
        }
        return el;
    });
}