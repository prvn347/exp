import { bookServices } from "../services/book";
import { bookMetaType, exchangeMeta, SearchParams } from "../types/book";
import { bookInputParserVerifier } from "../utils/bookInputParser&Verifier";


export class bookControllers {
    bookServices: bookServices;
    bookInputParserVerifier: bookInputParserVerifier;

   constructor (){
         this.bookServices = new bookServices();
            this.bookInputParserVerifier = new bookInputParserVerifier();
   }

    async createBook(bookMeta:bookMetaType){
         try {
              bookInputParserVerifier.verifyBookCreateMeta(bookMeta);
              const book = await this.bookServices.createBook(bookMeta);
              return book;
         } catch (error) {
              return new Error("error while creating book");
         }
    }
    async updateBook(bookId:string,bookMeta:bookMetaType){
     try {
          bookInputParserVerifier.verifyBookCreateMeta(bookMeta);
          const book = await this.bookServices.updateBook(bookId,bookMeta);
          return book;
          
          
     } catch (error) {
          
     }
    } 
    async getBookByUserId(userId:string){
           try {
                 const book = await this.bookServices.getBooksByUser(userId);
                 return book;
           } catch (error) {
                 return new Error("error while getting book");
           }
    }
    async getBookById(bookId:string){
           try {
                 const book = await this.bookServices.getBookById(bookId);
                 return book;
           } catch (error) {
                 return new Error("error while getting book");
           }
    }
    async searchBooks(params:SearchParams){
     try {
          const books = await this.bookServices.searchBooks(params);
          return books;
          
     } catch (error) {
          return new Error("error while searching books");
          
     }
    }
    async deleteBooks(bookId:string,userId:string){
     try {
          const book = await this.bookServices.deleteBook(bookId,userId);
          return book;
     } catch (error) {
          return new Error("error while deleting book");
     }
    }
    async findAvailableBooks(userId:string){
     try {
          const books = await this.bookServices.findAvailableBooks(userId);
          return books;
     } catch (error) {
          return new Error("error while finding books");
     }
    }
    async sendExchangeRequest(exchangeMeta:exchangeMeta){
     try {
          const exchange = await this.bookServices.sendExchangeRequest(exchangeMeta);
          return exchange;
     } catch (error) {
          return new Error("error while sending exchange request");
     }
    }
    async acceptExchangeRequest(exchangeId:string){
     try {
          const exchange = await this.bookServices.acceptExchangeRequest(exchangeId);
          return exchange;
     } catch (error) {
          return new Error("error while accepting exchange request");
     }
    }
    
}