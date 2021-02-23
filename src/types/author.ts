import { Book } from "./book";

export interface Author {
  id?: number,
  first_name: string,
  last_name: string,
  books_attributes: Book[]
}
