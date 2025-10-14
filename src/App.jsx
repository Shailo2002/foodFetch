import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { SocketProvider } from "./context/SocketProvider";
import { routes } from "./routes/routesConfig";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import GlobalDataLoader from "./components/GlobalDataLoader";
import useGetCurrentUser from "./hooks/useGetCurrentUser";

function App() {
  const { userData, loading } = useSelector((state) => state.user);

  useGetCurrentUser();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <SocketProvider>
        {userData && <GlobalDataLoader />}{" "}
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
          {routes.map(({ path, element, protected: isProtected }) => {
            const Wrapper = isProtected ? ProtectedRoute : PublicRoute;
            return (
              <Route
                key={path}
                path={path}
                element={<Wrapper>{element}</Wrapper>}
              />
            );
          })}
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
