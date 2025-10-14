import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import CreateEditShop from "../pages/CreateEditShop";
import AddItems from "../pages/AddItems";
import EditItem from "../pages/EditItem";
import CartPage from "../pages/CartPage";
import CheckOut from "../pages/CheckOut";
import OrderPlaced from "../pages/OrderPlaced";
import MyOrders from "../pages/MyOrders";
import TrackOrder from "../pages/TrackOrder";
import Shop from "../pages/Shop";
import Home from "../pages/Home";

export const routes = [
  { path: "/", element: <Home/>, protected: true },
  { path: "/signin", element: <SignIn />, protected: false },
  { path: "/signup", element: <SignUp />, protected: false },
  { path: "/forgot-password", element: <ForgotPassword />, protected: false },
  { path: "/create-edit-shop", element: <CreateEditShop />, protected: true },
  { path: "/add-item", element: <AddItems />, protected: true },
  { path: "/edit-item/:itemId", element: <EditItem />, protected: true },
  { path: "/cart", element: <CartPage />, protected: true },
  { path: "/checkout", element: <CheckOut />, protected: true },
  { path: "/order-placed", element: <OrderPlaced />, protected: true },
  { path: "/my-orders", element: <MyOrders />, protected: true },
  { path: "/track-order/:orderId", element: <TrackOrder />, protected: true },
  { path: "/shop/:shopId", element: <Shop />, protected: true },
];
