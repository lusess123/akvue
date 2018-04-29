import { Post } from "./post.type";

export interface Author {
  id?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  posts?: Post[] | null;
}
