import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';



export default function Toasts(){


  const danger = () => {
    toast.error("Error Notification !", {
      position: "top-left"
    });
  }

  const warning = () => {
    toast.warn("Warning Notification !", {
      position: "bottom-left"
    });
  }

  const info = () => {
    toast.info("Info Notification !", {
      position: "bottom-center"
    });
  }

  return (
    <>
    <ToastContainer />
    </>
  )
}