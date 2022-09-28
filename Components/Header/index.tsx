import {
  Button,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FaRegMoon, FaSun } from "react-icons/fa";
import { useRouter } from "next/router";

import { UruzLogo } from "./UruzLogo";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  return (
    <Flex flexDir="row" mx="9" my="9">
      <UruzLogo />
      <Spacer />
      <HStack>
        <Button variant="brandLink" onClick={() => router.push("/")}>
          Lend
        </Button>
        <Button variant="brandLink" onClick={() => router.push("/portfolio")}>
          Portfolio
        </Button>
        <Button variant="brandLink" onClick={() => router.push("/governance")}>
          Governance
        </Button>
        <Button variant="brandLink" onClick={() => router.push("/stake")}>
          Stake
        </Button>
      </HStack>
      <Spacer />
      <HStack spacing="3">
        <IconButton
          aria-label="Toggle light or dark mode"
          variant="ghost"
          icon={colorMode === "dark" ? <FaSun /> : <FaRegMoon />}
          onClick={toggleColorMode}
        />
        <Button>Connect</Button>
      </HStack>
    </Flex>
  );
};
