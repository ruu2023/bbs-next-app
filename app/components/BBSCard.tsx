"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { BBSData } from "../types/types";
import { Button } from "@/components/ui/button";
import { postBBS } from "../actions/postBBSAction";

interface bbsDataProps {
  bbsData: BBSData;
}

const BBSCard = ({ bbsData }: bbsDataProps) => {
  const { id, title, content, createdAt, username } = bbsData;
  const handleClick = () => {
    postBBS({ username, title, content });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{username}</CardDescription>
        </CardHeader>
        <CardContent>{content}</CardContent>
        <CardFooter className="flex justify-between">
          <Link className="text-blue-500" href={`/bbs-posts/${id}`}>
            Read More
          </Link>
          <button onClick={handleClick}>Duplicate</button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BBSCard;
