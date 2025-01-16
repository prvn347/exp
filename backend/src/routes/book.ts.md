# Book Routes API Documentation

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [1. Introduction](#1-introduction)
* [2.  Route Overview](#2-route-overview)
    * [2.1. `/create`](#21-create)
    * [2.2. `/update`](#22-update)
    * [2.3. `/getByUser`](#23-getbyuser)
    * [2.4. `/getById`](#24-getbyid)
    * [2.5. `/search`](#25-search)
    * [2.6. `/delete`](#26-delete)
    * [2.7. `/findAvailableBooks`](#27-findavailablebooks)
    * [2.8. `/sendExchangeRequest`](#28-sendexchangerequest)
    * [2.9. `/acceptExchangeRequest`](#29-acceptexchangerequest)
* [3. Error Handling](#3-error-handling)


## 1. Introduction

This document details the API endpoints for managing books within the application.  All routes are defined using Express.js router. The routes utilize a `bookControllers` class  to handle business logic. Authentication middleware (`user` from `../middleware/user`) is applied to routes requiring user authentication.


## 2. Route Overview

All routes return JSON responses.  A status code of 201 (Created) indicates success, while 500 (Internal Server Error) indicates failure.  Error details are included in the response body.

| Method | Route             | Description                                      | Authentication | Request Body    | Query Params  | Response Body |
|--------|----------------------|-------------------------------------------------|-----------------|-----------------|----------------|----------------|
| POST    | `/create`           | Creates a new book.                             | No              | Book details    |                | Created book   |
| POST    | `/update`           | Updates an existing book.                        | Yes             | Updated book details | `bookId`       | Updated book   |
| POST    | `/getByUser`        | Retrieves books for a specific user.             | Yes             |                 |                | Array of books |
| POST    | `/getById`          | Retrieves a book by ID.                         | Yes             |                 | `bookId`       | Book           |
| POST    | `/search`           | Searches for books based on provided criteria.   | No              | Search criteria |                | Array of books |
| POST    | `/delete`           | Deletes a book.                                 | Yes             |                 | `bookId`       | Deletion result|
| GET     | `/findAvailableBooks` | Retrieves books available for exchange by user. | Yes             |                 |                | Array of books |
| POST    | `/sendExchangeRequest` | Sends a book exchange request.                  | Yes             | Exchange details|                | Request result |
| POST    | `/acceptExchangeRequest` | Accepts a book exchange request.                | Yes             |                 | `exchangeId`   | Result         |


### 2.1. `/create`

This endpoint creates a new book entry.  The request body should contain the necessary book details. The `bookController.createBook` function handles the creation logic, likely involving database interaction.


### 2.2. `/update`

This endpoint updates an existing book. It requires authentication.  The `bookId` is passed as a query parameter, and updated book details are sent in the request body. The `bookController.updateBook` function handles the update operation, likely using the `bookId` to identify the record in the database.


### 2.3. `/getByUser`

This endpoint retrieves all books associated with the currently authenticated user.  The user ID is obtained from the authentication middleware. The `bookController.getBookByUserId` function fetches the books from the database based on the user ID.


### 2.4. `/getById`

This endpoint retrieves a single book by its ID.  Authentication is required. The `bookId` is passed as a query parameter. The `bookController.getBookById` function retrieves the book using the provided ID.


### 2.5. `/search`

This endpoint allows searching for books based on criteria specified in the request body. The `bookController.searchBooks` function likely performs a database query based on these criteria.  The exact search algorithm will depend on the database and the structure of the book data.


### 2.6. `/delete`

This endpoint deletes a book. Authentication is required.  The `bookId` is a query parameter. The `userId` is obtained from the authentication middleware to ensure the user is authorized to delete the book. The `bookController.deleteBooks` function handles the deletion.


### 2.7. `/findAvailableBooks`

This endpoint retrieves books available for exchange by the authenticated user. The user ID is obtained from the authentication middleware. The `bookController.findAvailableBooks` function likely queries the database for books that meet the availability criteria (e.g., not already part of an exchange).


### 2.8. `/sendExchangeRequest`

This endpoint allows users to send a book exchange request. The details of the exchange are provided in the request body. The `bookController.sendExchangeRequest` function handles the creation and processing of the exchange request, which likely involves database updates and potentially notification mechanisms.


### 2.9. `/acceptExchangeRequest`

This endpoint allows users to accept an existing book exchange request. The `exchangeId` is a query parameter. The `bookController.acceptExchangeRequest` function updates the database to reflect the acceptance of the exchange request and performs any necessary actions, potentially involving updating book ownership and sending notifications.


## 3. Error Handling

All endpoints include a `try...catch` block to handle potential errors.  If an error occurs during any database or business logic operation, a 500 status code is returned along with the error details in the response body.  This allows for better debugging and error identification.
