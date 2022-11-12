import { config } from "@constants/config";
import { formatBalance, formatDisplayBalance } from "@utils/formatBalance";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";

export const onCreateProposal = async (
  tronWeb: any,
  reserveFactorPercent: number
) => {
  try {
    const contract = await tronWeb?.contract().at(config.governorAlphaAddress);

    const targets = [config.uurzHexAddress];
    const values = [0];
    const signatures = ["_setReserveFactor(uint256)"];

    const abi = ethers.utils.defaultAbiCoder;
    const reserveFactorBN = BigNumber.from(reserveFactorPercent).mul(
      BigNumber.from((1e16).toString())
    );
    const encode = await abi.encode(["uint256"], [reserveFactorBN]);
    const calldatas = [encode];

    console.log(encode);

    // const decode = await abi.decode(["uint256"], encode);
    // console.log(decode.toString());

    const description = "set uurz reserve factor";

    const result = await contract
      .propose(targets, values, signatures, calldatas, description)
      .send();
    return result;
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const onCastVote = async (
  tronWeb: any,
  proposalId: number | undefined,
  numOfVotes: number,
  support: boolean
) => {
  try {
    const contract = await tronWeb?.contract().at(config.governorAlphaAddress);
    const numOfVotesBN = BigNumber.from(numOfVotes).mul(
      BigNumber.from((1e18).toString())
    );
    const result = await contract
      .castVote(proposalId, numOfVotesBN, support)
      .send();
    return result;
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const onWithdrawVote = async (
  tronWeb: any,
  proposalId: number | undefined,
  numOfVotes: number,
  support: boolean
) => {
  try {
    const contract = await tronWeb?.contract().at(config.governorAlphaAddress);
    const numOfVotesBN = BigNumber.from(numOfVotes).mul(
      BigNumber.from((1e18).toString())
    );
    const result = await contract
      .castVote(proposalId, numOfVotesBN, support)
      .send();
    return result;
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const useVotesCasted = (tronWeb: any, address: string) => {
  const [votesCasted, setVotesCasted] = useState("0");
  const [votesCastedNum, setVotesCastedNum] = useState(0);

  useEffect(() => {
    if (!tronWeb || !address) return;

    const getVotesCasted = async () => {
      const contract = await tronWeb?.contract().at(config.wurzAddress);
      const votesCastedBN = await contract.lockOf(address).call();

      const votesCastedDisplay = formatDisplayBalance(votesCastedBN, 18) || "0";
      const votesCastedNum = formatBalance(votesCastedBN, 18) || 0;

      setVotesCasted(votesCastedDisplay);
      setVotesCastedNum(votesCastedNum);
    };

    getVotesCasted().catch((e) => {});
  }, [tronWeb, address]);

  return { votesCasted, votesCastedNum };
};

export const useVotesCastedOnProposal = (
  tronWeb: any,
  address: string,
  proposalId: string
) => {
  const [votesCasted, setVotesCasted] = useState("0");
  const [votesCastedNum, setVotesCastedNum] = useState(0);

  useEffect(() => {
    if (!tronWeb || !address) return;

    const getVotesCasted = async () => {
      const contract = await tronWeb?.contract().at(config.wurzAddress);
      const votesCastedBN = await contract.lockTo(address, proposalId).call();

      const votesCastedDisplay = formatDisplayBalance(votesCastedBN, 18) || "0";
      const votesCastedNum = formatBalance(votesCastedBN, 18) || 0;

      setVotesCasted(votesCastedDisplay);
      setVotesCastedNum(votesCastedNum);
    };

    getVotesCasted().catch((e) => {});
  }, [tronWeb, address]);

  return { votesCasted, votesCastedNum };
};
