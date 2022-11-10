import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  HStack,
  Text,
  Spacer,
  Flex,
  Input,
  VStack,
} from "@chakra-ui/react";
import { ToastLinkButton } from "@components/Shared/ToastLinkButton";
import { config } from "@constants/config";
import { useAuth } from "@context/AuthContext";
import { useBalance } from "@hooks/useBalance";
import { onCastVote } from "@hooks/useGovernance";
import { useState } from "react";

export const ProposalVoteModal = ({
  proposalId,
  isOpen,
  onClose,
  voteFor,
}: any) => {
  const { tron, address } = useAuth();

  const [voteAmount, setVoteAmount] = useState(0);

  const { balanceNum: wurzBalanceNum } =
    useBalance(tron, address, config.wurzAddress, false) || 0;

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleCastVote = async () => {
    setIsLoading(true);

    const res = await onCastVote(tron, proposalId, voteAmount, voteFor);

    if (res.success === false) {
      toast({
        title: "Transaction failed.",
        description: `Error: ${res.error}`,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Transaction successful",
        description: ToastLinkButton(res),
        status: "success",
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Vote {voteFor ? "For" : "Against"} UFP-{proposalId}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column">
            <HStack>
              <Text variant="helper">My votes remaining</Text>
              <Spacer />
              <Text fontSize="sm" fontWeight="bold">
                {wurzBalanceNum}
              </Text>
            </HStack>
            <VStack my="6" alignItems="flex-start">
              <Text variant="helper">Number of votes</Text>
              <Input
                min={0}
                placeholder="0"
                onChange={(e) => setVoteAmount(parseInt(e.target.value))}
                fontSize="sm"
                type="number"
              />
            </VStack>
            <Button
              colorScheme="blue"
              isLoading={isLoading}
              mr={3}
              onClick={async () => {
                await handleCastVote();
                onClose();
              }}
            >
              Vote
            </Button>
          </Flex>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
