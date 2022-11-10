import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "@constants/config";
import { tronWeb } from "@utils/tronWeb";
import { BigNumber } from "ethers";
import { formatBalance, formatDisplayBalance } from "@utils/formatBalance";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const contract = await tronWeb.nile
      .contract()
      .at(config.governorAlphaAddress);
    const proposalCountBN: BigNumber = await contract.proposalCount().call();
    const proposalCount = parseInt(proposalCountBN.toString());

    let proposalsArray = [];
    for (let i = 1; i <= proposalCount; i++) {
      const data = await contract.proposals(i).call();
      const proposalDetails = config.proposals.filter(
        (proposal) => proposal.id === i
      )[0];

      const proposal = {
        // id: data.id.toString(),
        eta: data.eta.toString(),
        startBlock: data.startBlock.toString(),
        endBlock: data.endBlock.toString(),
        forVotes: formatBalance(data.forVotes, 18),
        againstVotes: formatBalance(data.againstVotes, 18),
        proposer: data.proposer,
        canceled: data.canceled,
        executed: data.executed,
        ...proposalDetails,
      };
      proposalsArray.push(proposal);
    }

    res.status(200).json(proposalsArray);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};

export default handler;
