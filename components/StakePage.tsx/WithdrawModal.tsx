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
  HStack,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Spacer,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ToastLinkButton } from "@components/Shared/ToastLinkButton";
import { config } from "@constants/config";
import { useAuth } from "@context/AuthContext";
import { onApprove, useApprovalStatus } from "@hooks/useApprove";
import { useBalance } from "@hooks/useBalance";
import { onWithdrawGovToken } from "@hooks/useWithdraw";
import { useState } from "react";

export const WithdrawModal = ({ isOpen, onClose, refreshParams }: any) => {
  const { tron, address } = useAuth();

  const { balanceNum, displayBalance } = useBalance(
    tron,
    address,
    config.wurzAddress,
    false,
    refreshParams
  );

  const [isLoading, setIsLoading] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<any>(0);
  const toast = useToast();

  const handleWithdraw = async () => {
    if (!withdrawAmount) return;
    setIsLoading(true);
    const res = await onWithdrawGovToken(tron, withdrawAmount);

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
    onClose();
  };

  const isApproved = useApprovalStatus(
    tron,
    config.wurzAddress,
    address,
    config.wurzAddress
  );

  const handleApprove = async () => {
    setIsLoading(true);
    // @ts-ignore
    const res: any = await onApprove(
      tron,
      config.wurzAddress,
      config.wurzAddress
    );
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

  const handleMax = () => {
    setWithdrawAmount(balanceNum);
  };

  const renderButton = () => {
    if (isApproved) {
      return (
        <Button onClick={handleWithdraw} isLoading={isLoading}>
          Withdraw
        </Button>
      );
    } else {
      return (
        <Button onClick={handleApprove} isLoading={isLoading}>
          Approve WURZ
        </Button>
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Image src="/tokens/urz.png" boxSize="30" alt="urz logo" />
            <Text>Withdraw URZ</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" my="6">
            <InputGroup>
              <InputLeftElement>
                <Image src="/tokens/urz.png" boxSize="20px" alt="urz logo" />
              </InputLeftElement>
              <Input
                placeholder="0.00"
                type="number"
                variant="filled"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
                onClick={() => withdrawAmount === 0 && setWithdrawAmount("")}
              />
              <InputRightElement>
                <Text
                  as="button"
                  pr="3"
                  fontSize="sm"
                  textDecor="underline"
                  onClick={handleMax}
                >
                  Max
                </Text>
              </InputRightElement>
            </InputGroup>
            <HStack my="6">
              <Image src="/tokens/urz.png" boxSize="20px" alt="urz logo" />
              <Text variant="helper">Available URZ</Text>
              <Spacer />
              <Text fontWeight="bold">{displayBalance} URZ</Text>
            </HStack>

            {renderButton()}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
