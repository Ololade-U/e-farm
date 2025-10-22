"use client";
import React, { ReactNode, useState } from "react";
import {
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  Text,
  Image,
  Flex,
  Box,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Spinner,
} from "@chakra-ui/react";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { RiMenuAddFill } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { LuBadgeDollarSign } from "react-icons/lu";
import { IoMdHelpCircle } from "react-icons/io";
import useUserSession from "@/app/hooks/useUserSession";
import useStoreQuery from "@/app/components/store";
import { CiLogout } from "react-icons/ci";
import z from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidget } from "next-cloudinary";
import { signOut } from "next-auth/react";
import { MdDashboardCustomize } from "react-icons/md";

interface Props {
  children: ReactNode;
}

interface CloudResult {
  public_id: string;
}

const ProductType = z.enum([
  "Vegetable",
  "Fruit",
  "Grain",
  "Livestock",
  "Dairy",
]);
const Status = z.enum(["OnSale", "SoldOut", "Inactive"]);

const schema = z.object({
  description: z.string().min(3),
  type: ProductType,
  amount: z.number().min(1),
  quantity: z.number().min(1),
  status: Status,
  img: z.string().min(3),
});

type FormData = z.infer<typeof schema>;

const FarmerHomePage = ({ children }: Props) => {
  const handleSignOut = () => {
    signOut({
      callbackUrl: "/", // <-- Specify your custom redirect path here
      redirect: true, // Ensure redirection is enabled (it is by default)
    });
  };
  const [publicId] = useState("");
  const [upload, setUpload] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      img: publicId,
    },
  });
  const setMain = useStoreQuery((s) => s.setMain);
  const main = useStoreQuery((s) => s.main);
  const userId = useStoreQuery((s) => s.userId);
  const user = useUserSession();
  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    try {
      const response = await fetch(`../api/posts/${userId}`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setUploadSuccess(true);
        reset();
      } else {
        const errorData = await response.json();
        if (errorData && errorData.error) {
          const serverErrorMessage = errorData.error;
          throw new Error(serverErrorMessage);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
    } catch (err) {
      console.error("Fetch operation error:", err);
    }
    setLoading(false);
  };

  return (
    <>
      <Grid
        h={"100vh"}
        overflowY={"hidden"}
        templateRows={"15vh 1fr"}
        templateColumns={"170px 1fr"}
      >
        <GridItem
          height={"85vh"}
          rowSpan={1}
          colSpan={1}
          borderRight={"1px solid #dbd9d9"}
        >
          <Flex
            h={"100%"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <Stack gap={0} h={"100%"}>
              <Heading
                // color={"white"}
                p={".5rem 1rem"}
                borderBottom={"1px solid #dbd9d9"}
              >{`Hi ${user?.username}`}</Heading>
              <HStack
                p={"1rem"}
                bg={main === "Dashboard" ? "#B37F37" : "white"}
                color={main === "Dashboard" ? "white" : "black"}
                _hover={{ bg: "#B37F37", color: "white" }}
                cursor={"pointer"}
                borderBottom={"1px solid #dbd9d9"}
                onClick={() => setMain("Dashboard")}
              >
                <MdDashboardCustomize size={"1.3rem"} />
                <Text fontSize={"1.1rem"}>Dashboard</Text>
              </HStack>
              <HStack
                p={"1rem"}
                bg={main === "My Products" ? "#B37F37" : "white"}
                color={main === "My Products" ? "white" : "black"}
                _hover={{ bg: "#B37F37", color: "white" }}
                cursor={"pointer"}
                borderBottom={"1px solid #dbd9d9"}
                onClick={() => setMain("My Products")}
              >
                <RiShoppingBag4Fill size={"1.3rem"} />
                <Text fontSize={"1.1rem"}>My Products</Text>
              </HStack>
              <HStack
                p={"1rem"}
                bg={main === "Manage" ? "#B37F37" : "white"}
                color={main === "Manage" ? "white" : "black"}
                _hover={{ bg: "#B37F37", color: "white" }}
                cursor={"pointer"}
                borderBottom={"1px solid #dbd9d9"}
                onClick={() => setMain("Manage")}
              >
                <RiMenuAddFill size={"1.3rem"} />
                <Text fontSize={"1.1rem"}>Manage</Text>
              </HStack>
              <HStack
                p={"1rem"}
                bg={main === "Profile" ? "#B37F37" : "white"}
                color={main === "Profile" ? "white" : "black"}
                _hover={{ bg: "#B37F37", color: "white" }}
                cursor={"pointer"}
                borderBottom={"1px solid #dbd9d9"}
                onClick={() => setMain("Profile")}
              >
                <IoMdPerson size={"1.3rem"} />
                <Text fontSize={"1.1rem"}>Profile</Text>
              </HStack>
              <HStack
                p={"1rem"}
                bg={main === "Sales" ? "#B37F37" : "white"}
                color={main === "Sales" ? "white" : "black"}
                _hover={{ bg: "#B37F37", color: "white" }}
                cursor={"pointer"}
                borderBottom={"1px solid #dbd9d9"}
                onClick={() => setMain("Sales")}
              >
                <LuBadgeDollarSign size={"1.3rem"} />
                <Text fontSize={"1.1rem"}>Sales</Text>
              </HStack>
              <HStack
                p={"1rem"}
                bg={main === "Help" ? "#B37F37" : "white"}
                color={main === "Help" ? "white" : "black"}
                _hover={{ bg: "#B37F37", color: "white" }}
                cursor={"pointer"}
                borderBottom={"1px solid #dbd9d9"}
                onClick={() => setMain("Help")}
              >
                <IoMdHelpCircle size={"1.3rem"} />
                <Text fontSize={"1.1rem"}>Help</Text>
              </HStack>
            </Stack>
            <Button
              bg={"white"}
              _hover={{ bg: "#B37F37", color: "white" }}
              color={"black"}
              w={"100%"}
              fontSize={"1rem"}
              p={"1.5rem 0"}
              borderTop={"1px solid #dbd9d9"}
              onClick={() => handleSignOut()}
            >
              <HStack h={"100%"} alignItems={"center"}>
                <CiLogout />
                Sign Out
              </HStack>
            </Button>
          </Flex>
        </GridItem>
        <GridItem gridRow={"1/2"} gridColumn={"1/3"} bg={"#11312E"}>
          <Flex
            h={"100%"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <HStack h={"100%"}>
              <Stack
                h={"100%"}
                mr={"2rem"}
                justifyContent={"center"}
                pt={".5rem"}
                alignItems={"center"}
                gap={"1.5rem"}
              >
                <Image src={`/logo.webp`} alt="" w={"10rem"} />
              </Stack>
              <Stack color={"white"} gap={0}>
                <Heading fontSize={"2rem"}>{main}</Heading>
                {main === "My Products" && (
                  <Text>
                    Your next sale start here, upload your products and lets
                    launch
                  </Text>
                )}
              </Stack>
            </HStack>
            <Button
              bg={"#B37F37"}
              p={{ mdTo2xl: "1.5rem 1.3rem", mdDown: "1.2rem 1rem" }}
              fontSize={{ mdTo2xl: "xl" }}
              mr={"1rem"}
              onClick={() => setUpload(true)}
            >
              Upload Products
            </Button>
          </Flex>
        </GridItem>
        <GridItem overflowY={"auto"} height={"100%"} padding={"1rem .5rem"}>
          {children}
        </GridItem>
      </Grid>
      <Box
        w={"100vw"}
        h={"100vh"}
        pos={"absolute"}
        display={upload ? "flex" : "none"}
        justifyContent={"center"}
        alignItems={"center"}
        top={0}
        left={0}
        zIndex={"100"}
        bg={"rgba(0, 0, 0, .3)"}
        backdropFilter={"blur(5px)"}
      >
        <Stack
          border={"1px solid black"}
          borderRadius={".8rem"}
          w={"40%"}
          p={"2rem 2rem"}
          bg={"white"}
          pos={"relative"}
        >
          <Box
            cursor={"pointer"}
            padding={".4rem"}
            bg={"#e3e3e3"}
            borderRadius={"50%"}
            pos={"absolute"}
            right={"1rem"}
            top={"1rem"}
            onClick={() => setUpload(false)}
          >
            <IoClose />
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset.Root gap={".5rem"} size="sm" maxW="md">
              <Stack>
                <Fieldset.Legend textAlign={"center"} fontSize={"2xl"}>
                  Upload Product
                </Fieldset.Legend>
              </Stack>

              <Fieldset.Content>
                <Field.Root>
                  <Field.Label>Description</Field.Label>
                  <Input
                    {...register("description")}
                    name="description"
                    placeholder="Enter a description"
                    p={"0 .5rem"}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Product Type</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      {...register("type")}
                      name="type"
                      placeholder="Select Product Type"
                      p={"0 .5rem"}
                    >
                      <For
                        each={[
                          "Vegetable",
                          "Fruit",
                          "Grain",
                          "Livestock",
                          "Dairy",
                        ]}
                      >
                        {(item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        )}
                      </For>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Price</Field.Label>
                  <Input
                    {...register("amount", { valueAsNumber: true })}
                    name="amount"
                    type="number"
                    placeholder="Enter a price for your product"
                    p={"0 .5rem"}
                  />
                  {errors.amount && (
                    <Text color={"red"}>{errors.amount.message}</Text>
                  )}
                </Field.Root>

                <Field.Root>
                  <Field.Label>Quantity</Field.Label>
                  <Input
                    {...register("quantity", { valueAsNumber: true })}
                    name="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    p={"0 .5rem"}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Status</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      {...register("status")}
                      name="status"
                      placeholder="Select your product status"
                      p={"0 .5rem"}
                    >
                      <For each={["OnSale", "SoldOut", "Inactive"]}>
                        {(item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        )}
                      </For>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>
                <Field.Root mb={"1rem"}>
                  <Field.Label>Image</Field.Label>
                  <CldUploadWidget
                    uploadPreset="rxzipppi"
                    onSuccess={(result) => {
                      if (result.event !== "success")
                        console.log("upload failed");
                      const Info = result.info as CloudResult;
                      setValue("img", Info.public_id, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  >
                    {({ open }) => (
                      <Button
                        p={"0 1rem"}
                        bg={"blue.700"}
                        onClick={() => open()}
                      >
                        Upload
                      </Button>
                    )}
                  </CldUploadWidget>
                </Field.Root>
              </Fieldset.Content>

              <Button
                type="submit"
                bg={"#09734E"}
                alignSelf="center"
                p={"0 5rem"}
              >
                {isLoading && <Spinner size={"sm"} color="blue.400" />}
                Upload Product
              </Button>
            </Fieldset.Root>
          </form>
          <Stack
            gap={"1.5rem"}
            alignItems={"center"}
            justifyContent={"center"}
            pos={"absolute"}
            top={"25%"}
            left={"15%"}
            borderRadius={"1rem"}
            zIndex={"2000"}
            w={"70%"}
            h={"40%"}
            bg={"rgba(17,49,46, .9)"}
            display={uploadSuccess ? "flex" : "none"}
          >
            <Text color={"white"}>
              Your Product was uploaded succesfully! 🎉
            </Text>
            <Button
              onClick={() => setUploadSuccess(false)}
              p={"1rem"}
              borderRadius={"1rem"}
              bg={"#B37F37"}
            >
              Done
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default FarmerHomePage;
