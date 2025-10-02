import pool from "../db";
import { User } from "../models/IUser";

export const createUser = async (data: Partial<User>): Promise<User | undefined> => {
  const { nombre, email, password, rol_id } = data;
  try {
    const result = await pool.query(
      "INSERT INTO usuarios (nombre, email, password, rol_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, email, password, rol_id]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error)
  }
};

export const getUsers = async (): Promise<User[]> => {
  const result = await pool.query("SELECT * from usuarios");
  return result.rows;
};

export const getUserById = async (id: number): Promise<User | undefined> => {
  try {
    const result = await pool.query(
    'SELECT u.*, r.id as role_id, r.nombre as role_name FROM usuarios u JOIN roles r ON u.rol_id = r.id WHERE u.id_usuario = $1',
    [id]
  );
  if (result.rows.length === 0) return undefined;
  const row = result.rows[0];
  return {
    id: row.id,
    nombre: row.name,
    email: row.email,
    password: row.password,
    rol_id: row.role_id,
    role: { id: row.role_id, nombre: row.role_name }
  };
  } catch (error) {
    console.log(error)
  }
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User | undefined> => {
try {
    const { nombre, email, password, rol_id } = data;
  const result = await pool.query(
    'UPDATE usuarios SET nombre = $1, email = $2, password = $3, rol_id = $4 WHERE id_usuario = $5 RETURNING *',
    [nombre, email, password, rol_id, id]
  );
  return result.rows[0];
} catch (error) {
  console.log(error)
  
}
};

// export const deleteUser = async (id: number): Promise<void> => {
//   await pool.query('DELETE FROM users WHERE id = $1', [id]);
// };
