import React from 'react';
import { Person } from '../../../Entities/employee';

interface AlertEmployeePromps {
  people: Person[];
}

const AlertEmployee: React.FC<AlertEmployeePromps> = ({ people }) => {

  return (<></>
  );
}

export { AlertEmployee };
