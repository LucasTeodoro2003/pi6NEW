import { useEffect, useState } from "react";
import { api } from "../../../App/serviceApi";
import { EmployeeRow, Person } from "../../../Entities/employee";

interface TableProps {}

const Table: React.FC<TableProps> = () => {
  const [personList, setPersonList] = useState<Person[]>([]);

  const userFromLocalStorage = localStorage.getItem("user");
  const user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
  console.log(user);

  const listPerson = JSON.parse(localStorage.getItem("listPerson") || "[]");
  const email = listPerson[0];
  console.log(email);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const responses = await Promise.all(
          listPerson.map(async (email:any) => {
            const response = await api.get("/PersonController/GetPerson?email=" + email);
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
  

  return (
    <div className="ml-6 w-full divide-y divide-gray-200 dark:divide-slate-700 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-600 shadow">
      <div className="flex justify-between items-center px-2 py-5 sm:px-6">
        <h3
          className="text-lg font-semibold font-Jakarta leading-6 text-gray-900 dark:text-white
        "
        >
          Funcionarios
        </h3>
      </div>
      <div className="px-2 py-5 sm:p-6">
        <div className="overflow-hidden shadow ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-5 md:rounded-lg">
          <div className="max-h-96 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-3 pr-3 text-left text-sm font-semibold font-Jakarta text-gray-900 dark:text-white sm:pl-6"
                  >
                    Nome
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3.5 text-center text-sm font-semibold font-Jakarta text-gray-900 dark:text-white"
                  >
                    Numero de Telefone
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
              {personList.map((person) => (
                  <EmployeeRow key={person.id} person={person} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Table };
