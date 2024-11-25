import React from "react";

interface AlertNotFoundProps {
  onClose: () => void;
}

const AlertNotFound: React.FC<AlertNotFoundProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="max-w-md w-full overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="flex justify-between items-center px-4 py-5 sm:px-6">
          <h3 className="text-lg font-semibold">Impossível Prosseguir</h3>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-md border border-transparent px-3 py-1 text-sm font-semibold bg-red-500 text-white shadow-sm hover:bg-red-600 focus:outline-none"
          >
            Fechar
          </button>
        </div>
        <div className="px-4 py-5 sm:p-6 text-center">
          Este link não é válido porque seu token de autenticação pode ter
          expirado ou é inválido. Por favor, faça login novamente para
          continuar. Se o problema persistir, verifique suas credenciais ou
          entre em contato com o suporte para obter assistência.
        </div>
      </div>
    </div>
  );
};
export { AlertNotFound };
