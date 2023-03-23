import {Review} from "./review";

export interface ProfilDTO {

  enduserId: number;
  username: string;
  email: string;
  image: string;
  role: string;
  password: string;
  reviews: Review[];
  comments: Comment[];
}
