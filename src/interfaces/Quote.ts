
export interface Quote {
  readonly forward: number;
  readonly price: number;
  readonly delta: number;
  readonly gamma: number;
  readonly vega: number;
  readonly theta: number;
  readonly rho: number;
}
