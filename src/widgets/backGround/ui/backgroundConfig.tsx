import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { SucessMensageCamEdity } from "../../../shared/ui";
import { SucessMensageCam } from "../../../shared/ui/SucessMensage/SucessMensageCam";
import { SucessMensageLocation } from "../../../shared/ui/SucessMensage/SucessMensageLocation";
import { ConfigAccount } from "../../configAccount";

interface BackgroundConfigProps {
  showView: string;
  setShowView: (view: string) => void;
}

const BackgroundConfig: React.FC<BackgroundConfigProps> = ({showView, setShowView}) => {
  const [mensage, setMensage] = useState(false);
  const [mensageCam, setMensageCam] = useState(false);
  const [mensageEdityCam, setMensageEdityCam] = useState(false)
  const [fadeOut, setFadeOut] = useState(false);
  const [buttonOn, setButtonOn] = useState("");
  const location = useLocation();
  const navigate = useNavigate();


  const toggleTableLocation = () => {
    setButtonOn("");
  };

const handleButtonClick = () => {
  if (location.pathname === "/login") {
    localStorage.removeItem("token");
    console.log("Usuário Deslogado.");
  }
  if (buttonOn === "") {
    navigate(-1);
  } else {
    toggleTableLocation();
  }
};

  useEffect(() => {
    const showSuccessMessage = localStorage.getItem("showSuccessMessage");

    if (showSuccessMessage === "true") {
      setMensage(true);
      localStorage.removeItem("showSuccessMessage");

      setTimeout(() => {
        setFadeOut(true);
      }, 3000);

      setTimeout(() => {
        setMensage(false);
        setFadeOut(false);
      }, 4000);
    }
  }, []);

  useEffect(() => {
    const showSuccessMessageCam = localStorage.getItem("showSuccessMessageCam");

    if (showSuccessMessageCam === "true") {
      setMensageCam(true);
      localStorage.removeItem("showSuccessMessageCam");

      setTimeout(() => {
        setFadeOut(true);
      }, 3000);

      setTimeout(() => {
        setMensageCam(false);
        setFadeOut(false);
        window.location.href = "/home";
      }, 4000);
    }
  }, []);

  useEffect(() => {
    const showSuccessMessageCamEdity = localStorage.getItem("showSuccessMessageCamEdity");

    if (showSuccessMessageCamEdity === "true") {
      setMensageEdityCam(true);
      localStorage.removeItem("showSuccessMessageCamEdity");

      setTimeout(() => {
        setFadeOut(true);
      }, 3000);

      setTimeout(() => {
        setMensageEdityCam(false);
        setFadeOut(false);
        window.location.href = "/home";
      }, 4000);
    }
  }, []);

  return (
    <div className="flex h-[calc(100vh-98px)] ml-64">
      <div className="bg-white dark:bg-gray-800 w-full h-max">
      <button className="dark:text-white mx-2 my-2" onClick={handleButtonClick}><ArrowUturnLeftIcon className="h-6 w-6" /></button>
        <ConfigAccount showView={showView} setShowView={setShowView}/>
        {mensage && (
          <div
            className={`transition-opacity duration-1000 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            <SucessMensageLocation />
          </div>
        )}
        {mensageCam && (
          <div
            className={`transition-opacity duration-1000 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            <SucessMensageCam />
          </div>
        )}
        {mensageEdityCam && (
          <div
            className={`transition-opacity duration-1000 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            <SucessMensageCamEdity />
          </div>
        )}
        <div className="flex mt-5 mx-5 bg-white dark:bg-gray-800">
          <div className="flex text-justify w-screen"></div>
        </div>
      </div>
    </div>
  );
};

export { BackgroundConfig };
