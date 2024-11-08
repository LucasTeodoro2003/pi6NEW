import { Menu, Transition } from "@headlessui/react";
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface DropConfigProps {
  onTabs: (name:string) => void;
}


function DropConfig({ onTabs }: DropConfigProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border dark:text-white border-gray-300 bg-white dark:bg-gray-500 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          Selecione
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y dark:text-white divide-gray-100 rounded-md bg-white dark:bg-gray-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                  onClick={() => {onTabs("CREATED")}}
                    className={classNames(
                      active ? "bg-gray-100 dark:bg-gray-400 text-gray-900" : "text-gray-700",
                      "group flex items-center px-4 py-2 text-sm w-full dark:text-white"
                    )}>
                    <PencilSquareIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-white" aria-hidden="true" />
                    Criar Localização
                  </button>
                )}
              </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {onTabs("EDITY")}}
                  className={classNames(
                    active ? "bg-gray-100 dark:bg-gray-400 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm w-full dark:text-white"
                  )}
                >
                  <PencilIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-white"
                    aria-hidden="true"
                  />
                  Editar Localização
                </button>
              )}
            </Menu.Item>
            </div>
            <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {onTabs("")}}
                  className={classNames(
                    active ? "bg-gray-100 dark:bg-gray-400 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm w-full dark:text-white"
                  )}
                >
                  <DocumentDuplicateIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-white"
                    aria-hidden="true"
                  />
                  Duplicate
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => { }}
                  className={classNames(
                    active ? "bg-gray-100 dark:bg-gray-400 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm w-full dark:text-white"
                  )}
                >
                  <ArchiveBoxIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-white"
                    aria-hidden="true"
                  />
                  Archive
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => { }}
                  className={classNames(
                    active ? "bg-gray-100 dark:bg-gray-400 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm w-full dark:text-white"
                  )}
                >
                  <ArrowRightCircleIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-white"
                    aria-hidden="true"
                  />
                  Move
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => { }}
                  className={classNames(
                    active ? "bg-gray-100 dark:bg-gray-400 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm w-full dark:text-white"
                  )}
                >
                  <UserPlusIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-white"
                    aria-hidden="true"
                  />
                  Share
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => { }}
                  className={classNames(
                    active ? "bg-gray-100 dark:bg-gray-400 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm w-full dark:text-white"
                  )}
                >
                  <HeartIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-white"
                    aria-hidden="true"
                  />
                  Add to favorites
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => { }}
                  className={classNames(
                    active ? "bg-gray-100 dark:bg-gray-400 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm w-full dark:text-white"
                  )}
                >
                  <TrashIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-white"
                    aria-hidden="true"
                  />
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
export { DropConfig };
