export type Role = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  roleId: number;
  role?: Role;
};
