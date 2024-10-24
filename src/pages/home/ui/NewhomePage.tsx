import { useEffect, useState } from "react";
import { useAuth } from "../../../App/authPages";
import { api } from "../../../App/serviceApi";
import { Address } from "../../../Entities/address";
import { User } from "../../../Entities/users";
import { CamNotFound } from "../../../shared/ui/alertAll/camNotFound";
import { NewbackgroundHome } from "../../../widgets/backGround";
import { Header } from "../../../widgets/header";
import { Sidebar } from "../../../widgets/SideBar";
import { NotFoundPage } from "../../notFound";

function NewHomePage() {
  const [show, setShow] = useState(false);
  const [addressList, setAddressList] = useState<Address[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const { isLoggedIn, email } = useAuth();
  const cep = require('awesome-cep');

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
    const fetchAddressDetails = async () => {
      if (user && user.permissions.length > 0) {
            try {
              const response = await api.get("/LocationController/GetAllLocation");
              const locations = response.data.return;
              setAddressList(locations);
            } catch (error) {
              console.error("Erro ao buscar localizações:", error);
              return null;
            }
      }
    };
    fetchAddressDetails();
  }, [user, cep]);
  
 
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
        address={addressList} user={user}
      />
      <CamNotFound show={show} setShowAlert={setShow} />
      <Sidebar user={user} />
    </main>
  );
}

export { NewHomePage };
