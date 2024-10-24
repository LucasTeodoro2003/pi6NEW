import { useEffect, useState } from "react";
import { useAuth } from "../../../App/authPages"; 
import { api } from "../../../App/serviceApi";
import { Person } from "../../../Entities/employee";
import { User } from "../../../Entities/users";
import { CamNotFound } from "../../../shared/ui/alertAll/camNotFound";
import { NewbackgroundHome } from "../../../widgets/backGround";
import { Header } from "../../../widgets/header";
import { Sidebar } from "../../../widgets/SideBar";
import { NotFoundPage } from "../../notFound";

function NewHomePage() {
  const [show, setShow] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
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
  }, [email]);

  useEffect(() => {
    api.get("/PersonController/GetAllPerson")
      .then((response) => {
        setPeople(response.data.return);
      })
      .catch((err) => {
        console.error("Aconteceu um erro: " + err);
      });
}, []);

  if (!isLoggedIn) {
    return <NotFoundPage />;
  }

  return (
    <main>
      <Header
        user={user}
        onCameraClick={() => {
          setShow(true);
        }}
      />
      <NewbackgroundHome
        people={people}
      />
      <CamNotFound show={show} setShowAlert={setShow} />
      <Sidebar user={user} />
    </main>
  );
}

export { NewHomePage };
