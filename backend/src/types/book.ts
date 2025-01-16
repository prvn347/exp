
import { Condition, Genre } from "@prisma/client";
import z from "zod"


export const BookValidationSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    author: z.string().min(1, 'Author is required'),
    isbn: z.string().optional(),
    genre: z.enum(['FICTION', 'NON_FICTION', 'MYSTERY', 'SCIENCE_FICTION', 'FANTASY', 'ROMANCE', 'THRILLER', 'HORROR', 'BIOGRAPHY', 'HISTORY', 'SCIENCE', 'TECHNOLOGY', 'OTHER']),
    description: z.string().optional(),
    condition: z.enum(['NEW', 'LIKE_NEW', 'GOOD','VERY_GOOD', 'FAIR', 'POOR']),
    ownerId: z.string().min(1, 'Owner is required')
  });
  export type bookMetaType = z.infer<typeof BookValidationSchema>;

 export interface SearchParams {
    
    keyword?: string;
    genre?: Genre;
    condition?: Condition;
    page?: number;
    pageSize?: number;
  }
  