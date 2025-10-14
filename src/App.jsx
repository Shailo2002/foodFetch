import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { SocketProvider } from "./context/SocketProvider";
import { routes } from "./routes/routesConfig";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import GlobalDataLoader from "./components/GlobalDataLoader";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { Toaster } from "react-hot-toast";
import Lottie from "lottie-react";
import foodAnimationData from "./assets/Food.json";

function App() {
  const { userData, loading } = useSelector((state) => state.user);

  useGetCurrentUser();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-orange-200 to-orange-50 text-center">
        <Lottie
          animationData={foodAnimationData}
          loop
          style={{ width: 280, height: 280 }}
        />
        <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mt-6 tracking-tight">
          Welcome to FoodFetch
        </h1>
        <p className="text-amber-700 mt-3 text-base md:text-lg">
          Preparing something tasty for you...
        </p>
        <div className="relative w-40 h-1 mt-6 bg-amber-200 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-amber-500 animate-[ping_1.5s_linear_infinite]" />
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <SocketProvider>
        {userData && <GlobalDataLoader />}
        <Toaster position="bottom-right" />
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
