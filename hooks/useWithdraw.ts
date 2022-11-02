import { config } from "@constants/config";

export const onWithdraw = async (
  tronWeb: any,
  utokenAddress: string,
  withdrawAmount: number,
  isTrx: boolean
) => {
  try {
    const contract = await tronWeb?.contract().at(utokenAddress);

    console.log(withdrawAmount);

    // const decimals = isTrx ? config.trxDecimals : config.utokenDecimals;
    const withdrawAmountBN = BigInt(
      withdrawAmount * 10 ** config.utokenDecimals
    );

    console.log(withdrawAmountBN);
    const result = await contract.redeem(withdrawAmountBN).send();
    return result;
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};
