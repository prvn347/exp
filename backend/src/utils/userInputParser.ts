import { ZodError } from "zod";
import {
   
  userLoginSchema,
  userLoginType,
  userSignupSchema,
  userSignupType,
} from "../types/user";

export class userInputParserVerifier {
  static verifyUserSignupInput(userInput: userSignupType) {
    try {
      userSignupSchema.parse(userInput);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error for user input:", error.errors);
      } else {
        console.error("Unexpected error while validating user input:", error);
      }
      throw error;
    }
  }
  static verifyUserLoginInput(userInput: userLoginType) {
    try {
      userLoginSchema.parse(userInput);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error for user input:", error.errors);
      } else {
        console.error("Unexpected error while validating user input:", error);
      }
      throw error;
    }
  }
 
}
