import { EntityId } from "../../core/entity-id";
import { Book } from "./book.entity";

export interface BookRepository {
  getBookById(bookId: EntityId): Promise<Book | undefined>;
  getBookOwnerId(book: Book): Promise<string>;
  save(book: Book): Promise<string>;
}
