import React, { useState, useRef } from 'react';
import { mutate } from 'swr';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useAuth } from '@/lib/auth';
import { deleteFeedback, deleteSite } from '@/lib/db';

const DeleteSiteButton = ({ siteId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();
  const auth = useAuth();

  const onClose = () => setIsOpen(false);

  const onDelete = () => {
    deleteSite(siteId);
    mutate(
      ['/api/site', auth.user.token],
      async (data) => {
        return {
          sites: data?.sites.filter((site) => site.id !== siteId),
        };
      },
      false
    );

    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Delete site"
        icon={<DeleteIcon />}
        variant="ghost"
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Site
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will also delete all feedback left on the site.
              You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                fontWeight="bold"
                onClick={onDelete}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteSiteButton;
