# User Controllers Documentation

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [1. Overview](#1-overview)
* [2. Class: `userControllers`](#2-class-usercontrollers)
    * [2.1 Constructor](#21-constructor)
    * [2.2 Method: `createUser(userInput: userSignupType)`](#22-method-createuseruserinput-usersignuptype)
    * [2.3 Method: `loginUser(userInput: userLoginType)`](#23-method-loginuseruserinput-userlogintype)


## 1. Overview

This document provides internal code documentation for the `userControllers` class. This class handles user creation and login functionality, interacting with the `userServices` and `userInputParserVerifier` classes.  Error handling is implemented using `try...catch` blocks to return generic error messages to the calling function.

## 2. Class: `userControllers`

This class acts as an intermediary between the application's user interface and the underlying user services. It's responsible for validating user input and delegating the creation and login processes to the `userServices` class.

### 2.1 Constructor

```typescript
constructor() {
  this.userServices = new userServices();
  this.userInputParserVerifier = new userInputParserVerifier();
}
```

The constructor initializes instances of `userServices` and `userInputParserVerifier`.  This ensures that the controller has access to the necessary services for user management and input validation.  Dependency Injection could be considered for improved testability in future iterations.

### 2.2 Method: `createUser(userInput: userSignupType)`

```typescript
async createUser(userInput: userSignupType) {
  try {
    userInputParserVerifier.verifyUserSignupInput(userInput);
    return await this.userServices.createUser(userInput);
  } catch (error) {
    return new Error("error while creating user");
  }
}
```

This method handles the creation of new users.

1. **Input Validation:** It first calls `userInputParserVerifier.verifyUserSignupInput(userInput)` to validate the provided user signup data.  This ensures that the input conforms to the expected format and contains all required fields.  The specific validation rules are defined within the `userInputParserVerifier` class.

2. **User Creation:** If the input is valid, it calls `this.userServices.createUser(userInput)` to create the user in the underlying data store. This is an asynchronous operation, indicated by the `await` keyword.  The implementation details of this function reside within the `userServices` class.

3. **Error Handling:** A `try...catch` block is used to handle potential errors during the user creation process. If an error occurs, a generic error message ("error while creating user") is returned.  More specific error handling could be implemented to provide more informative error messages to the user.


### 2.3 Method: `loginUser(userInput: userLoginType)`

```typescript
async loginUser(userInput: userLoginType) {
  try {
    userInputParserVerifier.verifyUserLoginInput(userInput);
    return await this.userServices.loginUser(userInput);
  } catch (error) {
    return new Error("error while login user");
  }
}
```

This method handles user login requests.

1. **Input Validation:** Similar to `createUser`, it begins by calling `userInputParserVerifier.verifyUserLoginInput(userInput)` to validate the user login input.  The validation rules are specific to login input and defined within the `userInputParserVerifier` class.

2. **Login Processing:** If the input is valid, it calls `this.userServices.loginUser(userInput)` to authenticate the user against the underlying data store. This is also an asynchronous operation. The exact authentication algorithm is handled within the `userServices` class (likely involving password hashing comparison).

3. **Error Handling:** A `try...catch` block handles potential errors during the login process, returning a generic error message ("error while login user").  More sophisticated error handling (e.g., distinguishing between invalid credentials and database errors) is recommended for a production environment.

