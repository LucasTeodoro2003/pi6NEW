import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect } from "react";

interface CamNotFoundPromps {
  show: boolean;
  setShowAlert: (_: boolean) => void;
}

const CamNotFound: React.FC<CamNotFoundPromps> = ({ show, setShowAlert }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [show, setShowAlert]);



  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-100 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="mt-7 mr-28 pointer-events-auto w-40 max-w-sm overflow-hidden rounded-lg bg-white dark:bg-gray-700 shadow-lg dark:ring-1 dark:ring-black dark:ring-opacity-5">
              <div className="p-4">
                <div className="flex items-center">
                  <div className="flex w-0 flex-1 justify-between">
                    <p className="w-0 flex-1 text-sm font-medium text-gray-900 dark:text-gray-200">
                      Selecione alguma localização
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShowAlert(false);
                      }}
                    >
                      <XMarkIcon
                        className="h-5 w-5"
                        title="Fechar"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};

export { CamNotFound };
