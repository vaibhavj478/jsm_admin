
import {  toast } from 'react-toastify';


 
export  const notify = (msg, type) => {
  toast[type](`🦄 ${msg}`, {
    position: "top-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

}
