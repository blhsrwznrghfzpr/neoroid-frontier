import { Workeroid } from "../workeroid";

export type Player = {
  id: string;
  name: string;
  workers: Workeroid[];
};
