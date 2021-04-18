import { interval } from "rxjs";
import { map, delay } from "rxjs/operators";
import { gaussianNoise } from "../helpers/helpers";

export function noise(maxTick: number) {
  return interval(maxTick).pipe(
    map((n) => (n == 0 ? 0 : gaussianNoise())),
    delay(Math.random() * maxTick)
  );
}
