import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"; 
import { api } from "../../../App/serviceApi";

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
    aditionalInfo: ""
  });
  
  const [isFetching, setIsFetching] = useState(false);
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
          const resp = await axios.get(`https://cep.awesomeapi.com.br/json/${formData.cep}`);
          const { address_name, city, lat, lng, } = resp.data;

          setFormData((prev) => ({
            ...prev,
            address: address_name,
            city,
            state: "1",
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
      const response = await api.post("/LocationController/CreateLocation", {
        ...formData,
        number: Number(formData.number),
        state: Number(formData.state),
        aditionalInfo: formData.aditionalInfo,
      });
      console.log(response.data);
      window.location.reload();
      navigate("/home");
    } catch (err) {
      console.error("Erro ao enviar o formulário:", err);
    }
  };

  return (
    <div className="flex h-full mb-auto">
      <div className="bg-white dark:bg-gray-700 w-full h-auto flex justify-center items-baseline mb-auto rounded-2xl">
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-6 w-96 items-baseline">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
                Nome do Local:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="cep">
                CEP:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700"
                type="text"
                id="cep"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                required
              />
              {isFetching && <p className="text-sm text-gray-500">Buscando endereço...</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="address">
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
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="city">
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
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="state">
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
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="number">
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
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="number">
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
            <button
              className="w-full bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 transition duration-200"
              type="submit"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { FormularyLocation };
