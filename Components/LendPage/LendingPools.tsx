import { Card } from "@components/Shared/Card";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Image,
  VStack,
  Text,
  Button,
  Badge,
} from "@chakra-ui/react";

import { mockLendingPools } from "constants/mockLendingPools";

export const LendingPools = () => {
  return (
    <Card>
      <TableContainer width="100%">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Asset</Th>
              <Th>Total Supply</Th>
              <Th>APY</Th>
              <Th>Total Borrow</Th>
              <Th>Borrow APY</Th>
              <Th>Available Lending</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mockLendingPools.map((pool, index) => {
              return (
                <Tr key="index">
                  <Td>
                    <HStack>
                      <Image src={pool.assetImage} boxSize="30px" />
                      <VStack spacing="0" alignItems="left">
                        <Text fontSize="sm" fontWeight="bold">
                          {pool.symbol}
                        </Text>
                        <Text variant="helper">{pool.assetName}</Text>
                      </VStack>
                    </HStack>
                  </Td>

                  <Td fontWeight="bold">{pool.totalSupply}</Td>
                  <Td fontWeight="bold">
                    <Badge colorScheme="green" fontSize="md">
                      {pool.apy}
                    </Badge>
                  </Td>
                  <Td fontWeight="bold">{pool.totalBorrow}</Td>
                  <Td fontWeight="bold">
                    <Badge colorScheme="red" fontSize="md">
                      {pool.borrowApy}
                    </Badge>
                  </Td>
                  <Td fontWeight="bold">{pool.availableLending}</Td>

                  <Td>
                    <VStack>
                      <Button
                        width="100%"
                        variant="outline"
                        fontSize="sm"
                        colorScheme="green"
                      >
                        Supply
                      </Button>
                      <Button
                        width="100%"
                        variant="outline"
                        fontSize="sm"
                        colorScheme="red"
                      >
                        Borrow
                      </Button>
                    </VStack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};
