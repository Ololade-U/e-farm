"use client";

import {
  Fieldset,
  Stack,
  Field,
  Input,
  NativeSelect,
  For,
  Button,
  Box,
  HStack,
  Text,
  Heading,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import useStoreQuery from "./store";

const Role = z.enum(["BUYER", "FARMER"]);
const Country = z.enum(["Nigeria", "Ghana", "Cameroon", "Togo"]);

const schema = z.object({
  email: z.email(),
  username: z.string().min(3),
  password: z
    .string()
    .min(7, { message: "Password must be at least 8 characters long" }),
  storeName: z.string().min(3, { message: "Enter a valid store name" }),
  country: Country,
  role: Role,
});

type FormData = z.infer<typeof schema>;

const FarmerSignUp = () => {
  const [success, setSuccess] = useState(false);
  const setUser = useStoreQuery((s) => s.setUser);
  const setUserName = useStoreQuery((s) => s.setUserName);
  const userExist = useStoreQuery((s) => s.userExist);
  const userNameExist = useStoreQuery((s) => s.userNameExist);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "FARMER",
    },
  });
  const onSubmit = async (data: FieldValues) => {
    setUser(false);
    setUserName(false);
    try {
      const response = await fetch("../api/users", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSuccess(true);
        reset();
      } else {
        // 🛑 THIS IS WHERE YOU ACCESS THE SERVER ERROR MESSAGE 🛑
        const errorData = await response.json();

        // Check if errorData and errorData.error exist
        if (errorData && errorData.error) {
          // Now you have the specific string, e.g., "User already exists"
          const serverErrorMessage = errorData.error;

          // 1. Update client state based on the message
          if (serverErrorMessage === "User already exists") {
            // Assuming you have a way to set client state, e.g., via your store
            setUser(true);
            setUserName(false);
            // This is where you would call the store setter function (e.g., setExistEmail(true))
          } else if (serverErrorMessage === "Username already exists") {
            setUserName(true);
            setUser(false);
            // This is where you would call the store setter function (e.g., setExistUsername(true))
          }

          // 2. Throw an error to stop execution and go to the catch block (optional,
          // but good practice to maintain the existing structure)
          throw new Error(serverErrorMessage);
        } else {
          // Handle unexpected non-JSON or missing error body
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
    } catch (err) {
      console.error("Fetch operation error:", err);
    }
  };
  return (
    <>
      <HStack h={"100vh"} gap={0} overflowX={"hidden"}>
        <Box
          h={"100%"}
          textAlign={"left"}
          w={"50%"}
          bg={"#09734E"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Heading
            mb={"1rem"}
            fontSize={"6xl"}
            lineHeight={"1"}
            maxWidth={"10ch"}
            color={"#FFFFFF"}
          >
            Create your Local Line account and start selling.
          </Heading>
          <Text pl={"1rem"} color={"#FFFFFF"}>
            No credit card required &#x2022; affordable monthly plan
          </Text>
        </Box>
        <Box
          bg={"#f2f2f2"}
          h={"100%"}
          w={"50%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          overflowX={"auto"}
        >
          <Stack
            border={"1px solid black"}
            borderRadius={".8rem"}
            w={"70%"}
            p={"2rem 2rem"}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Fieldset.Root gap={".5rem"} size="sm" maxW="md">
                <Stack>
                  <Fieldset.Legend textAlign={"center"} fontSize={"2xl"}>
                    Create Account
                  </Fieldset.Legend>
                </Stack>

                <Fieldset.Content>
                  <Field.Root>
                    <Input {...register("role")} name="role" type="hidden" />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input
                      {...register("email")}
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      p={"0 .5rem"}
                    />
                    {errors.email && (
                      <p className="text-red-600 m-0">{errors.email.message}</p>
                    )}
                    {userExist && (
                      <p className="text-red-600 m-0">User already exists</p>
                    )}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>UserName</Field.Label>
                    <Input
                      {...register("username")}
                      name="username"
                      placeholder="Enter your Username"
                      p={"0 .5rem"}
                    />
                    {errors.username && (
                      <p className="text-red-600 m-0">
                        {errors.username.message}
                      </p>
                    )}
                    {userNameExist && (
                      <p className="text-red-600 m-0">
                        Username already exists
                      </p>
                    )}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Password</Field.Label>
                    <Input
                      {...register("password")}
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      p={"0 .5rem"}
                    />
                    {errors.password && (
                      <p className="text-red-600 m-0">
                        {errors.password?.message}
                      </p>
                    )}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Name your store</Field.Label>
                    <Input
                      {...register("storeName")}
                      name="storeName"
                      placeholder="Enter your store name"
                      p={"0 .5rem"}
                    />
                    {errors.storeName && (
                      <p className="text-red-600 m-0">
                        {errors.storeName?.message}
                      </p>
                    )}
                  </Field.Root>

                  <Field.Root mb={"2rem"}>
                    <Field.Label>Country</Field.Label>
                    <NativeSelect.Root {...register("country")}>
                      <NativeSelect.Field
                        name="country"
                        placeholder="Select Your Country"
                        p={"0 .5rem"}
                      >
                        <For each={["Nigeria", "Ghana", "Cameroon", "Togo"]}>
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
                </Fieldset.Content>

                <Button
                  type="submit"
                  bg={"#09734E"}
                  alignSelf="center"
                  p={"0 5rem"}
                >
                  Sign Up
                </Button>
              </Fieldset.Root>
            </form>
          </Stack>
        </Box>
      </HStack>
      <Box
        display={success ? "flex" : "none"}
        w={"40vw"}
        h={"50vh"}
        pos={"absolute"}
        top={"25%"}
        left={"35%"}
        zIndex={"1000"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={"2rem"}
        justifyContent={"center"}
        borderRadius={"1rem"}
        bg="linear-gradient(to right, rgba(17, 49, 46, 1), rgba(17, 49, 46, .8))"
      >
        <Text color={"white"}>Account created succesfully!</Text>
        <Link href={"../login"}>
          <Button p={"0 2rem"} bg={"#09734E"}>
            Login
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default FarmerSignUp;
