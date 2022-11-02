import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "@constants/config";
import { getUTokenDetails } from "client/queries";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const { tokenSymbol }: any = query;

  try {
    if (!tokenSymbol) return;
    const { markets } = config;
    const {
      collateralAddress,
      collateralName,
      collateralSymbol,
      collateralDecimals,
      assetImage,
      utokenAddress,
    } =
      markets.filter(
        (market) =>
          market.collateralSymbol.toUpperCase() === tokenSymbol.toUpperCase()
      )[0] || {};

    const {
      totalBorrow,
      reserveFactor,
      totalReserves,
      totalSupply,
      totalCash,
    } = (await getUTokenDetails(utokenAddress, collateralDecimals)) || {};

    const result = {
      utokenAddress,
      collateralSymbol,
      collateralAddress,
      collateralName,
      totalBorrow,
      totalSupply,
      totalReserves,
      reserveFactor,
      totalCash,
      assetImage,
      apy: 0.02,
      borrowApy: 0.11,
      //   borrowPaused: 0,
      //   depositHeadcount: 11125,
      //   borrowedUSD: "8361240.34175388",
      //   collateralFactor: 0.75,
      //   model: [],
      //   priceUSD: "0.06141627",
      //   borrowLimit: "0.000000",
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
