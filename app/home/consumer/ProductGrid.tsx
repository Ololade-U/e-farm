'use client'

import EmptyPage from "@/app/components/EmptyPage";
import ProductCard from "@/app/components/ProductCard";
import ProductSkeleton from "@/app/components/ProductSkeleton";
import useStoreQuery from "@/app/components/store";
import useAllPost from "@/app/hooks/useAllPosts";
import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

const ProductGrid = () => {
  const Skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const { posts, isLoading } = useAllPost();
  const setProducts = useStoreQuery((s)=> s.setProducts)
  setProducts(posts!)
  return (
    <>
      {posts?.length == 0 && <EmptyPage>The Page is currently empty, try reloading!</EmptyPage>}

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xlTo2xl: 4 }}
        gap={"1rem"}
        p={{ mdDown: "0 2rem", smTo2xl: "0 0 2rem" }}
      >
        {isLoading &&
          Skeleton.map((skeleton) => <ProductSkeleton key={skeleton} />)}
        {posts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </SimpleGrid>
    </>
  );
};

export default ProductGrid;
