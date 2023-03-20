import {Category} from "./category";
import {Review} from "./review";
import {Comment} from "./comment";

export interface Game {
  categories: Category[];
  image: string;
  createdAt: string;
  subtitle: string;
  title: string;
  content: string;
  id: number;
  comments: Comment[];
  reviews: Review[];
  author:string;

}

