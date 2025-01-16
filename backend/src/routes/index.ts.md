# Internal Documentation: `initialisedRoutes.ts`

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [1. Overview](#1-overview)
* [2. Function: `initialisedRoutes`](#2-function-initialisedroutes)
* [3. Algorithm Details](#3-algorithm-details)


## 1. Overview

This document details the implementation of the `initialisedRoutes` function found in `initialisedRoutes.ts`. This function is responsible for initializing and registering various routes within an Express.js application.  It leverages modularity by importing route definitions from separate modules.


## 2. Function: `initialisedRoutes`

The `initialisedRoutes` function takes an Express.js Application instance (`app: Application`) as input and configures it with several routes.

```typescript
export const initialisedRoutes = (app: Application) => {
  app.use("/user", userRoutes);
  app.use("/ping", (req, res) => {
    res.send("Pong");
  });
  app.use("/book", bookRoutes);
};

export default initialisedRoutes;
```

**Parameters:**

| Parameter | Type             | Description                                      |
|-----------|-------------------|--------------------------------------------------|
| `app`     | `Application`    | An instance of the Express.js application.      |


**Return Value:**

The function does not explicitly return a value; its primary function is to modify the provided Express application instance by adding routes.  It is exported as a default export for ease of importing.


**Functionality Breakdown:**

1. **User Routes:**  The line `app.use("/user", userRoutes);` mounts the routes defined in the `./user` module under the `/user` base URL. This delegates handling of all requests starting with `/user` to the `userRoutes` middleware.

2. **Ping Route:** The function includes a simple ping route:
   ```typescript
   app.use("/ping", (req, res) => {
     res.send("Pong");
   });
   ```
   This route responds to GET requests at `/ping` with a "Pong" message.  It serves as a basic health check endpoint.

3. **Book Routes:** Similarly, `app.use("/book", bookRoutes);` mounts the routes from the `./book` module under the `/book` base URL.  This handles requests beginning with `/book`.


## 3. Algorithm Details

The algorithm used by `initialisedRoutes` is straightforward. It's a simple sequential process:

1. **Route Registration:** The function iterates implicitly (through the sequential `app.use` calls) over the defined route modules (`userRoutes`, `/ping` and `bookRoutes`).

2. **Middleware Mounting:** For each route module, it uses the Express.js `app.use()` method to mount the corresponding middleware.  `app.use()` registers middleware functions that handle requests matching the specified path.

3. **Request Handling:**  When a request arrives, Express.js checks the request path against the registered routes.  The matching route's middleware function is then executed to process the request. The `/ping` route demonstrates a simple inline middleware function; however,  `userRoutes` and `bookRoutes` likely contain more complex logic within their respective modules.

The algorithm's efficiency is directly related to the efficiency of the underlying Express.js routing mechanism, which is generally optimized for performance.  The simplicity of the `initialisedRoutes` function itself ensures minimal overhead.
