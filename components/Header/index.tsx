import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { FaRegMoon, FaSun, FaWallet } from "react-icons/fa";
import { useRouter } from "next/router";

import { UruzLogo } from "./UruzLogo";
import { PageLink } from "./PageLink";
import { ConnectWalletModal } from "./ConnectWalletModal";
import { useAuth } from "@context/AuthContext";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { ready, address } = useAuth();

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
      <Spacer />
      <HStack spacing="3">
        <IconButton
          aria-label="Toggle light or dark mode"
          variant="ghost"
          icon={colorMode === "dark" ? <FaSun /> : <FaRegMoon />}
          onClick={toggleColorMode}
        />
        {ready ? (
          <Button onClick={onOpen} rightIcon={<FaWallet />}>
            {address}
          </Button>
        ) : (
          <Button onClick={onOpen} rightIcon={<FaWallet />}>
            Connect
          </Button>
        )}
      </HStack>
    </Flex>
  );
};
