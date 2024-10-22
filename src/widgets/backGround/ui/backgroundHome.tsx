import { FaceSmileIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Person } from "../../../Entities/employee";
import { AlertEmployee } from "../../alertEmployee/ui/alertEmployee";
import { Table } from "../../tableEmployee/ui/table";
import { TabsWithReactPlayer } from "../../tabswithReactPlayer";
interface BackgroundHomeProps {
  VideosId: string;
  tabs: Array<{ name: string; href: string; current: boolean }>;
  alterIDVideos: (href: string, index: number) => void;
  activeTab: number;
  people: Person[];
}

const BackgroundHome: React.FC<BackgroundHomeProps> = ({
  VideosId,
  tabs,
  alterIDVideos,
  activeTab,
  people,
}) => {
  return (
    <div className="flex h-screen ml-64">
      <div className="bg-white dark:bg-gray-800 w-full h-full">
        <div className="flex mt-5 mx-5 bg-white dark:bg-gray-800">
          <div className="flex text-justify w-full">
            {VideosId ? (
              <div className="flex flex-col w-full">
                <div className="flex">
                  <TabsWithReactPlayer
                    tabs={tabs}
                    alterIDVideos={alterIDVideos}
                    activeTab={activeTab}
                    VideosId={VideosId}
                  />
                  <Table people={people} />
                </div>
                <div className="px-36 mx-36 mt-4">
                  <AlertEmployee people={people} />
                </div>
              </div>
            ) : (
              <div className="flex h-full w-full font-Jakarta font-semibold text-justify justify-center dark:text-white">
                Clique no Icone da Camera para Iniciar{" "}
                <FaceSmileIcon className="ml-2 w-5 h-5"></FaceSmileIcon>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { BackgroundHome };
