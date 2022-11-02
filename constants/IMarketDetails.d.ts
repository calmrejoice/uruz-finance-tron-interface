export interface IMarketDetails {
  utokenAddress: string;
  collateralSymbol: string;
  collateralAddress: string;
  collateralName: string;
  assetImage: string;
  totalBorrow: number;
  totalSupply: number;
  totalReserves: number;
  reserveFactor: number;
  totalCash: number;
  apy: number;
  borrowApy: number;
}
