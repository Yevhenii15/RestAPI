import mongoose from "mongoose";
import { userModel } from "../models/userModel";
import { productModel } from "../models/productModel";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";

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
    const user1 = new userModel();
    user1.name = faker.person.fullName();
    user1.email = faker.internet.email();
    user1.password = faker.internet.password();
    await user1.save();
    console.log("Users seeded");

    // Seed products
    await productModel.insertMany([
      {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        imageURL: "https://picsum.photos/500/500",
        price: faker.commerce.price({ min: 5, max: 5000 }),
        stock: faker.number.int({ min: 0, max: 200 }),
        isOnDiscount: faker.datatype.boolean(0.5),
        discountPct: faker.number.int({ min: 0, max: 100 }),
        isHidden: false,
        _createdBy: user1.id,
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
