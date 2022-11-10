import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
  Button,
  useToast,
  Input,
  VStack,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { ToastLinkButton } from "@components/Shared/ToastLinkButton";
import { config } from "@constants/config";
import { useAuth } from "@context/AuthContext";
import { onCreateProposal } from "@hooks/useGovernance";
import { BRAND_COLOR } from "@styles/styleConstants";
import { useState } from "react";

export const CreateProposalModal = ({ isOpen, onClose }: any) => {
  const { tron } = useAuth();

  const [action, setAction] = useState("");
  const [reserveFactor, setReserveFactor] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleCreateProposal = async () => {
    setIsLoading(true);

    const res = await onCreateProposal(tron, reserveFactor);

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
        <ModalHeader>Create Proposal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems="flex-start" mb="9" spacing="3">
            <Text variant="helper">Title</Text>
            <Input placeholder="Title of your proposal" fontSize="sm" />
            <Text variant="helper">Description</Text>
            <Textarea
              focusBorderColor={BRAND_COLOR}
              placeholder="Why should people vote on your proposal?"
              fontSize="sm"
            />
            <Text variant="helper">Actions</Text>
            <Select
              placeholder="Select option"
              focusBorderColor={BRAND_COLOR}
              fontSize="sm"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            >
              <option value="1">Add new market</option>
              <option value="2">Set reserve factor</option>
              <option value="3">Set collateral factor</option>
            </Select>

            {action === "2" ? (
              <>
                <Text variant="helper">Choose lending market</Text>
                <Select
                  placeholder="Select market"
                  focusBorderColor={BRAND_COLOR}
                  fontSize="sm"
                >
                  {config.markets.map((market) => {
                    return (
                      <option value={market?.collateralSymbol}>
                        {market?.collateralSymbol}
                      </option>
                    );
                  })}
                </Select>
                <Text variant="helper">Reserve factor in %</Text>
                <Input
                  placeholder="0%"
                  onChange={(e) => setReserveFactor(parseInt(e.target.value))}
                />
              </>
            ) : null}
          </VStack>

          <Button isLoading={isLoading} onClick={handleCreateProposal} w="100%">
            Create Proposal
          </Button>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
