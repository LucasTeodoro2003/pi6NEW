export interface Person {
  id: number,
  name: string;
  sector: string;
  department: string;
  email: string;
  image: string;
  usingEpi: boolean;
  details?: string[];
  obs?: string;
}
