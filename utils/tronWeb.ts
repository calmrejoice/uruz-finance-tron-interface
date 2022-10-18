//@ts-ignore
import TronWeb from "tronweb";

export const initTronWeb = () => {
  const tronWeb = new TronWeb({
    // fullHost: "https://api.trongrid.io",
    fullHost: "https://nile.trongrid.io",
    // headers: { "TRON-PRO-API-KEY": "your api key" },
    // privateKey: "your private key",
  });

  return { tronWeb };
};
