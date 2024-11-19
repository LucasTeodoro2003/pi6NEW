import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { FormEvent, useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";
import { useNavigate } from "react-router";
import { api } from "../../../App/serviceApi";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("listPerson");
    localStorage.removeItem("listCameras");
  }, []);

  const verifyButton = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post("/api/Auth", { email, password });
      const token = response.data;

      localStorage.setItem("token", token);

      try {
        const personResponse = await api.get(
          `/PersonController/GetPerson?email=${email}`
        );
        const changedPassword = personResponse.data.return.changedPassword;
        console.log(changedPassword);

        if (changedPassword === true) {
          navigate("/home");
        } else {
          localStorage.setItem("email", email)
          navigate("/password");
        }
      } catch (err) {
        setError("Nenhum email encontrado, Procure o Suporte");
      }
    } catch (err) {
      setError("Email ou senha incorretos!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-primary">
      <div className="bg-gray-900 p-8 rounded-lg shadow-2xl shadow-gray-950 max-w-sm w-full">
        <h2 className="text-center text-white text-2xl font-bold mb-6">
          SEJA BEM VINDO!
        </h2>

        <form onSubmit={verifyButton} className="col-span-3">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <h1 className="text-white">Email</h1>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                className="mt-3 mb-4 block w-full p-3 text-sm text-gray-900 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="mt-9 absolute inset-y-0 right-3 flex items-center">
                <EnvelopeIcon className="w-5 h-5 text-gray-500" />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Senha
            </label>
            <div className="relative">
              <h2 className="text-white">Senha</h2>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
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
            LOGIN
          </button>
        </form>
      </div>
      {loading && (
        <>
          <div className="mt-4 flex justify-center w-full">
            <Hourglass
              visible={true}
              height="50"
              width="50"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#050b14", "#72a1ed"]}
            />
          </div>
        </>
      )}
    </div>
  );
}

export { Login };
