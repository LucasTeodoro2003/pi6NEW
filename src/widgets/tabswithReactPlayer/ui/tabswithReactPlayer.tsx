import React from "react";
import ReactPlayer from "react-player";
import { Tabs } from "../../tabsPlayer";

interface tabsWithReactPlayerProps {
  VideosId: string;
  tabs: Array<{ name: string; href: string; current: boolean }>;
  alterIDVideos: (href: string, index: number) => void;
  activeTab: number;
}

const TabsWithReactPlayer: React.FC<tabsWithReactPlayerProps> = ({
  VideosId,
  tabs,
  alterIDVideos,
  activeTab,
}) => {
  return (
    <div className="divide-y divide-gray-200 dark:divide-slate-700 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-600 shadow w-full">
      <div className="px-4 py-[27px] sm:px-6">
        <h3 className="text-lg font-semibold font-Jakarta leading-6 text-gray-900 dark:text-white">
          Câmeras Disponíveis
        </h3>
      </div>
      <div className="flex flex-col">
        <Tabs
          setShow={() => {}}
          tabs={tabs}
          alterIDVideos={alterIDVideos}
          activeTab={activeTab}
        />
        <ReactPlayer url={VideosId} playing={false} pip={true} width={640} />
      </div>
    </div>
  );
};

export { TabsWithReactPlayer };
