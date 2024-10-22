import { useNavigate } from "react-router";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="flex justify-between items-center px-4 py-5 sm:px-6">
          <h3 className="text-lg font-semibold">
            Impossível Prosseguir
          </h3>
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-semibold bg-primary text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto font-Jakarta"
          >
            Login
          </button>
        </div>
        <div className="px-4 py-5 sm:p-6 text-center">
          Este link não é válido porque seu token de autenticação pode ter expirado ou é inválido. Por favor, faça login novamente para continuar. Se o problema persistir, verifique suas credenciais ou entre em contato com o suporte para obter assistência.
        </div>
      </div>
    </div>
  );
}

export { NotFoundPage };
