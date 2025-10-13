import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const ROI = () => {
  return (
    <Box w={'100%'} height={'60vh'} display={'flex'} justifyContent={'center'} gap={'4rem'}>
        <HStack gap={'3rem'} justifyContent={'flex-end'}>
            <Stack gap={'3.5rem'} justify={'flex-end'} align={'flex-start'} borderLeft={'.2rem solid #145841'} p={'5rem 0 1rem .5rem'}>
                <Heading fontSize={'8xl'} color={'#11312E'}>23%</Heading>
                <Text color={'#11312E'} pl={'.5rem'}>Annual Sales Growth</Text>
            </Stack>
            <Stack gap={'3.5rem'} justify={'flex-end'} align={'flex-start'} borderLeft={'.2rem solid #145841'} p={'5rem 0 1rem .5rem'}>
                <Heading fontSize={'8xl'} color={'#11312E'}>12 hrs</Heading>
                <Text color={'#11312E'} pl={'.5rem'}>Weekly Time Savings</Text>
            </Stack>
        </HStack>
        <HStack gap={'4.5rem'} justifyContent={'flex-start'}>
            <Stack gap={'3.5rem'} justify={'flex-end'} align={'flex-start'} borderLeft={'.2rem solid #145841'} p={'5rem 0 1rem .5rem'}>
                <Heading fontSize={'8xl'} color={'#11312E'}>10x</Heading>
                <Text color={'#11312E'} pl={'.5rem'}>ROI Per Year</Text>
            </Stack>
            <Stack gap={'3.5rem'} justify={'flex-end'} align={'flex-start'} borderLeft={'.2rem solid #145841'} p={'5rem 0 1rem .5rem'}>
                <Heading fontSize={'8xl'} color={'#11312E'}>14+</Heading>
                <Text color={'#11312E'} pl={'.5rem'}>Countries</Text>
            </Stack>
        </HStack>
    </Box>
  )
}

export default ROI