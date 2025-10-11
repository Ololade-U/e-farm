import { VStack, Spinner, Text } from '@chakra-ui/react'
import React from 'react'

const loading = () => {
  return (
    <VStack h={'100vh'} justifyContent={'center'} alignItems={'center'} colorPalette="teal">
      <Spinner size={'lg'} color="colorPalette.600" />
      <Text color="colorPalette.600">Loading...</Text>
    </VStack>
  )
}

export default loading