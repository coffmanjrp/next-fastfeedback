import React from 'react';
import {
  Flex,
  Link,
  Stack,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button,
} from '@chakra-ui/react';
import { LogoIcon } from '@/utils/customIcons';
import { useAuth } from '@/lib/auth';
import AddSiteModal from './AddSiteModal';

const DashboardShell = ({ children }) => {
  const { user } = useAuth();

  return (
    <Flex flexDirection="column">
      <Flex
        backgroundColor="white"
        justifyContent="space-between"
        alignItems="center"
        py={4}
        px={8}
      >
        <Stack spacing={4} isInline alignItems="center">
          <LogoIcon color="black" fontSize="24px" />
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>
        <Flex alignItems="center">
          {user && (
            <Button variant="ghost" mr={2} onClick={() => auth.signout()}>
              Log out
            </Button>
          )}
          <Avatar size="sm" src={user && user.photoUrl} />
        </Flex>
      </Flex>
      <Flex backgroundColor="gray.100" p={8} h="100vh">
        <Flex maxWidth="980px" direction="column" width="100%" m="0 auto">
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.700" fontSize="sm">
                Sites
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex justify="space-between">
            <Heading as="h1" mb={8}>
              My Sites
            </Heading>
            <AddSiteModal>+ Add Site</AddSiteModal>
          </Flex>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
