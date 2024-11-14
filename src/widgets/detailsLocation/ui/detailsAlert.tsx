import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";

interface DetailsAlertProps {}

const DetailsAlert: React.FC<DetailsAlertProps> = () => {
  const [open, setOpen] = useState(true);
  const dark = localStorage.getItem("theme");
  const id = localStorage.getItem("id");

  const locations = JSON.parse(localStorage.getItem("listLocations") || "[]");
  const locationDetails = locations.find((location: any) => location.id === id);

  useEffect(() => {
    if (locationDetails) {
      console.log("Item encontrado:", locationDetails);
    } else {
      console.log("ID não encontrado no array.");
    }
  }, [id, locationDetails]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div>
                {dark === "dark" && locationDetails ? (
                  <li className="col-span-1 h-fit divide-y divide-gray-200 rounded-lg bg-white dark:bg-gray-700 shadow">
                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                      <div className="flex-2 truncate">
                        <div className="flex items-center space-x-3 mt-2 justify-center">
                          <h3 className="items-center justify-center truncate text-sm font-medium text-gray-900 dark:text-white">
                            {locationDetails.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="overflow-hidden transition-all duration-200 ease-in-out max-h-96">
                        <div className="p-4 justify-between flex-2 dark:text-white">
                          <ul className="flex justify-between">
                            <li>
                              <strong>Endereço:</strong> {locationDetails.address_name}
                            </li>
                            <li>
                              <strong>Cidade:</strong> {locationDetails.city}
                            </li>
                            <li>
                              <strong>Estado:</strong> {locationDetails.state}
                            </li>
                            <li>
                              <strong>CEP:</strong> {locationDetails.cep}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : (
                  <div className="text-white">Carregando...</div>
                )}
                {dark === "light" && <div>Lucas Light</div>}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export { DetailsAlert };
