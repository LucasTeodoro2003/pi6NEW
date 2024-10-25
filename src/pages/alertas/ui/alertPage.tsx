import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../App/authPages";
import { api } from "../../../App/serviceApi";
import { Person } from "../../../Entities/employee";
import { User } from "../../../Entities/users";
import { BackgroundAlert } from "../../../widgets/backGround";
import { Header } from "../../../widgets/header";
import { Sidebar } from "../../../widgets/SideBar";
import { NotFoundPage } from "../../notFound";

function AlertPage() {
  const { isLoggedIn, email } = useAuth();

  const navigate = useNavigate();

  const [people, setPeople] = useState<Person[]>([]);
  const [user, setUser] = useState<User | null>(null);



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

  useEffect(() => {
    api.get("/PersonController/GetAllPerson")
      .then((response) => {
        const fetchedUser = response.data.return;
        setPeople(fetchedUser);
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
      <BackgroundAlert people={people} />
    </main>
  );
}

export { AlertPage };
