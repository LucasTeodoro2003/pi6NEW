/*
  Este exemplo requer algumas alterações na sua configuração:

  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
*/

function Formulary() {
  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6 mr-6 mt-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="ml-4 mt-4 text-lg font-Jakarta font-extralight leading-6 text-gray-900 dark:text-white">
                Funcionário
              </h3>
              <p className="mt-1 ml-4 text-sm text-gray-600 dark:text-white">
                Perfil do funcionário
              </p>
            </div>
          </div>

          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md ">
                <div className="space-y-6 bg-gray-100 dark:bg-gray-700 px-4 py-5 sm:p-6">
                  <div className="">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">
                      Perfil
                    </label>
                    <div className="mx-auto flex items-center justify-center">
                      <span className="inline-block h-24 w-24 overflow-hidden rounded-full bg-white dark:bg-gray-800">
                        <svg
                          className="h-full w-full text-gray-300 dark:text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-center rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 px-60 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600 dark:text-white">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white dark:bg-gray-700 font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Selecione uma foto</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">ou arraste e solte aqui</p>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-white">
                            PNG, JPG, GIF até 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <label
                    htmlFor="obs"
                    className="mt-4 block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Observações
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="obs"
                      name="obs"
                      rows={3}
                      className="bg-gray-100 dark:text-white dark:bg-gray-700 mt-1 block w-full rounded-md border-gray-300 border-2 dark:border-gray-400 shadow-sm dark:shadow-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      {/* Segunda parte do formulário */}
      <div className="mt-10 -mb-4 sm:mt-0 dark:bg-gray-800">
        <div className="md:grid md:grid-cols-3 md:gap-6 mr-6 mt-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="ml-4 mt-4 text-lg font-medium font-Jakarta leading-6 text-gray-900 dark:text-white">
                Informações do Funcionário
              </h3>
              <p className="ml-4 mt-1 text-sm text-gray-600 dark:text-white">
                Informações para criação de um usuário.
              </p>
            </div>
          </div>

          <div className="mb-6 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">


                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="given-name"
                        className="bg-gray-100 mt-1 block h-9 w-full rounded-md dark:bg-gray-700 border-gray-300 border-2 dark:shadow-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:text-white"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="bg-gray-100 mt-1 block h-9 w-full rounded-md dark:bg-gray-700 border-gray-300 border-2 shadow-sm dark:shadow-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:text-white"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Setor
                      </label>
                      <select
                        id="title"
                        name="title"
                        autoComplete="title-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm font-Jakarta dark:text-white"
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="departament"
                          className="block text-sm font-medium text-gray-700 dark:text-white"
                        >
                          Departamento
                        </label>
                        <input
                          type="text"
                          name="departament"
                          id="departament"
                          autoComplete="departament-name"
                          className="bg-gray-100 mt-1 block h-9 w-full rounded-md dark:bg-gray-700 border-gray-300 border-2 shadow-sm dark:shadow-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:text-white"
                        />
                      </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 dark:opacity-80 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export { Formulary };
