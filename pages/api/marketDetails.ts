import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "@constants/config";
import { getUTokenDetails } from "client/queries";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const { tokenSymbol } = query;

  try {
    if (!tokenSymbol) return;
    const { marketDetails } = config;
    const {
      collateralAddress,
      collateralName,
      collateralSymbol,
      utokenAddress,
      collateralDecimal,
    } =
      marketDetails.filter(
        (market) => market.collateralSymbol === tokenSymbol
      )[0] || {};

    const { totalBorrow, reserveFactor, totalReserves, totalSupply } =
      (await getUTokenDetails(utokenAddress)) || {};

    const result = {
      utokenAddress,
      collateralSymbol,
      collateralAddress,
      collateralName,
      totalBorrow,
      totalSupply,
      totalReserves,
      reserveFactor,
      collateralDecimal,
      //   borrowPaused: 0,
      //   depositHeadcount: 11125,
      //   borrowedUSD: "8361240.34175388",
      //   collateralFactor: 0.75,
      //   totalCash: "350153749589758",
      //   model: [],
      //   depositedAPY: "0.02980902",
      //   priceUSD: "0.06141627",
      //   borrowLimit: "0.000000",
      //   borrowedAPY: "0.11813139",
      //   borrowHeadcount: 527,
      //   oneToExchangeRate: "98.07767754",
      //   depositedUSD: "29821577.45688939",
      //   earnUSDPerDay: "2435.48",
    };
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};

export default handler;
