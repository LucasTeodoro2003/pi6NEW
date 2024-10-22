import { CameraIcon } from "@heroicons/react/20/solid";
import { User } from "../../../Entities/users";
import { ToggleDarkorWhiteV2 } from "../../../shared/ui";
interface ReceiveName {
  onCameraClick: () => void;
  user: User | null;
}

const Header: React.FC<ReceiveName> = ({ user, onCameraClick }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 pt-8 border-gray-200 dark:border-gray-900 border-b-2">
        <div className="flex items-center">
          <div className="flex justify-end space-x-10 mb-8 mr-11 w-screen text-gray-800 dark:text-white font-Jakarta font-medium">
            <div className="font-Jakarta font-extrabold">Bem-vindo, {user?.name}</div>
            <div className="ml-10">|</div>
            <button onClick={onCameraClick}>
              <CameraIcon
                title="Câmera"
                className="w-8 h-8 text-gray-800 dark:text-white"
              />
            </button>
            <ToggleDarkorWhiteV2 />
          </div>
        </div>
      </div>
    </>
  );
};

export { Header };
