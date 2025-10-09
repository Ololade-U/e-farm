"use client";
import React from "react";
import { Button } from "@chakra-ui/react";
import UsePost from "../hooks/usePosts";
import useUserSession from "../hooks/useUserSession";

const FarmerHomePage = () => {
  useUserSession();

  const { posts } = UsePost();
  console.log(posts);

  return (
    <>
      <div>FarmerHomePage</div>
      <Button>Click me</Button>
    </>
  );
};

export default FarmerHomePage;
