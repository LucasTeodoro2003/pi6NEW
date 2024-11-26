import axios, { AxiosError } from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { api } from "../../../App/serviceApi";
import { ErrorModal } from "../../../shared/ui";

const FormularyLocation = () => {
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

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [error2, setError2] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchAddressDetails = async () => {
      if (formData.cep.length === 8) {
        setIsFetching(true);
        try {
          const resp = await axios.get(
            `https://cep.awesomeapi.com.br/json/${formData.cep}`
          );
          const { address_name, city, lat, lng, state } = resp.data;

          setFormData((prev) => ({
            ...prev,
            address: address_name,
            city,
            state: state,
            latitude: Number(lat),
            longitude: Number(lng),
          }));
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
        } finally {
          setIsFetching(false);
        }
      }
    };
    fetchAddressDetails();
  }, [formData.cep]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post("/LocationController/CreateLocation", {
        ...formData,
        number: Number(formData.number),
        state: {
          AC: 1,
          AL: 2,
          AM: 3,
          AP: 4,
          BA: 5,
          CE: 6,
          DF: 7,
          ES: 8,
          GO: 9,
          MA: 10,
          MT: 11,
          MS: 12,
          MG: 13,
          PA: 14,
          PB: 15,
          PE: 16,
          PI: 17,
          PR: 18,
          RJ: 19,
          RN: 20,
          RO: 21,
          RR: 22,
          RS: 23,
          SC: 24,
          SE: 25,
          SP: 26,
          TO: 27,
        }[formData.state.trim().toUpperCase().slice(0, 2)],
        aditionalInfo: formData.aditionalInfo,
      });
      navigate("/home");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError("Erro ao enviar o formulário. Verifique os dados e tente novamente. ");
        setError2(err.response?.data)
        console.error("Erro ao enviar o formulário: ", err.response?.data);
      } else {
        setError("Erro desconhecido ao enviar o formulário.");
        console.error("Erro desconhecido:", err);
      }
    }
  };

  return (
    <div className="flex h-full mb-auto">
      <div className="bg-white dark:bg-gray-700 w-full h-auto flex justify-center items-baseline mb-auto rounded-2xl">
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-6 w-96 items-baseline">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="name"
              >
                Nome do Local:
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
              <label
                className="block text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="cep"
              >
                CEP:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-white"
                type="text"
                id="cep"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                maxLength={8}
                required
              />
              {isFetching && (
                <p className="text-sm text-gray-500">Buscando endereço...</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="address"
              >
                Endereço:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-white"
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="city"
              >
                Cidade:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-white"
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="state"
              >
                Estado (Sigla):
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-white"
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="number"
              >
                Nº:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-white"
                type="number"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="number"
              >
                OUTRAS INFORMAÇÕES:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-white"
                type="text"
                id="aditionalInfo"
                name="aditionalInfo"
                value={formData.aditionalInfo}
                onChange={handleChange}
              />
            </div>
            <button
              className="w-full bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 transition duration-200"
              type="submit"
            >
              Enviar
            </button>
          </form>
          {error && <ErrorModal message={error} messageError={error2 as string} onClose={() => setError(null)} />}
        </div>
      </div>
    </div>
  );
};

export { FormularyLocation };
