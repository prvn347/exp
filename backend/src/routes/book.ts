import { Request, Response, Router } from "express";
import { AuthRequest, user } from "../middleware/user";
import { bookControllers } from "../controllers/book";

const bookRoutes = Router();
bookRoutes.use(user)
const bookController = new bookControllers()
bookRoutes.post("/create", async (req:Request, res:Response) => {
  try {
    const resp = await bookController.createBook(req.body)
    
     res.status(201).json({
      resp
     })
  } catch (error) {
    res.status(500).json({ error: error });
  }
})
bookRoutes.post("/update", async (req:AuthRequest, res:Response) => {
  try {
    const bookId  = req.query.bookId
    const result = await bookController.updateBook(bookId as string,req.body)
    res.status(201).json({
      result
    })
  } catch (error) {
    res.status(500).json({ error: error });
    
  }
})
bookRoutes.post("/getByUser", async (req:AuthRequest, res:Response) => {
  try {
    const userId = req.user
    const result = await bookController.getBookByUserId(userId as string)
    res.status(201).json({
      result
    })
  } catch (error) {
    res.status(500).json({ error: error });
  }
})

bookRoutes.post("/getById", async (req:AuthRequest, res:Response) => {
  try {
    const bookId = req.query.bookId
    const result = await bookController.getBookById(bookId as string)
    res.status(201).json({
      result
    })
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
)
bookRoutes.post("/search", async (req:Request, res:Response) => {
  try {
    const result = await bookController.searchBooks(req.body)
    res.status(201).json({
      result
    })
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
)
bookRoutes.post("/delete", async (req:AuthRequest, res:Response) => {
  try {
    const bookId = req.query.bookId
    const userId = req.user
    const result = await bookController.deleteBooks(bookId as string,userId)
    res.status(201).json({
      result
    })
  } catch (error) {
    res.status(500).json({ error: error });
  }
})

bookRoutes.get("/findAvailabeBooks", async (req:AuthRequest, res:Response) => {
  try {
    const userId = req.user
    const result = await bookController.findAvailableBooks(userId)
    res.status(201).json({
      result
    })
  } catch (error) {
    res.status(500).json({ error: error });
  }
})
bookRoutes.post("/sendExchangeRequest", async (req:AuthRequest, res:Response) => {
  try {
    const exchangeMeta = req.body
    const result = await bookController.sendExchangeRequest(exchangeMeta)
    res.status(201).json({
      result
    })
  } catch (error) {
    res.status(500).json({ error: error });
  }
})
bookRoutes.post("/acceptExchangeRequest", async (req:AuthRequest, res:Response) => {
  try {
    const exchangeId = req.query.exchangeId
    const result = await bookController.acceptExchangeRequest(exchangeId as string)
    res.status(201).json({
      result
    })
  } catch (error) {
    res.status(500).json({ error: error });
  }
})

export default bookRoutes;