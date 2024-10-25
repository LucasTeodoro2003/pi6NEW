import { useEffect, useState} from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../App/authPages";
import { api } from "../../../App/serviceApi";
import { User } from "../../../Entities/users";
import { BackgroundFormulary } from "../../../widgets/backGround";
import { Header } from "../../../widgets/header";
import { Sidebar } from "../../../widgets/SideBar";
import { NotFoundPage } from "../../notFound";

function FormularyPage() {
  useEffect(() => {
    fetch("");
  });
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const { isLoggedIn, email } = useAuth();




  useEffect(() => {
    api.get("/PersonController/GetPerson?email=" + email)
      .then((response) => {
        const fetchedUser = response.data.return;
        setUser(fetchedUser);
      })
      .catch((err) => {
        console.error("Aconteceu um erro: " + err);
      });
  }, [email,]);


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
      <BackgroundFormulary />
    </main>
  );
}

export { FormularyPage };
