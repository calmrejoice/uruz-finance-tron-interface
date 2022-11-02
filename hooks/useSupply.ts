import { config } from "@constants/config";
import { convertToUnderlyingBalance } from "@utils/formatBalance";
import { tronOptions } from "@utils/tronWeb";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";

export const useSupplied = (
  tronWeb: any,
  utokenAddress: string,
  ownerAddress: string,
  isTrx: boolean = false,
  refreshParam?: any
) => {
  if (!tronWeb) return;

  const [supplied, setSupplied] = useState(0);

  useEffect(() => {
    if (!tronWeb || !utokenAddress || !ownerAddress) return;

    const getSupplied = async () => {
      const contract = await tronWeb?.contract().at(utokenAddress);
      const accountSnapshot = await contract
        .getAccountSnapshot(ownerAddress)
        .call();
      const exchangeRateBN = accountSnapshot[3];
      const utokenSupplied = accountSnapshot[1];

      const underlyingDecimals = isTrx
        ? config.trxDecimals
        : config.trc20TokenDecimals;

      const suppliedDisplay = convertToUnderlyingBalance(
        exchangeRateBN,
        underlyingDecimals,
        utokenSupplied
      );

      setSupplied(suppliedDisplay);
    };

    getSupplied();
  }, [tronWeb, utokenAddress, ownerAddress, refreshParam]);

  return supplied;
};

export const onSupply = async (
  tronWeb: any,
  utokenAddress: string,
  supplyAmount: number,
  isTrx: boolean
) => {
  try {
    const contract = await tronWeb?.contract().at(utokenAddress);
    console.log(supplyAmount);

    if (!isTrx) {
      const supplyAmountBN = BigInt(
        supplyAmount * 10 ** config.trc20TokenDecimals
      );
      const result = await contract.mint(supplyAmountBN).send();
      return result;
    } else {
      const supplyAmountBN = BigInt(supplyAmount * 10 ** config.trxDecimals);
      const result = await contract.mint().send({
        feeLimit: 100_000_000,
        callValue: supplyAmountBN,
        shouldPollResponse: false,
      });
      return result;
    }
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};
