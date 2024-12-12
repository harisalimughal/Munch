const express = require("express");
const recipes = require("./data/recipes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const cors = require("cors");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

// app.get('/', (req,res)=>{
//  res.send("Api is running")
// })

// app.get("/api/recipes", (req, res) => {
// res.json(recipes);
// });

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use(notFound);
app.use(errorHandler);





// app.get("/api/recipes/:id", (req, res) => {
//   const recipe = recipes.find((n) => n.id === req.params.id);
//   res.json(recipe);
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
