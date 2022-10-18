import type { NextApiRequest, NextApiResponse } from "next";
import { initTronWeb } from "@utils/tronWeb";

type Data = {
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { tronWeb } = initTronWeb();

  const result = await tronWeb.trx.getAccount(
    "TEhwqUcbbYn9Y1pgFTQ3Hsj2LdVqv5WcTQ"
  );

  res.status(200).json(result);
}
