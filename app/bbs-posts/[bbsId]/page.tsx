// "use client";

import { BBSData } from "@/app/types/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

async function getDetailBBSData(id: number): Promise<BBSData> {
  const response = await fetch(`http://localhost:3000/api/post/${id}`, {
    cache: "no-store",
  });

  const bbsDetailData: BBSData = await response.json();
  return bbsDetailData;
}

interface paramsProps {
  bbsId: number;
}

const BbsDetailPage = async ({ params }: { params: paramsProps }) => {
  const bbsDetailData = await getDetailBBSData(params.bbsId);
  const { title, username, content } = bbsDetailData;

  // const { bbsId } = params;
  // const [bbsDetailData, setBbsDetailData] = useState<BBSData | null>(null);
  // const router = useRouter();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getDetailBBSData(bbsId);
  //     setBbsDetailData(data);
  //   };

  //   fetchData();
  // }, [bbsId]);

  // const handleEdit = () => {
  //   router.push({
  //     pathname: `/bbs-posts/${params.bbsId}/edit`,
  //     query: { data: JSON.stringify(bbsDetailData) },
  //   });
  // };

  // if (!bbsDetailData) {
  //   return <p>Loading...</p>;
  // }

  // const { title, username, content } = bbsDetailData;

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-700">{username}</p>
      </div>
      <div className="mb-8">
        <p className="text-gray-900">{content}</p>
      </div>
      <Link
        href={"/"}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
      >
        戻る
      </Link>
      {/* <Link
        href={`/bbs-posts/${params.bbsId}/edit`}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
      >
        編集
      </Link> */}
      {/* <button
        onClick={handleEdit}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
      >
        編集
      </button> */}
    </div>
  );
};

export default BbsDetailPage;
