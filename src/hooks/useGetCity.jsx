import axios from "axios";
import { useEffect } from "react";
import { SERVER_URL } from "../../Contant";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCity, setUserData } from "../redux/userSlice";

export default function useGetCity() {
  const dispatch = useDispatch();
  const apikey = import.meta.env.VITE_GEOAPIKEY;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log("lat ", latitude, " long ", longitude, " api key ", apikey);

      const address = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`
      );
      console.log("address ", address);

      console.log("address ", address.data.results[0].city);
      dispatch(setCity(address.data.results[0].city));
    });
  }, []);
  return <div>Location</div>;
}
