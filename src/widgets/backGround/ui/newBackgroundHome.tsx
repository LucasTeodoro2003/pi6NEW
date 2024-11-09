import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Address } from "../../../Entities/address";
import { User } from "../../../Entities/users";
import { TableCam } from "../../tableCam";
import { Table } from "../../tableEmployee";
import { TableLocation } from "../../tablesLocation";
interface NewBackgroundHomeProps {
  address: Address[];
  user: User | null;
}

const NewbackgroundHome: React.FC<NewBackgroundHomeProps> = ({
  address,
  user
}) => {
  const [buttonOn, setButtonOn] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  

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

  return (
    <div className="flex h-screen ml-64">
      <div className="bg-white dark:bg-gray-800 w-full h-full">
        <button className="dark:text-white mx-2 my-2" onClick={handleButtonClick}><ArrowUturnLeftIcon className="h-6 w-6" /></button>
        <div className="flex mt-5 bg-white dark:bg-gray-800">
          <div className="flex text-justify w-full justify-center items-center">
            {buttonOn === "person" && (
              <Table />
            )}{buttonOn === "" && (
              <TableLocation address={address} user={user} onButtonClick={(name) => setButtonOn(name)} />
            )}
            {buttonOn === "cam" && (
              <TableCam />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { NewbackgroundHome };
