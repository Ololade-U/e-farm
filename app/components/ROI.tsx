import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const stats = [
  { value: '23%', label: 'Annual Sales Growth' },
  { value: '12 hrs', label: 'Weekly Time Savings' },
  { value: '10x', label: 'ROI Per Year' },
  { value: '14+', label: 'States' },
]

const ROI = () => {
  return (
    <SimpleGrid
      columns={{ base: 2, md: 4 }}
      gap={{ base: '1.5rem', md: '3rem' }}
      w={'100%'}
      p={{ base: '2.5rem 1.5rem', md: '3rem 4rem' }}
    >
      {stats.map((stat) => (
        <Stack
          key={stat.label}
          gap={{ base: '.5rem', md: '1rem' }}
          align={'flex-start'}
          borderLeft={'.2rem solid #145841'}
          p={{ base: '.5rem 0 .5rem .5rem', md: '1rem 0 1rem .5rem' }}
        >
          <Heading fontSize={{ base: '2xl', sm: '3xl', md: '5xl', lg: '7xl' }} color={'#11312E'}>
            {stat.value}
          </Heading>
          <Text fontSize={{ base: '.8rem', md: '1rem' }} color={'#11312E'}>
            {stat.label}
          </Text>
        </Stack>
      ))}
    </SimpleGrid>
  )
}

export default ROI