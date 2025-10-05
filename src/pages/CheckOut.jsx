import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoLocationSharp, IoSearchOutline } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";
import { Input } from "../ui/Input";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { setAddress, setLocation } from "../redux/mapSlice";
import axios from "axios";

function CheckOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addressInput, setAddressInput] = useState("");
  const { location, address } = useSelector((state) => state.map);
  
  const apikey = import.meta.env.VITE_GEOAPIKEY;

  function RecenterMap({ location }) {
    const map = useMap();

    useEffect(() => {
      if (!location?.lat || !location?.long) return;

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

  const onDragEnd = (e) => {
    const location = e?.target?._latlng;
    dispatch(setLocation({ lat: location?.lat, long: location?.lng }));
  };

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(setLocation({ lat: latitude, long: longitude }));
    });
  }

  const getLatLongByAddress = async () => {
    try {
      console.log("result : ");

      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          addressInput
        )}&format=json&apiKey=${apikey}`
      );
      console.log("result : ", result?.data?.results[0]?.formatted);
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

  return (
    <div className="flex justify-center items-center p-6 min-h-screen w-full bg-gradient-to-b from-orange-200 to-white">
      <div
        className="absolute top-[20px] left-[20px] z-[10] mb-[10px] cursor-pointer"
        onClick={() => {
          navigate("/cart");
        }}
      >
        <IoIosArrowRoundBack size={32} className="text-[#ff4d2d]" />
      </div>
      <div className="w-full max-w-[900px] bg-white shadow-xl rounded-2xl p-6 space-y-6">
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
                  <RecenterMap location={location} />
                  <Marker
                    position={[location?.lat, location?.long]}
                    draggable
                    eventHandlers={{ dragend: onDragEnd }}
                  >
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <p>Loading map...</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CheckOut;
