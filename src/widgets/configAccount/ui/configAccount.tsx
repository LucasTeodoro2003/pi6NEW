import { useLocation } from "react-router-dom";
import { DropConfig } from "../../dropConfig";
import { EdityFormularyCam, FormularyCam } from "../../formularyCam";
import { EdityFormularyLocation, FormularyLocation } from "../../formulayLocation";

interface ConfigAccountProps {
  showView: string;
  setShowView: (view: string) => void;
}

const ConfigAccount: React.FC<ConfigAccountProps> = ({ showView, setShowView }) => {
  const location = useLocation();
  const locationId = (location.state as { locationId?: string })?.locationId;

  return (
    <div className="flex justify-start ml-6 items-start mt-6 h-auto">
      <div className="divide-y divide-gray-200 rounded-lg bg-gray-100 dark:bg-gray-600 shadow justify-start">
        <div className="px-4 py-5 sm:px-6 justify-start">
          <DropConfig onTabs={(name) => setShowView(name)} />
        </div>
        {showView === "EDITY" && (
          <div className="px-4 py-5 sm:p-6 justify-start">
            <EdityFormularyLocation />
          </div>
        )}
        {showView === "CREATED" && (
          <div className="px-4 py-5 sm:p-6 justify-start">
            <FormularyLocation />
          </div>
        )}
        {showView === "CREATED CAM" && (
          <div className="px-4 py-5 sm:p-6 justify-start">
            <FormularyCam locationId={locationId} />
          </div>
        )}
        {showView === "EDITY CAM" && (
          <div className="px-4 py-5 sm:p-6 justify-start">
            <EdityFormularyCam />
          </div>
        )}
      </div>
    </div>
  );
};

export { ConfigAccount };
