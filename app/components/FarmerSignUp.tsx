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
import { NextResponse } from "next/server";
import { useState } from "react";


const Role = z.enum(["BUYER", "FARMER"]);
const Country = z.enum(["Nigeria", "Ghana", "Cameroon", "Togo"])

const schema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(7, { message: "Password must be at least 8 characters long" }),
  storeName: z.string().min(3, { message: "Enter a valid store name" }),
  country: Country,
  role: Role,
});

type FormData = z.infer<typeof schema>;



const FarmerSignUp = () => {
  const [success, setSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "FARMER",
    },
  });
  const onSubmit = async (data: FieldValues) => {
    const response = await fetch("../api/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if(response.ok){
      setSuccess(true)
    }
  };
  return (
    <>
      <HStack h={"100vh"} gap={0}>
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
        >
          <Stack
            border={"1px solid black"}
            borderRadius={".8rem"}
            w={"70%"}
            p={"3rem 2rem"}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Fieldset.Root size="lg" maxW="md">
                <Stack>
                  <Fieldset.Legend textAlign={"center"} fontSize={"2xl"}>
                    Create Account
                  </Fieldset.Legend>
                </Stack>

                <Fieldset.Content>
                  <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input {...register("role")} name="role" type="hidden" />
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

                <Button type="submit" alignSelf="center" p={"0 1rem"}>
                  Submit
                </Button>
              </Fieldset.Root>
            </form>
          </Stack>
        </Box>
      </HStack>
      <Box display={success ? 'block' : 'none'} bg={'#e3e3e3'} p={'4rem 5rem'} pos={'absolute'} top={'30%'} left={'35%'} zIndex={'1000'}>
        <Text>Account created succesfully</Text>
      </Box>
    </>
  );
};

export default FarmerSignUp;
