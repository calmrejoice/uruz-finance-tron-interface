import {
  HStack,
  Image,
  Td,
  Text,
  Tr,
  VStack,
  useDisclosure,
  Badge,
  Button,
  useColorMode,
  Skeleton,
} from "@chakra-ui/react";
import { IMarket } from "@constants/IMarket";
import { useAuth } from "@context/AuthContext";

import { useMarketDetails } from "@hooks/swrHooks";
import { useRouter } from "next/router";
import { BorrowModal } from "./BorrowModal";
import { CheckNetworkModal } from "./CheckNetworkModal";
import { SupplyModal } from "./SupplyModal";

type AssetTableRowProps = {
  market: IMarket;
};

export const AssetTableRow = ({ market }: AssetTableRowProps) => {
  const { network, tron } = useAuth();

  const isNile = network === "https://api.nileex.io";

  const { marketDetails, isLoadingMarketDetails, mutate } = useMarketDetails(
    market.collateralSymbol
  );

  const {
    isOpen: isOpenSupply,
    onClose: onCloseSupply,
    onOpen: onOpenSupply,
  } = useDisclosure();

  const {
    isOpen: isOpenBorrow,
    onClose: onCloseBorrow,
    onOpen: onOpenBorrow,
  } = useDisclosure();

  const {
    isOpen: isOpenCheckNetwork,
    onClose: onCloseCheckNetwork,
    onOpen: onOpenCheckNetwork,
  } = useDisclosure();

  const router = useRouter();

  const { colorMode } = useColorMode();

  const onClickMarketDetails = () => {
    router.push({
      pathname: "marketDetails",
      query: { tokenSymbol: market.collateralSymbol },
    });
  };

  return (
    <Tr
      _hover={{
        bgColor: colorMode === "light" ? "gray.50" : "gray.800",
        cursor: "pointer",
      }}
    >
      <CheckNetworkModal
        isOpen={isOpenCheckNetwork}
        onClose={onCloseCheckNetwork}
      />
      <SupplyModal
        isOpen={isOpenSupply}
        onClose={onCloseSupply}
        marketDetails={marketDetails}
        market={market}
      />
      <BorrowModal
        isOpen={isOpenBorrow}
        onClose={onCloseBorrow}
        marketDetails={marketDetails}
        market={market}
      />
      <Td onClick={onClickMarketDetails}>
        <HStack>
          <Image src={market.assetImage} boxSize="30px" alt="asset logo" />
          <VStack spacing="0" alignItems="left">
            <Text fontSize="sm" fontWeight="bold">
              {market.collateralSymbol}
            </Text>
            <Text variant="helper">{market.collateralName}</Text>
          </VStack>
        </HStack>
      </Td>
      <Td onClick={onClickMarketDetails} fontWeight="bold" isNumeric>
        {isLoadingMarketDetails ? (
          <Skeleton>placeholder</Skeleton>
        ) : (
          "$" + marketDetails?.totalSupplyInUsd
        )}
      </Td>
      <Td onClick={onClickMarketDetails} fontWeight="bold" isNumeric>
        {isLoadingMarketDetails ? (
          <Skeleton>placeholder</Skeleton>
        ) : (
          <Badge colorScheme="green" fontSize="md">
            {marketDetails?.apy}%
          </Badge>
        )}
      </Td>
      <Td onClick={onClickMarketDetails} fontWeight="bold" isNumeric>
        {isLoadingMarketDetails ? (
          <Skeleton>placeholder</Skeleton>
        ) : (
          "$" + marketDetails?.totalBorrowedInUsd
        )}
      </Td>
      <Td onClick={onClickMarketDetails} fontWeight="bold" isNumeric>
        {isLoadingMarketDetails ? (
          <Skeleton>placeholder</Skeleton>
        ) : (
          <Badge colorScheme="red" fontSize="md">
            {marketDetails?.borrowApy}%
          </Badge>
        )}
      </Td>
      <Td onClick={onClickMarketDetails} fontWeight="bold" isNumeric>
        {isLoadingMarketDetails ? (
          <Skeleton>placeholder</Skeleton>
        ) : (
          marketDetails?.totalCash + " " + market?.collateralSymbol
        )}
      </Td>
      <Td onClick={onClickMarketDetails} fontWeight="bold" isNumeric>
        {isLoadingMarketDetails ? (
          <Skeleton>placeholder</Skeleton>
        ) : (
          "$" + marketDetails?.priceUsd
        )}
      </Td>
      <Td>
        <VStack>
          <Button
            width="100%"
            variant="outline"
            fontSize="sm"
            colorScheme="green"
            onClick={() => {
              isNile ? onOpenSupply() : onOpenCheckNetwork();
            }}
          >
            Supply
          </Button>
          <Button
            width="100%"
            variant="outline"
            fontSize="sm"
            colorScheme="red"
            onClick={() => {
              isNile ? onOpenBorrow() : onOpenCheckNetwork();
            }}
          >
            Borrow
          </Button>
        </VStack>
      </Td>
    </Tr>
  );
};
