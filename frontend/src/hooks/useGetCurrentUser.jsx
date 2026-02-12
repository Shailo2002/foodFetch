import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUserData, setUserData } from "../redux/userSlice";
import { SERVER_URL } from "../../Contant";

export default function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${SERVER_URL}/api/user/current`, {
          withCredentials: true,
        });
        // console.log("useGetCurrentUser hook : ", result.data);

        dispatch(setUserData(result.data));
      } catch (error) {
        dispatch(clearUserData());
        console.log(error);
      }
    };
    fetchUser();
  }, []);
}
