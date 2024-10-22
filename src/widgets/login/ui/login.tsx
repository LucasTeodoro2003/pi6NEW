import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { apiUser } from "../../../App/serviceApi";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const verifyButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await apiUser.post('/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('token', token);

      navigate('/home');
    } catch (err) {
      setError('Email ou senha incorretos!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 to-primary">
      <div className="bg-gray-900 p-8 rounded-lg shadow-2xl shadow-gray-950 max-w-sm w-full">
        <h2 className="text-center text-white text-2xl font-bold mb-6">SEJA BEM VINDO!</h2>

        <form onSubmit={verifyButton} className="col-span-3">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <label htmlFor="email" className="sr-only">Email</label>
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
            <label htmlFor="password" className="sr-only">Senha</label>
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
    </div>
  );
}

export { Login };
