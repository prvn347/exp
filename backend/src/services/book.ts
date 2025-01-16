import { PrismaClient } from "@prisma/client";
import { bookMetaType, SearchParams } from "../types/book";
import { string } from "zod";

export class bookServices {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  private normalizeBookData(
    title: string,
    author: string,
    isbn?: string
  ): string {
    const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, "");
    const normalizedAuthor = author.toLowerCase().replace(/[^a-z0-9]/g, "");
    const normalizedIsbn = isbn ? isbn.replace(/[^0-9X]/gi, "") : "";

    return `${normalizedTitle}-${normalizedAuthor}-${normalizedIsbn}`;
  }
  private async checkDuplicateBook(
    userId: string,
    title: string,
    author: string,
    isbn?: string
  ) {
    const userBooks = await this.prisma.book.findMany({
      where: { ownerId: userId },
    });

    const normalizedInput = this.normalizeBookData(title, author, isbn);

    const duplicate = userBooks.find((book) => {
      const normalizedExisting = this.normalizeBookData(
        book.title,
        book.author,
        book.isbn || undefined
      );
      return normalizedInput === normalizedExisting;
    });

    return duplicate || null;
  }
  async createBook(bookMeta: bookMetaType) {
    try {
      const duplicate = await this.checkDuplicateBook(
        bookMeta.ownerId,
        bookMeta.title,
        bookMeta.author,
        bookMeta.isbn
      );
      if (duplicate) {
        throw new Error(
          "You have already listed this book. If this is a different edition, please add edition details to differentiate it."
        );
      }

      const book = await this.prisma.book.create({
        data: {
          title: bookMeta.title,
          description: bookMeta.description,
          genre: bookMeta.genre,
          condition: bookMeta.condition,
          author: bookMeta.author,
         owner:{
          connect:{
            id:bookMeta.ownerId
          }
         }
        },
      });

      return book
    } catch (error) {
      throw new Error("Error while creating book: " + error);

    }
  }
 async getBooksByUser(userId: string) {
    try {
      const userExist = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if(!userExist){ 
        throw new Error("User not found");
      }
      const books = await this.prisma.book.findMany({
        where: {
          ownerId: userId,
        },
      });
      return books;
    } catch (error) {
      throw new Error("Error while fetching books: " + error);
    }
  }
  async getBookById(bookId: string) {
    try {
      const book = await this.prisma.book.findUnique({
        where: {
          id: bookId,
        },
      });
      if (!book) {
        throw new Error("Book not found");
      }
      return book;
    } catch (error) {
      throw new Error("Error while fetching book: " + error);
    }
  }
  async updateBook(bookId: string, bookMeta: bookMetaType) {
    try {
      const book = await this.prisma.book.findUnique({
        where: {
          id: bookId,
          ownerId: bookMeta.ownerId,
       
        },
      });
      if (!book) {
        throw new Error("Book not found");
      }
      const updatedBook = await this.prisma.book.update({
        where: {
          id: bookId,
          ownerId: bookMeta.ownerId,
        },
        data: {
          title: bookMeta.title,
          description: bookMeta.description,
          genre: bookMeta.genre,
          author: bookMeta.author,
        },
      });
      return updatedBook;
    } catch (error) { 
      throw new Error("Error while updating book: " + error);
    }
  }
  async getAllBooks(userId:string){
    try {
      const books = await this.prisma.book.findMany({
        where:{
          ownerId:{
            not:userId
          }
        }
      })
      return books
    } catch (error) {
      throw new Error("Error while getting book:" + error)
      
    }

  }

  async searchByName(params:SearchParams){
    const page = params.page || 1;
    const pageSize = params.pageSize || 10;
    const skip = (page - 1) * pageSize;
    let whereClause: any = {};
    if (params.keyword) {
      whereClause = {
        OR: [
          {
            title: {
              contains: params.keyword,
              mode: 'insensitive' 
            }
          },
          {
            author: {
              contains: params.keyword,
              mode: 'insensitive'
            }
          }
        ]
      };
    }
    if (params.genre) {
      whereClause.genre = params.genre;
    }
    
    if (params.condition) {
      whereClause.condition = params.condition;
    }
    try {
      const books = await this.prisma.book.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        include: {
          owner: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc' 
        }
      })
      const count = await this.prisma.book.count({
        where: whereClause
      })
      
      const totalPages = Math.ceil(count / pageSize);
      return {
        books,
        metadata: {
          currentPage: page,
          pageSize,
          count,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1
        }
      };
      
    } catch (error) {
      throw new Error("Error while searching book: " + error)
      
    }
  }
}
