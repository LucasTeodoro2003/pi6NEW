import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { useAuth } from "../../../App/authPages"; 
import { api, apiTabs, apiUser } from "../../../App/serviceApi";
import { Person } from "../../../Entities/employee";
import { User } from "../../../Entities/users";
import { AlertSimple } from "../../../shared/ui";
import { BackgroundHome } from "../../../widgets/backGround";
import { Header } from "../../../widgets/header";
import { Sidebar } from "../../../widgets/SideBar";
// import { NotFoundPage } from "../../notFound";

function HomePage() {
  const [videosId, setVideosId] = useState("");
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [params, setParams] = useSearchParams();
  const [tabs, setTabs] = useState<Array<{ name: string; href: string; current: boolean }>>([
    { name: "Setor 01", href: "https://www.youtube.com/watch?v=DB68T2s7gfI&pp=ygUMZXJyb3Igc2NyZWVu", current: activeTab === 0 },
  ]);
  const [people, setPeople] = useState<Person[]>([]);
  const [user, setUser] = useState<User | null>(null);
  // const { isLoggedIn } = useAuth();

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

  useEffect(() => {
    const cachedTabs = getCachedData('tabs');
    if (cachedTabs) {
      setTabs(cachedTabs);
    } else {
      apiTabs.get("/Cam/GetCam")
        .then((response) => {
          const fetchedTabs = response.data.map((tab: { name: string; href: string }, index: number) => ({
            name: tab.name,
            href: tab.href,
            current: activeTab === index,
          }));
          setTabs(fetchedTabs);
          setCachedData('tabs', fetchedTabs);
        })
        .catch((err) => {
          console.error("Aconteceu um erro: " + err);
        });
    }
  }, [activeTab]);

  useEffect(() => {
    const cameraID = params.get("cameraID");
    if (cameraID) {
      const id = parseInt(cameraID) - 1;
      if (id >= 0 && id < tabs.length) {
        setShow(true);
        setActiveTab(id);
        setVideosId(tabs[id].href);
      }
    }
    setParams(undefined);
  }, [params, tabs, setParams]);

  const alterVideoId = (href: string, index: number) => {
    setVideosId(href);
    setActiveTab(index);
    setShow(true);
  };

  // if (!isLoggedIn) {
  //   return <NotFoundPage />;
  // }

  return (
    <main>
      <Header
        user={user}
        onCameraClick={() => {
          setShow(true);
          setVideosId(tabs[0].href);
        }}
      />
      <BackgroundHome
        people={people}
        VideosId={videosId}
        tabs={tabs}
        alterIDVideos={alterVideoId}
        activeTab={activeTab}
      />
      <AlertSimple show={show} setShow={setShow} />
      <Sidebar user={user} />
    </main>
  );
}

export { HomePage };
