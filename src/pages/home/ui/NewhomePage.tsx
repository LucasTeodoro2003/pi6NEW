import { useEffect, useState } from "react";
import { useAuth } from "../../../App/authPages";
import { api } from "../../../App/serviceApi";
import { User } from "../../../Entities/users";
import { CamNotFound } from "../../../shared/ui/alertAll/camNotFound";
import { NewbackgroundHome } from "../../../widgets/backGround";
import { Header } from "../../../widgets/header";
import { Sidebar } from "../../../widgets/SideBar";
import { NotFoundPage } from "../../notFound";

function NewHomePage() {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, id } = useAuth();

  useEffect(() => {
    if (isLoggedIn && id) {
      api.get("/PersonController/GetPerson?email=" + id)
        .then((response) => {
          const fetchedUser = response.data.return;
          setUser(fetchedUser);
          localStorage.setItem("user", JSON.stringify(fetchedUser));
        })
        .catch((err) => {
          console.error("Aconteceu um erro: " + err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, isLoggedIn]);

  if (!isLoggedIn || loading) {
    return <NotFoundPage />;
  }

  return (
    <main>
      <Header
        onCameraClick={() => {
          setShow(true);
        }}
      />
      <NewbackgroundHome user={user}/>
      <CamNotFound show={show} setShowAlert={setShow} />
      <Sidebar />
    </main>
  );
}

export { NewHomePage };
