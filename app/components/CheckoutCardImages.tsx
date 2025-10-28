import { HStack } from "@chakra-ui/react";
import React from "react";
import useStoreQuery from "./store";
import { CldImage } from "next-cloudinary";

const CheckoutCardImages = () => {
  const posts = useStoreQuery((s) => s.products);
  const cart = useStoreQuery((s) => s.cart);
  const cartedProduct = posts?.filter((product) => cart.includes(product.id));
  return (
    <HStack gap={"1rem"} overflowX={'auto'} scrollbar={'hidden'}>
      {cartedProduct?.map((product) => (
        <CldImage
          src={product.img}
          alt={product.description}
          width={80}
          height={80}
          key={product.id}
        />
      ))}
    </HStack>
  );
};

export default CheckoutCardImages;
