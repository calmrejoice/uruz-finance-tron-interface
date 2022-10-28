import { BigNumber } from "ethers";

export function numberWithCommas(x: string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function truncateHash(hash: string, length = 38): string {
  return hash.replace(hash.substring(6, length), "...");
}

export function formatBalance(bigNumber: BigNumber, decimals: number) {
  // @ts-ignore
  const balance = bigNumber / (1 * 10 ** decimals);
  return balance;
}
