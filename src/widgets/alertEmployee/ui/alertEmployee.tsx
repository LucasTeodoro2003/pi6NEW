import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { Person } from '../../../Entities/employee';

interface AlertEmployeePromps {
  people: Person[];
}

const AlertEmployee: React.FC<AlertEmployeePromps> = ({ people }) => {
  const usingEpi = people.filter(person => person.usingEpi).length;
  const peopleCount = people.length;

  return (
    <div>
      {usingEpi === peopleCount ? (
        <div className="mt-10 rounded-md bg-green-100 p-4 mr-32">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" aria-hidden="true">
                <CheckCircleIcon className='h-5 w-5 text-green-500' aria-hidden="true" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-green-800">Está tudo correto! Todos estão usando as devidas EPI's.</h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Existem pessoas sem as devidas EPI's</h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc space-y-1 pl-5">
                  {people.filter(person => !person.usingEpi).map(person => (
                    <li key={person.id}>
                      {person.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { AlertEmployee };
