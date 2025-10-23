"use client";

import {
  Box,
  Stack,
  Fieldset,
  Field,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.email(),
  password: z.string(),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleSignIn = async (data: FormData) => {
    setLoading(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      alert("Incorrect login info");
      setLoading(false);
      return;
    }

    const sessionResponse = await fetch("/api/auth/session");
    const session = await sessionResponse.json();
    const userRole = session?.user?.role;
    if (userRole === "FARMER") {
      router.push("../home/farmer");
    } else if (userRole === "BUYER") {
      router.push("../home/consumer");
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <Box
      bg={"#f2f2f2"}
      h={"100vh"}
      w={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      overflowX={"auto"}
    >
      <Stack
        bg={"white"}
        border={"1px solid black"}
        borderRadius={".8rem"}
        w={"40%"}
        p={"2rem 2rem"}
      >
        <form onSubmit={handleSubmit(handleSignIn)}>
          <Fieldset.Root gap={".5rem"} size="sm" maxW="md">
            <Stack>
              <Fieldset.Legend
                mb={"2rem"}
                textAlign={"center"}
                fontSize={"2xl"}
              >
                Login
              </Fieldset.Legend>
            </Stack>

            <Fieldset.Content>
              <Field.Root mb={"1rem"}>
                <Field.Label>Email</Field.Label>
                <Input
                  {...register("email")}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  p={"0 .5rem"}
                />
              </Field.Root>

              <Field.Root mb={"2rem"}>
                <Field.Label>Password</Field.Label>
                <Input
                  {...register("password")}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  p={"0 .5rem"}
                />
              </Field.Root>
            </Fieldset.Content>

            <Button
              type="submit"
              bg={"#09734E"}
              alignSelf="center"
              p={"0 5rem"}
            >
              {isLoading && <Spinner size={"sm"} color="blue.400" />}
              Sign In
            </Button>
          </Fieldset.Root>
        </form>
      </Stack>
    </Box>
  );
};
export default Login;
