import { config } from "@constants/config";

export const onWithdraw = async (
  tronWeb: any,
  utokenAddress: string,
  withdrawAmount: number,
  isTrx: boolean
) => {
  try {
    const contract = await tronWeb?.contract().at(utokenAddress);

    const withdrawAmountBN = BigInt(
      withdrawAmount * 10 ** config.utokenDecimals
    );

    const result = await contract.redeem(withdrawAmountBN).send();
    return result;
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const onWithdrawGovToken = async (
  tronWeb: any,
  withdrawAmount: number
) => {
  try {
    const contract = await tronWeb?.contract().at(config.wurzAddress);

    const withdrawAmountBN: any = BigInt(
      withdrawAmount * 10 ** config.trc20TokenDecimals
    );

    const result = await contract.withdraw(withdrawAmountBN).send();
    return result;
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};
