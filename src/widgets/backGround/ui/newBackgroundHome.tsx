import { ArrowUturnLeftIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Popup from "reactjs-popup";
import { useAuth } from "../../../App/authPages";
import { api } from "../../../App/serviceApi";
import { Address } from "../../../Entities/address";
import { User } from "../../../Entities/users";
import { DetailsAlert } from "../../detailsLocation";
import { TableCam } from "../../tableCam";
import { Table } from "../../tableLocationEmployee";
import { TableLocation } from "../../tablesLocation";

interface NewBackgroundHomeProps {
  user: User | null;
}

const NewbackgroundHome: React.FC<NewBackgroundHomeProps> = ({
  user,
}) => {
  const { id } = useAuth();

  const [address, setAddressList] = useState<Address[]>([]);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const [buttonOn, setButtonOn] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const searchRole = user?.permissions[0].role;

  useEffect(() => {
    const fetchAddressDetails = async () => {
      if (searchRole === 1) {
        try {
          const response = await api.get("/LocationController/GetAllLocation");
          const locations = response.data.return;
          setAddressList(locations);
        } catch (error) {
          console.error("Erro ao buscar localizações:", error);
          return null;
        }
      } else if (searchRole === 2) {
        try {
          const response = await api.get("/PersonController/GetLocationsByPerson?personId=" + user?.email);
          const locations = response.data.return;
          setAddressList(locations);
        } catch (error) {
          console.error("Erro ao buscar localizações:", error);
          return null;
        }
      }
    };
    fetchAddressDetails();
  }, [user, id, searchRole, buttonOn]);



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

  const openDetailsPopup = () => {
    setIsDetailsPopupOpen(true);
  };

  const closeDetailsPopup = () => {
    setIsDetailsPopupOpen(false);
  };

  return (
    <div className="flex h-screen ml-64">
      <div className="bg-white dark:bg-gray-800 w-full h-full">
        <div className="flex justify-between">
          <button
            className="dark:text-white mx-2 my-2"
            onClick={handleButtonClick}
          >
            <ArrowUturnLeftIcon className="h-6 w-6" />
          </button>
          <button
            className="dark:text-white mx-2 my-2 flex items-center"
            onClick={() => { navigate("/config", { state: { showView: "CREATED" } }) }}
          >
            <div className="flex items-center">
              Criar Localização
              <PlusCircleIcon className="h-6 w-6 ml-2" />{" "}
            </div>
          </button>
        </div>

        <div className="flex mt-5 bg-white dark:bg-gray-800">
          <div className="flex text-justify w-full justify-center items-center">
            {buttonOn === "person" && <Table />}
            {buttonOn === "" && (
              <TableLocation
                address={address}
                user={user}
                onButtonClick={(name) => setButtonOn(name)}
                onDetailsClick={openDetailsPopup}
              />
            )}
            {buttonOn === "cam" && <TableCam />}
          </div>
        </div>
        <Popup
          open={isDetailsPopupOpen}
          onClose={closeDetailsPopup}
          position="center center"
        >
          <DetailsAlert />
        </Popup>
      </div>
    </div>
  );
};

export { NewbackgroundHome };
