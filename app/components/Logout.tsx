"use client";
import { Button } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import React from 'react';

const SignOutButton = () => {
  const handleSignOut = () => {
    signOut({ 
      callbackUrl: '/', // <-- Specify your custom redirect path here
      redirect: true // Ensure redirection is enabled (it is by default)
    });
  };

  return (
    <Button 
      onClick={handleSignOut} 
      bg={"#B37F37"}
      color={"white"}
      p={".7rem 1rem"}
      fontSize={"1rem"}
      borderRadius={".5rem"}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;