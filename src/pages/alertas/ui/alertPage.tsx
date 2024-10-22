import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api, apiUser } from "../../../App/serviceApi";
import { Person } from "../../../Entities/employee";
import { User } from "../../../Entities/users";
import { BackgroundAlert } from "../../../widgets/backGround";
import { Header } from "../../../widgets/header";
import { Sidebar } from "../../../widgets/SideBar";

function AlertPage() {
  const navigate = useNavigate();

  const [people, setPeople] = useState<Person[]>([]);
  const [user, setUser] = useState<User | null>(null);



  const getCachedData = (key: string) => {
    const cachedData = localStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
  };
  const setCachedData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };


  useEffect(() => {
    const cachedPeople = getCachedData('people');
    if (cachedPeople) {
      setPeople(cachedPeople);
    } else {
      api.get("/PersonController/GetPersons")
        .then((response) => {
          setPeople(response.data);
          setCachedData('people', response.data);
        })
        .catch((err) => {
          console.error("Aconteceu um erro: " + err);
        });
    }
  }, []);

  useEffect(() => {
    const cachedUser = getCachedData('user');
    if (cachedUser) {
      setUser(cachedUser);
    } else {
      apiUser.get("/User/GetUser")
        .then((response) => {
          const fetchedUser = response.data[0] || null;
          setUser(fetchedUser);
          setCachedData('user', fetchedUser);
        })
        .catch((err) => {
          console.error("Aconteceu um erro: " + err);
        });
    }
  }, []);

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
