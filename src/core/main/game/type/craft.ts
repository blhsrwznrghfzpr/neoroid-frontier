export const WoodBlock = {
  type: "wood",
} as const;

export const StoneBlock = {
  type: "stone",
} as const;

export const IronBlock = {
  type: "iron",
} as const;

export const FoodBlock = {
  type: "food",
} as const;

export type WoodBlock = typeof WoodBlock;

export type StoneBlock = typeof StoneBlock;

export type IronBlock = typeof IronBlock;

export type FoodBlock = typeof FoodBlock;

export type Block = WoodBlock | StoneBlock | IronBlock | FoodBlock;
