import { Router, Request, Response } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "./controllers/productController";

const router: Router = Router();

// get, post, put, delete (CRUD)

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to the API");
});

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProductById);
router.delete("/products/:id", deleteProductById);

export default router;
