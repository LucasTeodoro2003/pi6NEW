import React, { useState, useEffect, useCallback } from "react";
import { Hourglass } from "react-loader-spinner";
import { api } from "../../../App/serviceApi";

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

interface InputFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
}

const EdityFormularyCam = () => {
  const [cameraData, setCameraData] = useState<Camera | null>(null);
  const [loading, setLoading] = useState(false);

  const edityCam = localStorage.getItem("edityCam");
  const cameraId = edityCam ? edityCam : "";

  const fetchCameraData = useCallback(async () => {
    try {
      const response = await api.get(`/CameraController/GetCameraById?cameraId=${cameraId}`);
      setCameraData(response.data.return);
    } catch (error) {
      console.error("Erro ao buscar dados da câmera:", error);
      setCameraData(null);
    }
  }, [cameraId]);

  useEffect(() => {
    fetchCameraData();
  }, [fetchCameraData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCameraData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cameraData || !cameraData.id) {
      console.error("Dados da câmera estão vazios");
      return;
    }

    setLoading(true);

    try {
      const response = await api.put(`/CameraController/UpdateCamera?cameraId=${cameraData.id}`, {
        ...cameraData,
      });
      console.log("Câmera atualizada com sucesso:", response.data);

      localStorage.setItem("showSuccessMessageCamEdity", "true");
      window.location.reload();
    } catch (err) {
      console.error("Erro ao atualizar a câmera:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full mb-auto">
      <div className="bg-white dark:bg-gray-700 w-full h-auto flex justify-center items-baseline mb-auto rounded-2xl">
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-6 w-96 items-baseline">
          <form onSubmit={handleSubmit}>
            {cameraData && (
              <>
                <InputField
                  label="Nome"
                  name="name"
                  value={cameraData.name}
                  onChange={handleChange}
                  className="text-gray-700 dark:text-white"
                />
                <InputField
                  label="Modelo"
                  name="model"
                  value={cameraData.model}
                  onChange={handleChange}
                  className="text-gray-700 dark:text-white"
                />
                <InputField
                  label="Descrição"
                  name="description"
                  value={cameraData.description}
                  onChange={handleChange}
                  className="text-gray-700 dark:text-white"
                />
                <InputField
                  label="IP (Com os pontos)"
                  name="ip"
                  value={cameraData.ip}
                  onChange={handleChange}
                  className="text-gray-700 dark:text-white"
                />
                <InputField
                  label="Porta RSTP"
                  name="portRSTP"
                  value={cameraData.portRSTP}
                  onChange={handleChange}
                  className="text-gray-700 dark:text-white"
                />

                <button className="w-full bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-950 dark:bg-gray-800">
                  Atualizar Câmera
                </button>
                {loading && (
                  <div className="flex justify-center mr-3 mt-4">
                    <Hourglass
                      visible={true}
                      height="30"
                      width="30"
                      ariaLabel="hourglass-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      colors={["#050b14", "#72a1ed"]}
                    />
                  </div>
                )}
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  className = "",
}) => (
  <div className="mb-4">
    <label className={`block mb-2 ${className}`}>{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 ${className}`}
    />
  </div>
);

export { EdityFormularyCam };
