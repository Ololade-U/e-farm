import { Card, HStack, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <>
      <HStack
        h={"83vh"}
        w={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack w={"30%"}>
          <SkeletonText noOfLines={1} h={'4'} w={'50%'}/>
          <Card.Root borderRadius={"1rem"} overflow={"hidden"} p={"1rem"}>
            <Skeleton height={"370px"} />
          </Card.Root>
        </Stack>
        <Stack w={"30%"}>
          <Card.Root borderRadius={"1rem"} overflow={"hidden"} p={"1rem"}>
            <Skeleton height={"370px"} />
          </Card.Root>
        </Stack>
      </HStack>
    </>
  );
};

export default ProductDetailSkeleton;
