import { Author } from "./author.type";

export interface Post {
  id?: number | null;
  title?: string | null;
  text?: string | null;
  views?: number | null;
  author?: Author | null;
}
