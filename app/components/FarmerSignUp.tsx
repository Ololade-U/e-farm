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
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email : z.email(),
  password : z.string().min(7, {message : 'Password must be at least 8 characters long'}),
  store : z.string().min(3, {message : 'Enter a valid store name'}),
  country : z.string().min(5)
})

type FormData = z.infer<typeof schema>

const FarmerSignUp = () => {
  const { register, handleSubmit, formState : {errors} } = useForm<FormData>({resolver : zodResolver(schema)});
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
            <form action="" onSubmit={handleSubmit(data => console.log(data))}>
              <Fieldset.Root size="lg" maxW="md">
                <Stack>
                  <Fieldset.Legend textAlign={"center"} fontSize={"2xl"}>
                    Create Account
                  </Fieldset.Legend>
                </Stack>

                <Fieldset.Content>
                  <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input {...register('email')} name="email" type="email" placeholder="Enter your email" p={'0 .5rem'}/>
                    {errors.email && <p className="text-red-600 m-0">{errors.email.message}</p>}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Password</Field.Label>
                    <Input {...register('password')} name="password" type="password" placeholder="Enter your password" p={'0 .5rem'}/>
                    {errors.password && <p className="text-red-600 m-0">{errors.password?.message}</p>}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Name your store</Field.Label>
                    <Input {...register('store')} name="store" placeholder="Enter your store name" p={'0 .5rem'}/>
                    {errors.store && <p className="text-red-600 m-0">{errors.store?.message}</p>}
                  </Field.Root>

                  <Field.Root mb={'2rem'}>
                    <Field.Label>Country</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field name="country" placeholder="Select Your Country" p={'0 .5rem'}>
                        <For
                          each={["Nigeria", "Ghana", "Cameroon", "Togo"]}
                        >
                          {(item) => (
                            <option {...register('country')} key={item} value={item}>
                              {item}
                            </option>
                          )}
                        </For>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                </Fieldset.Content>

                <Button type="submit" alignSelf="center" p={'0 1rem'}>
                  Submit
                </Button>
              </Fieldset.Root>
            </form>
          </Stack>
        </Box>
      </HStack>
    </>
  );
};

export default FarmerSignUp;
