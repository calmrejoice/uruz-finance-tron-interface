import { config } from "@constants/config";
import { useEffect, useState } from "react";
import { formatBalance, formatDisplayBalance } from "@utils/formatBalance";

export const useBalance = (
  tronWeb: any,
  accountAddress: string,
  tokenAddress: string | undefined,
  isTrx: boolean,
  refreshParam?: any
) => {
  const [balanceNum, setBalanceNum] = useState(0);
  const [displayBalance, setDisplayBalance] = useState("0");

  useEffect(() => {
    if (!tronWeb || !accountAddress) return;

    const getBalance = async () => {
      if (isTrx) {
        const account = await tronWeb?.trx.getAccount(accountAddress);
        const availableNum = formatBalance(account.balance, config.trxDecimals);
        const availableDisplay = formatDisplayBalance(
          account.balance,
          config.trxDecimals
        );

        setBalanceNum(availableNum);
        setDisplayBalance(availableDisplay);
      } else {
        const contract = await tronWeb?.contract().at(tokenAddress);
        const rawBalance = await contract.balanceOf(accountAddress).call();

        const balanceNum = formatBalance(rawBalance, config.trc20TokenDecimals);
        const displayBalance = formatDisplayBalance(
          rawBalance,
          config.trc20TokenDecimals
        );

        setBalanceNum(balanceNum);
        setDisplayBalance(displayBalance);
      }
    };

    getBalance().catch((e) => {});
  }, [tronWeb, tokenAddress, accountAddress, refreshParam]);

  return { balanceNum, displayBalance };
};

export const useUTokenBalance = (
  tronWeb: any,
  accountAddress: string,
  tokenAddress: string | undefined,
  refreshParam?: any
) => {
  const [balanceNum, setBalanceNum] = useState(0);
  const [displayBalance, setDisplayBalance] = useState("0");

  useEffect(() => {
    if (!tronWeb || !accountAddress) return;

    const getUTokenBalance = async () => {
      const contract = await tronWeb?.contract().at(tokenAddress);
      const rawBalance = await contract.balanceOf(accountAddress).call();

      const balanceNum = formatBalance(rawBalance, config.utokenDecimals);
      const displayBalance = formatDisplayBalance(
        rawBalance,
        config.utokenDecimals
      );

      setBalanceNum(balanceNum);
      setDisplayBalance(displayBalance);
    };

    getUTokenBalance().catch((e) => {});
  }, [tronWeb, tokenAddress, accountAddress, refreshParam]);

  return { balanceNum, displayBalance };
};
