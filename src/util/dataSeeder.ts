import mongoose from "mongoose";
import { userModel } from "../models/userModel";
import { productModel } from "../models/productModel";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.DBHOST || "mongodb://localhost:27017/testdb";

const seedData = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");

    // Clear existing data
    await userModel.deleteMany();
    await productModel.deleteMany();
    console.log("Existing data cleared");

    // Seed users
    const users = await userModel.insertMany([
      {
        name: "John Doe",
        email: "john@example.com",
        password: "hashedpassword",
        registerDate: new Date(),
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "hashedpassword",
        registerDate: new Date(),
      },
    ]);
    console.log("Users seeded");

    // Seed products
    await productModel.insertMany([
      {
        name: "Sample Product 1",
        description: "This is a sample product.",
        imageURL: "https://example.com/image1.jpg",
        price: 29.99,
        stock: 100,
        isOnDiscount: true,
        discountPct: 10,
        isHidden: false,
        _createdBy: users[0].id,
      },
      {
        name: "Sample Product 2",
        description: "Another product example.",
        imageURL: "https://example.com/image2.jpg",
        price: 49.99,
        stock: 50,
        isOnDiscount: false,
        discountPct: 0,
        isHidden: false,
        _createdBy: users[1].id,
      },
    ]);
    console.log("Products seeded");

    mongoose.disconnect();
    console.log("Seeding completed");
  } catch (error) {
    console.error("Error seeding data:", error);
    mongoose.disconnect();
    process.exit(1);
  }
};

seedData();
