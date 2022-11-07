import { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
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
  VStack,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { IoCartSharp } from "react-icons/io5";

import { TabHeading } from "./TabHeading";
import { useAuth } from "@context/AuthContext";
import { IMarketDetails } from "@constants/IMarketDetails";
import { IMarket } from "@constants/IMarket";
import { useBalance, useUTokenBalance } from "@hooks/useBalance";
import { onSupply, useSupplied } from "@hooks/useSupply";
import { ToastLinkButton } from "@components/Shared/ToastLinkButton";
import { onWithdraw } from "@hooks/useWithdraw";
import { onApprove, useApprovalStatus } from "@hooks/useApprove";

type SupplyModalProps = {
  isOpen: any;
  onClose: any;
  marketDetails: IMarketDetails | undefined;
  market: IMarket;
};

export const SupplyModal = ({
  isOpen,
  onClose,
  marketDetails,
  market,
}: SupplyModalProps) => {
  const { tron, address } = useAuth();
  const [tab, setTab] = useState("supply");
  const { colorMode } = useColorMode();
  const isTrx = market?.collateralSymbol === "TRX";
  const tokenAddress = isTrx ? undefined : market?.collateralAddress;
  const balance: any =
    useBalance(tron, address, tokenAddress, isTrx, marketDetails?.totalCash) ||
    0;

  const utokenBalance: any =
    useUTokenBalance(
      tron,
      address,
      market?.utokenAddress,
      marketDetails?.totalCash
    ) || 0;

  const supplied =
    useSupplied(
      tron,
      market?.utokenAddress,
      address,
      isTrx,
      marketDetails?.totalCash
    ) || 0;

  const [isLoading, setIsLoading] = useState(false);
  const [supplyAmount, setSupplyAmount] = useState<number>();
  const toast = useToast();
  const handleSupply = async () => {
    if (!supplyAmount) return;
    setIsLoading(true);

    const res = await onSupply(
      tron,
      market?.utokenAddress,
      supplyAmount,
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

  const [withdrawAmount, setWithdrawAmount] = useState<number>();
  const handleWithdraw = async () => {
    if (!withdrawAmount) return;
    setIsLoading(true);

    const res = await onWithdraw(
      tron,
      market?.utokenAddress,
      withdrawAmount,
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

  const handleMaxSupply = () => {
    setSupplyAmount(balance?.balanceNum);
  };

  const handleMaxWithdraw = () => {
    setWithdrawAmount(utokenBalance?.balanceNum);
  };

  const renderBalance = () => {
    let tokenBal = 0;

    if (tab === "supply") {
      tokenBal = balance?.displayBalance;
    } else {
      // Withdraw tab
      tokenBal = utokenBalance?.displayBalance;
    }

    return (
      <Text display="inline" fontWeight="bold">
        {tokenBal}
      </Text>
    );
  };

  const isApproved = useApprovalStatus(
    tron,
    market?.collateralAddress,
    address,
    market?.utokenAddress,
    isTrx
  );
  console.log(isApproved);

  const handleApprove = async () => {
    setIsLoading(true);
    // @ts-ignore
    const res: any = await onApprove(
      tron,
      market?.collateralAddress,
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
          onClick={tab === "supply" ? handleSupply : handleWithdraw}
          isLoading={isLoading}
          // isDisabled={!supplyAmount}
        >
          {tab === "supply" ? "Supply" : "Withdraw"} {market?.collateralSymbol}
        </Button>
      );
    } else {
      return (
        <Button
          width="100%"
          my="6"
          onClick={handleApprove}
          isLoading={isLoading}
        >
          Approve {market?.collateralSymbol}
        </Button>
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Image src={market?.assetImage} boxSize="30px" alt="asset logo" />
            <VStack alignItems="left" spacing="0" fontWeight="bold">
              <Text fontSize="md">{market?.collateralName}</Text>
              <Text variant="helper">{market?.collateralName}</Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <HStack fontWeight="bold">
            <Text variant="helper">Supplied</Text>
            <Spacer />

            <Text>{supplied}</Text>
            <Text>{market?.collateralSymbol}</Text>
          </HStack>

          <HStack my="1">
            <Text variant="helper">Supply APY</Text>
            <Spacer />

            <Badge colorScheme="green">{marketDetails?.apy}%</Badge>
          </HStack>

          <HStack fontWeight="bold">
            <Text variant="helper">Total withdrawal available</Text>
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
                onClick={() => setTab("supply")}
                tab={tab}
                title="Supply"
                tabId="supply"
              />

              <TabHeading
                onClick={() => setTab("withdraw")}
                tab={tab}
                title="Withdraw"
                tabId="withdraw"
              />
            </HStack>

            <Flex mx="6" flexDir="column">
              <FormControl>
                <FormLabel fontWeight="semibold" fontSize="sm" mx="0">
                  <HStack spacing="1">
                    <Text variant="helper">Wallet balance</Text>
                    <Spacer />
                    <IconButton
                      variant="ghost"
                      aria-label="Buy token"
                      icon={<IoCartSharp />}
                      size="sm"
                    />
                    {renderBalance()}

                    <Text>
                      {tab === "supply"
                        ? market?.collateralSymbol
                        : `u${market?.collateralSymbol}`}
                    </Text>
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
                    min="0"
                    type="number"
                    fontSize="sm"
                    variant="filled"
                    _focus={{
                      boxShadow: "none",
                    }}
                    placeholder={
                      tab === "supply"
                        ? "Enter supply amount"
                        : "Enter withdraw amount"
                    }
                    value={tab === "supply" ? supplyAmount : withdrawAmount}
                    onChange={(e) =>
                      tab === "supply"
                        ? setSupplyAmount(parseFloat(e.target.value))
                        : setWithdrawAmount(parseFloat(e.target.value))
                    }
                  />
                  <InputRightElement>
                    <Text
                      as="button"
                      pr="3"
                      fontSize="sm"
                      textDecor="underline"
                      onClick={
                        tab === "supply" ? handleMaxSupply : handleMaxWithdraw
                      }
                    >
                      Max
                    </Text>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText fontSize="xs">
                  The floating interest rate is automatically calculated based
                  on market supply and demand.
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
