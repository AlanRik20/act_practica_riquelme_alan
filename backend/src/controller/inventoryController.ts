import { Request, Response } from 'express';
import * as equipoService from '../service/inventoryService';

export const getAllEquipos = async (req: Request, res: Response) => {
  try {
    const equipos = await equipoService.getAllEquipos();
    res.json(equipos);
  } catch (error) {
    // Error real del servidor, no culpa del cliente
    console.error(error); // Buena práctica loguear el error real
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getEquipoById = async (req: Request, res: Response) => {
  try {
    // El ID ya viene validado como número por el middleware
    const equipo = await equipoService.getEquipoById(Number(req.params.id));
    if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.json(equipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createEquipo = async (req: Request, res: Response) => {
  try {
    // Si llegamos aquí, express-validator ya garantizó que los datos son válidos y únicos
    const nuevo = await equipoService.createEquipo(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    // Ya no necesitamos chequear '23505' aquí
    res.status(500).json({ message: 'Error interno al crear el equipo' });
  }
};

export const updateEquipo = async (req: Request, res: Response) => {
  try {
    const actualizado = await equipoService.updateEquipo(Number(req.params.id), req.body);
    if (!actualizado) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno al actualizar el equipo' });
  }
};

export const deleteEquipo = async (req: Request, res: Response) => {
  try {
    const exito = await equipoService.deleteEquipo(Number(req.params.id));
    if (!exito) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno al eliminar el equipo' });
  }
};