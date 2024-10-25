import { useEffect, useState } from "react";
import { Address } from "../../../Entities/address";
import { User } from "../../../Entities/users";
import { GoogleMaps } from "../../../shared/ui";

interface TableLocationProps {
  address: Address[];
  user: User | null;
}

interface AddressNew extends Address {
  address_name: string;
  address_type: string;
  district: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

const TableLocation: React.FC<TableLocationProps> = ({ address, user }) => {
  const [newAddress, setNewAddress] = useState<AddressNew[]>([]);
  const cep = require("awesome-cep");

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const currentTheme = document.body.classList.contains("dark");
    setIsDark(currentTheme);
  }, []);

  useEffect(() => {
    const fetchAddressDetails = async () => {
      const updatedAddresses = await Promise.all(
        address.map(async (addr) => {
          try {
            const resp = await cep.findCEP(addr.cep);
            console.log(resp)
            return {
              ...addr,
              address_name: resp.address_name,
              address_type: resp.address_type,
              district: resp.district,
              city: resp.city,
              state: resp.state,
              lat: Number(resp.lat),
              lng: Number(resp.lng),
            };
          } catch (error) {
            console.error("Erro ao buscar CEP:", error);
            return addr;
          }
        })
      );
      setNewAddress(updatedAddresses);
    };

    fetchAddressDetails();
  }, [address, cep]);

  console.log(newAddress)

  return (
    <ul className="ml-4 mt-4 mr-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {newAddress.map((addr) => {
        const isValidLatLng =
          typeof addr.lat === "number" && !isNaN(addr.lat) &&
          typeof addr.lng === "number" && !isNaN(addr.lng);

        return (
          <li
            key={addr.id}
            className="col-span-1 h-fit divide-y divide-gray-200 rounded-lg bg-white dark:bg-gray-700 shadow"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-2 truncate">
                {isValidLatLng ? (
                  <h3 className=" flex items-center justify-center dark:text-white">{addr.name}</h3>
                ) : (<></>)}
                <div className="flex items-center space-x-3 mt-2">
                  <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {isValidLatLng ? (
                      <GoogleMaps lat={addr.lat} lng={addr.lng} isDarkMode={isDark} />
                    ) : (
                      <p>Localização não disponível</p>
                    )}
                  </h3>
                </div>
              </div>
            </div>
            <div>
              <div className="overflow-hidden transition-all duration-200 ease-in-out max-h-96">
                <div className="p-4 justify-between flex-2 dark:text-white">
                  <ul className="flex justify-between"><td>Endereço: </td><td>{addr.address_name}</td></ul>
                  <ul className="flex justify-between"><td>Encarregado: </td><td>{user?.name}</td></ul>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export { TableLocation };
