import { inject, injectable } from "inversify";
import { EntityId } from "../../core/entity-id";
import { BookRepository } from "./book-repo.interface";

//TODO: find a better place for those types
export type StartBookDTO = {
  readerId: EntityId;
  bookId: EntityId;
};

//TODO: find a better place for those types
export type BookStarted = {
  eventType: string;
  timeStamp: Date;
  data: {
    readerId: EntityId;
    bookId: EntityId;
    readingId: EntityId;
  };
};

@injectable()
export class StartBook {
  constructor(
    @inject("bookRepository")
    public bookRepository: BookRepository
  ) {}

  async execute(payload: StartBookDTO) {
    const book = await this.bookRepository.getBookById(payload.bookId);
    if (!book) throw new Error("The book doesn't exist");
    if (!payload.readerId.equals(book.ownerId))
      throw new Error("You can't start a book you don't own");
    book.startBook(payload.readerId);
    this.bookRepository.save(book);
  }
}
