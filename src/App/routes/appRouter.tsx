import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AlertPage } from "../../pages/alertas";
import { CamPage } from "../../pages/cam";
import { ChangePasswordPage } from "../../pages/changePassword";
import { ConfigPage } from "../../pages/config";
import { FormularyPage } from "../../pages/formulary";
import { NewHomePage } from "../../pages/home";
import { Login } from "../../widgets/login";
import { useAuth } from "../authPages";
import { api } from "../serviceApi";

function AppRouter() {
  const { id } = useAuth();
  const [lastNotifications, setLastNotifications] = useState<string[]>([]);
  const [personId, setPersonId] = useState<string | null>(null);
  const [firstCheckComplete, setFirstCheckComplete] = useState(false);

  const requestNotificationPermission = async () => {
    if (Notification.permission !== "granted") {
      await Notification.requestPermission();
    }
  };

  const showSystemNotification = (title: string, body: string) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    } else {
      console.warn("Notificações do sistema não permitidas.");
    }
  };

  const fetchPersonId = useCallback(async () => {
    const storedUser = id;
    if (!storedUser) {
      console.error("Usuário não encontrado no localStorage.");
      return;
    }
    const email = storedUser;
    if (!email) {
      console.error("E-mail não encontrado no localStorage.");
      return;
    }

    try {
      const response = await api.get(
        "/PersonController/GetPerson?email=" + email
      );
      if (response.data?.success && response.data?.return?.id) {
        setPersonId(response.data.return.id);
      } else {
        console.error("Erro ao obter o personId.");
      }
    } catch (error) {
      console.error("Erro na requisição para obter o personId:", error);
    }
  }, [id]);

  const fetchNotifications = useCallback(async () => {
    console.log("Usuario: ", personId);
    if (!personId) return;

    try {
      const response = await api.get(
        "/NotificationsController/GetNotificationsByPerson",
        {
          params: {
            personId,
            dateRange: "today",
          },
        }
      );

      if (response.data?.success) {
        const notifications = response.data.return.flatMap((location: any) =>
          location.notificationByCameras.flatMap((camera: any) =>
            camera.notifications
              .filter((notification: any) => notification.isActive)
              .map((notification: any) => notification.id)
          )
        );

        const newNotifications = notifications.filter(
          (id: string) => !lastNotifications.includes(id)
        );

        if (newNotifications.length > 0) {
          newNotifications.forEach((id: string) => {
            const notificationData = response.data.return
              .flatMap((location: any) => location.notificationByCameras)
              .flatMap((camera: any) => camera.notifications)
              .find((n: any) => n.id === id);

            const { type, updatedAt } = notificationData;

            const message = `Nova notificação: capacete: ${
              type.hardhat
            }, máscara: ${type.mask}, colete: ${
              type.safetyVest
            }. Atualizado em: ${new Date(updatedAt).toLocaleString()}`;
            toast(message);
            showSystemNotification("Notificação de Segurança", message);
          });

          setLastNotifications((prev) => [...prev, ...newNotifications]);
        } else if (!firstCheckComplete) {
          const message =
            "Nenhuma notificação ativa no momento. Tudo está funcionando corretamente.";
          toast(message);
          showSystemNotification("Status do Sistema", message);
          setFirstCheckComplete(true);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    }
  }, [personId, lastNotifications, firstCheckComplete]);

  useEffect(() => {
    requestNotificationPermission();
    fetchPersonId();
  }, [fetchPersonId]);

  useEffect(() => {
    if (personId) {
      const interval = setInterval(fetchNotifications, 60000);
      fetchNotifications();
      return () => clearInterval(interval);
    }
  }, [personId, fetchNotifications]);

  return (
    <>
      <Routes>
        <Route index element={<Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password" element={<ChangePasswordPage />} />
        <Route path="/home" element={<NewHomePage />} />
        <Route path="/alert" element={<AlertPage />} />
        <Route path="/cam" element={<CamPage />} />
        <Route path="/Config" element={<ConfigPage />} />
        <Route path="/formulary" element={<FormularyPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export { AppRouter };
