import "reflect-metadata";
import { mock as mockInterface } from "jest-mock-extended";

import { StartBook, StartBookDTO } from "./start-book.use-case";
import { BookRepository } from "./book-repo.interface";
import { Book } from "./book.entity";
import { EntityId } from "../../core/entity-id";

//when: user ask to start a book
//given: that user own the book
//then: the book is started
test("start a book", async () => {
  const ownerId = EntityId.create();
  const book = Book.create({ ownerId, novelId: EntityId.create() });
  const bookRepository = mockInterface<BookRepository>();
  bookRepository.getBookById.mockResolvedValue(book);
  const startBook = new StartBook(bookRepository);

  const startBookDTO: StartBookDTO = {
    readerId: ownerId,
    bookId: book.id
  };

  await startBook.execute(startBookDTO);

  expect(book.domainEvents[0].type).toBe("book-started");
  expect(bookRepository.save).toHaveBeenCalled();
});

//when: user ask to start a book
//given: that the user doesn't own the book
//then: startBook.execute return an Error
test("start a book not own", async () => {
  const ownerId = EntityId.create();
  const book = Book.create({ ownerId, novelId: EntityId.create() });
  const bookRepository = mockInterface<BookRepository>();
  bookRepository.getBookById.mockResolvedValue(book);
  const startBook = new StartBook(bookRepository);

  const startBookDTO: StartBookDTO = {
    readerId: EntityId.create(),
    bookId: book.id
  };

  await expect(() => startBook.execute(startBookDTO)).rejects.toThrow(
    /don't own/
  );
});

//when: user ask to start a book
//given: that the book doesn't exist
//then: startBook.execute return an Error
test("start a unexisting book", async () => {
  const bookRepository = mockInterface<BookRepository>();
  bookRepository.getBookById.mockResolvedValue(undefined);
  const startBook = new StartBook(bookRepository);

  const startBookDTO: StartBookDTO = {
    readerId: EntityId.create(),
    bookId: EntityId.create()
  };

  await expect(() => startBook.execute(startBookDTO)).rejects.toThrow(
    /doesn't exist/
  );
});
