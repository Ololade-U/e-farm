"use client";
import {
  HStack,
  Box,
  Heading,
  Stack,
  Text,
  Fieldset,
  Field,
  Input,
  NativeSelect,
  For,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import useStoreQuery from "./store";

const Country = z.enum(["Nigeria", "Ghana", "Cameroon", "Togo"]);
const Role = z.enum(["BUYER", "FARMER"]);

const schema = z.object({
  name: z.string().min(3, { message: "Enter your name" }),
  email: z.email(),
  password: z
    .string()
    .min(7, { message: "Password must be at least 8 characters long" }),
  phoneNumber: z.string().min(10, { message: "Enter a valid phone number" }),
  country: Country,
  role: Role,
  username: z.string().min(2),
});

type FormData = z.infer<typeof schema>;

const ConsumerSignUp = () => {
  const [success, setSuccess] = useState(false);
  const setUser = useStoreQuery((s) => s.setUser);
  const setUserName = useStoreQuery((s) => s.setUserName);
  const userExist = useStoreQuery((s) => s.userExist);
  const userNameExist = useStoreQuery((s) => s.userNameExist);
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "BUYER",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    setUser(false);
    setUserName(false);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSuccess(true);
        reset();
      } else {
        const errorData = await response.json();

        if (errorData && errorData.error) {
          const serverErrorMessage = errorData.error;

          if (serverErrorMessage === "User already exists") {
            setUser(true);
            setUserName(false);
          } else if (serverErrorMessage === "Username already exists") {
            setUserName(true);
            setUser(false);
          }

          throw new Error(serverErrorMessage);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  return (
    <>
      <HStack
        h={{ base: "auto", md: "100vh" }}
        flexDirection={{ base: "column", md: "row" }}
        gap={0}
        overflowY={{ base: "visible", md: "hidden" }}
      >
        <Box
          h={{ base: "auto", md: "100%" }}
          w={{ base: "100%", md: "50%" }}
          p={{ base: "2.5rem 1.5rem", md: 0 }}
          textAlign={"left"}
          bg={"#09734E"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Heading
            mb={"1rem"}
            fontSize={{ base: "2xl", md: "6xl" }}
            lineHeight={"1"}
            maxWidth={{ base: "22ch", md: "10ch" }}
            textAlign={{ base: "center", md: "left" }}
            color={"#FFFFFF"}
          >
            Direct from the Farm: Join the Local Food Revolution.
          </Heading>
          <Text pl={{ base: 0, md: "1rem" }} textAlign={{ base: "center", md: "left" }} color={"#FFFFFF"}>
            Transparent Sourcing &#x2022; Wider Selection &#x2022; Fair Prices,
            Fair Pay
          </Text>
        </Box>
        <Box
          bg={"#f2f2f2"}
          h={{ base: "auto", md: "100%" }}
          w={{ base: "100%", md: "50%" }}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          overflowY={"auto"}
          p={{ base: "2rem 1rem", md: 0 }}
          pt={{ base: "2rem", md: "2rem" }}
        >
          <Stack
            border={"1px solid black"}
            borderRadius={".8rem"}
            w={{ base: "100%", md: "70%" }}
            maxW={{ base: "26rem", md: "none" }}
            p={{ base: "1rem 1.25rem", md: "1rem 2rem" }}
            mt={{ base: 0, md: "2rem" }}
          >
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <Fieldset.Root size="lg" maxW="md">
                <Stack mb={".5rem"}>
                  <Fieldset.Legend textAlign={"center"} fontSize={"2xl"}>
                    Create Account
                  </Fieldset.Legend>
                </Stack>

                <Fieldset.Content>
                  <Field.Root>
                    <Input {...register("role")} name="role" type="hidden" />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Full Name</Field.Label>
                    <Input
                      {...register("name")}
                      name="name"
                      placeholder="Enter your name"
                      p={"0 .5rem"}
                      mb={0}
                    />
                    {errors.name && (
                      <p className="text-red-600 m-0">{errors.name.message}</p>
                    )}
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
                    <Field.Label>Phone Number</Field.Label>
                    <Input
                      {...register("phoneNumber")}
                      name="phoneNumber"
                      placeholder="Enter your phone numebr"
                      p={"0 .5rem"}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-600 m-0">
                        {errors.phoneNumber.message}
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
                  {isLoading && <Spinner size={"sm"} color="blue.400" />}
                  Sign Up
                </Button>
              </Fieldset.Root>
            </form>
          </Stack>
        </Box>
      </HStack>
      <Box
        display={success ? "flex" : "none"}
        w={{ base: "85%", md: "40vw" }}
        h={{ base: "auto", md: "50vh" }}
        p={{ base: "2.5rem 1.5rem", md: 0 }}
        pos={"fixed"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        zIndex={"9999"}
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

export default ConsumerSignUp;
