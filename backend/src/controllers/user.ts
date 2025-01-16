import { userServices } from "../services/user";
import {  userLoginType, userSignupType } from "../types/user";
import { userInputParserVerifier } from "../utils/userInputParser";

export class userControllers {
  userServices: userServices;
  userInputParserVerifier: userInputParserVerifier;

  constructor() {
    this.userServices = new userServices();
    this.userInputParserVerifier = new userInputParserVerifier();
  }
  async createUser(userInput: userSignupType) {
    try {
      userInputParserVerifier.verifyUserSignupInput(userInput);
      return await this.userServices.createUser(userInput);
    } catch (error) {
      return new Error("error while creating user");
    }
  }
  async loginUser(userInput: userLoginType) {
    try {
      userInputParserVerifier.verifyUserLoginInput(userInput);
      return await this.userServices.loginUser(userInput);
    } catch (error) {
      return new Error("error while login user");
    }
  }
  
}