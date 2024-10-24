import React from "react";
import { Person } from "../../../Entities/employee";
interface NewBackgroundHomeProps {
  people: Person[];
}

const NewbackgroundHome: React.FC<NewBackgroundHomeProps> = ({
  people,
}) => {
  return (
    <div className="flex h-screen ml-64">
      <div className="bg-white dark:bg-gray-800 w-full h-full">
        <div className="flex mt-5 mx-5 bg-white dark:bg-gray-800">
          <div className="flex text-justify w-full">
          Lucas
          </div>
        </div>
      </div>
    </div>
  );
};

export { NewbackgroundHome };
