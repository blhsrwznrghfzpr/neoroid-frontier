export type Cell = BlankCell | StarshipCell | TreeCell | StoneCell;

export type BlankCell = {
  type: "blank";
};

export type StarshipCell = {
  type: "starship";
};

export type TreeCell = {
  type: "tree";
};

export type StoneCell = {
  type: "stone";
};
