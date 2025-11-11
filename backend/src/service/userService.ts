import pool from "../database/db";
import { User } from "../models/IUser";

export const createUser = async (data: Partial<User>): Promise<User | any> => {
  const { nombre, email, password, rol_id} = data;
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
    nombre: row.nombre,
    email: row.email,
    password: row.password,
    rol_id: row.role_id,
    role: { id: row.role_id, nombre: row.role_name }
  };
  } catch (error) {
    console.log(error)
  }
};


export const getUserByEmail = async (email: string): Promise<User | undefined> => {
  try {
    const result = await pool.query(
    'SELECT u.*, r.id as role_id, r.nombre as role_name FROM usuarios u JOIN roles r ON u.rol_id = r.id WHERE u.email = $1',
    [email]
  );
  if (result.rows.length === 0) return undefined;
  const row = result.rows[0];
  return {
    id: row.id,
    nombre: row.nombre,
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
    const fields = [];
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key} = $${index}`);
      values.push(value);
      index++;
    }

    if (fields.length === 0) {
      throw new Error('No hay campos para actualizar');
    }

    const query = `
      UPDATE usuarios
      SET ${fields.join(', ')}
      WHERE id_usuario = $${index}
      RETURNING *;
    `;

    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM usuarios WHERE id_usuario = $1', [id]);
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const result = await pool.query(
      'SELECT * FROM "usuarios" WHERE email = $1',
      [email]
    );
    // Si rowCount > 0, significa que encontró un usuario
    return result.rows.length > 0;
  } catch (error) {
    console.error("Error al verificar email:", error);
    // Lanzamos el error para que el validador lo atrape
    throw new Error('Error al validar el email en la base de datos');
  }
};