import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../../App/authPages"; 
import { api } from "../../../App/serviceApi";
import { Person } from "../../../Entities/employee";
import { User } from "../../../Entities/users";
import { AlertSimple } from "../../../shared/ui";
import { BackgroundHome } from "../../../widgets/backGround";
import { Header } from "../../../widgets/header";
import { Sidebar } from "../../../widgets/SideBar";
import { NotFoundPage } from "../../notFound";

function HomePage() {
  const [videosId, setVideosId] = useState("");
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [params, setParams] = useSearchParams();
  const [tabs, setTabs] = useState<Array<{ name: string; href: string; current: boolean }>>([
    { name: "Setor 01", href: "https://www.youtube.com/watch?v=DB68T2s7gfI&pp=ygUMZXJyb3Igc2NyZWVu", current: activeTab === 0 },
  ]);
  const [people, setPeople] = useState<Person[]>([]);
  const [, setUser] = useState<User | null>(null);
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

  useEffect(() => {
    api.get("/PersonController/GetAllPerson")
      .then((response) => {
        setPeople(response.data.return);
      })
      .catch((err) => {
        console.error("Aconteceu um erro: " + err);
      });
}, []);

  useEffect(() => {
      api.get("/Cam/GetCam")
        .then((response) => {
          const fetchedTabs = response.data.map((tab: { name: string; href: string }, index: number) => ({
            name: tab.name,
            href: tab.href,
            current: activeTab === index,
          }));
          setTabs(fetchedTabs);
        })
        .catch((err) => {
          console.error("Aconteceu um erro: " + err);
        });
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

  if (!isLoggedIn) {
    return <NotFoundPage />;
  }

  return (
    <main>
      <Header/>
      <BackgroundHome
        people={people}
        VideosId={videosId}
        tabs={tabs}
        alterIDVideos={alterVideoId}
        activeTab={activeTab}
      />
      <AlertSimple show={show} setShow={setShow} />
      <Sidebar />
    </main>
  );
}

export { HomePage };
