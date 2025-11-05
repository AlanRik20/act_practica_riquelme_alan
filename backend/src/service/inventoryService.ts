// src/service/equipoService.ts
import pool from '../database/db';
import { Equipo, EquipoPayload } from '../models/IEquipo';

// Obtener todos
export const getAllEquipos = async (): Promise<Equipo[]> => {
  // Ajusta 'id_equipo' si tu PK tiene otro nombre
  const result = await pool.query('SELECT * FROM equipos ORDER BY id_usuario ASC');
  return result.rows;
};

// Obtener por ID
export const getEquipoById = async (id: number): Promise<Equipo | null> => {
  const result = await pool.query('SELECT * FROM equipos WHERE id_usuario = $1', [id]);
  return result.rows[0] || null;
};

// Crear
export const createEquipo = async (data: EquipoPayload): Promise<Equipo> => {
  const { nombre, marca, modelo, numero_serie, responsable_id } = data;
  
  const result = await pool.query(
    `INSERT INTO equipos (nombre, marca, modelo, numero_serie, responsable_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [nombre, marca, modelo, numero_serie, responsable_id]
  );
  return result.rows[0];
};

// Actualizar
export const updateEquipo = async (id: number, data: Partial<EquipoPayload>): Promise<Equipo | null> => {
  const fields = Object.keys(data)
    .map((key, i) => `${key} = $${i + 2}`)
    .join(', ');
  const values = Object.values(data);

  if (fields.length === 0) return getEquipoById(id);

  const result = await pool.query(
    `UPDATE equipos SET ${fields} WHERE id_usuario = $1 RETURNING *`,
    [id, ...values]
  );
  return result.rows[0] || null;
};

// Eliminar
export const deleteEquipo = async (id: number): Promise<boolean> => {
  const result = await pool.query('DELETE FROM equipos WHERE id_usuario = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};