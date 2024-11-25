import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { FaHardHat, FaVest } from "react-icons/fa";
import { FaMaskFace } from "react-icons/fa6";
import { api } from "../../../App/serviceApi";

interface Notification {
  id: string;
  deviceId: string;
  type: {
    hardhat: boolean;
    mask: boolean;
    safetyVest: boolean;
  };
  createdAt: string;
  updatedAt: string;
  numberOfPersons: number;
  isActive: boolean;
  imageUrl: string;
  detectedPeople: string[];
}

const TablesAlert: React.FC = () => {
  const [showPersonId, setShowPersonId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getNotifications = async () => {
    try {
      const response = await api.get(
        "/NotificationsController/GetAllNotifications"
      );
      // Ordena as notificações do mais novo para o mais velho
      const sortedNotifications = response.data.return.sort(
        (a: Notification, b: Notification) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setNotifications(sortedNotifications);
    } catch (err) {
      console.error("Erro ao carregar notificações:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const toggleActiveStatus = async (id: string) => {
    try {
      const notification = notifications.find((notif) => notif.id === id);
      if (!notification) return;

      const updatedStatus = !notification.isActive;

      const response = await api.put(
        `/NotificationsController/UpdateNotification?notificationId=${id}&IsActive=${updatedStatus}`
      );

      if (response.status === 200) {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === id ? { ...notif, isActive: updatedStatus } : notif
          )
        );
      } else {
        console.error("Falha ao atualizar status da notificação na API");
      }
    } catch (err: any) {
      console.error(
        "Erro ao alterar o status da notificação:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const detailsPerson = (id: string) => {
    setShowPersonId(showPersonId === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-800">
        <p className="text-white text-lg">Carregando notificações...</p>
      </div>
    );
  }

  return (
    <ul className="ml-4 mt-4 mr-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {notifications.map((notification, index) => (
        <li
          key={notification.id}
          className="col-span-1 h-fit divide-y divide-gray-200 rounded-lg bg-white dark:bg-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between p-6">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-900 text-white text-lg font-semibold">
              {index + 1}
            </div>
          </div>

          <div className="p-4">
            <div className="flex space-x-6 justify-center mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm dark:text-white">Hardhat</span>
                <FaHardHat
                  className={`h-6 w-6 ${
                    notification.type.hardhat
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm dark:text-white">Mask</span>
                <FaMaskFace
                  className={`h-6 w-6 ${
                    notification.type.mask ? "text-green-500" : "text-red-500"
                  }`}
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm dark:text-white">Safety Vest</span>
                <FaVest
                  className={`h-6 w-6 ${
                    notification.type.safetyVest
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                />
              </div>
            </div>
          </div>

          {showPersonId === notification.id && (
            <div className="px-4 py-2">
              {notification.detectedPeople.length > 0 ? (
                <div>
                  <h4 className="text-sm dark:text-white">
                    Pessoas detectadas:
                  </h4>
                  <ul className="list-disc pl-5 text-sm dark:text-white">
                    {notification.detectedPeople.map((person, index) => (
                      <li key={index}>{person}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm dark:text-white">
                  Nenhuma pessoa detectada
                </p>
              )}
              <p className="text-sm dark:text-white">
                Número de pessoas detectadas: {notification.numberOfPersons}
              </p>
            </div>
          )}

          <div className="px-4 py-2 flex justify-between items-center">
            <button
              onClick={() => toggleActiveStatus(notification.id)}
              className="focus:outline-none"
            >
              {notification.isActive ? (
                <div className="flex items-center">
                  <AiOutlineCheckCircle className="h-6 w-6 text-green-500 hover:text-green-600" />
                  <span className="ml-2 text-green-500">Resolvido</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <AiOutlineExclamationCircle className="h-6 w-6 text-red-500 hover:text-red-600" />
                  <span className="ml-2 text-red-500">Pendente</span>
                </div>
              )}
            </button>
            <button
              onClick={() => detailsPerson(notification.id)}
              className="text-gray-500 flex items-center space-x-2 focus:outline-none"
            >
              <span className="text-sm dark:text-white">Detalhes</span>
              <ChevronDownIcon
                className={`h-5 w-5 transform transition-transform ${
                  showPersonId === notification.id ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export { TablesAlert };
