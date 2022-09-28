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
import { UruzLogo } from "./UruzLogo";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex flexDir="row" mx="9" my="9">
      <UruzLogo />
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
