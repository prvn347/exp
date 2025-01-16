import { bookServices } from "../services/book";
import { bookMetaType } from "../types/book";
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
}