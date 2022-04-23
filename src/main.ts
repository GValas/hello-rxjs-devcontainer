import { combineLatest, interval } from "rxjs";
import { noisesFlush, optionsFlush, stocksFlush } from "./flushes";
import { cfg } from "./config";
import { throttle } from "rxjs/operators";

// arrays of observables
const nbOfStocks = 10;
const noises = noisesFlush(nbOfStocks);
const stocks = stocksFlush(noises);
const options = optionsFlush(stocks, [100, 110], [1, 2]);

// subscring
combineLatest(options) // stocks
  .pipe(throttle(() => interval(cfg.throttle)))
  .subscribe((assets) =>
    assets.map((z, i) =>
      console.log(
        i + 1,
        JSON.stringify(z, (key, val) =>
          val.toFixed ? Number(val.toFixed(2)) : val
        )
      )
    )
  );
