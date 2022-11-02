import { config } from "@constants/config";
import { useEffect, useState } from "react";
import { formatBalance, formatDisplayBalance } from "@utils/formatBalance";

export const useBalance = (
  tronWeb: any,
  accountAddress: string,
  isUToken: boolean = false,
  tokenAddress?: string,
  isTrx: boolean = false,
  refreshParam?: any
) => {
  const [balanceNum, setBalanceNum] = useState(0);
  const [displayBalance, setDisplayBalance] = useState("0");

  useEffect(() => {
    if (!tronWeb || !accountAddress) return;

    const getBalance = async () => {
      const contract = await tronWeb?.contract().at(tokenAddress);
      const rawBalance = await contract.balanceOf(accountAddress).call();
      const decimals = isUToken
        ? config.utokenDecimals
        : config.trc20TokenDecimals;

      const balanceNum = formatBalance(rawBalance, decimals);
      const displayBalance = formatDisplayBalance(rawBalance, decimals);

      setBalanceNum(balanceNum);
      setDisplayBalance(displayBalance);
    };

    const getTrxBalance = async () => {
      const account = await tronWeb?.trx.getAccount(accountAddress);
      const availableNum = formatBalance(account.balance, config.trxDecimals);
      const availableDisplay = formatDisplayBalance(
        account.balance,
        config.trxDecimals
      );

      setBalanceNum(availableNum);
      setDisplayBalance(availableDisplay);
    };
    isTrx ? getBalance() : getTrxBalance();
  }, [tronWeb, tokenAddress, accountAddress, refreshParam]);

  return { balanceNum, displayBalance };
};

// export const useTrxBalance = (
//   tronWeb: any,
//   accountAddress: string,
//   refreshParam?: any
// ) => {
//   const [available, setAvailable] = useState(0);
//   const [availableDisplay, setAvailableDisplay] = useState("0");
//   const [frozen, setFrozen] = useState(0);

//   useEffect(() => {
//     if (!tronWeb || !accountAddress) return;

//     const getBalance = async () => {
//       const account = await tronWeb?.trx.getAccount(accountAddress);
//       const availableNum = formatBalance(account.balance, config.trxDecimals);
//       const availableDisplay = formatDisplayBalance(
//         account.balance,
//         config.trxDecimals
//       );

//       const frozenNumber = formatBalance(
//         account.frozen[0].frozen_balance,
//         config.trxDecimals
//       );
//       setAvailable(availableNum);
//       setAvailableDisplay(availableDisplay);

//       setFrozen(frozenNumber);
//     };
//     getBalance();
//   }, [tronWeb, accountAddress, refreshParam]);

//   return { availableDisplay, available, frozen };
// };
