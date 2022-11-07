import { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { IoCartSharp } from "react-icons/io5";
import { TabHeading } from "./TabHeading";
import { IMarketDetails } from "@constants/IMarketDetails";
import { IMarket } from "@constants/IMarket";
import { useBalance } from "@hooks/useBalance";
import { useAuth } from "@context/AuthContext";
import { onBorrow, useBorrowedBalance } from "@hooks/useBorrow";
import { ToastLinkButton } from "@components/Shared/ToastLinkButton";
import { onRepay } from "@hooks/useRepay";
import { onApprove, useApprovalStatus } from "@hooks/useApprove";
import { usePortfolio } from "@hooks/swrHooks";

type BorrowModalProps = {
  isOpen: any;
  onClose: any;
  market: IMarket;
  marketDetails: IMarketDetails | undefined;
};

export const BorrowModal = ({
  isOpen,
  onClose,
  marketDetails,
  market,
}: BorrowModalProps) => {
  const [tab, setTab] = useState("borrow");

  const { colorMode } = useColorMode();
  const { tron, address } = useAuth();

  const isTrx = market?.collateralSymbol === "TRX";
  const tokenAddress = isTrx ? undefined : market?.collateralAddress;

  const balance: any = useBalance(
    tron,
    address,
    tokenAddress,
    isTrx,
    marketDetails?.totalCash
  );

  const { borrowedDisplayBalance, borrowedBalance } = useBorrowedBalance(
    tron,
    address,
    market?.utokenAddress,
    isTrx,
    marketDetails?.totalBorrow
  );

  const [isLoading, setIsLoading] = useState(false);
  const [borrowAmount, setBorrowAmount] = useState<number>();
  const toast = useToast();
  const handleBorrow = async () => {
    if (!borrowAmount) return;
    setIsLoading(true);

    const res = await onBorrow(
      tron,
      market?.utokenAddress,
      borrowAmount,
      isTrx
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
    onClose();
  };

  const [repayAmount, setRepayAmount] = useState<number>();
  const handleRepay = async () => {
    if (!repayAmount) return;
    setIsLoading(true);
    console.log(repayAmount);

    const res = await onRepay(tron, market?.utokenAddress, repayAmount, isTrx);

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

  const handleMaxBorrow = () => {
    setBorrowAmount(1);
  };

  const handleMaxRepay = () => {
    setRepayAmount(borrowedBalance);
  };

  const isApproved = useApprovalStatus(
    tron,
    market?.utokenAddress,
    address,
    market?.utokenAddress,
    isTrx
  );

  const handleApprove = async () => {
    setIsLoading(true);
    // @ts-ignore
    const res: any = await onApprove(
      tron,
      market?.utokenAddress,
      market?.utokenAddress
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

  const renderButton = () => {
    if (isApproved) {
      return (
        <Button
          width="100%"
          my="6"
          onClick={tab === "borrow" ? handleBorrow : handleRepay}
          isLoading={isLoading}
        >
          {tab === "borrow" ? "Borrow" : "Repay"} {market?.collateralSymbol}
        </Button>
      );
    } else {
      return (
        <Button
          width="100%"
          my="6"
          onClick={handleApprove}
          isLoading={isLoading}
          disabled={isApproved === undefined}
        >
          Approve u{market?.collateralSymbol}
        </Button>
      );
    }
  };

  const { portfolio } = usePortfolio(address);
  const borrowLimitUsed =
    (portfolio?.totalBorrowBalance / portfolio?.totalBorrowLimit) * 100;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Image src={market?.assetImage} boxSize="30px" alt="asset logo" />
            <VStack alignItems="left" spacing="0" fontWeight="bold">
              <Text fontSize="md">{market?.collateralSymbol}</Text>
              <Text variant="helper">{market?.collateralName}</Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <HStack fontWeight="bold">
            <Text variant="helper">Total borrowed</Text>
            <Spacer />
            <Text>${portfolio?.totalBorrowBalance?.toFixed(2)}</Text>
          </HStack>

          <HStack fontWeight="bold">
            <Text variant="helper">Borrow limit used</Text>
            <Spacer />
            <Text>{borrowLimitUsed?.toFixed(2)}%</Text>
          </HStack>

          <HStack>
            <Text variant="helper">Borrow APY</Text>
            <Spacer />

            <Badge colorScheme="red">{marketDetails?.borrowApy}%</Badge>
          </HStack>

          <HStack fontWeight="bold">
            <Text variant="helper">Total lending available</Text>
            <Spacer />

            <Text>{marketDetails?.totalCash}</Text>
            <Text>{market?.collateralSymbol}</Text>
          </HStack>

          <Box
            shadow="xl"
            bgColor={colorMode === "dark" ? "gray.900" : "none"}
            borderRadius="lg"
          >
            <HStack mt="9" mb="6" width="100%">
              <TabHeading
                onClick={() => setTab("borrow")}
                tab={tab}
                title="Borrow"
                tabId="borrow"
              />

              <TabHeading
                onClick={() => setTab("repay")}
                tab={tab}
                title="Repay"
                tabId="repay"
              />
            </HStack>

            <Flex mx="6" flexDir="column">
              <FormControl>
                <FormLabel fontWeight="semibold" fontSize="sm" mx="0">
                  <HStack spacing="1">
                    <Text variant="helper">Borrowed balance</Text>
                    <Spacer />

                    <Text display="inline" fontWeight="bold">
                      {borrowedDisplayBalance}
                    </Text>
                    <Text>{market?.collateralSymbol} </Text>
                  </HStack>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Image
                      src={market?.assetImage}
                      boxSize="20px"
                      alt="asset logo"
                    />
                  </InputLeftElement>
                  <Input
                    value={tab === "borrow" ? borrowAmount : repayAmount || ""}
                    onChange={(e) => {
                      tab === "borrow"
                        ? setBorrowAmount(parseFloat(e.target.value))
                        : setRepayAmount(parseFloat(e.target.value));
                    }}
                    min={0}
                    type="number"
                    fontSize="sm"
                    variant="filled"
                    _focus={{
                      boxShadow: "none",
                    }}
                    placeholder={
                      tab === "borrow"
                        ? "Enter borrow amount"
                        : "Enter repay amount"
                    }
                  />
                  <InputRightElement>
                    <Text
                      as="button"
                      pr="3"
                      fontSize="sm"
                      textDecor="underline"
                      onClick={
                        tab === "borrow" ? handleMaxBorrow : handleMaxRepay
                      }
                    >
                      Max
                    </Text>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText fontSize="xs">
                  Borrow and repay as you go. Borrowing can be done as long as
                  the collateral value * collateral factor {">"} loan value +
                  accumulated interest.
                </FormHelperText>
              </FormControl>

              {renderButton()}
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
