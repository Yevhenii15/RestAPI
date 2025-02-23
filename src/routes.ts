import { Router, Request, Response } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductByQuery,
} from "./controllers/productController";

import {
  registerUser,
  loginUser,
  verifyToken,
} from "./controllers/authController";

const router: Router = Router();

// get, post, put, delete (CRUD)

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to the API");
});

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.get("/products/query/:key/:val", getProductByQuery);
router.put("/products/:id", updateProductById);
router.delete("/products/:id", verifyToken, deleteProductById);

// Auth routes
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

export default router;
