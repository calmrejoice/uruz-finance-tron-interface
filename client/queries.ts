import { tronWeb } from "@utils/tronWeb";
import { config } from "@constants/config";
import { formatBalance, formatDisplayBalance } from "@utils/formatBalance";
import comptroller from "@deployments/Comptroller.json";
import axios from "axios";

export const getUTokenDetails = async (
  utokenAddress: string,
  collateralDecimals: number,
  isTrx: boolean
) => {
  if (!utokenAddress) return;
  const contract = await tronWeb.nile.contract().at(utokenAddress);
  const totalBorrow = await contract.totalBorrows().call();

  const totalSupply = await contract.totalSupply().call();
  const totalReserves = await contract.totalReserves().call();
  const reserveFactor = await contract.reserveFactorMantissa().call();
  const totalCash = await contract.getCash().call();

  // Supply and Borrow APY
  const mantissa = 10 ** config.trc20TokenDecimals;
  const blocksPerDay = 20 * 60 * 24;
  const daysPerYear = 365;
  const supplyRatePerBlock = await contract.supplyRatePerBlock().call();
  const borrowRatePerBlock = await contract.borrowRatePerBlock().call();
  const supplyApy =
    (Math.pow((supplyRatePerBlock / mantissa) * blocksPerDay + 1, daysPerYear) -
      1) *
    100;
  const borrowApy =
    (Math.pow((borrowRatePerBlock / mantissa) * blocksPerDay + 1, daysPerYear) -
      1) *
    100;

  // Exchange rate
  const exchangeRateRaw = await contract.exchangeRateStored().call();
  const underlyingDecimals = isTrx
    ? config.trxDecimals
    : config.trc20TokenDecimals;
  const rateMantissa = 18 + underlyingDecimals - config.utokenDecimals;

  // @ts-ignore
  const oneUTokenInUnderlying = exchangeRateRaw / Math.pow(10, rateMantissa);
  // console.log("1 utoken can be redeemed for", oneUTokenInUnderlying, "token");
  const oneUnderlyingInUToken = 1 / oneUTokenInUnderlying;

  // EarnUSDPerday
  const earnUSDPerDay = 1;

  if (contract) {
    return {
      totalBorrow: formatBalance(totalBorrow, collateralDecimals),
      totalSupply: formatBalance(totalSupply, config.utokenDecimals),
      totalReserves: formatBalance(totalReserves, config.utokenDecimals),
      reserveFactor: formatBalance(reserveFactor, 18),
      totalCash: formatDisplayBalance(totalCash, collateralDecimals),
      apy: supplyApy.toFixed(2),
      borrowApy: borrowApy.toFixed(2),
      oneToExchangeRate: oneUnderlyingInUToken.toFixed(6),
      earnUSDPerDay: earnUSDPerDay.toFixed(2),
    };
  }
};

export const getTokenApprovalStatus = async (
  tokenAddress: any,
  ownerAddress: any,
  spenderAddress: any
) => {
  const contract = await tronWeb.nile.contract().at(tokenAddress);
  const approvalAmount = await contract
    .allowance(ownerAddress, spenderAddress)
    .call();
  const isApproved = approvalAmount >= config.unlimitedApprovalAmount || false;

  return isApproved;
};

export const getComptrollerDetails = async (utokenAddress: string) => {
  try {
    const contract = await tronWeb.nile.contract(
      comptroller.abi,
      config.unitrollerAddress
    );

    const data = await contract.markets(utokenAddress).call();

    const collateralFactorRaw = data?.collateralFactorMantissa;

    const collateralFactor = collateralFactorRaw?.toString();

    return {
      collateralFactor: formatBalance(collateralFactor, 18),
    };
  } catch (error) {
    console.log(error);
  }
};

export const getTokenPrice = async (tokenSymbol: string) => {
  try {
    const { data } = await axios.get(config.tokenPriceUrl);
    const { BTC, ETH, USDT, TRX, WIN } = data.data || {};
    if (tokenSymbol === "TRX") {
      return parseFloat(TRX?.quote.USD.price);
    } else if (tokenSymbol === "URZ") {
      return parseFloat("0.3");
    }
    return 0.01;
  } catch (error) {
    console.log(error);
  }
};
