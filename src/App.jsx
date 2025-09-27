import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
  import { ToastContainer } from "react-toastify";



function App() {

 return (
   <BrowserRouter>
     <ToastContainer
       position="top-right"
       autoClose={3000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       pauseOnHover
       draggable
       theme="colored"
     />
     <Routes>
       <Route path="/signin" element={<SignIn />} />
       <Route path="/signup" element={<SignUp />} />
       <Route path="/forgot-password" element={<ForgotPassword />} />
     </Routes>
   </BrowserRouter>
 );
}

export default App
