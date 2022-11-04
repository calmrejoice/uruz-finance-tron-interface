import { config } from "@constants/config";
import { BigNumber } from "ethers";

export function numberWithCommas(x: string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function truncateHash(hash: string, length = 38): string {
  return hash.replace(hash.substring(6, length), "...");
}

export function formatBalance(bigNumber: BigNumber | number, decimals: number) {
  // @ts-ignore
  const balance = bigNumber / (1 * 10 ** decimals);
  return balance;
}

export function formatDisplayBalance(
  bigNumber: BigNumber | number,
  decimals: number
) {
  const balance = formatBalance(bigNumber, decimals);

  let displayBalance;

  if (balance === 0 || balance % 1 == 0) {
    displayBalance = balance.toString();
  } else if (balance >= 1000) {
    displayBalance = numberWithCommas(balance.toFixed(2).toString());
  } else {
    displayBalance = balance.toFixed(6).toString();
  }

  return displayBalance;
}

export function convertToUnderlyingBalance(
  exchangeRate: BigNumber,
  underlyingDecimals: number,
  utokensBN: BigNumber
) {
  const mantissa = 18 + underlyingDecimals - config.utokenDecimals;

  // @ts-ignore
  const oneUTokenInUnderlying = exchangeRate / Math.pow(10, mantissa);
  const amountOfUTokens = formatBalance(utokensBN, config.utokenDecimals);
  const underlyingBalance = amountOfUTokens * oneUTokenInUnderlying;

  // const displayUnderlyingBalance = formatDisplayBalance(underlyingBalance, 0);

  return underlyingBalance;
}

// export function convertToUTokenBalance(exchangeRate: BigNumber) {
//   return utokenBalance;
// }
