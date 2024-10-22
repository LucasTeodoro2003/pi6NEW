import { DropConfig } from "../../dropConfig";

function ConfigAccount() {
  return (
    <div className="flex justify-start ml-6 items-start mt-6 h-full">
      <div className="divide-y divide-gray-200 rounded-lg bg-gray-100 dark:bg-gray-600 shadow">
        <div className="px-4 py-5 sm:px-6">
          <DropConfig />
        </div>
        <div className="px-4 py-5 sm:p-6">{/* Content goes here */}</div>
      </div>
    </div>
  );
}

export { ConfigAccount };
