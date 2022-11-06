import { BigNumber } from "ethers";

export const config = {
  unitrollerAddress: "TPBngLaAUtFe9DzqKJri7ziMrS2SRK25XB",
  uurzAddress: "TByuWrmpZQb5yYYtWBrT4Kfhzz3jJ1GQ4E",
  urzAddress: "TGaxQR6RmfkL9qhZzh8fF83dDLjnJBfVva",
  utrxAddress: "TGjZXu9amnEfiUy3W8Z1ptxKnTVs6cb9vv",
  utrxInterestModelAddress: "TCvVDLi9YfuvcMNM8T4WogxDiPkXsEDJVa",
  tokenPriceUrl:
    "https://c.tronlink.org/v1/cryptocurrency/getprice?symbol=TRX,BTC,WIN,USDT,ETH&convert=USD",

  markets: [
    {
      collateralSymbol: "TRX",
      utokenAddress: "TGjZXu9amnEfiUy3W8Z1ptxKnTVs6cb9vv",
      collateralAddress: "",
      collateralName: "TRON",
      collateralDecimals: 6,
      assetImage: "/tokens/trx.png",
    },
    {
      collateralSymbol: "URZ",
      utokenAddress: "TByuWrmpZQb5yYYtWBrT4Kfhzz3jJ1GQ4E",
      collateralAddress: "TGaxQR6RmfkL9qhZzh8fF83dDLjnJBfVva",
      collateralName: "URUZ",
      collateralDecimals: 18,
      assetImage: "/tokens/urz.png",
    },
    // {
    //   collateralSymbol: "usdt",
    //   utokenAddress: "TAZh2JdxuiXZrwWoxWSRznpqZgcK1rueXP",
    //   collateralAddress: "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj",
    //   collateralName: "Tether USD",
    //   assetImage: "/tokens/trx.png",
    // },
  ],
  trxDecimals: 6,
  utokenDecimals: 8,
  trc20TokenDecimals: 18,
  unlimitedApprovalAmount: BigNumber.from(
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
  ),
};
