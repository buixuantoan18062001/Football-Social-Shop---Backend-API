require("dotenv").config();

const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");


const articleRoutes = require("./routes/articleRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const commentArticleRoutes = require("./routes/commentArticleRoutes");
const commentProductRoutes = require("./routes/commentProductRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const apiLimiter = require("./middleware/rateLimit");

const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger/swagger");

const errorHandler = require("./middleware/errorHandler");

const app = express();

connectDB();

/* Security */
app.use(helmet());

/* Rate limit */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

/* Logger */
app.use(morgan("dev"));


app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));


/* Disable cache */
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});


/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use("/api/articles",articleRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/orders",orderRoutes);

app.use("/api/article-comments", commentArticleRoutes);
app.use("/api/product-comments", commentProductRoutes);


app.use("/api/upload", uploadRoutes);
/* Swagger */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api/payment",paymentRoutes);
app.use(apiLimiter);



/* 404 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Not Found"
  });
});

/* Error Handler */
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});