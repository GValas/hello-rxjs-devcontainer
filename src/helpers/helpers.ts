import { BlackScholesDescription } from "../interfaces/BlackScholesDescription";
import gaussian from "gaussian";
import { Quote } from "../interfaces/Quote";

export function priceVanilla(bsRequest: BlackScholesDescription): Quote {
  const strike = bsRequest.strike;
  const timeToMaturity = bsRequest.timeToMaturity;
  const volatility = bsRequest.volatility;
  const rate = bsRequest.rate;
  const discountFactor = Math.exp(-bsRequest.rate * bsRequest.timeToMaturity);
  const forward = bsRequest.spot / discountFactor;

  const sdt = Math.sqrt(timeToMaturity);
  const vt = volatility * sdt;
  const d1 = Math.log(forward / strike) / vt + vt / 2;
  const d2 = d1 - vt;

  const gauss = gaussian(0, 1);

  const nd1 = gauss.cdf(d1);
  const nd2 = gauss.cdf(d2);
  const f1 = gauss.pdf(d1);

  return bsRequest.vanillaType === "call"
    ? {
        forward,
        price: discountFactor * (forward * nd1 - strike * nd2),
        delta: nd1,
        gamma: f1 / (forward * discountFactor * vt),
        vega: f1 * forward * discountFactor * sdt,
        theta:
          discountFactor *
          ((-forward * f1 * volatility) / 2 / sdt - rate * strike * nd2),
        rho: discountFactor * strike * timeToMaturity * nd2,
      }
    : {
        forward,
        price: discountFactor * (forward * (nd1 - 1) - strike * (nd2 - 1)),
        delta: nd1 - 1,
        gamma: f1 / (forward * discountFactor * vt),
        vega: f1 * forward * discountFactor * sdt,
        theta:
          discountFactor *
          ((forward * f1 * volatility) / 2 / sdt - rate * strike * (1 - nd2)),
        rho: -discountFactor * strike * timeToMaturity * (1 - nd2),
      };
}

export function gaussianNoise() {
  var u = 0;
  var v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
