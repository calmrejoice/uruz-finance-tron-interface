import { tronWeb } from "@utils/tronWeb";
import { config } from "@constants/config";

export const getUTokenDetails = async (utokenAddress: string) => {
  if (!utokenAddress) return;
  const contract = await tronWeb.nile.contract().at(utokenAddress);
  const totalBorrow = await contract.totalBorrows().call();
  const totalSupply = await contract.totalSupply().call();
  const totalReserves = await contract.totalReserves().call();
  const reserveFactor = await contract.reserveFactorMantissa().call();

  if (contract) {
    return {
      totalBorrow: totalBorrow.toString(),
      totalSupply: totalSupply.toString(),
      totalReserves: totalReserves.toString(),
      reserveFactor: reserveFactor.toString(),
    };
  }
};

export const getTokenApprovalStatus = async (
  tokenAddress: any,
  ownerAddress: any,
  spenderAddress: any
) => {
  const contract = await tronWeb.nile.contract().at(tokenAddress);
  const approvalAmount = await contract
    .allowance(ownerAddress, spenderAddress)
    .call();
  const isApproved = approvalAmount >= config.unlimitedApprovalAmount || false;

  console.log(approvalAmount);
  console.log(config.unlimitedApprovalAmount);
  console.log(isApproved);

  return isApproved;
};
