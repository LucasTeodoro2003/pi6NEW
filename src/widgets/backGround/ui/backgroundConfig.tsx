import React, { useEffect, useState } from "react";
import { SucessMensageLocation } from "../../../shared/ui/SucessMensage/SucessMensageLocation";
import { ConfigAccount } from "../../configAccount";

interface InicarCamera {}

const BackgroundConfig: React.FC<InicarCamera> = () => {
  const [mensage, setMensage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

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

  return (
    <div className="flex h-[calc(100vh-98px)] ml-64">
      <div className="bg-white dark:bg-gray-800 w-full h-max">
        <ConfigAccount />
        {mensage && (
          <div
            className={`transition-opacity duration-1000 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            <SucessMensageLocation />
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
