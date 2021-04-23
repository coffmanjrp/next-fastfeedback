import React, { useState } from 'react';
import NextLink from 'next/link';
import {
  Link,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/auth';
import { LogoIcon } from '@/utils/customIcons';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { signinWithEmail } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onLogin = (data) => {
    setLoading(true);
    signinWithEmail(data.email, data.password).catch((error) => {
      setLoading(false);
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
  };

  return (
    <Flex align="center" justify="center" h="100vh" backgroundColor="gray.100">
      <Stack
        as="form"
        backgroundColor="white"
        borderRadius={[0, 8]}
        maxWidth="400px"
        px={8}
        py={12}
        shadow={[null, 'md']}
        spacing={4}
        w="100%"
        onSubmit={handleSubmit((data) => onLogin(data))}
      >
        <Flex justify="center">
          <NextLink href="/" passHref aria-label="Back to homepage">
            <Link>
              <LogoIcon color="black" fontSize="64px" mb={4} />
            </Link>
          </NextLink>
        </Flex>
        <FormControl isInvalid={errors.email && errors.email.message}>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            id="email"
            aria-label="Email Address"
            autoFocus={true}
            placeholder="name@site.com"
            name="email"
            {...register('pass')}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password && errors.password.message}>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="password"
            id="password"
            aria-label="Password"
            name="password"
            {...register('password')}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          id="login"
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          mt={4}
          h="50px"
          fontSize="lg"
          _hover={{ bg: 'gray.700' }}
          _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
          isLoading={loading}
        >
          Login
        </Button>
      </Stack>
    </Flex>
  );
};

export default Login;
