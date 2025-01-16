import { ZodError } from "zod";
import { bookMetaType, BookValidationSchema } from "../types/book";

export class bookInputParserVerifier {
  static verifyBookCreateMeta(userInput: bookMetaType) {
    try {
      BookValidationSchema.parse(userInput);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error for book input:", error.errors);
      } else {
        console.error("Unexpected error while validating book input:", error);
      }
      throw error;
    }
  }
}
