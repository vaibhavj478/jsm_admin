import { createSlice } from "@reduxjs/toolkit"

import axios from "axios";
import url from "./url";
import { notify } from "../assets/constant";
import { setBillUser, setBillUserID } from "./userSlice";

const initialState = {
    billStatus: "success",
    bill: {
        customer: '',
        products: [],

    },
    bills: [],
    listAll: []
}

const billSlice = createSlice({
    name: "bill",
    initialState,
    reducers: {
        setBillStatus: (state, action) => {
            state.billStatus = action.payload
        },
        setCU: (state, action) => {
            state.bill.customer = action.payload
        },
        setProducts: (state, action) => {
            state.bill.products = action.payload
        },

        setListAll: (state, action) => {
            state.listAll = action.payload
        }
    }
})

export const { setBillStatus, setCU, setProducts, setListAll } = billSlice.actions

export default billSlice.reducer

export const addBill = (bill) => {
    return async (dispatch, getState) => {
        try {
            let data = getState();

            // console.log(bill);

            const res = await axios.post(`${url}/create-bill`, bill);

            console.log(res);

            if (res.data.success) {

                console.log(res.data.user)
                console.log(res.data.bill)

                notify(res.data.msg, "success");


                dispatch(setBillUser({
                    name: "",
                    fatherName: "",
                    post: "",
                    villageName: "",
                    number: ""
                }))
                dispatch(setBillUserID(""))

                dispatch(setCU(''))
                dispatch(setProducts([]))

console.log("bill added");
            }

            if (!res.data.success) {
                notify(res.data.msg, "error");

            }
            dispatch(setBillStatus("success"))

        } catch (error) {
            console.log(error.message);
        }
    }
}


export const getAllList = (query) => {
    return async (dispatch, getState) => {
        try {
            let data = getState();
            // console.log(query);

            const res = await axios.get(`${url}/get-all-bill`, query);
            // console.log(res);

            if (res.data.success) {
                console.log(res.data.data)
                dispatch(setListAll(
                    res.data.data
                ))

            }


        } catch (error) {
            console.log(error.message);
        }
    }
}