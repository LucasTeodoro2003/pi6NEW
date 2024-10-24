export interface User {
  id: number;
  name: string;
  permissions: Array<{
    role: number;
    locationId: string;
  }>;
  sector: string;
  department: string;
  email: string;
  image: string;
  obs?: string;
  phone: string;
}
