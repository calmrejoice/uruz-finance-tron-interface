import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "@constants/config";
import { tronWeb } from "@utils/tronWeb";
import { formatBalance } from "@utils/formatBalance";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const { accountAddress }: any = query;

  try {
    if (!accountAddress) return;
    const contract = await tronWeb.nile.contract().at(config.wurzAddress);
    const accountStakedRaw = await contract.balanceOf(accountAddress).call();
    const totalStakedRaw = await contract.totalSupply().call();

    const result = {
      accountStaked: formatBalance(accountStakedRaw, config.trc20TokenDecimals),
      totalStaked: formatBalance(totalStakedRaw, config.trc20TokenDecimals),
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};

export default handler;
