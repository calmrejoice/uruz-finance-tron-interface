import type { NextPage } from "next";
import {
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  Input,
  useColorMode,
} from "@chakra-ui/react";

const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return <Flex m="auto" flexDir="column"></Flex>;
};

export default Home;
