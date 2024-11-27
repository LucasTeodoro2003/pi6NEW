import React, { useState } from "react";
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const searchRole = user?.permissions[0]?.role;
  
  useState(() => {
    const permissions = user?.permissions || [];
    const fetchData = async () => {
      setIsLoading(true);
  
      if (searchRole === 1) {
        try {
          const response = await api.get("/CameraController/GetAllCamera");
          if (response.data.success && Array.isArray(response.data.return)) {
            setCameras(response.data.return);
          }
        } catch (error) {
          console.error("Erro ao buscar todas as câmeras:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          const cameraPromises = permissions.map(async (permission:any) => {
            const locationId = permission.locationId;
            try {
              const response = await api.get(
                `/LocationController/GetCamerasByLocation?locationId=${locationId}`
              );
              if (response.data.success && Array.isArray(response.data.return)) {
                return response.data.return;
              }
              return [];
            } catch (error) {
              console.error(
                `Erro ao buscar câmeras para locationId: ${locationId}`,
                error
              );
              return [];
            }
          });
  
          const cameraResults = await Promise.all(cameraPromises);
          const uniqueCameras = cameraResults.flat();
          setCameras(uniqueCameras);
        } catch (error) {
          console.error("Erro ao buscar câmeras por permissões:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
  
    fetchData();
  });
  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-800">
        <p className="text-white text-lg">Carregando Câmeras...</p>
      </div>
    );
  }

  return (
    <div className="w-full dark:bg-gray-800 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {cameras.map((camera) => (
          <div
            key={camera.id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-lg dark:bg-gray-800 dark:text-white"
          >
            <div className="bg-gray-100 dark:bg-gray-900 p-4">
              <h3 className="text-lg font-bold text-center">{camera.name}</h3>
            </div>
            <div className="relative bg-black">
              {camera.feedUrl ? (
                <ReactPlayer
                  url={camera.feedUrl}
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
    </div>
  );
};

export { ShowcamUser };