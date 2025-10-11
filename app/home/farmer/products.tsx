"use client";
import useStoreQuery from "@/app/components/store";
import usePost from "@/app/hooks/usePosts";
import { Box, Button, Menu, Portal, Table, Text } from "@chakra-ui/react";
import { SlOptionsVertical } from "react-icons/sl";
import TableSkeleton from "./TableSkeleton";
import { CldImage } from "next-cloudinary";

const Products = () => {
  const { posts, isLoading } = usePost();
  const newPosts = posts && [...posts];
  newPosts?.reverse();
  const setPostId = useStoreQuery((s) => s.setPostId);
  const onDelete = async (postId: string) => {
    try {
      await fetch(`../api/posts/${postId}`, {
        method: "DELETE",
      });
    } catch (err) {
      // Catch network errors or errors thrown above
      console.error("Fetch operation error:", err);
    }
    setPostId(postId);
  };

  return (
    <Box overflowY={"auto"}>
      <Table.Root height={"100%"} size="lg" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader textAlign={"center"} fontSize={"1.1rem"}>
              Product
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>
              Description
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Type</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Amount</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Status</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>
              Quantity
            </Table.ColumnHeader>
            <Table.ColumnHeader>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body h={"1rem"} ml={"2rem"}>
          {isLoading && <TableSkeleton />}
          {newPosts?.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell py={"1.5rem"} textAlign={"center"}>
                <Box display={'flex'} alignSelf={'center'} justifyContent={'center'}>
                  <CldImage
                  src={item.img}
                  alt={item.description}
                  width={60}
                  height={60}
                />
                </Box>
              </Table.Cell>
              <Table.Cell textAlign={"center"}>{item.description}</Table.Cell>
              <Table.Cell textAlign={"center"}>{item.type}</Table.Cell>
              <Table.Cell textAlign={"center"}>{item.amount}</Table.Cell>
              <Table.Cell textAlign={"center"} w={"8%"} alignContent={"center"}>
                <Text
                  py={".3rem"}
                  borderRadius={"1rem"}
                  bg={
                    item.status == "OnSale"
                      ? "blue.200"
                      : item.status == "SoldOut"
                      ? "green.200"
                      : "red.200"
                  }
                  alignSelf={"center"}
                  textAlign={"center"}
                  color={
                    item.status == "OnSale"
                      ? "blue.700"
                      : item.status == "SoldOut"
                      ? "green.700"
                      : "red.700"
                  }
                  fontWeight={"semibold"}
                >
                  {item.status}
                </Text>
              </Table.Cell>
              <Table.Cell textAlign={"center"}>{item.quantity}</Table.Cell>
              <Table.Cell>
                <Menu.Root positioning={{ placement: "top-start" }} size={"md"}>
                  <Menu.Trigger asChild>
                    <Button variant="outline" size="sm" border={"none"}>
                      <SlOptionsVertical />
                    </Button>
                  </Menu.Trigger>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content>
                        <Menu.Item value="new-txt" p={".5rem .5rem"}>
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          value="new-file"
                          p={".5rem .5rem"}
                          color={"red"}
                          onClick={() => onDelete(item.id)}
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default Products;
