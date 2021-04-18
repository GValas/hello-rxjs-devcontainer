import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { VanillaType } from "../interfaces/BlackScholesDescription";
import { priceVanilla } from "../helpers/helpers";

export function option(
  vol: number,
  rate: number,
  strike: number,
  timeToMaturity: number,
  vanillaType: VanillaType,
  spot$: Observable<number>) {
  return spot$.pipe(
    map((spot) => priceVanilla({
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
