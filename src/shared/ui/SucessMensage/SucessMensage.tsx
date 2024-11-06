import { CheckCircleIcon } from '@heroicons/react/20/solid'

function SucessMensage() {
  return (
    <div className="fixed inset-x-0 bottom-0 pb-2 sm:pb-5">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
        <div className="rounded-lg border-2 bg-green-400 p-2 shadow-2xl sm:p-3 mx-96">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex w-0 flex-1 items-center">
              <span className="flex rounded-lg bg-green-400 p-2">
                <CheckCircleIcon className="h-10 w-10 text-white" aria-hidden="true" />
              </span>
              <p className="ml-3 truncate font-medium text-white">
                <span className="hidden md:inline">Usuário Criado com Sucesso!.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {SucessMensage}
