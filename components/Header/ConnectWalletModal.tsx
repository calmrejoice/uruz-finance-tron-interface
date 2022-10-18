import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useAuth } from "@context/AuthContext";

import { FaWallet } from "react-icons/fa";

export const ConnectWalletModal = ({ isOpen, onClose }: any) => {
  const { onConnectWallet, address, installed, name, network, ready, tron } =
    useAuth();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader flexDir="row" justifyContent="center">
          <HStack>
            <Heading fontSize="lg">Connect Wallet</Heading>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="6" mt="6">
            <Image src="/tokens/urz.png" boxSize="60px" />

            <Text variant="helper">Connect TronLink wallet to use Uruz</Text>

            {installed ? (
              <Button
                width="100%"
                rightIcon={<FaWallet />}
                onClick={() => {
                  onConnectWallet();
                  onClose();
                }}
              >
                Connect TronLink
              </Button>
            ) : (
              <Button
                as="a"
                href="https://www.tronlink.org/"
                target="_blank"
                width="100%"
              >
                Install TronLink wallet
              </Button>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
