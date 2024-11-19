import { LockClosedIcon } from "@heroicons/react/24/outline";
import React, { useState, FormEvent } from "react";
import { Hourglass } from "react-loader-spinner";
import { useNavigate } from "react-router";
import { api } from "../../../App/serviceApi";

const ChangePasswordPage: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate()


  const personId = localStorage.getItem("email")

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!oldPassword || !newPassword) {
      setError("Todos os campos são obrigatórios!");
      setLoading(false);
      return;
    }

    try {
        const response = await api.put(`/PersonController/ChangePassword?personId=${personId}&password=${oldPassword}&newPassword=${newPassword}`);

      if (response.status === 200) {
        setSuccess("Senha alterada com sucesso!");
        setOldPassword("");
        setNewPassword("");
        localStorage.removeItem("email")
        navigate("/login")
      } else {
        setError("Erro ao alterar a senha, tente novamente.");
      }
    } catch (err) {
      setError("Erro de rede. Tente novamente.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-primary">
      <div className="bg-gray-900 p-8 rounded-lg shadow-2xl shadow-gray-950 max-w-sm w-full">
        <h2 className="text-center text-white text-2xl font-bold mb-6">
          ALTERAR SENHA
        </h2>

        <form onSubmit={handleChangePassword}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

          <div>
            <label htmlFor="oldPassword" className="sr-only">
              Senha Antiga
            </label>
            <div className="relative">
              <h1 className="text-white">Senha Antiga</h1>
              <input
                id="oldPassword"
                name="oldPassword"
                type="password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Digite sua senha antiga"
                className="mt-3 mb-4 block w-full p-3 text-sm text-gray-900 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="mt-9 absolute inset-y-0 right-3 flex items-center">
                <LockClosedIcon className="w-5 h-5 text-gray-500" />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="newPassword" className="sr-only">
              Nova Senha
            </label>
            <div className="relative">
              <h2 className="text-white">Nova Senha</h2>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Digite sua nova senha"
                className="mt-3 block w-full p-3 text-sm text-gray-900 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="mt-9 absolute inset-y-0 right-3 flex items-center">
                <LockClosedIcon className="w-5 h-5 text-gray-500" />
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-14 w-full py-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            ALTERAR SENHA
          </button>
        </form>
      </div>

      {loading && (
        <div className="mt-4 flex justify-center w-full">
          <Hourglass
            visible={true}
            height="50"
            width="50"
            ariaLabel="hourglass-loading"
            wrapperClass=""
            colors={["#050b14", "#72a1ed"]}
          />
        </div>
      )}
    </div>
  );
};

export { ChangePasswordPage };
