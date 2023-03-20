import {Enduser} from "./enduser";

export interface Review {
  id:number;
  content:string;
  enduser:Enduser;
  rating: number;
}
