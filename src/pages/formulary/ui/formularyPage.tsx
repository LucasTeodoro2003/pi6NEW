import { useEffect, useState} from "react";
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
      <Header/>
      <Sidebar/>
      <BackgroundFormulary user={user}/>
    </main>
  );
}

export { FormularyPage };
