import { config } from "@constants/config";

// export const onRepay = async (
//   tronWeb: any,
//   utokenAddress: string,
//   repayAmount: number,
//   isTrx: boolean
// ) => {
//   try {
//     const contract = await tronWeb?.contract().at(utokenAddress);

//     console.log(repayAmount);

//     // const decimals = isTrx ? config.trxDecimals : config.utokenDecimals;
//     const withdrawAmountBN = BigInt(repayAmount * 10 ** config.utokenDecimals);

//     console.log(withdrawAmountBN);
//     const result = await contract.repay(withdrawAmountBN).send();
//     return result;
//   } catch (error) {
//     console.log(error);
//     return { success: false, error };
//   }
// };
