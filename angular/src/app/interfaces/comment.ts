import {Enduser} from "./enduser";

export interface Comment {
commentId:number;
createdAt:string;
content:string;
enduser: Enduser;

}
