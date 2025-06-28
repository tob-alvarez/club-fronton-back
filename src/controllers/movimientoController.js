import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const crearMovimiento = async (req, res) => {
  const { descripcion, fecha, monto, tipo, categoriaId } = req.body
  const usuarioId = req.usuarioId // viene del middleware
  
  if (!usuarioId) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  try {
    const nuevo = await prisma.movimiento.create({
      data: {
        descripcion,
        fecha: new Date(fecha),
        monto,
        tipo,
        usuarioId,
        categoriaId,
      },
    })
    res.status(201).json(nuevo)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Error al crear el movimiento" })
  }
};

export const listarMovimientos = async (req, res) => {
  try {
    const movimientos = await prisma.movimiento.findMany({
      include: {
        categoria: true, // para mostrar el nombre de la categoría
      },
      orderBy: { id: "desc" }
    })
    res.json(movimientos)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error al obtener movimientos" })
  }
}

export const listarMovimientosHistorico = async (req, res) => {
  const { desde, hasta } = req.query

  try {
    const filtros = {}

    if (desde && hasta) {
      filtros.fecha = {
        gte: new Date(desde),
        lte: new Date(hasta),
      }
    } else if (desde) {
      filtros.fecha = {
        gte: new Date(desde),
      }
    } else if (hasta) {
      filtros.fecha = {
        lte: new Date(hasta),
      }
    }

    const movimientos = await prisma.movimiento.findMany({
      where: filtros,
      include: {
        categoria: true,
      },
      orderBy: { id: "desc" }
    })

    res.json(movimientos)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error al obtener movimientos históricos" })
  }
}

export const actualizarMovimiento = async (req, res) => {
  const { id } = req.params
  const { descripcion, fecha, monto, tipo, categoriaId } = req.body
  try {
    const actualizado = await prisma.movimiento.update({
      where: { id: Number(id) },
      data: {
        descripcion,
        fecha: new Date(fecha),
        monto,
        tipo,
        categoriaId, // actualizar también la categoría
      },
    })
    res.json(actualizado)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error al actualizar movimiento" })
  }
}

export const eliminarMovimiento = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.movimiento.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Movimiento eliminado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar movimiento" });
  }
};

