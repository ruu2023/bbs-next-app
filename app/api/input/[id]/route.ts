import { NextResponse } from "next/server";
import prisma from "../../../../lib/prismaClient";

// export async function GET(req: Request) {
//   try {
//     const allTasks = await prisma.task.findMany();
//     return NextResponse.json(allTasks);
//   } catch (error) {
//     console.error("Prisma query error:", error);
//     throw new Error("Failed to fetch tasks");
//   }
// }

interface paramsProps {
  params: {
    id: string;
  };
}

export async function PUT(req: Request, { params }: paramsProps) {
  const { text } = await req.json();
  const id = parseInt(params.id);

  const post = await prisma.task.update({
    where: { id: id },
    data: {
      text: text,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(req: Request, { params }: paramsProps) {
  const id = parseInt(params.id);

  const post = await prisma.task.delete({
    where: { id: id },
  });
  return NextResponse.json(post);
}
