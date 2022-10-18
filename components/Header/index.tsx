import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaRegMoon, FaSun, FaWallet } from "react-icons/fa";
import { useRouter } from "next/router";

import { UruzLogo } from "./UruzLogo";
import { PageLink } from "./PageLink";
import { ConnectWalletModal } from "./ConnectWalletModal";
import { useAuth } from "@context/AuthContext";
import { truncateHash } from "@utils/formatBalance";
import { addBook } from "@hooks/testBlockchain";
import { ToastLinkButton } from "@components/Shared/ToastLinkButton";
import { useHello } from "@hooks/swrHooks";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { ready, address, tron } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const { hello } = useHello(true);

  console.log(hello);

  const toast = useToast();
  const onAddBook = async () => {
    setIsLoading(true);

    // @ts-ignore
    const res: string = await addBook("Hello1", "Test2", 100, tron);
    if (res == "Confirmation declined by user") {
      toast({
        title: "Transaction failed",
        description: "Confirmation declined by user",
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
    <Flex flexDir="row" mx="9" my="9">
      <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
      <UruzLogo />
      <Spacer />
      <HStack>
        <PageLink routeName="/" pageName="Lend" />
        <PageLink routeName="/portfolio" pageName="Portfolio" />
        <PageLink routeName="/governance" pageName="Governance" />
        <PageLink routeName="/stake" pageName="Stake" />
      </HStack>
      <Button onClick={onAddBook} isLoading={isLoading}>
        Add book
      </Button>
      <Spacer />
      <HStack spacing="3">
        <IconButton
          aria-label="Toggle light or dark mode"
          variant="ghost"
          icon={colorMode === "dark" ? <FaSun /> : <FaRegMoon />}
          onClick={toggleColorMode}
        />
        {ready ? (
          <Button rightIcon={<FaWallet />}>{truncateHash(address)}</Button>
        ) : (
          <Button onClick={onOpen} rightIcon={<FaWallet />}>
            Connect
          </Button>
        )}
      </HStack>
    </Flex>
  );
};
