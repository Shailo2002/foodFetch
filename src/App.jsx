import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";



function App() {

 return (
   <BrowserRouter>
     <Routes>
       <Route path="/signin" element={<SignIn />} />
       <Route path="/signup" element={<SignUp />} />
       <Route path="/forgot-password" element={<ForgotPassword />} />
     </Routes>
   </BrowserRouter>
 );
}

export default App
