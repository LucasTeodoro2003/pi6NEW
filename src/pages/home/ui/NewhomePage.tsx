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
  const { isLoggedIn, id } = useAuth();
  const cep = require('awesome-cep');

  useEffect(() => {
    console.log(id)
    api.get("/PersonController/GetPerson?email=" + id)
      .then((response) => {
        const fetchedUser = response.data.return;
        setUser(fetchedUser);
        console.log("FUNCIONOU")
      })
      .catch((err) => {
        console.error("Aconteceu um erro: " + err);
      });
  }, [id]);

  const searchRole = user?.permissions[0].role;
  console.log(searchRole) 

  useEffect(() => {
    const fetchAddressDetails = async () => {
        if (searchRole === 1){
            try {
              const response = await api.get("/LocationController/GetAllLocation");
              const locations = response.data.return;
              setAddressList(locations);
              console.log(locations)
              console.log("Usuario Supremo", setAddressList)
            } catch (error) {
              console.error("Erro ao buscar localizações:", error);
              return null;
            }} else if (searchRole === 2){
              try {
                const response = await api.get("/PersonController/GetLocationsByPerson?personId=" + user?.email);
                const locations = response.data.return;
                console.log(locations)
                setAddressList(locations);
                console.log("O bosta", setAddressList)
              } catch (error) {
                console.error("Erro ao buscar localizações:", error);
                return null;
              }
            }
    };
    fetchAddressDetails();
  }, [user, cep, id, searchRole]);
  
 
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
