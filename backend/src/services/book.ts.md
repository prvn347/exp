# Book Services Internal Documentation

## Table of Contents

* [1. Introduction](#1-introduction)
* [2. `bookServices` Class](#2-bookservices-class)
    * [2.1 `normalizeBookData` Method](#21-normalizedatamethod)
    * [2.2 `checkDuplicateBook` Method](#22-checkduplicatebook-method)
    * [2.3 `createBook` Method](#23-createbook-method)
    * [2.4 `getBooksByUser` Method](#24-getbooksbyuser-method)
    * [2.5 `getBookById` Method](#25-getbookbyid-method)
    * [2.6 `updateBook` Method](#26-updatebook-method)
    * [2.7 `findAvailableBooks` Method](#27-findavailablebooks-method)
    * [2.8 `deleteBook` Method](#28-deletebook-method)
    * [2.9 `searchBooks` Method](#29-searchbooks-method)
    * [2.10 `sendExchangeRequest` Method](#210-sendexchangerequest-method)
    * [2.11 `acceptExchangeRequest` Method](#211-acceptexchangerequest-method)


<a name="1-introduction"></a>
## 1. Introduction

This document details the internal workings of the `bookServices` class, which provides functionalities for managing book data within the application.  The class utilizes Prisma Client for database interactions.


<a name="2-bookservices-class"></a>
## 2. `bookServices` Class

The `bookServices` class encapsulates all business logic related to books. It uses the Prisma ORM to interact with the database.

<a name="21-normalizedatamethod"></a>
### 2.1 `normalizeBookData` Method

This method normalizes book data to facilitate duplicate detection.

| Parameter | Type | Description |
|---|---|---|
| `title` | `string` | The title of the book. |
| `author` | `string` | The author of the book. |
| `isbn` | `string` \| `undefined` | The ISBN of the book (optional). |

**Return Value:** `string` - A normalized string combining title, author, and ISBN, suitable for comparison.

**Algorithm:**
1. Converts title and author to lowercase.
2. Removes all characters except lowercase alphanumeric characters (`a-z0-9`) from title and author.
3. Removes all characters except numbers and 'X' (case-insensitive) from ISBN if provided; otherwise, sets it to an empty string.
4. Concatenates the normalized title, author, and ISBN with hyphens as separators.


<a name="22-checkduplicatebook-method"></a>
### 2.2 `checkDuplicateBook` Method

This method checks if a book with the given details already exists for a specific user.

| Parameter | Type | Description |
|---|---|---|
| `userId` | `string` | The ID of the book owner. |
| `title` | `string` | The title of the book. |
| `author` | `string` | The author of the book. |
| `isbn` | `string` \| `undefined` | The ISBN of the book (optional). |

**Return Value:** `Book` \| `null` - The duplicate book object if found, otherwise `null`.

**Algorithm:**
1. Retrieves all books belonging to the specified `userId` from the database.
2. Normalizes the input book data using `normalizeBookData`.
3. Iterates through the retrieved books, normalizing each book's data using `normalizeBookData`.
4. Compares the normalized input data with the normalized data of each existing book.
5. Returns the first matching book found, or `null` if no duplicates are found.


<a name="23-createbook-method"></a>
### 2.3 `createBook` Method

Creates a new book entry in the database.  It first checks for duplicates using `checkDuplicateBook`.

| Parameter | Type | Description |
|---|---|---|
| `bookMeta` | `bookMetaType` | An object containing book details. |

**Return Value:** `Promise<Book>` - The newly created book object.  Throws an error if a duplicate is found or database error occurs.


<a name="24-getbooksbyuser-method"></a>
### 2.4 `getBooksByUser` Method

Retrieves all books owned by a specific user.

| Parameter | Type | Description |
|---|---|---|
| `userId` | `string` | The ID of the book owner. |

**Return Value:** `Promise<Book[]>` - An array of book objects owned by the user. Throws an error if the user is not found or a database error occurs.


<a name="25-getbookbyid-method"></a>
### 2.5 `getBookById` Method

Retrieves a book by its ID.

| Parameter | Type | Description |
|---|---|---|
| `bookId` | `string` | The ID of the book. |

**Return Value:** `Promise<Book>` - The book object. Throws an error if the book is not found or a database error occurs.


<a name="26-updatebook-method"></a>
### 2.6 `updateBook` Method

Updates an existing book.  Authorization is checked to ensure only the owner can update the book.

| Parameter | Type | Description |
|---|---|---|
| `bookId` | `string` | The ID of the book to update. |
| `bookMeta` | `bookMetaType` | An object containing updated book details. |

**Return Value:** `Promise<Book>` - The updated book object. Throws an error if the book is not found, the user is not authorized, or a database error occurs.


<a name="27-findavailablebooks-method"></a>
### 2.7 `findAvailableBooks` Method

Finds books available for exchange, excluding books owned by the specified user and books with accepted exchange requests.

| Parameter | Type | Description |
|---|---|---|
| `userId` | `string` | The ID of the current user. |
| `genre` | `string` \| `undefined` | Optional genre filter. |

**Return Value:** `Promise<Book[]>` - An array of available books. Throws an error if a database error occurs.


<a name="28-deletebook-method"></a>
### 2.8 `deleteBook` Method

Deletes a book.  Authorization is checked to ensure only the owner can delete the book.

| Parameter | Type | Description |
|---|---|---|
| `bookId` | `string` | The ID of the book to delete. |
| `userId` | `string` | The ID of the user attempting to delete the book. |

**Return Value:** `Promise<string>` - A success message ("Book deleted successfully"). Throws an error if the book is not found, the user is not authorized, or a database error occurs.


<a name="29-searchbooks-method"></a>
### 2.9 `searchBooks` Method

Searches for books based on provided parameters (keyword, genre, condition, pagination).

| Parameter | Type | Description |
|---|---|---|
| `params` | `SearchParams` | An object containing search parameters (keyword, genre, condition, page, pageSize). |

**Return Value:** `Promise<{ books: Book[]; metadata: PaginationMetadata; }>` - An object containing an array of books and pagination metadata.  Throws an error if a database error occurs.

**Algorithm:**
1.  Handles pagination parameters (`page`, `pageSize`).
2.  Constructs a dynamic `whereClause` based on provided search parameters (`keyword`, `genre`, `condition`).  Uses `OR` clause for keyword search in title and author fields.  `contains` operator is used for case-insensitive partial matching.
3.  Performs database query using Prisma's `findMany` with the `whereClause`, `skip`, `take`, `include` (to include owner's name), and `orderBy` (by creation date descending).
4.  Calculates total pages based on the total count of matching books.
5.  Returns books and pagination metadata (current page, page size, total count, total pages, `hasNextPage`, `hasPreviousPage`).


<a name="210-sendexchangerequest-method"></a>
### 2.10 `sendExchangeRequest` Method

Sends an exchange request for a book.

| Parameter | Type | Description |
|---|---|---|
| `exchangeMeta` | `exchangeMeta` | An object containing exchange request details (senderId, receiverId, bookId, message). |

**Return Value:** `Promise<ExchangeRequest>` - The newly created exchange request object. Throws an error if the book is not found, the sender is trying to request their own book, the book is already exchanged, or a database error occurs.


<a name="211-acceptexchangerequest-method"></a>
### 2.11 `acceptExchangeRequest` Method

Accepts an exchange request.

| Parameter | Type | Description |
|---|---|---|
| `requestId` | `string` | The ID of the exchange request to accept. |

**Return Value:** `Promise<ExchangeRequest>` - The updated exchange request object. Throws an error if the exchange request is not found, the book is already exchanged, or a database error occurs.
