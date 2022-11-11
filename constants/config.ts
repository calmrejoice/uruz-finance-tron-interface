import { BigNumber } from "ethers";

export const config = {
  unitrollerAddress: "TPBngLaAUtFe9DzqKJri7ziMrS2SRK25XB",
  unitrollerHexAddress: "0x90fabd3362b4fcd1c431ea3bbd7d3ae2c0ce5ee7",
  uurzAddress: "TByuWrmpZQb5yYYtWBrT4Kfhzz3jJ1GQ4E",
  uurzHexAddress: "0x1612121e897936acc60e399de926cc9ca45e2783",
  uusdtAddress: "TSauT3GhxXhVCUT2hkNRXdNAAr7xTzYsNs",
  usdtAddress: "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj",
  urzAddress: "TGaxQR6RmfkL9qhZzh8fF83dDLjnJBfVva",
  wurzAddress: "TFSj9KmFnVg9dUn6NyBeX2EuSFKeKvHyPT",
  utrxAddress: "TGjZXu9amnEfiUy3W8Z1ptxKnTVs6cb9vv",
  utrxInterestModelAddress: "TCvVDLi9YfuvcMNM8T4WogxDiPkXsEDJVa",
  governorAlphaAddress: "TMCYfGnLv3fwFt3cRpkZr76DgMgGr5jDJb",
  proposalAddress: "TTv9UEgMDbevDWdFCUbxvvWchuMQgJNJaG",
  tokenPriceUrl:
    "https://c.tronlink.org/v1/cryptocurrency/getprice?symbol=TRX,USDT&convert=USD",
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
    {
      collateralSymbol: "USDT",
      utokenAddress: "TSauT3GhxXhVCUT2hkNRXdNAAr7xTzYsNs",
      collateralAddress: "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj",
      collateralName: "Tether",
      collateralDecimals: 6,
      assetImage: "/tokens/usdt.png",
    },
  ],
  trxDecimals: 6,
  utokenDecimals: 8,
  trc20TokenDecimals: 18,
  unlimitedApprovalAmount: BigNumber.from(
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
  ),
  proposals: [
    {
      id: 1,
      createdDate: 1665432845 * 1000,
      startDate: 1665432845 * 1000,
      endDate: 1668370445 * 1000,
      // queuedDate: 1664429753 * 1000,
      // executedDate: 1664529753 * 1000,
      cancelDate: undefined,

      state: "Active",
      description: {
        title: "UFP-1 Adjusting the Reserve Factor of URZ Market to 75%",
        description: "UFP-1 Adjusting the Reserve Factor of URZ Market to 75%",
      },
    },
    {
      id: 2,
      createdDate: 1664129753 * 1000,
      startDate: 1664229753 * 1000,
      endDate: 1668370445 * 1000,
      // queuedDate: 1664429753 * 1000,
      // executedDate: 1664529753 * 1000,
      cancelDate: undefined,

      state: "Active",
      description: {
        title: "UFP-2 Adjusting the Reserve Factor of URZ Market to 15%",
        description: "UFP-2 Adjusting the Reserve Factor of URZ Market to 15%",
      },
    },
  ],
};
