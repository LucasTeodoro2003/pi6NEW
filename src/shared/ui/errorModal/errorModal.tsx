import React from "react";

interface ErrorModalProps {
  message: string;
  messageError: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  message,
  onClose,
  messageError,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Erro
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {message}
          {messageError && <span className="text-red-500">{messageError}</span>}
        </p>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export { ErrorModal };
