import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import { Flex, Text } from "@chakra-ui/react";

export const CheckNetworkModal = ({ isOpen, onClose }: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Switch to Nile Testnet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text variant="helper">
            TronLink is not connected to the correct network. Please switch to
            Nile Testnet in TronLink.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Ok</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
