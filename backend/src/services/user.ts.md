# Internal Code Documentation: User Services

[Linked Table of Contents](#table-of-contents)

## <a name="table-of-contents"></a>Table of Contents

* [1. Introduction](#introduction)
* [2. `createUser` Method](#createuser-method)
* [3. `loginUser` Method](#loginuser-method)


## <a name="introduction"></a>1. Introduction

This document details the functionality of the `userServices` class, which handles user creation and login within the application.  The class utilizes Prisma Client for database interactions and bcrypt for password hashing.  Error handling is implemented using a custom `validationError` function (defined elsewhere).


## <a name="createuser-method"></a>2. `createUser` Method

```typescript
async createUser(userMeta: userSignupType) {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: userMeta.email,
        },
      });
      if (existingUser) {
        throw new Error("Email or username already exists");
      }
      const hashedPassword = await bcrypt.hashSync(userMeta.password, 10);
      const newUser = await prisma.user.create({
        data: {
          email: userMeta.email,
          name: userMeta.name,
          password: hashedPassword,
        },
        select: {
          name: true,
          email: true,
        },
      });

      return { msg: "user created", data: newUser };
    } catch (error) {
      console.log(error);
      validationError(error as Error);
    }
  }
```

**Functionality:** This method creates a new user account.

**Algorithm:**

1. **Check for Existing User:** It first checks if a user with the provided email already exists in the database using `prisma.user.findFirst`.
2. **Hash Password:** If no existing user is found, the provided password is hashed using `bcrypt.hashSync` with a salt factor of 10. This enhances security by making it computationally expensive to reverse the hashing process.
3. **Create User:** A new user record is created in the database using `prisma.user.create`.  Only the `name` and `email` fields are selected for return (`select` option) to prevent sensitive data exposure.
4. **Return Success:** Upon successful creation, a success message and the new user's data (name and email) are returned.
5. **Error Handling:**  Any errors during the process are caught, logged to the console, and passed to the `validationError` function for centralized error handling.


## <a name="loginuser-method"></a>3. `loginUser` Method

```typescript
async loginUser(userMeta: userLoginType) {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: userMeta.email,
        },
      });
      if (!existingUser) {
        throw new Error("user not found");
      }

      const hashedPassword = existingUser?.password;
      const isValidPassword = await bcrypt.compare(
        userMeta.password,
        hashedPassword as string
      );

      if (!isValidPassword) {
        throw new Error("Invalid password");
      }

      const token = generateToken(existingUser.id);

      return { token };
    } catch (error) {
      console.error(error);
      validationError(error as Error);
    }
  }
```

**Functionality:** This method authenticates an existing user.

**Algorithm:**

1. **Retrieve User:** It retrieves the user from the database based on the provided email using `prisma.user.findFirst`.
2. **Password Verification:** If a user is found, it compares the provided password with the stored hashed password using `bcrypt.compare`.  `bcrypt.compare` is a secure method to verify passwords without needing to access the original plain text password.
3. **Token Generation:** If the passwords match, a JSON Web Token (JWT) is generated using the `generateToken` function (defined elsewhere), using the user's ID as a payload.
4. **Return Token:** The generated token is returned to the client.
5. **Error Handling:** Errors (user not found or incorrect password) are caught, logged, and handled by the `validationError` function.

**Data Structures:**

| Name          | Type                     | Description                                      |
|---------------|--------------------------|--------------------------------------------------|
| `userMeta`    | `userSignupType` / `userLoginType` | Object containing user data (email, password, name for signup).  |
| `existingUser` | `User` (Prisma model)     | User object retrieved from the database.         |
| `hashedPassword` | `string`                 | Hashed password from database.                   |
| `isValidPassword` | `boolean`               | Result of password comparison.                   |
| `token`       | `string`                 | Generated JWT.                                   |


