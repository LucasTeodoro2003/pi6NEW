import { TrashIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/24/outline";
import { api } from "../../App/serviceApi";
import { Person } from "./types";

interface EmployeeRowProps {
  person: Person;
  onDelete: (email: string) => void;
}

export function EmployeeRow({ person , onDelete}: EmployeeRowProps) {
  function formatPhoneNumber(phone: any) {
    if (!phone) return "";

    return phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
  }

  const deletePerson = async (id: string) => {
    try {
      const response = await api.get(
        "/PersonController/DeletePerson?email=" + id
      );
      const idDelete = response.data.return.id 
      console.log("Deletando: ", idDelete);
      await api
    } catch (error) {
      console.error("Error ao deletar Pessoa:", error);
    }
  };

  return (
    <tr key={person.id}>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
        <div className="flex items-center justify-start">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className={
                "ml-2 h-10 w-10 rounded-full " +
                (person.image ? "dark:filter dark:invert" : "")
              }
              src={person.image ? person.image : "usuario.png"}
              alt=""
            />
          </div>
          <div className="ml-2">
            <div className="font-medium text-gray-900 dark:text-white">
              {person.name}
            </div>
            <div className="text-gray-500 dark:text-gray-300">
              {person.email}
            </div>
          </div>
        </div>
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 text-center">
        <div className="flex items-center justify-center">
          <img src="whatsapp.png" alt="logoWhatsapp" className="w-6 h-6 mr-2" />
          <div className="text-gray-900 dark:text-white">
            {formatPhoneNumber(person.phone)}
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap text-sm text-gray-500 text-center">
        <div className="flex items-center justify-center">
          <button >
          <PencilIcon className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:w-7 hover:h-7" />
          </button>
          <button onClick={() => {deletePerson(person.email)}}>
          <TrashIcon className="h-5 w-5 text-red-300 dark:text-red-500 hover:w-7 hover:h-7" />
          </button>
        </div>
      </td>
    </tr>
  );
}
