import { useState, useEffect } from "react";
import { Hourglass } from "react-loader-spinner";
import { api } from "../../../App/serviceApi";

interface FormularyCamProps {
    locationId: string | undefined;
}

const FormularyCam: React.FC<FormularyCamProps> = ({ locationId }) => {
    const [formData, setFormData] = useState({
        model: "",
        name: "",
        description: "",
        ip: "",
        portRSTP: "",
        locationId: locationId || "",
    });
    const [locationName, setLocationName] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLocationName = async () => {
            if (locationId) {
                try {
                    const response = await api.get("/LocationCOntroller/GetLocationById?locationId=" + locationId);
                    setLocationName(response.data.return.name);
                } catch (error) {
                    console.error("Erro ao obter nome da localização:", error);
                }
            }
        };

        fetchLocationName();
    }, [locationId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post("/CameraController/CreateCamera", formData);
            console.log("Câmera criada com sucesso:", response.data);
            localStorage.setItem("showSuccessMessageCam", "true");

            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.error("Erro ao criar câmera:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-full justify-center items-center mb-auto">
            <div className="bg-white dark:bg-gray-700 w-full h-auto flex justify-center items-baseline mb-auto rounded-2xl">
                <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-6 w-96 items-baseline">
                    <form onSubmit={handleSubmit}>
                        {locationName && (
                            <div className="mb-6 text-center">
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                                    Localização: {locationName}
                                </h3>
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="model">
                                Modelo:
                            </label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-white"
                                type="text"
                                id="model"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
                                Nome:
                            </label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-white"
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="description">
                                Descrição:
                            </label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-white"
                                type="text"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="ip">
                                IP:
                            </label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-white"
                                type="text"
                                id="ip"
                                name="ip"
                                value={formData.ip}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="portRSTP">
                                Porta RSTP:
                            </label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-white"
                                type="text"
                                id="portRSTP"
                                name="portRSTP"
                                value={formData.portRSTP}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            className="w-full bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-950 dark:bg-gray-800"
                            type="submit"
                        >
                            Criar Câmera
                        </button>

                        {loading && (
                            <div className="flex justify-center mt-4">
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export { FormularyCam };
