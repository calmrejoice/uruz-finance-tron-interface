import type { NextPage } from "next";
import { Flex, Heading, Text, useColorMode } from "@chakra-ui/react";

import { Card } from "Components/Shared/Card";
import { LendStats } from "Components/LendPage/LendStats";
import { LendingPools } from "Components/LendPage/LendingPools";

const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex mx="32" flexDir="column">
      <LendStats />

      <Heading alignSelf="center" fontSize="lg" mt="9">
        Available lending pools
      </Heading>

      <LendingPools />
    </Flex>
  );
};

export default Home;
