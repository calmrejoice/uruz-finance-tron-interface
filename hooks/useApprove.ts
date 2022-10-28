import { config } from "@constants/config";
import { tronOptions } from "@utils/tronWeb";
import { useEffect, useState } from "react";

export const useApprove = async (
  tronWeb: any,
  tokenAddress: string,
  spenderAddress: string
) => {
  try {
    const contract = await tronWeb.contract().at(tokenAddress);
    const approveAmount = config.unlimitedApprovalAmount;

    const result = await contract
      .approve(spenderAddress, approveAmount)
      .send(tronOptions);

    return result;
  } catch (error) {
    return error;
  }
};

export const useApprovalStatus = (
  tronWeb: any,
  tokenAddress: string,
  ownerAddress: string,
  spenderAddress: string
) => {
  if (!tronWeb) return;

  const [isApproved, setIsApproved] = useState(false);
  useEffect(() => {
    if (!tronWeb || !tokenAddress || !ownerAddress || !spenderAddress) return;

    const getApprovalAmount = async () => {
      const contract = await tronWeb.contract().at(tokenAddress);
      const approvalAmount = await contract
        .allowance(ownerAddress, spenderAddress)
        .call();

      const approved = approvalAmount >= config.unlimitedApprovalAmount;
      setIsApproved(approved);
    };
    getApprovalAmount();
  }, [tronWeb, tokenAddress, ownerAddress, spenderAddress]);

  return isApproved;
};
