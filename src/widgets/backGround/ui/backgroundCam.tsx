import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ShowcamUser } from "../../AllCam";

interface InicarCamera {}

const BackgroundCam: React.FC<InicarCamera> = () => {
  const [buttonOn, setButtonOn] = useState("");
  const location = useLocation();
  const navigate = useNavigate();


  const toggleTableLocation = () => {
    setButtonOn("");
  };

const handleButtonClick = () => {
  if (location.pathname === "/login") {
    localStorage.removeItem("token");
  }
  if (buttonOn === "") {
    navigate(-1);
  } else {
    toggleTableLocation();
  }
};
  return (
    <div className="flex h-full ml-64">
      <div className="bg-white dark:bg-gray-800 w-full h-full ">
      <button className="dark:text-white mx-2 my-2" onClick={handleButtonClick}><ArrowUturnLeftIcon className="h-6 w-6" /></button>
        <ShowcamUser />
        <div className="flex mt-5 mx-5 bg-white dark:bg-gray-800">
          <div className="flex text-justify w-screen"></div>
        </div>
      </div>
    </div>
  );
};

export { BackgroundCam };
