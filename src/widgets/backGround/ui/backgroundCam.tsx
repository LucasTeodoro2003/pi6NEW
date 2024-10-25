import React from "react";

interface InicarCamera {}

const BackgroundCam: React.FC<InicarCamera> = () => {
  return (
    <div className="flex h-screen ml-64">
      <div className="bg-white dark:bg-gray-800 w-full h-full ">
        CAMERAS
        <div className="flex mt-5 mx-5 bg-white dark:bg-gray-800">
          <div className="flex text-justify w-screen"></div>
        </div>
      </div>
    </div>
  );
};

export { BackgroundCam };
