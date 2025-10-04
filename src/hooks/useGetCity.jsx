import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
} from "../redux/userSlice";
import { setAddress, setLocation } from "../redux/mapSlice";

export default function useGetCity() {
  const dispatch = useDispatch();
  const apikey = import.meta.env.VITE_GEOAPIKEY;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(setLocation({ lat: latitude, long: longitude }));

      const address = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`
      );
      console.log("getcity hook : ", address);
      dispatch(setCurrentCity(address?.data?.results[0].city));
      dispatch(setCurrentState(address?.data?.results[0].state));
      dispatch(setCurrentAddress(address?.data?.results[0].formatted));

      dispatch(setAddress(address?.data?.results[0].formatted));
    });
  }, []);
}
