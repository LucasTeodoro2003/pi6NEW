import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: any = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          console.log("Token expirado");
          setIsLoggedIn(false);
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Token inválido:", error);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      setIsLoggedIn(false);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { isLoggedIn };
};

export { useAuth };
