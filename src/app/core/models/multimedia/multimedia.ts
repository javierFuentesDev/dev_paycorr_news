import {Legacy} from "../legacy/legacy";

export interface Multimedia {
  rank: number;
  subtype: string;
  caption: string | null;
  credit: string | null;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: Legacy;
  subType: string;
  crop_name: string;
}
