import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";

function App() {
  useGetCurrentUser();
  const userData = useSelector((state) => state.user);
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
        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/signin" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
