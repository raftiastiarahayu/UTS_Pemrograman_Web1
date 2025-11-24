import express from "express";
import cors from "cors";
import customersRoutes from "./routes/customers.js";

const app = express();
app.use(cors());
app.use(express.json());

// route utama
app.use("/customers", customersRoutes);

app.listen(3000, () => {
  console.log("API berjalan di http://localhost:3000");
});
