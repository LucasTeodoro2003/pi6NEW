import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AlertPage } from "../../pages/alertas";
import { CamPage } from "../../pages/cam";
import { ConfigPage } from "../../pages/config";
import { FormularyPage } from "../../pages/formulary";
import { HomePage } from "../../pages/home";
import { Login } from "../../widgets/login";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to={"/login"}/>} />
        <Route path="/login" element={<Login />}/>
        <Route path="/home" element={<HomePage />} />
        <Route path="/alert" element={<AlertPage />} />
        <Route path="/cam" element={<CamPage />}/>
        <Route path="/Config" element={<ConfigPage />} />
        <Route path="/formulary" element={<FormularyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export { AppRouter };
