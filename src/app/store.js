import { configureStore  }  from "@reduxjs/toolkit";


// persist
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";



// slice
import  prodReducer  from  "./productSlice"; 
import  userReducer  from  "./userSlice"; 


const persistConfig = {
    key: 'root',
    version:1,
    storage
  }


const reducers = combineReducers({
    prod : prodReducer,
    user: userReducer,
   
  });
  
 
const persistedReducer = persistReducer(persistConfig, reducers);

//  const store  = configureStore({
//     reducer:{
//         prod : prodReducer,
//         user: userReducer,
//         bill: billReducer
//     }
// });
 const store = configureStore({
    reducer: persistedReducer,
    devTools: 'dev' !== "production"

  });
  
export  default store






