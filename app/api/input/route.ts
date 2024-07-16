import { NextResponse } from "next/server";
import prisma from "../../../lib/prismaClient";

export async function GET(req: Request) {
  try {
    const allTasks = await prisma.task.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json(allTasks);
  } catch (error) {
    console.error("Prisma query error:", error);
    throw new Error("Failed to fetch tasks");
  }
}

export async function POST(req: Request) {
  const { id, text } = await req.json();

  const post = await prisma.task.create({
    data: {
      id,
      text,
    },
  });
  return NextResponse.json(post);
}
