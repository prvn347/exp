# Internal Code Documentation: Book Management API

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [1. Introduction](#1-introduction)
* [2. Data Validation (BookValidationSchema)](#2-data-validation-bookvalidationschema)
* [3. Data Types](#3-data-types)
    * [3.1 `bookMetaType`](#31-bookmetatype)
    * [3.2 `SearchParams`](#32-searchparams)
    * [3.3 `exchangeMeta`](#33-exchangemeta)


## 1. Introduction

This document details the data structures and validation schemas used in the Book Management API.  The primary focus is on ensuring data integrity and consistency throughout the application.  The code leverages Zod for schema validation, providing strong typing and runtime checks.


## 2. Data Validation (`BookValidationSchema`)

The `BookValidationSchema` uses the Zod library to define a schema for validating book data.  This schema ensures that all required fields are present and meet specific criteria.  The schema is defined as follows:

| Field          | Type              | Constraints                               | Description                                      |
|-----------------|----------------------|-------------------------------------------|--------------------------------------------------|
| `title`        | `z.string().min(1, "Title is required")` | Minimum length 1, required.                    | Title of the book.                               |
| `author`       | `z.string().min(1, "Author is required")` | Minimum length 1, required.                    | Author of the book.                               |
| `isbn`         | `z.string().optional()` | Optional.                                  | ISBN number of the book (optional).               |
| `genre`        | `z.enum([...])`       | Must be one of the enumerated genre values. | Genre of the book (required).                    |
| `description`  | `z.string().optional()` | Optional.                                  | Description of the book (optional).              |
| `condition`    | `z.enum(["NEW", "LIKE_NEW", ...])` | Must be one of the enumerated condition values.| Condition of the book (required).               |
| `ownerId`      | `z.string().min(1, "Owner is required")` | Minimum length 1, required.                    | ID of the book owner (required).                 |


The `z.enum()` function enforces that the `genre` and `condition` fields only accept values from predefined lists, ensuring data consistency.  The `z.string().min(1, "Error Message")` ensures that string fields are not empty and provides a helpful error message upon validation failure.  The `optional()` modifier allows fields to be omitted.


## 3. Data Types

This section describes the TypeScript types derived from the Zod schemas and custom interfaces.

### 3.1 `bookMetaType`

This type is inferred from the `BookValidationSchema` using `z.infer<typeof BookValidationSchema>`. It represents the shape of a valid book object:

```typescript
type bookMetaType = {
  title: string;
  author: string;
  isbn?: string;
  genre: "FICTION" | "NON_FICTION" | "MYSTERY" | ...; // All genre enum values
  description?: string;
  condition: "NEW" | "LIKE_NEW" | "GOOD" | "VERY_GOOD" | "FAIR" | "POOR";
  ownerId: string;
};
```

This type provides compile-time safety, ensuring that any book object conforms to the defined schema.


### 3.2 `SearchParams`

This interface defines the parameters for searching books:

| Parameter   | Type       | Description                                  |
|-------------|------------|----------------------------------------------|
| `keyword`   | `string?`  | Optional keyword for searching book titles or authors. |
| `genre`     | `Genre`    | Optional genre filter.                       |
| `condition` | `Condition` | Optional condition filter.                    |
| `page`      | `number?`  | Optional page number for pagination.         |
| `pageSize`  | `number?`  | Optional page size for pagination.          |


The optional parameters (`?`) allow for flexible search queries.


### 3.3 `exchangeMeta`

This type describes metadata for book exchanges:

```typescript
type exchangeMeta = {
  senderId: string;
  receiverId: string;
  bookId: string;
  message?: string;
};
```

This type includes IDs for the sender and receiver, the ID of the book being exchanged, and an optional message.
