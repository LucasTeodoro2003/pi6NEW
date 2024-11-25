import { ToggleDarkorWhiteV2 } from "../../../shared/ui";
interface ReceiveName {}

const Header: React.FC<ReceiveName> = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  return (
    <>
      <div className="bg-white dark:bg-gray-800 pt-8 border-gray-200 dark:border-gray-900 border-b-2">
        <div className="flex items-center">
          <div className="flex justify-end space-x-10 mb-8 mr-11 w-screen text-gray-800 dark:text-white font-Jakarta font-medium">
            <div className="font-Jakarta font-extrabold">Bem-vindo, {user?.name}</div>
            <div className="ml-10">|</div>
            <ToggleDarkorWhiteV2 />
          </div>
        </div>
      </div>
    </>
  );
};

export { Header };
