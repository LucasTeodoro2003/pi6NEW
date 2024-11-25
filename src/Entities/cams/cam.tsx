import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router";
import { api } from "../../App/serviceApi";
import { Cam } from "./types";

interface CamRowProps {
  cam: Cam;
}

const CamRow: React.FC<CamRowProps> = ({ cam }) => {
  const navigate = useNavigate();

  const deleteCam = async (id: string) => {
    try {
      const response = await api.delete(
        "/CameraController/DeleteCamera?cameraId=" + id
      );
      console.log(response.data.return);
      console.log("Deletando: ", id);
    } catch (error) {
      console.error("Error ao deletar Localização:", error);
    }
    window.location.reload();
  };

  const edityCamId = (id: string) => {
    localStorage.setItem("edityCam", id);
  };

  return (
    <tr key={cam.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-500">
                {cam.name ? cam.name.charAt(0).toUpperCase() : "?"}
              </span>
            </div>
          </div>
          <div className="ml-1">
            <div className="font-medium text-gray-900 dark:text-white">
              {cam.name || "Nome da Câmera Indisponível"}
            </div>
            <div className="text-gray-500 dark:text-gray-300">
              {cam.description || "Sem descrição"}
            </div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-1 py-6 text-sm text-gray-500 flex items-center justify-center">
        <div className="text-gray-900 dark:text-white">
          {cam.ip} : {cam.portRSTP}
        </div>
      </td>
      <td className="whitespace-nowrap px-0 py-4 text-sm text-gray-500 text-center">
        {cam.feedUrl ? (
          <button
            onClick={() => {
              console.log("Feed URL ativado para", cam.name);
            }}
            className="hover:text-green-500 inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
          >
            Feed Ativo
          </button>
        ) : (
          <button
            onClick={() => {
              console.log("Feed URL não disponível para", cam.name);
            }}
            className="hover:text-red-400 inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800"
          >
            Feed Inativo
          </button>
        )}
      </td>
      <td className="whitespace-nowrap px-4 text-sm text-center flex justify-center space-x-3">
        <button
          className="dark:text-gray-400 text-gray-600 transform transition-transform duration-200 ease-in-out hover:scale-125"
          onClick={() => {navigate("/config", {
            state: {
              showView: "EDITY CAM",
            },
          }); edityCamId(cam.id)}}
        >
          <PencilIcon className="w-5 h-5" />
        </button>
        <button
          className="text-red-400 transform transition-transform duration-100 ease-in-out hover:scale-125"
          onClick={() => {deleteCam(cam.id)}}
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};
export { CamRow };
