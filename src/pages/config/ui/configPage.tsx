import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../App/authPages";
import { api } from "../../../App/serviceApi";
import { User } from "../../../Entities/users";
import { BackgroundConfig } from "../../../widgets/backGround";
import { Header } from "../../../widgets/header";
import { Sidebar } from "../../../widgets/SideBar";
import { NotFoundPage } from "../../notFound";

function ConfigPage() {
  useEffect(() => {
    fetch("");
  });
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const { isLoggedIn, id } = useAuth();




  useEffect(() => {
    api.get("/PersonController/GetPerson?email=" + id)
      .then((response) => {
        const fetchedUser = response.data.return;
        setUser(fetchedUser);
      })
      .catch((err) => {
        console.error("Aconteceu um erro: " + err);
      });
  }, [id]);


  if (!isLoggedIn) {
    return <NotFoundPage />;
  }

  return (
    <main>
      <Header
        user={user}
        onCameraClick={() => {
          navigate("/home?cameraID=1");
        }}
      />
      <Sidebar user={user} />
      <BackgroundConfig />
    </main>
  );
}

export { ConfigPage };
