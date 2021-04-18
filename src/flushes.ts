import { Observable } from "rxjs";
import { cfg } from "./config";
import { stock } from "./observables/stock";
import { option } from "./observables/option";
import { noise } from "./observables/noise";

export function noisesFlush(nbOfNoises: number) {
  return [...Array(nbOfNoises).keys()].map((i) => noise(cfg.maxTick));
}

export function stocksFlush(noises: Observable<number>[]) {
  return noises.map((noise$) =>
    stock(Math.random() * 100, Math.random() * 1, cfg.rate, noise$)
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
        option(0.3, cfg.rate, strike, maturity, "call", stock$)
      )
    )
  );
}
