import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { api } from "../../../App/serviceApi";
import { Cam, CamRow } from "../../../Entities/cams";

interface TableCamProps {}

const TableCam: React.FC<TableCamProps> = () => {
  const [camList, setCamList] = useState<Cam[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const locationId = location.state?.locationId || localStorage.getItem("locationId");
  console.log("ID: " + locationId)
  const listCam = JSON.parse(localStorage.getItem("listCameras") || "[]");

  useEffect(() => {
    const fetchCams = async () => {
      try {
        if (listCam.length > 0) {
          const cams: Cam[] = [];
          for (const id of listCam) {
            const response = await api.get(`/CameraController/GetCameraById?cameraId=${id}`);
            if (response.data?.return) {
              cams.push(response.data.return);
            } else {
              console.error(`Câmera com ID ${id} não encontrada.`);
            }
          }
          setCamList(cams);
        } else {
          console.warn("Nenhuma câmera encontrada na lista.");
        }
      } catch (error) {
        console.error("Erro ao buscar câmeras:", error);
      }
    };

    fetchCams();
  }, [listCam]);

  return (
    <div className="ml-6 w-full mr-6 divide-y divide-gray-200 dark:divide-slate-700 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-600 shadow">
      <div className="flex justify-between items-center px-2 py-5 sm:px-6">
        <h3 className="text-lg font-semibold font-Jakarta leading-6 text-gray-900 dark:text-white">
          Câmeras
        </h3>
        <button
          className="flex items-center space-x-2 dark:text-white"
          onClick={() =>
            navigate("/config", {
              state: {
                showView: "CREATED CAM",
                locationId,
              },
            })
          }
          disabled={!locationId}
        >
          <PlusCircleIcon className="w-6 h-6" />
          <span>Nova Câmera</span>
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
                    Nome da Câmera
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3.5 text-center text-sm font-semibold font-Jakarta text-gray-900 dark:text-white"
                  >
                    IP da Câmera
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3.5 text-center text-sm font-semibold font-Jakarta text-gray-900 dark:text-white"
                  >
                    Status do Feed
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3.5 text-center text-sm font-semibold font-Jakarta text-gray-900 dark:text-white"
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                {camList.length > 0 ? (
                  camList.map((cam) => <CamRow key={cam.id} cam={cam} />)
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-5 text-gray-500 dark:text-gray-400"
                    >
                      Nenhuma câmera encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TableCam };
