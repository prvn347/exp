export const validationError = (error: Error) => {
    if (error.name === "ValidationError") {
      throw new Error("Validation error user: " + error.message);
    } else {
      throw new Error("Database error user: " + error.message);
    }
  };