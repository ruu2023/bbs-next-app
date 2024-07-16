import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { bbsId, title, username, content } = await req.json();
  const post = await prisma.post.update({
    data: {
      bbsId,
      username,
      title,
      content,
    },
  });
  return NextResponse.json(post);
}
