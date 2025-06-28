import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCategorias = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
};

export const createCategoria = async (req, res) => {
  const { nombre } = req.body;
  try {
    const nueva = await prisma.categoria.create({ data: { nombre } });
    res.status(201).json(nueva);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear categoría" });
  }
};

export const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const actualizada = await prisma.categoria.update({
      where: { id: Number(id) },
      data: { nombre },
    });
    res.json(actualizada);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar categoría" });
  }
};

export const deleteCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.categoria.delete({ where: { id: Number(id) } });
    res.json({ message: "Categoría eliminada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar categoría" });
  }
};
