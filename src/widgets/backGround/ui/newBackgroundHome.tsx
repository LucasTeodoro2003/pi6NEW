import React from "react";
import { Address } from "../../../Entities/address";
import { User } from "../../../Entities/users";
import { TableLocation } from "../../tablesLocation";
interface NewBackgroundHomeProps {
  address: Address[];
  user: User | null;
}

const NewbackgroundHome: React.FC<NewBackgroundHomeProps> = ({
  address,
  user
}) => {

  
  return (
    <div className="flex h-screen ml-64">
      <div className="bg-white dark:bg-gray-800 w-full h-full">
        <div className="flex mt-5 bg-white dark:bg-gray-800">
          <div className="flex text-justify w-full justify-center items-center">
            <TableLocation address={address} user={user} />
            {}
          </div>
        </div>
      </div>
    </div>
  );
};

export { NewbackgroundHome };
