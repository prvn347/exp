# Internal Code Documentation: Authentication Middleware

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [1. Overview](#1-overview)
* [2. `user` Middleware Function](#2-user-middleware-function)
    * [2.1 Function Signature](#21-function-signature)
    * [2.2 Algorithm and Logic](#22-algorithm-and-logic)
    * [2.3 Error Handling](#23-error-handling)


## 1. Overview

This document details the implementation of the `user` middleware function, responsible for authenticating users based on JWTs (JSON Web Tokens) passed in the authorization header of incoming requests.  The middleware extends the Express request object to include user information for subsequent processing.


## 2. `user` Middleware Function

This middleware function intercepts incoming requests and verifies the authenticity of the provided JWT.  Upon successful verification, user information is attached to the request object.

### 2.1 Function Signature

```typescript
export function user(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void;
```

| Parameter | Type             | Description                                      |
|-----------|------------------|--------------------------------------------------|
| `req`     | `AuthRequest`    | Extended Express request object. Contains the user data after successful authentication. |
| `res`     | `Response`       | Express response object.                         |
| `next`    | `NextFunction`   | Express next middleware function.                 |


### 2.2 Algorithm and Logic

The `user` middleware function performs the following steps:

1. **Retrieve Token:** Extracts the JWT from the `Authorization` header of the request. The token is expected to be formatted as "Bearer &lt;token&gt;".  It splits the header string by space and takes the second part.

2. **Token Validation:** Checks if a token was provided. If not, it sends a 401 Unauthorized response with an appropriate error message.

3. **JWT Verification:** Uses the `verifyToken` function (from `../utils/jwtUtils`) to verify the JWT's signature and integrity. This function likely uses a secret key to decrypt and validate the token.  The result is a `JwtPayload` object containing user information.

4. **Payload Validation:** Checks if the `verifyToken` function returned a valid `JwtPayload`. If not, it sends a 401 Unauthorized response indicating an invalid token payload.

5. **Attach User Data:** If the token is valid, the decoded `payload` (containing user information) is attached to the `req.user` property.

6. **Proceed to Next Middleware:** Calls `next()` to pass control to the next middleware function in the chain.

### 2.3 Error Handling

The middleware uses a `try...catch` block to handle potential errors during JWT verification. If an error occurs (e.g., invalid token signature, expired token), it logs the error to the console and sends a 401 Unauthorized response with a generic error message.  This prevents the application from crashing due to authentication failures and provides informative error responses to clients.
