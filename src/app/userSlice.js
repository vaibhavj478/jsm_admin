

import { createSlice } from "@reduxjs/toolkit"


import axios from "axios";
import url from "./url";


const initialState = {

    status: "success",
    searchUsers: [],
    sUStatus: "success",

    billUser: {
        name: "",
        fatherName: "",
        post: "",
        villageName: "",
        number: ""
    },
    billUserId: ""
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setSUStatus: (state, action) => {
            state.sUStatus = action.payload
        },
        setSearchUsers: (state, action) => {
            state.searchUsers = action.payload
        },
        setBillUser: (state, action) => {
            state.billUser = action.payload
        },
        setBillUserID: (state, action) => {
            state.billUserId = action.payload
        }
    }
})

export const { setStatus, setSUStatus, setSearchUsers, setBillUser, setBillUserID } = userSlice.actions

export default userSlice.reducer


export const searchUser = (val) => {
    return async (dispatch, getState) => {
        try {

            let data = getState();



            dispatch(setSUStatus('loading'))

            const res = await axios.post(`${url}/user-search`, { ...data.user.billUser });


            if (res.data.matchingUsers) {

                dispatch(setSearchUsers(res.data.matchingUsers));

            } else {
                dispatch(setSearchUsers([]));
            }

            dispatch(setSUStatus('success'))


        } catch (error) {
            dispatch(setSUStatus('error'))

            console.log(error.message);
        }
    }
}






