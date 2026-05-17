"use client";

import { Box, VStack, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function MobileBlocker({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // Check on mount and on resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Return null while hydrating to avoid mismatch
  if (isMobile === null) {
    return <>{children}</>;
  }

  if (isMobile) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.50"
        px={6}
      >
        <VStack gap={6} textAlign="center">
          <Heading as="h1" size="2xl" color="gray.800">
            📱 Mobile View in Progress
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="400px">
            We're currently optimizing our website for mobile devices. Please
            view this site on a larger device for the best experience.
          </Text>
          <Text fontSize="sm" color="gray.500" mt={4}>
            Thank you for your patience! 🙏
          </Text>
        </VStack>
      </Box>
    );
  }

  return <>{children}</>;
}
