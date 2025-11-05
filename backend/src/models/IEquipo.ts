export interface Equipo {
  id_equipo?: number; // Asumo que tu PK se llama id_equipo o similar. Ajusta si es solo 'id'
  nombre: string;
  marca: string;
  modelo: string;
  numero_serie: string;
  responsable_id: number | null; // Puede ser null si aún no tiene responsable
  fecha_registro?: Date; // Opcional porque la DB lo pone automático
}

// Para crear/actualizar, no necesitamos fecha_registro (la DB se encarga)
export interface EquipoPayload {
  nombre: string;
  marca: string;
  modelo: string;
  numero_serie: string;
  responsable_id?: number | null;
}