import { useState, useEffect } from "react";
import { Header, Footer } from "./components/index";
import { Outlet, useNavigate } from "react-router-dom";
import { login, logout } from "./store/authSlice";
import AppwriteAuth from "./appwrite/auth";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await AppwriteAuth.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
          navigate("/home");
        } else {
          dispatch(logout());
          navigate("/");
        }
      } catch {
        dispatch(logout());
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [dispatch, navigate]);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
