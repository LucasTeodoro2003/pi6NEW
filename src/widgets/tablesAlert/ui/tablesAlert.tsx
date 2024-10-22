import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Person } from "../../../Entities/employee";

interface TablesAlertPromps {
  people: Person[];
}

const TablesAlert: React.FC<TablesAlertPromps> = ({ people }) => {
  const [showPersonId, setShowPersonId] = useState<number | null>(null);

  const detailsPerson = (id: number) => {
    setShowPersonId(showPersonId === id ? null : id);
  };

  return (
    <ul className="ml-4 mt-4 mr-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((person) => (
        <li
          key={person.id}
          className="col-span-1 h-fit divide-y divide-gray-200 rounded-lg bg-white dark:bg-gray-700 shadow"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {person.name}
                </h3>
                <span
                  className={`inline-block flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    person.usingEpi
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {person.usingEpi ? "Completa" : "Incompleta"}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500 dark:text-white">
                {person.sector}
              </p>
            </div>
            <img
              className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 dark:bg-gray-900"
              src={person.image}
              alt=""
            />
          </div>
          <div>
            <div className="flex w-full justify-center">
              <button
                onClick={() => detailsPerson(person.id)}
                className="text-gray-500 flex items-center space-x-2 focus:outline-none"
              >
                <span className="text-sm dark:text-white">Detalhes</span>
                <ChevronDownIcon
                  className={`h-5 w-5 transform transition-transform ${
                    showPersonId === person.id ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            <div
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                showPersonId === person.id && person.details
                  ? "max-h-96"
                  : "max-h-52"
              }`}
            >
              {showPersonId === person.id && Array.isArray(person.details) && (
                <div className="p-4">
                  <ul>
                    {person.details.map((details, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-white">
                        {details}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export { TablesAlert };
