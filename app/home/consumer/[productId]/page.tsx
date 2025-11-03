"use client";
import ProductDetail from "@/app/components/ProductDetail";
import ProductDetailSkeleton from "@/app/components/ProductDetailSkeleton";
import useStoreQuery from "@/app/components/store";
import useProductDetail from "@/app/hooks/useProductDetail";
import React from "react";

interface Props {
  params: { productId: string };
}
const page = ({ params }: Props) => {
  const { productId } = params;
  const { detail, isLoading } = useProductDetail(productId);

  return (
    <>
      {isLoading ? (
        <ProductDetailSkeleton />
      ) : (
        <ProductDetail product={detail} />
      )}
    </>
  );
};

export default page;
