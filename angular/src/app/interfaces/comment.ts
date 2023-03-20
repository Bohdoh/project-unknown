import {Enduser} from "./enduser";

export interface Comment {
id:number;
createdAt:string;
content:string;
enduser: Enduser;

}
