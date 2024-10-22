import React from "react";
import { ConfigAccount } from "../../configAccount";

interface InicarCamera {}

const BackgroundConfig: React.FC<InicarCamera> = () => {
  return (
    <div className="flex h-[calc(100vh-98px)] ml-64">
      <div className="bg-white dark:bg-gray-800 w-full h-full ">
        <ConfigAccount />
        <div className="flex mt-5 mx-5 bg-white dark:bg-gray-800">
          <div className="flex text-justify w-screen"></div>
        </div>
      </div>
    </div>
  );
};

export { BackgroundConfig };
