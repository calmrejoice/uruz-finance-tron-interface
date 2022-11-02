import { tronWeb } from "@utils/tronWeb";
import { config } from "@constants/config";
import { formatBalance, formatDisplayBalance } from "@utils/formatBalance";

export const getUTokenDetails = async (
  utokenAddress: string,
  collateralDecimals: number
) => {
  if (!utokenAddress) return;
  const contract = await tronWeb.nile.contract().at(utokenAddress);
  const totalBorrow = await contract.totalBorrows().call();

  const totalSupply = await contract.totalSupply().call();
  const totalReserves = await contract.totalReserves().call();
  const reserveFactor = await contract.reserveFactorMantissa().call();
  const totalCash = await contract.getCash().call();

  if (contract) {
    return {
      totalBorrow: formatDisplayBalance(totalBorrow, config.utokenDecimals),
      totalSupply: formatDisplayBalance(totalSupply, config.utokenDecimals),
      totalReserves: formatDisplayBalance(totalReserves, config.utokenDecimals),
      reserveFactor: formatDisplayBalance(reserveFactor, 18),
      totalCash: formatDisplayBalance(totalCash, collateralDecimals),
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

  return isApproved;
};
