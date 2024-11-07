import React, { useState, useEffect } from "react";
import { api } from "../../../App/serviceApi";

// Função para buscar o endereço a partir do CEP (exemplo fictício)
const fetchAddressByCep = async (cep: string) => {
  try {
    // Aqui você pode substituir pela API que você estiver usando para consultar o CEP
    const response = await api.get(`/someCepApi/${cep}`);
    return response.data; // Supondo que a resposta da API contenha dados do endereço
  } catch (error) {
    console.error("Erro ao buscar endereço pelo CEP:", error);
    return null;
  }
};

const EdityFormularyLocation = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    number: "",
    city: "",
    state: "",
    cep: "",
    latitude: 0,
    longitude: 0,
    aditionalInfo: "",
  });
  const [locations, setLocations] = useState<any[]>([]);

  const userFromLocalStorage = localStorage.getItem("user");
  const parsedUser = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
  const user = parsedUser;
  const searchRole = user?.permissions[0]?.role;

  useEffect(() => {
    if (!user || searchRole !== 1) return;

    const fetchLocations = async () => {
      setIsFetching(true);
      try {
        const response = await api.get("/LocationController/GetAllLocation");
        if (Array.isArray(response.data.return)) {
          setLocations(response.data.return);
        }
        setIsFetching(false);

        // Preencher formData com a primeira localização, se disponível
        if (response.data.return && response.data.return.length > 0) {
          const firstLocation = response.data.return[0];
          setFormData({
            ...formData,
            address: firstLocation?.address || "",
            city: firstLocation?.city || "",
            state: firstLocation?.state || "",
            latitude: firstLocation?.latitude || 0,
            longitude: firstLocation?.longitude || 0,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar localizações:", error);
        setLocations([]);
      } finally {
        setIsFetching(false);
      }
    };

    fetchLocations();
  }, [user, searchRole, formData]);

  // Handler para mudanças no CEP
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      cep: newCep,
    }));

    // Se o CEP for alterado, fazer uma requisição para buscar os dados
    if (newCep.length === 8) { // Checa se o CEP tem 8 caracteres
      setIsFetching(true);
      const addressData = await fetchAddressByCep(newCep);
      setIsFetching(false);

      if (addressData) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          address: addressData?.address || "",
          city: addressData?.city || "",
          state: addressData?.state || "",
          latitude: addressData?.latitude || 0,
          longitude: addressData?.longitude || 0,
        }));
      }
    }
  };

  // Handler para mudanças gerais no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler de submissão do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/LocationController/CreateLocation", {
        ...formData,
        number: Number(formData.number),
        state: formData.state, // Pode ser número ou string, dependendo do seu backend
        aditionalInfo: formData.aditionalInfo,
      });
      console.log(response.data);
      window.location.reload();
    } catch (err) {
      console.error("Erro ao enviar o formulário:", err);
    }
  };

  return (
    <div className="flex h-full mb-auto">
      <div className="bg-white dark:bg-gray-700 w-full h-auto flex justify-center items-baseline mb-auto rounded-2xl">
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-6 w-96 items-baseline">
          <form onSubmit={handleSubmit}>
            {/* Selecione a Localização */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Selecione a Localização:
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700"
                required
              >
                <option value="">Selecione uma localização</option>
                {locations.length > 0 ? (
                  locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name} - {location.address}
                    </option>
                  ))
                ) : (
                  <option value="">Nenhuma localização disponível</option>
                )}
              </select>
            </div>

            {/* CEP */}
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="cep"
              >
                CEP:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700"
                type="text"
                id="cep"
                name="cep"
                value={formData.cep}
                onChange={handleCepChange} // Mudança de CEP chama a função para alterar os dados
                required
              />
              {isFetching && <p className="text-sm text-gray-500">Buscando endereço...</p>}
            </div>

            {/* Endereço */}
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="address"
              >
                Endereço:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700"
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* Cidade */}
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="city"
              >
                Cidade:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700"
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            {/* Estado */}
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="state"
              >
                Estado:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700"
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            {/* Número */}
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="number"
              >
                Nº:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700"
                type="number"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>

            {/* Outras Informações */}
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="aditionalInfo"
              >
                OUTRAS INFORMAÇÕES:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700"
                type="text"
                id="aditionalInfo"
                name="aditionalInfo"
                value={formData.aditionalInfo}
                onChange={handleChange}
                required
              />
            </div>

            {/* Botão de Enviar */}
            <button
              className="w-full bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 transition duration-200"
              type="submit"
            >
              Criar Localização
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { EdityFormularyLocation };
