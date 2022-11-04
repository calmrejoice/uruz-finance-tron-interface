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
    const decimals = isTrx ? config.trxDecimals : config.trc20TokenDecimals;
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
      const decimals = isTrx ? config.trxDecimals : config.trc20TokenDecimals;
      setBorrowedBalance(formatBalance(borrowedBalanceRaw, decimals));

      setborrowedDisplayBalance(
        formatDisplayBalance(borrowedBalanceRaw, decimals)
      );
    };
    getBorrowedBalance().catch((e) => {});
  }, [tronWeb, accountAddress, refreshParams]);

  return { borrowedBalance, borrowedDisplayBalance };
};

export const useBorrowLimit = (tronWeb: any, accountAddress: string) => {
  const [borrowLimit, setBorrowLimit] = useState(0);
  const [borrowDisplayLimit, setBorrowDisplayLimit] = useState("0");

  useEffect(() => {
    if (!tronWeb || !accountAddress) return;
    const getBorrowLimit = async () => {
      const contract = await tronWeb?.contract(
        comptroller.abi,
        config.unitrollerAddress
      );
      const data = await contract.getAccountLiquidity(accountAddress).call();

      const borrowLimitRaw = data[1];
      console.log(borrowLimitRaw.toString(), "");

      setBorrowLimit(formatBalance(borrowLimitRaw, config.trc20TokenDecimals));
      setBorrowDisplayLimit(
        formatDisplayBalance(borrowLimitRaw, config.trc20TokenDecimals)
      );
    };
    getBorrowLimit().catch((e) => {});
  }, [tronWeb, accountAddress]);

  return { borrowLimit, borrowDisplayLimit };
};
