export interface Person {
  id: number,
  email: string;
  permissions: Permission[];
  changedPassword: boolean;
  name: string;
  phone: string;
  image: string;
}

export interface Permission {
  role: number;
  locationId: string;
}