import { Observable } from "rxjs";
import { timeInterval, scan } from "rxjs/operators";

export function stock(
  spot: number,
  vol: number,
  rate: number,
  noise$: Observable<number>) {
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
