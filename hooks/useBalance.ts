import { config } from "@constants/config";
import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { formatBalance } from "@utils/formatBalance";
import millify from "millify";

export const useBalance = (
  tronWeb: any,
  tokenAddress: string,
  accountAddress: string
) => {
  if (!tronWeb) return;

  const [balance, setBalance] = useState(0);
  useEffect(() => {
    if (!tronWeb || !tokenAddress || !accountAddress) return;

    const getBalance = async () => {
      const contract = await tronWeb?.contract().at(tokenAddress);
      const balanceBigNumber = await contract.balanceOf(accountAddress).call();
      const balanceNumber = formatBalance(
        balanceBigNumber,
        config.trc20TokenDecimals
      );
      setBalance(balanceNumber);
    };
    getBalance();
  }, [tronWeb, tokenAddress, accountAddress]);

  return balance;
};

export const useTrxBalance = (tronWeb: any, accountAddress: string) => {
  if (!tronWeb) return;

  const [available, setAvailable] = useState(0);
  const [frozen, setFrozen] = useState(0);

  useEffect(() => {
    if (!tronWeb || !accountAddress) return;

    const getBalance = async () => {
      const account = await tronWeb?.trx.getAccount(accountAddress);
      const availableNumber = formatBalance(
        account.balance,
        config.trxDecimals
      );
      const frozenNumber = formatBalance(
        account.frozen[0].frozen_balance,
        config.trxDecimals
      );
      setAvailable(availableNumber);
      setFrozen(frozenNumber);
    };
    getBalance();
  }, [tronWeb, accountAddress]);

  return { available, frozen };
};
