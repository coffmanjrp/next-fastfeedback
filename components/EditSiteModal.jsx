import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  useDisclosure,
  Switch,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { updateSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const EditSiteModal = ({ children, settings, siteId }) => {
  const initialRef = useRef();
  const toast = useToast();
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();

  const onUpdateSite = async (fields) => {
    await updateSite(siteId, { settings: fields });

    toast({
      title: 'Success!',
      description: "We've updated your site.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    mutate(['/api/sites', user.token]);
    onClose();
  };

  return (
    <>
      <Button
        leftIcon={<SettingsIcon />}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
        onClick={onOpen}
      >
        {children}
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onUpdateSite)}>
          <ModalHeader fontWeight="bold">Edit Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl display="flex" align="center">
              <Switch
                id="show-timestamp"
                ref={initialRef}
                {...register('timestamp')}
                colorScheme="green"
                defaultChecked={settings?.timestamp}
              />
              <FormLabel htmlFor="show-timestamp" ml={2}>
                Show Timestamp
              </FormLabel>
            </FormControl>
            <FormControl display="flex" align="center">
              <Switch
                id="show-icon"
                ref={initialRef}
                {...register('icons')}
                colorScheme="green"
                defaultChecked={settings?.icons}
              />
              <FormLabel htmlFor="show-icon" ml={2}>
                Show Icon
              </FormLabel>
            </FormControl>
            <FormControl display="flex" align="center">
              <Switch
                id="show-ratings"
                ref={initialRef}
                {...register('ratings')}
                colorScheme="green"
                defaultChecked={settings?.ratings}
              />
              <FormLabel htmlFor="show-ratings" ml={2}>
                Show Ratings
              </FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} fontWeight="medium" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              backgroundColor="#99fffe"
              color="#194f4c"
              fontWeight="medium"
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditSiteModal;
