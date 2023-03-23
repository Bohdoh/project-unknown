import { Review } from "./review";
import { Comment } from "./comment";
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
