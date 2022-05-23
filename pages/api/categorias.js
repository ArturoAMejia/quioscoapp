import { PrismaClient } from "@prisma/client"

// Forma de como mandar a llamar los datos de una base de datos con NextJS y Prisma
export default async function handler(req, res) {
  const prisma = new PrismaClient()

  const categorias = await prisma.categoria.findMany({
    include:{
      productos:true
    }
  })


  res.status(200).json(categorias)
}
