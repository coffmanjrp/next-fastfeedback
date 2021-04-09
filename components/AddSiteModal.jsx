import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
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
  useDisclosure,
} from '@chakra-ui/react';
import { createSite } from '@/lib/db';

const AddSiteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const { register, handleSubmit } = useForm();
  const onCreateSite = (data) => createSite(data);

  return (
    <>
      <Button
        variant="solid"
        size="md"
        maxW="200px"
        fontWeight="medium"
        onClick={onOpen}
      >
        Add your First Site
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="My site"
                {...register('site')}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input placeholder="https://website.com" {...register('url')} />
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
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
