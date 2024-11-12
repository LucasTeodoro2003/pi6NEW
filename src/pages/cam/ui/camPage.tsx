import { useEffect} from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../App/authPages";
import { BackgroundCam } from "../../../widgets/backGround";
import { Header } from "../../../widgets/header";
import { Sidebar } from "../../../widgets/SideBar";
import { NotFoundPage } from "../../notFound";

function CamPage() {
  useEffect(() => {
    fetch("");
  });
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();


  if (!isLoggedIn) {
    return <NotFoundPage />;
  }

  return (
    <main>
      <Header
        onCameraClick={() => {
          navigate("/home?cameraID=1");
        }}
      />
      <Sidebar />
      <BackgroundCam />
    </main>
  );
}

export { CamPage };
