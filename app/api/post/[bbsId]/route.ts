import { NextResponse } from "next/server";
import prisma from "../../../../lib/prismaClient";

interface paramsProps {
  bbsId: string;
}

export async function GET(req: Request, { params }: { params: paramsProps }) {
  const bbsId = params.bbsId;
  const bbsDetailData = await prisma.post.findUnique({
    where: {
      id: parseInt(bbsId),
    },
  });
  return NextResponse.json(bbsDetailData);
}
