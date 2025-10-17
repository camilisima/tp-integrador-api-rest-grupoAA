import * as serviciosservicios from '../servicios/serviciosservicios.js';

export const getServicios = async (_req, res) => {
  try {
    const servicios = await serviciosservicios.getAllServicios();
    res.json(servicios);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getServicioById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const servicio = await serviciosservicios.getServicioById(id);
    if (!servicio) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.json(servicio);
  } catch (error) {
    console.error('Error al obtener servicio:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createServicio = async (req, res) => {
  const { titulo, descripcion, importe } = req.body;

  if (!titulo || typeof titulo !== 'string' || titulo.trim().length < 2) {
    return res.status(400).json({ message: 'Título inválido' });
  }
  const imp = Number(importe);
  if (!Number.isFinite(imp) || imp < 0) {
    return res.status(400).json({ message: 'Importe inválido' });
  }

  try {
    const newId = await serviciosservicios.createServicio({
      titulo: titulo.trim(),
      descripcion: (descripcion ?? '').toString().trim() || null,
      importe: imp
    });

    res
      .status(201)
      .location(`/api/servicios/${newId}`)
      .json({ message: 'Servicio creado correctamente', id: newId });
  } catch (error) {
    console.error('Error al crear servicio:', error.code, error.sqlMessage || error.message);
    res
      .status(500)
      .json({
        message: 'Error al crear servicio',
        code: error.code,
        detalle: error.sqlMessage || error.message
      });
  }
};

export const updateServicio = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const { titulo, descripcion, importe } = req.body;

    if (!titulo || typeof titulo !== 'string' || titulo.trim().length < 2) {
      return res.status(400).json({ message: 'Título inválido' });
    }
    const imp = Number(importe);
    if (!Number.isFinite(imp) || imp < 0) {
      return res.status(400).json({ message: 'Importe inválido' });
    }

    const updated = await serviciosservicios.updateServicio(id, {
      titulo: titulo.trim(),
      descripcion: (descripcion ?? '').toString().trim() || null,
      importe: imp
    });

    if (!updated) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    res.json({ message: 'Servicio actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar servicio:', error.code, error.sqlMessage || error.message);
    res
      .status(500)
      .json({
        message: 'Error al actualizar servicio',
        code: error.code,
        detalle: error.sqlMessage || error.message
      });
  }
};


export const deleteServicio = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const deleted = await serviciosservicios.deleteServicio(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.status(204).end(); 
  } catch (error) {
    console.error('Error al eliminar servicio:', error);
    res.status(500).json({ message: 'Error al eliminar servicio' });
  }
};
