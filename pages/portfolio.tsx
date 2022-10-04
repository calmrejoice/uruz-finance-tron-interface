import type { NextPage } from "next";
import { Flex, Text } from "@chakra-ui/react";
import { MyAccountCard } from "@components/PortfolioPage/MyAccountCard";

const PortfolioPage: NextPage = () => {
  return (
    <Flex flexDir="column" alignItems="center">
      <MyAccountCard />
    </Flex>
  );
};

export default PortfolioPage;
