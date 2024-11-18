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
                  <li className="col-span-1 h-fit divide-y divide-gray-200 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 dark:text-white">
                    Detalhes
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {locationDetails.name}
                      </h3>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-300">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            Endereço:
                          </span>
                          <span className="text-gray-800 dark:text-gray-100">
                            {locationDetails.address_name}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            Cidade:
                          </span>
                          <span className="text-gray-800 dark:text-gray-100">
                            {locationDetails.city}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            Estado:
                          </span>
                          <span className="text-gray-800 dark:text-gray-100">
                            {locationDetails.state}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            CEP:
                          </span>
                          <span className="text-gray-800 dark:text-gray-100">
                            {locationDetails.cep}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            Informações Adicionais:
                          </span>
                          <span className="text-gray-800 dark:text-gray-100">
                            {locationDetails.aditionalInfo}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            Numero:
                          </span>
                          <span className="text-gray-800 dark:text-gray-100">
                            {locationDetails.number}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : (
                  <></>
                )}
                {dark === "light" && locationDetails ? (
                  <li className="col-span-1 h-fit divide-y divide-gray-200 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                    Detalhes
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {locationDetails.name}
                      </h3>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-300">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            Endereço:
                          </span>
                          <span className="text-gray-800 dark:text-gray-100">
                            {locationDetails.address_name}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            Cidade:
                          </span>
                          <span className="text-gray-800 dark:text-gray-100">
                            {locationDetails.city}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            Estado:
                          </span>
                          <span className="text-gray-800 dark:text-gray-100">
                            {locationDetails.state}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            CEP:
                          </span>
                          <span className="text-gray-800 dark:text-gray-100">
                            {locationDetails.cep}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : (
                  <></>
                )}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export { DetailsAlert };
