import { useEffect} from "react";
import { useAuth } from "../../../App/authPages";
import { BackgroundCam } from "../../../widgets/backGround";
import { Header } from "../../../widgets/header";
import { Sidebar } from "../../../widgets/SideBar";
import { NotFoundPage } from "../../notFound";

function CamPage() {
  useEffect(() => {
    fetch("");
  });
  const { isLoggedIn } = useAuth();


  if (!isLoggedIn) {
    return <NotFoundPage />;
  }

  return (
    <main>
      <Header/>
      <Sidebar />
      <BackgroundCam />
    </main>
  );
}

export { CamPage };
