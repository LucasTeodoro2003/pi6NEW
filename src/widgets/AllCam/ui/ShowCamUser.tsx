import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { api } from "../../../App/serviceApi";

interface ShowcamCaseProps {}

interface Camera {
  id: string;
  feedUrl: string | null;
  model: string;
  name: string;
  description: string;
  ip: string;
  portRSTP: string;
  locationId: string;
}

const ShowcamUser: React.FC<ShowcamCaseProps> = () => {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const searchRole = user?.permissions[0]?.role;

  const locations = JSON.parse(localStorage.getItem("listLocations") || "[]");

  useEffect(() => {
    const fetchData = async () => {
      if (searchRole !== 1) {
        try {
          const allCameras: Camera[] = [];

          for (const location of locations) {
            const { id: locationId } = location;

            const response = await api.get(
              `/LocationController/GetCamerasByLocation?locationId=${locationId}`
            );

            if (response.data.success && Array.isArray(response.data.return)) {
              allCameras.push(...response.data.return);
            }
          }

          setCameras(allCameras);
        } catch (error) {
          console.error("Erro ao buscar câmeras por localização:", error);
        }
      } else {
        try {
          const response = await api.get("/CameraController/GetAllCamera");
          if (response.data.success && Array.isArray(response.data.return)) {
            setCameras(response.data.return);
          }
        } catch (error) {
          console.error("Erro ao buscar todas as câmeras:", error);
        }
      }
    };

    fetchData();
  }, [searchRole, locations]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cameras.map((camera) => (
        <div
          key={camera.id}
          className="border border-gray-300 rounded-lg overflow-hidden shadow-lg dark:bg-gray-800 dark:text-white"
        >
          <div className="bg-gray-100 dark:bg-gray-900 p-4">
            <h3 className="text-lg font-bold text-center">{camera.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
            </p>
          </div>
          <div className="relative bg-black">

            {/* Tenho que Mudar Depois  {camera.feedUrl}*/}



            {camera.description ? (
              <ReactPlayer
                url={camera.description}
                playing
                controls
                width="100%"
                height="200px"
                className="react-player"
              />
            ) : (
              <div className="flex items-center justify-center h-52 bg-gray-200 dark:bg-gray-700 text-red-500">
                <span>Câmera sem URL</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export { ShowcamUser };
