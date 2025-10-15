import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoLocationSharp, IoSearchOutline } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";
import { MdDeliveryDining } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { Input } from "../ui/Input";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { setAddress, setLocation } from "../redux/mapSlice";
import axios from "axios";
import { Button } from "../ui/Button";
import { SERVER_URL } from "../../Contant";
import toast from "react-hot-toast";
import { handleApiError } from "../utils/handleApiError";
import { AddMyOrder, clearCart } from "../redux/userSlice";
import L from "leaflet";
import customMarker from "../assets/marker5.png";
import EmptyCartCard from "../components/EmptyCartCard";

const customIcon = new L.Icon({
  iconUrl: customMarker,
  iconSize: [32, 36],
  iconAnchor: [15, 40],
  popupAnchor: [0, -50],
});

function RecenterMap({ location, dispatch, apikey }) {
  const map = useMap();
  const prevCoords = useRef({ lat: null, long: null });

  useEffect(() => {
    if (!location?.lat || !location?.long) return;

    // avoid repeat runs for same coordinates
    if (
      prevCoords.current.lat === location.lat &&
      prevCoords.current.long === location.long
    ) {
      return;
    }

    prevCoords.current = location;

    async function updateMapAndAddress() {
      map.flyTo([location.lat, location.long], 16, { animate: true });

      try {
        const res = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${location.lat}&lon=${location.long}&format=json&apiKey=${apikey}`
        );

        const formatted = res?.data?.results?.[0]?.formatted;
        if (formatted) dispatch(setAddress(formatted));
      } catch (err) {
        console.error("Reverse geocode failed:", err);
      }
    }

    updateMapAndAddress();
  }, [location]);

  return null;
}

function CheckOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addressInput, setAddressInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const { location, address } = useSelector((state) => state.map);
  const { cartItems, totalAmount, userData } = useSelector(
    (store) => store.user
  );
  const deliveryFee = totalAmount > 500 ? 0 : 40;
  const amountWithDeliveryFee = totalAmount + deliveryFee;

  const apikey = import.meta.env.VITE_GEOAPIKEY;

  const onDragEnd = (e) => {
    const location = e?.target?._latlng;
    dispatch(setLocation({ lat: location?.lat, long: location?.lng }));
  };

  function getCurrentLocation() {
    const latitude = userData?.data?.location?.coordinates[1];
    const longitude = userData?.data?.location?.coordinates[0];
    dispatch(setLocation({ lat: latitude, long: longitude }));
  }

  const getLatLongByAddress = async () => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          addressInput
        )}&format=json&apiKey=${apikey}`
      );
      dispatch(
        setLocation({
          lat: result?.data?.results[0]?.lat,
          long: result?.data?.results[0]?.lon,
        })
      );
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const result = await axios.post(
        `${SERVER_URL}/api/order/place-order`,
        {
          cartItems,
          paymentMethod,
          deliveryAddress: {
            text: addressInput,
            latitude: location?.lat,
            longitude: location?.long,
          },
        },
        { withCredentials: true }
      );

      if (paymentMethod == "cod") {
        if (result.data?.success) {
          toast.success(result.data.message || "Order placed successful!");
          dispatch(AddMyOrder(result?.data?.data));
          dispatch(clearCart());
          navigate("/order-placed");
        } else {
          toast.error(result.data?.message || "Order failed");
        }
      } else {
        const orderId = result?.data?.data?.orderId;
        const razorOrder = result?.data?.data?.razorpayOrder;
        openRazorPayWindow(orderId, razorOrder);
      }
    } catch (error) {
      handleApiError(error, "Order failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const openRazorPayWindow = (orderId, razorOrder) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorOrder.amount,
      currency: "INR",
      name: "FoodFetch",
      description: `Payment for FoodFetch Order #${orderId}`,
      image:
        "https://res.cloudinary.com/dvqlugfca/image/upload/v1760009541/ChatGPT_Image_Oct_9_2025_05_01_50_PM_rfpapj.png",
      order_id: razorOrder.id,
      handler: async function (response) {
        try {
          setLoading(true);
          const result = await axios.post(
            `${SERVER_URL}/api/order/verify-payment`,
            { razorpay_payment_id: response.razorpay_payment_id, orderId },
            { withCredentials: true }
          );
          toast.success(result?.data?.message || "Order placed successful!");
          dispatch(AddMyOrder(result?.data?.data));
          dispatch(clearCart());
          navigate("/order-placed");
        } catch (error) {
          handleApiError(error);
        } finally {
          setLoading(false);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen w-full bg-gradient-to-b from-orange-200 to-white">
      <div
        className={`absolute top-[20px] left-[20px] z-[10] mb-[10px] cursor-pointer hover:bg-orange-300 rounded 
    ${cartItems.length === 0 ? "block" : "hidden lg:block"}`}
        onClick={() => navigate("/cart")}
      >
        <IoIosArrowRoundBack size={32} className="text-[#ff4d30]" />
      </div>

      {cartItems.length == 0 ? (
        <EmptyCartCard />
      ) : (
        <div className="relative w-full max-w-[900px] bg-white shadow-xl rounded-2xl p-6 space-y-6">
          <div
            className="block lg:hidden absolute top-[20px] right-[20px] z-[10] mb-[10px] cursor-pointer 
  bg-white/90 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg 
  transition-all duration-300 rounded-xl p-2 hover:scale-105 active:scale-95"
            onClick={() => navigate("/cart")}
          >
            <IoClose size={22} className="text-[#ff4d30]" />
          </div>

          <h1 className="text-xl font-bold text-gray-800">Checkout</h1>

          <section>
            <h2 className="flex gap-2 items-center text-lg font-semibold text-gray-800">
              <IoLocationSharp size={24} className="text-[#ff4d30]" />
              Delivery Location
            </h2>
            <div className="flex mt-2 justify-center items-center gap-1">
              <Input
                placeholder={"Enter Address"}
                type={"text"}
                value={addressInput || ""}
                onChange={async (e) => setAddressInput(e.target.value)}
              />
              <button className="bg-[#ff4d30] text-white p-2.25 mb-2.5 rounded-sm hover:bg-[#ff6c4d] transition-colors duration-300 ease-in-out cursor-pointer">
                <IoSearchOutline onClick={getLatLongByAddress} />
              </button>
              <button
                className="bg-blue-600 text-white p-2.25 mb-2.5 rounded-sm hover:bg-[#517cff] transition-colors duration-300 ease-in-out cursor-pointer"
                onClick={() => getCurrentLocation()}
              >
                <TbCurrentLocation />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden border">
              <div className="flex justify-center items-center h-64 w-full">
                {location?.lat && location?.long ? (
                  <MapContainer
                    center={[location?.lat, location?.long]}
                    zoom={16}
                    className="w-full h-full"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <RecenterMap
                      location={location}
                      dispatch={dispatch}
                      apikey={apikey}
                    />

                    <Marker
                      position={[location?.lat, location?.long]}
                      icon={customIcon}
                      draggable
                      eventHandlers={{ dragend: onDragEnd }}
                    >
                      <Popup>Your Location</Popup>
                    </Marker>
                  </MapContainer>
                ) : (
                  <p>Loading map...</p>
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="flex gap-2 items-center text-lg font-semibold text-gray-800">
              Payment Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div
                className={`flex items-center gap-3 rounded-xl border p-2 text-left transition cursor-pointer ${
                  paymentMethod === "cod"
                    ? "border-[#ff4d2d] bg-orange-50 shadow"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                onClick={() => setPaymentMethod("cod")}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <MdDeliveryDining className="text-green-700 text-xl" />
                </span>
                <div>
                  <p className="font-medium text-gray-800">Cash On Delivery</p>
                  <p className="text-xs text-gray-500">
                    Pay when your food arrives
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-3 rounded-xl border p-2 text-left transition cursor-pointer ${
                  paymentMethod === "online"
                    ? "border-[#ff4d2d] bg-orange-50 shadow"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                onClick={() => setPaymentMethod("online")}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                  <FaMobileAlt className="text-purple-700 text-xl" />
                </span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <FaCreditCard className="text-blue-700 text-xl" />
                </span>
                <div>
                  <p className="font-medium text-gray-800">
                    UPI / Credit / Debit Card
                  </p>
                  <p className="text-xs text-gray-500">Pay securely online</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="flex gap-2 items-center text-lg font-semibold text-gray-800">
              Order Summary
            </h2>
            <div className="rounded-xl overflow-hidden border py-2 px-3 mt-2">
              <div className="border-b border-gray-100 shadow-sm my-2">
                {cartItems.map((item, index) => (
                  <div
                    className="flex items-center justify-between text-sm text-gray-500 my-1"
                    key={index}
                  >
                    <div>
                      <span>{`${item.name} x `}</span>
                      <span>{`${item.quantity}`}</span>
                    </div>
                    <div>{`₹${item.price}`}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center justify-between text-md font-semibold my-1">
                  <div>
                    <span>Subtotal</span>
                  </div>
                  <div>{`₹${totalAmount}`}</div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm text-gray-500 my-1">
                  <div>
                    <span>Delivery fee</span>
                  </div>
                  <div>{`₹${deliveryFee}`}</div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-lg font-bold my-3 text-[#ff4d30]">
                  <div>
                    <span>Total</span>
                  </div>
                  <div>{`₹${amountWithDeliveryFee}`}</div>
                </div>
              </div>
            </div>
            <Button
              variant="primary"
              text={
                paymentMethod == "cod" ? "Place Order" : "Pay & Place Order"
              }
              type="text"
              extraStyle="w-full mt-4 rounded-xl"
              onClick={() => handlePlaceOrder()}
              loading={loading}
            />
          </section>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
