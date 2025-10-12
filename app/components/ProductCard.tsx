
import {
  Card,
  Flex,
  Box,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { CldImage } from "next-cloudinary";
import React from "react";
import { BsCartPlus } from "react-icons/bs";
import useStoreQuery from "./store";
import { BsCartCheck } from "react-icons/bs";

export interface Product {
  id: string;
  description: string;
  type: string;
  amount: number;
  quantity: number;
  status: string;
  img: string;
}

interface Prop {
  product: Product;
}

const ProductCard = ({ product }: Prop) => {
  const cart = useStoreQuery((s)=> s.cart)
  const addToCart = useStoreQuery((s)=> s.addToCart)
  const removeCart = useStoreQuery((s)=> s.removeCart)
  return (
    <>
      <Card.Root borderRadius={"1rem"} overflow={"hidden"} p={"1rem"}>
        {product.img ? (
          <CldImage src={product.img} alt={product.description} height={300} width={400}/>
        ) : (
          <Image
            src={"/not found.jpg"}
            pos={"relative"}
            objectFit={"contain"}
            w={"100%"}
          />
        )}
        <Flex pos={'relative'} h={'100%'} justify={"flex-end"} alignItems={"flex-start"}>
          <Box
            cursor={"pointer"}
            // bgColor={{ _dark: "blue.900", _light: "#e3e3e3" }}
            // p={".8rem .8rem"}
            bottom={"0rem"}
            right={".5rem"}
            position={"absolute"}
            title="Add to watchlist"
            bgColor={'white'}
            p={'1rem'}
            borderRadius={'50%'}
            onClick={()=> cart.includes(product.id) ? removeCart(product.id) : addToCart(product.id)}
          >
            {cart.includes(product.id) ?  <BsCartCheck size={'1.5rem'}/> : <BsCartPlus size={'1.5rem'}/>}
          </Box>
        </Flex>
        <Card.Body p={0}>
            <Heading fontSize={"1xl"}>
              {product.description}
            </Heading>
            <Text fontSize={'3xl'} fontWeight={'bold'}>{product.amount}</Text>
        </Card.Body>
      </Card.Root>
    </>
  );
};

export default ProductCard;
