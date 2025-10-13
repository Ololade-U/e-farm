"use client";
import React from "react";
import useStoreQuery from "../../../components/store";
import EmptyPage from "../../../components/EmptyPage";
import CartCard from "../../../components/CartCard";
import { Box } from "@chakra-ui/react";


const CartPage = () => {
  const posts = useStoreQuery((s)=> s.products)
  const cart = useStoreQuery((s) => s.cart);
  const cartedProduct = posts?.filter((product) => cart.includes(product.id));
  return (
    <>
      {cartedProduct?.length == 0 && (
        <EmptyPage>Add items to your cart to view them here</EmptyPage>
      )}
      <Box bg={'#e3e3e3'} p={'2rem 1rem'}>
        {cartedProduct?.map((product) => (
          <CartCard key={product.id} product={product} />
        ))}
      </Box>
    </>
  );
};

export default CartPage;
