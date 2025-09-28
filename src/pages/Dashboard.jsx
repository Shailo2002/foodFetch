// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function Dashboard() {
//   const [user, setUser] = useState("");
//   useEffect(() => {
//     async function fetchdata() {
//       try {
//         const user = await axios.get(`${SERVER_URL}/api/user/current`, {
//           withCredentials: true,
//         });
//         setUser(user);
//       } catch (error) {
//         console.log(error)
//         toast.error("error");
//       }
//     }
//     fetchdata();
//   }, []);

//   return (
//     <div>
//       dashboard
//       <div>{user}</div>
//     </div>
//   );
// }
