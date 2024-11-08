import React, { useState, useEffect, useCallback } from "react";
import { Hourglass } from "react-loader-spinner";
import { api } from "../../../App/serviceApi";

interface Location {
  id: string;
  name: string;
  address: string;
  number: number;
  aditionalInfo: string;
  city: string;
  state: number;
  cep: string;
  latitude: number;
  longitude: number;
}

interface InputFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
}

const fetchAddressByCep = async (cep: string) => {
  try {
    const response = await api.get(`https://cep.awesomeapi.com.br/${cep}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar endereço pelo CEP:", error);
    return null;
  }
};

const EdityFormularyLocation = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [formData, setFormData] = useState<Location | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  const userFromLocalStorage = localStorage.getItem("user");
  const user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
  const searchRole = user?.permissions[0]?.role;
  const personId = user?.id;

  const fetchLocations = useCallback(async () => {
    setIsFetching(true);
    try {
      const endpoint =
        searchRole === 1
          ? "/LocationController/GetAllLocation"
          : `/LocationController/GetLocationsByPerson?personId=${personId}`;
      const response = await api.get(endpoint);
      if (Array.isArray(response.data.return)) {
        setLocations(response.data.return);
      }
    } catch (error) {
      console.error("Erro ao buscar localizações:", error);
      setLocations([]);
    } finally {
      setIsFetching(false);
    }
  }, [searchRole, personId]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const handleLocationSelect = (id: string) => {
    const location = locations.find((loc) => loc.id === id);
    if (location) {
      setSelectedLocation(id);
      setFormData({ ...location });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = e.target.value;

    setFormData((prev) => (prev ? { ...prev, cep: newCep } : null));

    if (newCep.length === 8) {
      setIsFetching(true);
      const addressData = await fetchAddressByCep(newCep);
      setIsFetching(false);

      if (addressData) {
        setFormData((prev) =>
          prev
            ? {
                ...prev,
                address: addressData?.address || "",
                city: addressData?.city || "",
                state: Number(addressData?.state) || 0,
                latitude: addressData?.latitude || 0,
                longitude: addressData?.longitude || 0,
              }
            : null
        );
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData || !formData.id) {
      console.error("Formulário ou ID da localização está vazio");
      return;
    }

    setLoading(true);

    try {
      const response = await api.put(
        `/LocationController/UpdateLocation?locationId=${formData.id}`,
        {
          ...formData,
          number: Number(formData.number),
        }
      );
      console.log("Localização atualizada com sucesso:", response.data);

      localStorage.setItem("showSuccessMessage", "true");
      window.location.reload();
    } catch (err) {
      console.error("Erro ao atualizar a localização:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full mb-auto">
      <div className="bg-white dark:bg-gray-700 w-full h-auto flex justify-center items-baseline mb-auto rounded-2xl">
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-6 w-96 items-baseline">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Selecione a Localização:
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white"
                value={selectedLocation}
                onChange={(e) => handleLocationSelect(e.target.value)}
                required
              >
                <option className="dark:text-white" value="">
                  Selecione uma localização
                </option>
                {locations.map((location) => (
                  <option
                    key={location.id}
                    value={location.id}
                    className="dark:text-white"
                  >
                    {location.name} - {location.address}
                  </option>
                ))}
              </select>
            </div>

            {formData && (
              <>
                <InputField
                  label="Nome"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-gray-700 dark:text-white"
                />
                <InputField
                  label="CEP"
                  name="cep"
                  value={formData.cep}
                  onChange={handleCepChange}
                  className="text-gray-700 dark:text-white"
                />
                {isFetching && (
                  <p className="text-sm text-gray-500 dark:text-white">
                    Buscando endereço...
                  </p>
                )}
                <InputField
                  label="Endereço"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="text-gray-700 dark:text-white"
                />
                <InputField
                  label="Cidade"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="text-gray-700 dark:text-white"
                />
                <InputField
                  label="Estado"
                  name="state"
                  value={formData.state.toString()}
                  onChange={handleChange}
                  className="text-gray-700 dark:text-white"
                />
                <InputField
                  label="Nº"
                  name="number"
                  type="number"
                  value={formData.number.toString()}
                  onChange={handleChange}
                  className="text-gray-700 dark:text-white"
                />
                <InputField
                  label="Outras Informações"
                  name="aditionalInfo"
                  value={formData.aditionalInfo}
                  onChange={handleChange}
                  className="text-gray-700 dark:text-white"
                />

                <button className="w-full bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-950 dark:bg-gray-800">
                  Atualizar Localização
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
      required
    />
  </div>
);

export { EdityFormularyLocation };
