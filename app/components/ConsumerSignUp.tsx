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
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  fullName: z.string().min(3, { message: "Enter your name" }),
  email: z.email(),
  password: z
    .string()
    .min(7, { message: "Password must be at least 8 characters long" }),
  phoneNumber: z.string().min(10, { message: "Enter a valid phone number" }),
  country: z.string().min(5),
});

type FormData = z.infer<typeof schema>;

const ConsumerSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
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
            Direct from the Farm: Join the Local Food Revolution.
          </Heading>
          <Text pl={"1rem"} color={"#FFFFFF"}>
            Transparent Sourcing &#x2022; Wider Selection &#x2022; Fair Prices,
            Fair Pay
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
            p={"1rem 2rem"}
          >
            <form
              action=""
              onSubmit={handleSubmit((data) => console.log(data))}
            >
              <Fieldset.Root size="lg" maxW="md">
                <Stack mb={'.5rem'}>
                  <Fieldset.Legend textAlign={"center"} fontSize={"2xl"}>
                    Create Account
                  </Fieldset.Legend>
                </Stack>

                <Fieldset.Content>
                  <Field.Root>
                    <Field.Label>Full Name</Field.Label>
                    <Input
                      {...register("fullName")}
                      name="fullName"
                      placeholder="Enter your name"
                      p={"0 .5rem"}
                      mb={0}
                    />
                    {errors.email && (
                      <p className="text-red-600 m-0">{errors.email.message}</p>
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
                    <Field.Label>Phone Number</Field.Label>
                    <Input
                      {...register("phoneNumber")}
                      name="phoneNumber"
                      placeholder="Enter your phone numebr"
                      p={"0 .5rem"}
                    />
                    {errors.email && (
                      <p className="text-red-600 m-0">{errors.email.message}</p>
                    )}
                  </Field.Root>

                  <Field.Root mb={"2rem"}>
                    <Field.Label>Country</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        name="country"
                        placeholder="Select Your Country"
                        p={"0 .5rem"}
                      >
                        <For each={["Nigeria", "Ghana", "Cameroon", "Togo"]}>
                          {(item) => (
                            <option
                              {...register("country")}
                              key={item}
                              value={item}
                            >
                              {item}
                            </option>
                          )}
                        </For>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                </Fieldset.Content>

                <Button type="submit" bg={'#09734E'} alignSelf="center" p={"0 5rem"}>
                  Sign Up
                </Button>
              </Fieldset.Root>
            </form>
          </Stack>
        </Box>
      </HStack>
    </>
  );
};

export default ConsumerSignUp;
