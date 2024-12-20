import { useEffect, useState } from "react";
import { useAuth } from "../../../App/authPages";
import { api } from "../../../App/serviceApi";
import { Person } from "../../../Entities/employee";
import { BackgroundAlert } from "../../../widgets/backGround";
import { Header } from "../../../widgets/header";
import { Sidebar } from "../../../widgets/SideBar";
import { NotFoundPage } from "../../notFound";

function AlertPage() {
  const { isLoggedIn, id } = useAuth();

  const [people, setPeople] = useState<Person[]>([]);


  useEffect(() => {
    api.get("/PersonController/GetAllPerson")
      .then((response) => {
        const fetchedUser = response.data.return;
        setPeople(fetchedUser);
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
      <BackgroundAlert people={people} />
    </main>
  );
}

export { AlertPage };
