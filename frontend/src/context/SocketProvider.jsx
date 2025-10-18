import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

import { useSelector } from "react-redux";
import { SERVER_URL } from "../../Contant.js";

export const SocketContext = createContext(null)

export const SocketProvider = ({ children }) => {
  const { userData } = useSelector((state) => state.user);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (userData?.data?._id) {
      const socketInstance = io(SERVER_URL, { withCredentials: true });

      socketInstance.on("connect", () => {
        socketInstance.emit("identity", { userId: userData.data._id });
      });

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [userData?.data?._id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
