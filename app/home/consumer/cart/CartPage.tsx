"use client";
import React from "react";
import useStoreQuery from "../../../components/store";
import EmptyPage from "../../../components/EmptyPage";
import CartCard from "../../../components/CartCard";
import { Box, HStack, Stack } from "@chakra-ui/react";
import CheckoutCard from "@/app/components/CheckoutCard";
import useCart from "@/app/hooks/useCart";

const CartPage = () => {
  const posts = useStoreQuery((s) => s.products);
  const cart = useStoreQuery((s) => s.cart);  
  console.log(cart)
  const cartedProduct = posts?.filter((product) => cart.includes(product.id));
  return (
    <>
      {cartedProduct?.length == 0 ? (
        <EmptyPage>Add items to your cart to view them here</EmptyPage>
      ) : (
        <Box h={"100vh"} overflowY={"auto"} bg={"#e3e3e3"} p={"2rem 1rem"}>
          <HStack justifyContent={"space-between"}>
            <Stack w={"60%"}>
              {cartedProduct?.map((product) => (
                <CartCard key={product.id} product={product} />
              ))}
            </Stack>
            <CheckoutCard product={cartedProduct!} />
          </HStack>
        </Box>
      )}
    </>
  );
};

export default CartPage;
