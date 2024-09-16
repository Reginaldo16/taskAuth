import app from "./app.js";
import { connectDB } from "./db.js";

connectDB();

try {
  app.listen(3000, () => {
    console.log("servidor rodando na porta 3000");
  });
} catch (error) {
  console.log("Erro ao criar servidor");
}
