import {
  ChevronDoubleDownIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../../App/serviceApi";
import { Address } from "../../../Entities/address";
import { User } from "../../../Entities/users";
import { GoogleMaps } from "../../../shared/ui";

interface TableLocationProps {
  address: Address[];
  user: User | null;
  onButtonClick: (name: string) => void;
  onDetailsClick: () => void;
}

interface AddressNew extends Address {
  address_name: string;
  address_type: string;
  district: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  listPerson: string[];
  listCameras: string[];
}

const TableLocation: React.FC<TableLocationProps> = ({
  address,
  user,
  onButtonClick,
  onDetailsClick,
}) => {
  const [newAddress, setNewAddress] = useState<AddressNew[]>([]);
  const cep = require("awesome-cep");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddressDetails = async () => {
      const updatedAddresses = await Promise.all(
        address.map(async (addr) => {
          try {
            const resp = await cep.findCEP(addr.cep);
            return {
              ...addr,
              address_name: resp.address_name,
              address_type: resp.address_type,
              district: resp.district,
              city: resp.city,
              state: resp.state,
              lat: Number(resp.lat),
              lng: Number(resp.lng),
              listPerson: addr.listPerson || [],
              listCameras: addr.listCameras || [],
            };
          } catch (error) {
            console.error("Erro ao buscar CEP:", error);
            return addr;
          }
        })
      );
      setNewAddress(updatedAddresses);
      localStorage.setItem("listLocations", JSON.stringify(updatedAddresses));
    };

    fetchAddressDetails();
  }, [address, cep]);

  const handlePersonClick = (locationId: string, listPerson: string[]) => {
    localStorage.setItem("locationId", locationId);
    localStorage.setItem("listPerson", JSON.stringify(listPerson));
    onButtonClick("person");
  };

  const handleCameraClick = (listCameras: string[]) => {
    localStorage.setItem("listCameras", JSON.stringify(listCameras));
    onButtonClick("cam");
  };

  const deleteLocation = async (id: string) => {
    try {
      const response = await api.delete(
        "/LocationController/DeleteLocation?id=" + id
      );
      console.log(response.data.return);
      console.log("Deletando: ", id);
    } catch (error) {
      console.error("Error ao deletar Localização:", error);
    }
    window.location.reload();
  };

  const handleClick = (id: string) => {
    localStorage.setItem("id", id);
    console.log("BotaoCLicado: ", localStorage.getItem("id"));
  };

  // newAddress.map((addr) => {
  //   console.log(addr.id);
  //   return <></>;
  // });

  return (
    <div className="items-center justify-center text-center">
      {newAddress.length === 0 ? (
        <>
          <div className="items-center justify-between text-center dark:text-white">
            Criar Primeira Localização.
            <div className="justify-between">
              <button
                type="button"
                className="mt-3 inline-flex items-center rounded-full border border-transparent bg-gray-300 dark:bg-gray-600 p-3 text-white shadow-sm hover:bg-gray-600 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                onClick={() =>
                  navigate("/config", { state: { showView: "CREATED" } })
                }
              >
                <PlusIcon className="h-6 w-6 " aria-hidden="true" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <ul className="ml-4 mt-4 mr-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newAddress.map((addr) => {
            const isValidLatLng =
              typeof addr.lat === "number" &&
              !isNaN(addr.lat) &&
              typeof addr.lng === "number" &&
              !isNaN(addr.lng);

            return (
              <li
                key={addr.id}
                className="col-span-1 h-fit divide-y divide-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 shadow"
              >
                <div className="flex w-full items-center justify-between space-x-6 p-6">
                  <div className="flex-3 truncate dark:text-red-600">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        className="mr-4 inline-flex items-center rounded-md border border-transparent bg-gray-200 dark:bg-gray-600 px-2 py-1 text-sm font-medium text-gray-600 dark:text-white shadow-sm dark:hover:bg-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        onClick={() => {
                          onDetailsClick();
                          handleClick(addr.id);
                        }}
                      >
                        Detalhes
                        <ChevronDoubleDownIcon
                          className={`ml-2 -mr-1 h-5 w-5 transition-transform duration-300`}
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        className="dark:text-gray-400 text-gray-600"
                        onClick={() => {
                          navigate("/config", { state: { showView: "EDITY" } });
                        }}
                      >
                        <PencilIcon className="w-5 h-5 hover:w-7 hover:h-7" />
                      </button>

                      <button
                        className="text-red-400"
                        onClick={() => {
                          deleteLocation(addr.id);
                        }}
                      >
                        <TrashIcon className="w-5 h-5 hover:w-7 hover:h-7" />
                      </button>
                    </div>
                    <div className="mt-1 flex justify-center dark:text-white">
                      {isValidLatLng ? (
                        <h3 className="flex items-center justify-center dark:text-white">
                          {addr.name}
                        </h3>
                      ) : (
                        <h2 className="flex items-center justify-center dark:text-white text-xs">
                          {addr.name} - Localização Não Disponivel
                        </h2>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 mt-2 justify-center">
                      <h3 className="items-center justify-center truncate text-sm font-medium text-gray-900 dark:text-white">
                        {isValidLatLng ? (
                          <GoogleMaps lat={addr.lat} lng={addr.lng} />
                        ) : (
                          <p>Localização não disponível</p>
                        )}
                      </h3>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="overflow-hidden transition-all duration-200 ease-in-out max-h-96">
                    <div className="p-4 justify-between flex-2 dark:text-white">
                      <ul className="flex justify-between">
                        <td>Endereço: </td>
                        <td>{addr.address_name}</td>
                      </ul>
                      <ul className="flex justify-between">
                        <li className="flex-auto">
                          <button
                            className="hover:underline w-full flex justify-between"
                            onClick={() => {
                              handlePersonClick(addr.id, addr.listPerson);
                              onButtonClick("person");
                            }}
                          >
                            <span className="justify-start">
                              Funcionários:{" "}
                            </span>
                            <span className="justify-end">
                              {addr.listPerson.length}
                            </span>
                          </button>
                        </li>
                      </ul>

                      <ul className="flex justify-between">
                        <li className="flex-auto">
                          <button
                            className="hover:underline w-full flex justify-between"
                            onClick={() => {
                              handleCameraClick(addr.listCameras);
                              onButtonClick("cam");
                            }}
                          >
                            <span className="justify-start">Cameras: </span>
                            <span className="justify-end">
                              {addr.listCameras.length}
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export { TableLocation };
