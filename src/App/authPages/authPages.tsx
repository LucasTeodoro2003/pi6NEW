import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("token");

     if (token && token.split('.').length === 3) {
      try {
        const decoded : any = jwtDecode(token);
        setId(decoded.id);

        if (decoded.exp * 1000 < Date.now()) {
          console.log("Token expirado");
          setIsLoggedIn(false);
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      console.log("Token inválido ou não existente");
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { isLoggedIn, id };
};

export { useAuth };