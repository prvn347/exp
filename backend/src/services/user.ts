import {  userLoginType, userSignupType } from "../types/user";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtUtils";
import { string } from "zod";
import { validationError } from "../utils/error";
const prisma = new PrismaClient();

export class userServices {
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
  
}