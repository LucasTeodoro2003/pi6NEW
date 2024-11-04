import { useState } from "react";
import { DropConfig } from "../../dropConfig";
import { FormularyLocation } from "../../formulayLocation";

function ConfigAccount() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex justify-start ml-6 items-start mt-6 h-full">
      <div className="divide-y divide-gray-200 rounded-lg bg-gray-100 dark:bg-gray-600 shadow justify-start">
        <div className="px-4 py-5 sm:px-6 justify-start">
          <DropConfig onAddLocationClick={() => setShowForm(true)} />
        </div>
        {showForm && (
          <div className="px-4 py-5 sm:p-6 justify-start">
              <FormularyLocation />
          </div>
        )}
      </div>
    </div>
  );
}

export { ConfigAccount };
