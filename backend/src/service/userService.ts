import pool from '../db';
import { User } from '../types/user.d.types';

export const createUser = async (data: Partial<User>): Promise<User> => {
  const { name, email, password, roleId } = data;
  const result = await pool.query(
    'INSERT INTO users (name, email, password, roleId) VALUES ($1, $2, $3, $4)',
    [name, email, password, roleId]
  );
  return result.rows[0];
};

export const getUsers = async (): Promise<User[]> => {
  const result = await pool.query(
    'SELECT u.*, r.id_role as roleId, r.name as role_name FROM users u JOIN role r ON u.roleId = r.id_role'
  );
  return result.rows.map(row => ({
    id: row.id_user,
    name: row.name,
    email: row.email,
    password: row.password,
    roleId: row.role_id,
    role: { id: row.role_id, name: row.role_name }
  }));
};

export const getUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query(
    'SELECT u.*, r.id as role_id, r.name as role_name FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = $1',
    [id]
  );
  if (result.rows.length === 0) return null;
  const row = result.rows[0];
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    password: row.password,
    roleId: row.role_id,
    role: { id: row.role_id, name: row.role_name }
  };
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
  const { name, email, password, roleId } = data;
  const result = await pool.query(
    'UPDATE users SET name = $1, email = $2, password = $3, role_id = $4 WHERE id = $5 RETURNING *',
    [name, email, password, roleId, id]
  );
  return result.rows[0];
};

export const deleteUser = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};
