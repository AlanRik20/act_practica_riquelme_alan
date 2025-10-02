import { Role } from "./IRole";
export interface User {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol_id: number;
  role?: Role;
};
