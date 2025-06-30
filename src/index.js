import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import movimientosRoutes from "./routes/movimientos.js";
import categoriasRoutes from "./routes/categorias.js"
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(morgan("dev"));

// const allowedOrigins = [
//     "https://fronton-tesoreria-app.vercel.app",
//     "http://localhost:3000"
// ];

app.use(cors({
  origin: true,          // refleja dinámicamente el origin que hace la petición
  credentials: true      // si usás cookies o headers de autenticación
}));


app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/movimientos", movimientosRoutes);
app.use("/api/categorias", categoriasRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
