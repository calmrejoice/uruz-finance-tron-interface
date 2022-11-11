import { config } from "@constants/config";
import { formatBalance, formatDisplayBalance } from "@utils/formatBalance";
import { useEffect, useState } from "react";
import comptroller from "@deployments/Comptroller.json";

export const onBorrow = async (
  tronWeb: any,
  utokenAddress: string,
  borrowAmount: number,
  isTrx: boolean
) => {
  try {
    const contract = await tronWeb?.contract().at(utokenAddress);
    const decimals =
      isTrx || utokenAddress === config.uusdtAddress
        ? config.trxDecimals
        : config.trc20TokenDecimals;
    const borrowAmountBN = BigInt(borrowAmount * 10 ** decimals);
    const result = await contract.borrow(borrowAmountBN).send();
    return result;
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const useBorrowedBalance = (
  tronWeb: any,
  accountAddress: string,
  utokenAddress: string,
  isTrx: boolean,
  refreshParams?: any
) => {
  const [borrowedBalance, setBorrowedBalance] = useState(0);
  const [borrowedDisplayBalance, setborrowedDisplayBalance] = useState("0");

  useEffect(() => {
    if (!tronWeb || !accountAddress) return;
    const getBorrowedBalance = async () => {
      const contract = await tronWeb?.contract().at(utokenAddress);
      const borrowedBalanceRaw = await contract
        .borrowBalanceStored(accountAddress)
        .call();
      const decimals =
        isTrx || utokenAddress === config.uusdtAddress
          ? config.trxDecimals
          : config.trc20TokenDecimals;

      const borrowedBalance = formatBalance(borrowedBalanceRaw, decimals) || 0;
      setBorrowedBalance(borrowedBalance);

      const borrowedDisplayBalance =
        formatDisplayBalance(borrowedBalanceRaw, decimals) || "0";
      setborrowedDisplayBalance(borrowedDisplayBalance);
    };
    getBorrowedBalance().catch((e) => {});
  }, [tronWeb, accountAddress, refreshParams]);

  return { borrowedBalance, borrowedDisplayBalance };
};
