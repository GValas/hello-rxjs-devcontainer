import { combineLatest, interval } from "rxjs";
import { noisesFlush, optionsFlush, stocksFlush } from "./flushes";
import { cfg } from "./config";
import { throttle } from "rxjs/operators";

// arrays of observables
const noises = noisesFlush(cfg.marketSize);
const stocks = stocksFlush(noises);
const options = optionsFlush(stocks, [100, 110], [1, 2]);

// subscring
combineLatest(options)  // stocks
  .pipe(throttle(() => interval(cfg.throttle)))
  .subscribe((assets) =>
  assets.map((z, i) => console.log(i + 1, JSON.stringify(z)))
  );

// combineLatest(options).subscribe((options) =>
//   options.map((z, i) => console.log(i + 1, JSON.stringify(z)))
// );

// function toFixedString(numbers: number[]) {
//   return numbers.map((n) => n.toFixed(2)).join(", ");
// }

// stocksMarket
//   //
//   .subscribe((stocks) => console.log(`stocks = ${toFixedString(stocks)}`));

// optionsMarket
//   //.pipe(throttle(() => interval(SCREEN_THROTLE)))
//   .subscribe((options) => console.log(`options= ${options}`));

// function flatenMap(
//   arg0: (stocks: any) => any
// ): import("rxjs").OperatorFunction<number[], unknown> {
//   throw new Error("Function not implemented.");
// }
// const noise1$ = newNoise(2000);
// const stock1$ = newStock(100, 0.3, 0.08, noise1$);
// const option1$ = newOption(0.3, 0.08, 100, 1, "call", stock1$);

// const noise2$ = newNoise(2000);
// const stock2$ = newStock(20, 0.5, 0.08, noise2$);

// const market$ = combineLatest([stock1$, stock2$, option1$]);
// // market$.pipe(throttle(() => interval(2000))).subscribe(console.log);
// market$.subscribe(console.log);
