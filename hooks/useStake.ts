import { config } from "@constants/config";
import { useEffect, useState } from "react";

export const onStake = async (tronWeb: any, stakeAmount: number) => {
  try {
    const contract = await tronWeb?.contract().at(config.wurzAddress);

    console.log(stakeAmount);

    const stakeAmountBN: any = BigInt(
      stakeAmount * 10 ** config.trc20TokenDecimals
    );

    console.log(stakeAmountBN);
    const result = await contract.deposit(stakeAmountBN).send();
    return result;
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};
