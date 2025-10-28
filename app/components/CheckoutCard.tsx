import { Box, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import React, { use, useEffect, useState } from "react";
import { Product } from "../hooks/useAllPosts";
import CheckoutCardImages from "./CheckoutCardImages";
import useStoreQuery from "./store";

interface Props {
  product: Product[];
}

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2, // Ensures two decimal places (e.g., .00)
  }).format(amount);
};

const CheckoutCard = ({ product }: Props) => {
  const [total, setTotal] = useState(1);
  const quantity = useStoreQuery((s) => s.quantity);
  const cart = useStoreQuery((s) => s.cart); 
  useEffect(() => {
    setTotal(
      product.reduce((acc, expense) => {
        const itemQuantity =
          quantity?.find((q) => q.productId === expense.id)?.quantity || 1;
          console.log(itemQuantity)
        return acc + (expense.amount * itemQuantity);
      }, 0)
    );

  }, [quantity, cart]);
  // const total = product.reduce((acc, expense) => expense.amount + acc, 0);
  const discount = 0;
  const delivery = total * 0.1;
  return (
    <Box
      pos={"fixed"}
      top={"21vh"}
      right={"2rem"}
      w={"35%"}
      h={"75vh"}
      bg={"white"}
      borderRadius={".6rem"}
      p={"1rem"}
    >
      <Heading fontSize={"2xl"} mb={"1rem"}>
        Order Summary
      </Heading>
      <Stack h={"100%"}>
        <CheckoutCardImages />
        <HStack justifyContent={"space-between"}>
          <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
            Items total:
          </Text>
          <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
            {formatAmount(total)}
          </Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
            Discount:
          </Text>
          <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
            N0
          </Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
            Subtotal:
          </Text>
          <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
            {formatAmount(total - discount)}
          </Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
            Delivery:
          </Text>
          <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
            {formatAmount(delivery)}
          </Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
            Estimated total:
          </Text>
          <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
            {formatAmount(total + delivery - discount)}
          </Text>
        </HStack>
        <Button
          mt={"2.5rem"}
          bg={"#09734E"}
        >{`Checkout(${product.length})`}</Button>
      </Stack>
    </Box>
  );
};

export default CheckoutCard;
