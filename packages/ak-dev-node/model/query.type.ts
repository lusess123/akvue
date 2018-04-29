import { Author } from "./author.type";
/* 定义查询内容 */
export interface Query {
  author?: Author | null;
  getFortuneCookie?: string | null;
}

export interface AuthorQueryArgs {
  firstName?: string | null;
  lastName?: string | null;
}
