# Book Controllers Documentation

[Linked Table of Contents](#table-of-contents)

## Table of Contents <a name="table-of-contents"></a>

* [1. Introduction](#introduction)
* [2. Class `bookControllers`](#class-bookcontrollers)
    * [2.1 Constructor](#constructor)
    * [2.2 `createBook` Method](#createbook-method)
    * [2.3 `updateBook` Method](#updatebook-method)
    * [2.4 `getBookByUserId` Method](#getbookbyuserid-method)
    * [2.5 `getBookById` Method](#getbookbyid-method)
    * [2.6 `searchBooks` Method](#searchbooks-method)
    * [2.7 `deleteBooks` Method](#deletebooks-method)
    * [2.8 `findAvailableBooks` Method](#findavailablebooks-method)
    * [2.9 `sendExchangeRequest` Method](#sendexchangerequest-method)
    * [2.10 `acceptExchangeRequest` Method](#acceptexchangerequest-method)


## 1. Introduction <a name="introduction"></a>

This document details the `bookControllers` class, which acts as an intermediary between the application's routes and the underlying book services. It handles requests related to book creation, retrieval, updating, deletion, searching, and exchange.  Error handling is implemented using `try...catch` blocks to return generic error messages to the calling function.


## 2. Class `bookControllers` <a name="class-bookcontrollers"></a>

This class utilizes dependency injection to access `bookServices` for data operations and `bookInputParserVerifier` for input validation.

### 2.1 Constructor <a name="constructor"></a>

```typescript
constructor() {
    this.bookServices = new bookServices();
    this.bookInputParserVerifier = new bookInputParserVerifier();
}
```

The constructor initializes instances of `bookServices` and `bookInputParserVerifier`. This allows for easy testing and potential swapping of implementations in the future.

### 2.2 `createBook` Method <a name="createbook-method"></a>

```typescript
async createBook(bookMeta: bookMetaType) {
    try {
        bookInputParserVerifier.verifyBookCreateMeta(bookMeta);
        const book = await this.bookServices.createBook(bookMeta);
        return book;
    } catch (error) {
        return new Error("error while creating book");
    }
}
```

This method creates a new book.  It first verifies the input `bookMeta` using `bookInputParserVerifier.verifyBookCreateMeta()`. If verification succeeds, it calls `bookServices.createBook()` to persist the book data.  Any errors during creation are caught and a generic error message is returned.


### 2.3 `updateBook` Method <a name="updatebook-method"></a>

```typescript
async updateBook(bookId: string, bookMeta: bookMetaType) {
    try {
        bookInputParserVerifier.verifyBookCreateMeta(bookMeta);
        const book = await this.bookServices.updateBook(bookId, bookMeta);
        return book;
    } catch (error) {
    }
}
```

This method updates an existing book.  Similar to `createBook`, it validates the input `bookMeta` before calling `bookServices.updateBook()` with the `bookId` and updated metadata.  Error handling is included.


### 2.4 `getBookByUserId` Method <a name="getbookbyuserid-method"></a>

```typescript
async getBookByUserId(userId: string) {
    try {
        const book = await this.bookServices.getBooksByUser(userId);
        return book;
    } catch (error) {
        return new Error("error while getting book");
    }
}
```

Retrieves books associated with a specific user ID using `bookServices.getBooksByUser()`.  Generic error handling is included.

### 2.5 `getBookById` Method <a name="getbookbyid-method"></a>

```typescript
async getBookById(bookId: string) {
    try {
        const book = await this.bookServices.getBookById(bookId);
        return book;
    } catch (error) {
        return new Error("error while getting book");
    }
}
```

Retrieves a book using its ID via `bookServices.getBookById()`. Generic error handling is implemented.


### 2.6 `searchBooks` Method <a name="searchbooks-method"></a>

```typescript
async searchBooks(params: SearchParams) {
    try {
        const books = await this.bookServices.searchBooks(params);
        return books;
    } catch (error) {
        return new Error("error while searching books");
    }
}
```

This method searches for books based on the provided `SearchParams`.  It uses `bookServices.searchBooks()` to perform the search and returns the results.  Generic error handling is provided.  The specific search algorithm is implemented within the `bookServices` class.


### 2.7 `deleteBooks` Method <a name="deletebooks-method"></a>

```typescript
async deleteBooks(bookId: string, userId: string) {
    try {
        const book = await this.bookServices.deleteBook(bookId, userId);
        return book;
    } catch (error) {
        return new Error("error while deleting book");
    }
}
```

Deletes a book using its ID and the user ID.  It uses  `bookServices.deleteBook()` and includes error handling.


### 2.8 `findAvailableBooks` Method <a name="findavailablebooks-method"></a>

```typescript
async findAvailableBooks(userId: string) {
    try {
        const books = await this.bookServices.findAvailableBooks(userId);
        return books;
    } catch (error) {
        return new Error("error while finding books");
    }
}
```

Finds available books for a given user ID.  The specific logic for determining "available" is within the `bookServices` class.  Error handling is included.


### 2.9 `sendExchangeRequest` Method <a name="sendexchangerequest-method"></a>

```typescript
async sendExchangeRequest(exchangeMeta: exchangeMeta) {
    try {
        const exchange = await this.bookServices.sendExchangeRequest(exchangeMeta);
        return exchange;
    } catch (error) {
        return new Error("error while sending exchange request");
    }
}
```

Sends a book exchange request using the provided `exchangeMeta`.  The underlying logic is handled by `bookServices.sendExchangeRequest()`.


### 2.10 `acceptExchangeRequest` Method <a name="acceptexchangerequest-method"></a>

```typescript
async acceptExchangeRequest(exchangeId: string) {
    try {
        const exchange = await this.bookServices.acceptExchangeRequest(exchangeId);
        return exchange;
    } catch (error) {
        return new Error("error while accepting exchange request");
    }
}
```

Accepts a book exchange request using its ID via `bookServices.acceptExchangeRequest()`.  Error handling is included.

