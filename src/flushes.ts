import { Observable, interval } from "rxjs";
import { map, delay, timeInterval, scan } from "rxjs/operators";
import { VanillaType } from "./interfaces/BlackScholesDescription";
import { gaussianNoise, priceVanilla } from "./helpers/helpers";
import { cfg } from "./config";

export function noisesFlush(nbOfNoises: number) {
  return [...Array(nbOfNoises).keys()].map((i) => newNoise(cfg.maxTick));
}

export function stocksFlush(noises: Observable<number>[]) {
  return noises.map((noise$) =>
    newStock(Math.random() * 100, Math.random() * 1, cfg.rate, noise$)
  );
}

export function optionsFlush(
  stocks: Observable<number>[],
  strikes: number[],
  maturities: number[]
) {
  return stocks.flatMap((stock$) =>
    strikes.flatMap((strike) =>
      maturities.map((maturity) =>
        newOption(0.3, cfg.rate, strike, maturity, "call", stock$)
      )
    )
  );
}

function newNoise(maxTick: number) {
  return interval(maxTick).pipe(
    map((n) => (n == 0 ? 0 : gaussianNoise())),
    delay(Math.random() * maxTick)
  );
}

function newStock(
  spot: number,
  vol: number,
  rate: number,
  noise$: Observable<number>
) {
  return noise$.pipe(
    timeInterval(),
    scan((stock, noise) => {
      const dt = noise.interval / 1000 / 60 / 60; // daily return
      const drift = (rate - (vol * vol) / 2) * dt;
      const brown = noise.value * vol * Math.sqrt(dt);
      return Math.round(stock * Math.exp(drift + brown) * 100) / 100;
    }, spot)
  );
}

function newOption(
  vol: number,
  rate: number,
  strike: number,
  timeToMaturity: number,
  vanillaType: VanillaType,
  spot$: Observable<number>
) {
  return spot$.pipe(
    map((spot) =>
      priceVanilla({
        spot: spot,
        rate: rate,
        strike: strike,
        timeToMaturity: timeToMaturity,
        vanillaType: vanillaType,
        volatility: vol,
      })
    )
  );
}
