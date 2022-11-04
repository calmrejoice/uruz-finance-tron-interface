import { createContext, useContext, useEffect, useState } from "react";

interface MarketStatsContextValue {
  totalSupply: number;
  totalBorrow: number;
  totalLiquidity: number;
  totalTreasury: number;
  addSupplyArray: any;
}

const MarketStatsContext = createContext<MarketStatsContextValue>({
  totalSupply: 0,
  totalBorrow: 0,
  totalLiquidity: 0,
  totalTreasury: 0,
  addSupplyArray: () => {},
});

export const MarketStatsProvider = ({ children }: any) => {
  const [totalSupply, setTotalSupply] = useState(0);
  const [totalBorrow, setTotalBorrow] = useState(0);
  const [totalLiquidity, setTotalLiquidity] = useState(0);
  const [totalTreasury, setTotalTreasury] = useState(0);
  const [supplyArray, setSupplyArray] = useState<number[]>([]);

  const addSupplyArray = (supplyToAdd: number) => {
    setSupplyArray((prev) => {
      return [...prev, supplyToAdd];
    });
  };

  console.log(supplyArray);

  return (
    <MarketStatsContext.Provider
      value={{
        totalSupply,
        totalBorrow,
        totalLiquidity,
        totalTreasury,
        addSupplyArray,
      }}
    >
      {children}
    </MarketStatsContext.Provider>
  );
};

export const useMarketStats = () => useContext(MarketStatsContext);
