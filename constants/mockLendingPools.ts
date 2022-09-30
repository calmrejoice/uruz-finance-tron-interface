export interface IPool {
  assetName: string;
  symbol: string;
  assetImage: string;
  totalSupply: string;
  apy: string;
  totalBorrow: string;
  borrowApy: string;
  availableLending: string;
}

export const mockLendingPools: IPool[] = [
  {
    assetName: "TRON",
    symbol: "TRX",
    assetImage: "/tokens/trx.png",
    totalSupply: "$29.53M",
    apy: "5.38%",
    totalBorrow: "$8.17M",
    borrowApy: "11.68%",
    availableLending: "356.39M TRX",
  },
  {
    assetName: "Decentralized USD",
    symbol: "USDD",
    assetImage: "/tokens/usdd.png",
    totalSupply: "$224.52M",
    apy: "9.59%",
    totalBorrow: "$23.53M",
    borrowApy: "6.03%",
    availableLending: "176.31M USDD",
  },
  {
    assetName: "Tether USD",
    symbol: "USDT",
    assetImage: "/tokens/usdt.png",
    totalSupply: "$161.55M",
    apy: "2.64%",
    totalBorrow: "$68.44M",
    borrowApy: "2.64%",
    availableLending: "93.71M USDT",
  },
];
