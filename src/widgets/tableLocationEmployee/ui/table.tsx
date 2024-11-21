import React, { useEffect, useState } from "react";
import Select from 'react-select'
import { api } from "../../../App/serviceApi";
import { Person } from "../../../Entities/employee";


interface TableProps { }

const Table: React.FC<TableProps> = () => {
  const [personList, setPersonList] = useState<Person[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const locationId = localStorage.getItem("locationId");
  const [listPerson] = useState(JSON.parse(localStorage.getItem("listPerson") || "[]"));
  const [managers, setManagers] = useState<string[]>([])

  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const searchRole = user?.permissions[0].role;

  useEffect(() => {
    const fetchAddressDetails = async () => {
      if (searchRole === 1) {
        try {
          const response = await api.get("/PersonController/GetAllPerson");
          const peopleLocations = response.data.return;
          setPeople(peopleLocations);
        } catch (error) {
          console.error("Erro ao buscar Pessoas:", error);
          return null;
        }
      } else if (searchRole === 2) {
        try {
          const response = await api.get("/PersonController/GetAllPerson");
          const peopleLocations = response.data.return;
          setPeople(peopleLocations);
        } catch (error) {
          console.error("Erro ao buscar Pessoas:", error);
          return null;
        }
      }
    };
    fetchAddressDetails();
  }, [searchRole]);

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
    const updatePermissions = async (personList: Person[]) => {
      try {
        await api.put(
          "/LocationCOntroller/UpdatePermissionsByLocation?locationId=" + locationId, personList.map((person) => ({ personId: person.id, role: managers.includes(person.email) ? 2 : 3 }))
        );
      } catch (error) {
        console.error("Erro ao salvar permissões: ", error);
      }
    }
    updatePermissions(personList);
  }, [personList, managers, locationId])

  return (
    <div className="ml-6 w-full divide-y divide-gray-200 dark:divide-slate-700 overflow-visible rounded-lg bg-gray-100 dark:bg-gray-600 shadow">
      <div className="flex justify-between items-center px-2 py-5 sm:px-6">
        <h3
          className="text-lg font-semibold font-Jakarta leading-6 text-gray-900 dark:text-white
        "
        >
          Funcionarios
        </h3>
      </div>
      <div className="px-2 py-5 sm:p-6">
        <Select isMulti options={people} value={personList} onChange={(value) => setPersonList(value as Person[])} getOptionLabel={(option) => option.name} getOptionValue={(option) => option.email} />
      </div>
      <div className="px-2 py-5 sm:p-6">
        <div className="dark:text-white">
          {
            personList.map(person => (
              <div key={person.email} className="flex gap-3">
                <span>{person.name}</span>
                <button onClick={() => setManagers(managers => ([...managers, person.email]))} className={managers.includes(person.email) ? "font-bold underline text-gray-100 font-Jakarta" : ""}>Gerente</button>
                <button onClick={() => setManagers(managers => managers.filter(manager => manager !== person.email))} className={managers.includes(person.email) ? "" : "font-bold underline text-gray-100 font-Jakarta"}>Trabalhador</button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export { Table };
