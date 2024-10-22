import { useNavigate } from "react-router-dom";
import { EmployeeRow, Person } from "../../../Entities/employee";

interface TableProps {
  people: Person[];
}

const Table: React.FC<TableProps> = ({ people }) => {
  const navigate = useNavigate();

  return (
    <div className="ml-6 w-full divide-y divide-gray-200 dark:divide-slate-700 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-600 shadow">
      <div className="flex justify-between items-center px-2 py-5 sm:px-6">
        <h3 className="text-lg font-semibold font-Jakarta leading-6 text-gray-900 dark:text-white
        ">
          Funcionarios
        </h3>
        <button
          onClick={() => navigate("/formulary")}
          className="inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-semibold bg-primary  text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto font-Jakarta"
        >
          Adicionar Funcionário
        </button>
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
                    className="px-1 py-3.5 text-left text-sm font-semibold font-Jakarta text-gray-900 dark:text-white"
                  >
                    Departamento
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3.5 text-center text-sm font-semibold font-Jakarta text-gray-900 dark:text-white"
                  >
                    Epi's Completas
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                {people.map((person) => (
                  <EmployeeRow person={person} />
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
