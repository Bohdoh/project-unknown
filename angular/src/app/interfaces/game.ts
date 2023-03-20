import {Category} from "./category";

export interface Game {
  categories: Category[];
  image: string;
  createdAt: string;
  subtitle: string;
  title: string;
  content: string;
  id: number;

}

