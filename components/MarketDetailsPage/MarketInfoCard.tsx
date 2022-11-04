import {
  Button,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Card } from "@components/Shared/Card";
import { useRouter } from "next/router";
import { MarketInfoItem } from "./MarketInfoItem";
import { SupplyModal } from "@components/LendPage/SupplyModal";
import { BorrowModal } from "@components/LendPage/BorrowModal";
import { useMarketDetails, useMarkets } from "@hooks/swrHooks";
import { formatDisplayBalance } from "@utils/formatBalance";

export const MarketInfoCard = () => {
  const router = useRouter();

  const { query } = router;
  const { tokenSymbol }: any = query;

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

  const { markets, isEmptyMarkets, isLoadingMarkets } = useMarkets();
  const market = markets?.filter(
    (market) => market.collateralSymbol === tokenSymbol
  )[0];

  const { marketDetails, isLoadingMarketDetails, mutate } =
    useMarketDetails(tokenSymbol);

  console.log(isLoadingMarketDetails);
  console.log(marketDetails);

  // const { tokenPrice } = useTokensPrice(tokenSymbol);

  // const totalSuppliedInUnderlying =
  //   marketDetails?.totalSupply / marketDetails?.oneToExchangeRate;
  // const totalSupplyInUsd = totalSuppliedInUnderlying * parseFloat(tokenPrice);

  // const totalBorrowedInUsd =
  //   marketDetails?.totalBorrow * parseFloat(tokenPrice);

  return (
    <Card flexDir="column" flex={1}>
      <SupplyModal
        isOpen={isOpenSupply}
        onClose={onCloseSupply}
        market={market}
        marketDetails={marketDetails}
      />
      <BorrowModal
        isOpen={isOpenBorrow}
        onClose={onCloseBorrow}
        market={market}
        marketDetails={marketDetails}
      />
      <HStack spacing="6">
        <HStack>
          <Image src={market?.assetImage} boxSize="30" alt="asset logo" />
          <Flex flexDir="column">
            <Text fontWeight="bold">{market?.collateralSymbol}</Text>
            <Text variant="helper">{market?.collateralName}</Text>
          </Flex>
        </HStack>
      </HStack>

      <SimpleGrid columns={2} my="6">
        <MarketInfoItem
          title="Total Supply"
          details={`$${marketDetails?.totalSupplyInUsd}`}
          isLoading={isLoadingMarketDetails}
        />
        <MarketInfoItem
          title="Total Borrow"
          details={`$${marketDetails?.totalBorrowedInUsd}`}
          isLoading={isLoadingMarketDetails}
        />
        <MarketInfoItem
          title="Price"
          details={`$${marketDetails?.priceUsd}`}
          isLoading={isLoadingMarketDetails}
        />
        {/* <MarketInfoItem title="Borrow cap" details={pool?.borrowCap} /> */}
        {/* <MarketInfoItem title="Suppliers" details={pool?.supplierCount} />
        <MarketInfoItem title="Borrowers" details={pool?.borrowerCount} /> */}
        <MarketInfoItem
          title="Available lending"
          details={`${marketDetails?.totalCash} TRX`}
          isLoading={isLoadingMarketDetails}
        />
        <MarketInfoItem
          title="Total interest / Day"
          details={`$${marketDetails?.earnUsdPerDay}`}
          isLoading={isLoadingMarketDetails}
        />
        <MarketInfoItem
          title="Reserve amount"
          details={`${marketDetails?.totalReserves} ${tokenSymbol}`}
          isLoading={isLoadingMarketDetails}
        />
        <MarketInfoItem
          title="Reserve factor"
          details={`${marketDetails?.reserveFactor * 100}%`}
          isLoading={isLoadingMarketDetails}
        />
        <MarketInfoItem
          title={`u${tokenSymbol} minted`}
          details={formatDisplayBalance(marketDetails?.totalSupply, 0)}
          isLoading={isLoadingMarketDetails}
        />
        <MarketInfoItem
          title="Collateral factor"
          details={`${marketDetails?.collateralFactor * 100}%`}
          isLoading={isLoadingMarketDetails}
        />
        <MarketInfoItem
          title={`u${tokenSymbol} exchange rate`}
          details={`1 ${tokenSymbol} : ${marketDetails?.oneToExchangeRate} u${tokenSymbol}`}
          isLoading={isLoadingMarketDetails}
        />
      </SimpleGrid>

      <HStack spacing="6">
        <Button
          width="100%"
          colorScheme="green"
          variant="outline"
          onClick={onOpenSupply}
          fontSize="sm"
        >
          Supply {marketDetails?.apy}%
        </Button>
        <Button
          width="100%"
          colorScheme="red"
          variant="outline"
          onClick={onOpenBorrow}
          fontSize="sm"
        >
          Borrow {marketDetails?.borrowApy}%
        </Button>
      </HStack>
    </Card>
  );
};
