import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCity from "./hooks/useGetCity";
import useGetMyShop from "./hooks/useGetMyShop";
import CreateEditShop from "./pages/CreateEditShop";
import SignUp from "./pages/SignUp";
import AddItems from "./pages/AddItems";
import EditItem from "./pages/EditItem";
import useGetShopByCity from "./hooks/useGetShopByCity";
import useGetItemByCity from "./hooks/useGetItemsByCity";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
import OrderPlaced from "./pages/OrderPlaced";
import MyOrders from "./pages/MyOrders";

function App() {
  useGetCurrentUser();
  useGetMyShop();
  useGetCity();
  useGetShopByCity();
  useGetItemByCity();
  const { userData, loading } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
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
        <Route
          path="/create-edit-shop"
          element={userData ? <CreateEditShop /> : <Navigate to="/signin" />}
        />
        <Route
          path="/add-item"
          element={userData ? <AddItems /> : <Navigate to="/signin" />}
        />
        <Route
          path="/edit-item/:itemId"
          element={userData ? <EditItem /> : <Navigate to="/signin" />}
        />
        <Route
          path="/cart"
          element={userData ? <CartPage /> : <Navigate to="/signin" />}
        />
        <Route
          path="/checkout"
          element={userData ? <CheckOut /> : <Navigate to="/signin" />}
        />
        <Route
          path="/order-placed"
          element={userData ? <OrderPlaced /> : <Navigate to="/signin" />}
        />
        <Route
          path="/my-orders"
          element={userData ? <MyOrders /> : <Navigate to="/signin" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
