import { config } from "@constants/config";

export const onRepay = async (
  tronWeb: any,
  utokenAddress: string,
  repayAmount: number,
  isTrx: boolean
) => {
  const contract = await tronWeb?.contract().at(utokenAddress);
  try {
    if (!isTrx) {
      const repayAmountBN = BigInt(
        repayAmount * 10 ** config.trc20TokenDecimals
      );
      const result = await contract.repayBorrow(repayAmountBN).send();
      return result;
    } else {
      const repayAmountBN = BigInt(repayAmount * 10 ** config.trxDecimals);
      console.log(repayAmountBN);
      const result = await contract.repayBorrow(repayAmountBN).send({
        feeLimit: 100_000_000,
        callValue: repayAmountBN,
        shouldPollResponse: false,
      });
      return result;
    }
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};
