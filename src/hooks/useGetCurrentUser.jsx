import axios from "axios";
import { useEffect } from "react";
import { SERVER_URL } from "../../Contant";


export default function useGetCurrentUser() {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${SERVER_URL}/api/user/current`, {
          withCredentials: true,
        });
        console.log(result);
      } catch (error) {
        console.log(error);
        toast.error("error");
      }
    };
    fetchUser();
  }, []);
}
