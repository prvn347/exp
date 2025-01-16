
import z from "zod"
export interface userSignupType{
    name:string,
    email:string,
    password:string
}

export const userSignupSchema = z.object({
    name: z.string().nonempty(),
    email: z.string().email().optional(),
    password: z.string().min(6)
})

export interface userLoginType{
    email:string,
    password:string
}

export const userLoginSchema = z.object({
    email:z.string().email(),
    password: z.string().min(6)
})


