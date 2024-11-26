import React, { useEffect, useState } from "react";
import { FaUser, FaUserTie } from "react-icons/fa";
import Select from "react-select";
import { api } from "../../../App/serviceApi";
import { Person } from "../../../Entities/employee";

interface TableProps {}

const Table: React.FC<TableProps> = () => {
  const [doneLoading, setDoneLoading] = useState(false);
  const [personList, setPersonList] = useState<Person[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const locationId = localStorage.getItem("locationId");
  const [listPerson] = useState(
    JSON.parse(localStorage.getItem("listPerson") || "[]")
  );
  const [managers, setManagers] = useState<string[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const searchRole = user?.permissions[0].role;

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await api.get("/PersonController/GetAllPerson");
        let peopleLocations = response.data.return;

        if (searchRole === 2) {
          peopleLocations = peopleLocations.filter((person: Person) =>
            person.permissions.some(
              (permission) => permission.role === 2 || permission.role === 3
            )
          );
        }
        setPeople(peopleLocations);
      } catch (error) {
        console.error("Erro ao buscar Pessoas:", error);
        return null;
      }
    };
    fetchPeople();
  }, [searchRole]);

  useEffect(() => {
    const fetchPersonPermissions = async () => {
      try {
        const response = await api.get(
          "/PersonController/GetPersonFromLocation?locationId=" + locationId
        );
        for (const person of response.data.return) {
          let personRole = person.permissions.find(
            (p: any) => p.locationId === locationId
          )?.role;
          if (personRole === 2) {
            setManagers((managers) => [...managers, person.id]);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar fetchPersonPermissions:", error);
        return null;
      }
    };
    fetchPersonPermissions().then(() => {
      setDoneLoading(true);
    });
  }, [searchRole, user?.email, locationId]);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const responses = await Promise.all(
          listPerson.map(async (email: any) => {
            const response = await api.get(
              "/PersonController/GetPerson?email=" + email
            );
            return response.data.return;
          })
        );
        setPersonList(responses);
      } catch (error) {
        console.error("Erro ao buscar pessoas: ", error);
      }
    };

    if (listPerson.length > 0) {
      fetchPerson();
    }
  }, [listPerson]);

  useEffect(() => {
    if (!doneLoading) return;
    const updatePermissions = async (personList: Person[]) => {
      try {
        await api.put(
          "/LocationController/UpdatePermissionsByLocation?locationId=" +
            locationId,
          personList.map((person) => ({
            personId: person.id,
            role: managers.includes(person.email) ? 2 : 3,
          }))
        );
      } catch (error) {
        console.error("Erro ao salvar permissões: ", error);
      }
    };
    updatePermissions(personList);
  }, [personList, managers, locationId, doneLoading]);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "white",
      border: "2px solid #4F46E5",
      borderRadius: "8px",
      padding: "4px",
      boxShadow: "none",
      ":hover": {
        borderColor: "#4338CA",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#4F46E5"
        : state.isFocused
        ? "#E0E7FF"
        : "white",
      color: state.isSelected ? "white" : "#1F2937",
      padding: "10px",
      cursor: "pointer",
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#E0E7FF",
      borderRadius: "4px",
      color: "#1F2937",
      fontWeight: "bold",
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#1F2937",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: "#4F46E5",
      ":hover": {
        backgroundColor: "#4338CA",
        color: "white",
      },
    }),
  };

  return (
    <div className="ml-6 w-full mr-6 divide-y divide-gray-200 dark:divide-slate-700 overflow-visible rounded-lg bg-gray-100 dark:bg-gray-600 shadow">
      <div className="flex justify-between items-center px-2 py-5 sm:px-6">
        <h3 className="text-lg font-semibold font-Jakarta leading-6 text-gray-900 dark:text-white">
          Funcionários
        </h3>
      </div>
      <div className="px-2 py-5 sm:p-6">
        <Select
          isMulti
          options={people}
          value={personList}
          onChange={(value) => setPersonList(value as Person[])}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.email}
          styles={customStyles}
          placeholder="Selecione os funcionários..."
          className="text-sm"
        />
      </div>
      <div className="px-2 py-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 dark:text-white">
          {personList.map((person) => (
            <div
              key={person.email}
              className="p-3 border rounded-lg shadow-sm flex items-center justify-between bg-white dark:bg-gray-700"
            >
              <div className="flex items-center gap-2">
                {managers.includes(person.email) ? (
                  <FaUserTie className="text-blue-500 text-xl" />
                ) : (
                  <FaUser className="text-gray-500 text-xl" />
                )}
                <div className="flex flex-col">
                  <span className="font-medium">{person.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-300">
                    {person.email}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setManagers((managers) => [...managers, person.email])
                  }
                  className={`py-1 px-2 rounded text-xs ${
                    managers.includes(person.email)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-500 text-gray-700"
                  }`}
                >
                  Gerente
                </button>
                <button
                  onClick={() =>
                    setManagers((managers) =>
                      managers.filter((manager) => manager !== person.email)
                    )
                  }
                  className={`py-1 px-2 rounded text-xs ${
                    managers.includes(person.email)
                      ? "bg-gray-200 dark:bg-gray-500 text-gray-700"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  Trabalhador
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Table };
