import { config } from "@constants/config";
import { formatBalance, formatDisplayBalance } from "@utils/formatBalance";
import { useEffect, useState } from "react";
import comptroller from "@deployments/Comptroller.json";

export const onBorrow = async (tronWeb: any) => {};

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
      const borrowLimitRaw = await contract
        .getAccountLiquidity(accountAddress)
        .call();

      console.log(borrowLimitRaw);

      setBorrowLimit(formatBalance(borrowLimitRaw, config.utokenDecimals));
      setBorrowDisplayLimit(
        formatDisplayBalance(borrowLimitRaw, config.utokenDecimals)
      );
    };
    getBorrowLimit();
  }, [tronWeb, accountAddress]);

  return { borrowLimit, borrowDisplayLimit };
};
