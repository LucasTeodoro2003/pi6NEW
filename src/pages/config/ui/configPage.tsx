import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../../App/authPages";
import { BackgroundConfig } from "../../../widgets/backGround";
import { Header } from "../../../widgets/header";
import { Sidebar } from "../../../widgets/SideBar";
import { NotFoundPage } from "../../notFound";

function ConfigPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const [showView, setShowView] = useState(location.state?.showView || "");


  // const userFromLocalStorage = localStorage.getItem("user");
  // const parsedUser = userFromLocalStorage
  //   ? JSON.parse(userFromLocalStorage)
  //   : "SEM DADOS";

  // console.log("usuario dados:", parsedUser);

  if (!isLoggedIn) {
    return <NotFoundPage />;
  }

  return (
    <main className="bg-white dark:bg-gray-800"> 
      <Header
        onCameraClick={() => {
          navigate("/home?cameraID=1");
        }}
      />
      <Sidebar />
      <BackgroundConfig showView={showView} setShowView={setShowView}/>
    </main>
  );
}

export { ConfigPage };
