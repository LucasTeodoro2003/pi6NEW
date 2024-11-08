import { useState } from "react";
import { DropConfig } from "../../dropConfig";
import { EdityFormularyLocation, FormularyLocation } from "../../formulayLocation";


const ConfigAccount: React.FC = () => {
  const [showView, setShowView] = useState("")

  return (
    <div className="flex justify-start ml-6 items-start mt-6 h-auto">
      <div className="divide-y divide-gray-200 rounded-lg bg-gray-100 dark:bg-gray-600 shadow justify-start">
        <div className="px-4 py-5 sm:px-6 justify-start">
          <DropConfig  onTabs={(name) => setShowView(name)} />
        </div>
        {showView === "EDITY" && (
          <div className="px-4 py-5 sm:p-6 justify-start">
              <EdityFormularyLocation />
          </div>
        )}{showView === "CREATED" && (
          <div className="px-4 py-5 sm:p-6 justify-start">
              <FormularyLocation />
          </div>
        )}
      </div>
    </div>
  );
}

export { ConfigAccount };
