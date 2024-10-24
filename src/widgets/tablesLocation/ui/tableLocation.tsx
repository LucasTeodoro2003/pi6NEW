import { useEffect, useState } from "react";
import { Address } from "../../../Entities/address";
import { User } from "../../../Entities/users";

interface TableLocationProps {
  address: Address[];
  user: User | null;
}

interface AddressNew extends Address {
  address_name: string,
  address_type: string,
  district: string,
  city: string,
  state: string,
  lat: string,
  lng: string,
  name: string,
}

const TableLocation: React.FC<TableLocationProps> = ({ address, user }) => {
  const [newAddress, setNewAddress] = useState<AddressNew[]>([]);
  const cep = require('awesome-cep');

  useEffect(() => {
    // Função para buscar os detalhes dos CEPs
    const fetchAddressDetails = async () => {
      const updatedAddresses = await Promise.all(
        address.map(async (addr) => {
          try {
            const resp = await cep.findCEP(addr.cep);
            return {
              ...addr,
              address_name: resp.address_name,
              address_type: resp.address_type,
              district: resp.district,
              city: resp.city,
              state: resp.state,
              lat: resp.lat,
              lgn: resp.lgn,
              name: resp.name
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




  return (
    <ul className="ml-4 mt-4 mr-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {newAddress.map((addr) => {
        console.log("lucas", addr)
        return (
          <li key={addr.id}
            className="col-span-1 h-fit divide-y divide-gray-200 rounded-lg bg-white dark:bg-gray-700 shadow"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text  -sm font-medium text-gray-900 dark:text-white">
                    {addr.lat}
                  </h3>
                </div>
              </div>
            </div>
            <div>
              <div
                className="overflow-hidden transition-all duration-200 ease-in-out max-h-96" >
                <div className="p-4">
                  <ul>
                    {user?.name}
                    {addr?.cep}
                  </ul>
                  <ul>
                    {user?.email}
                  </ul>
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
