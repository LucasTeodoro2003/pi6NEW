import {
  ArrowLeftEndOnRectangleIcon,
  BellAlertIcon,
  Cog8ToothIcon,
  HomeIcon,
  IdentificationIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavigationItem {
  name: string;
  link: string;
  icon: React.ElementType;
}

interface HomePagePromps {

}

const navigation: NavigationItem[] = [
  { name: 'Home', link: '/home', icon: HomeIcon },
  { name: 'Alertas', link: '/alert', icon: BellAlertIcon },
  { name: 'Funcionários', link: '/formulary', icon: IdentificationIcon },
  { name: 'Câmeras', link: '/cam', icon: VideoCameraIcon },
  { name: 'Configurações', link: '/config', icon: Cog8ToothIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}



const Sidebar: React.FC<HomePagePromps> = () => {
  const location = useLocation();
  const navegationPages = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const firstName = user.name ? user.name.split(' ')[0] : '';


  
  const deleteAll = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("user")
    localStorage.removeItem("listCameras")
    localStorage.removeItem("locationId")
    localStorage.removeItem("listPerson");
    localStorage.removeItem("id")
    localStorage.removeItem("listLocations")
    navegationPages("/Login");
  };

  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-800 ">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4 ">
          <div className="flex flex-shrink-0 items-center px-4">
            <img
              className="h-8 w-auto"
              src="epiVisionCam.png"
              alt="PI"
            />
            <img
              className="h-8 w-auto dark:filter dark:invert"
              src="epiVisionLetra.png"
              alt="PI"
            />
          </div>
          <nav className="mt-5 space-y-1 bg-white dark:bg-gray-800 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={classNames(
                  location.pathname === item.link
                    ? 'bg-gray-100 dark:bg-gray-300 text-gray-600 dark:text-gray-600 transition'
                    : 'text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white/80 transition',
                  'group flex items-center px-2 py-2 text-sm font-Jakarta font-bold rounded-md'
                )}
              >
                <item.icon
                  className={classNames(
                    location.pathname === item.link
                      ? 'text-gray-500 dark:text-gray-600'
                      : 'text-gray-400 dark:text-white group-hover:text-gray-500 dark:group-hover:text-white/80 transition',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className='flex justify-between items-center mt-96 ml-2 mr-2 rounded-md'>
            {user ? (
              <>
                <button className="flex items-center justify-between hover:underline hover:text-gray-500" onClick={() => navegationPages("/Config")}>
                  <img className={`h-8 w-8 rounded-full ${user.image ? "" : "dark:filter dark:invert"}`} src={user.image ? user.image : "usuario.png"} alt={`Foto do ${user.name}`}/>
                  <div className="ml-2 flex flex-grow items-center font-Jakarta font-medium text-xl dark:text-white dark:hover:text-gray-400">
                    {firstName}
                  </div>
                </button>
                <button className='mr-2 hover:border-2 hover:border-gray-100 rounded-full px-2 py-2' onClick={deleteAll}>
                  <div className='rounded-full'>
                    <ArrowLeftEndOnRectangleIcon className='w-6 h-6 dark:text-white' />
                  </div>
                </button>
              </>
            ) : (
              <>
                <button className="flex hover:underline items-center hover:text-gray-500 " onClick={() => navegationPages('/Login')}>
                  <img className='h-8 w-8 rounded-full ml-4 dark:filter dark:invert' src="usuario.png" alt="" />
                  <div className='ml-2 text-sm dark:text-white dark:hover:text-gray-400'>
                    SEM USUARIO
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Sidebar };
