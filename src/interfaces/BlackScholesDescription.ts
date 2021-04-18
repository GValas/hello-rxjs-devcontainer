export type VanillaType = "call" | "put";

export interface BlackScholesDescription {
  vanillaType: VanillaType;
  spot: number;
  rate: number;
  timeToMaturity: number;
  strike: number;
  volatility: number;
}
