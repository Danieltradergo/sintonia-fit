import { Router } from "express";

export const recipeRouter = Router();

recipeRouter.get("/", (req, res) => {
  res.json([
    { id: "1", name: "Grilled Chicken", ingredients: ["chicken", "salt", "pepper"] },
    { id: "2", name: "Pasta", ingredients: ["pasta", "tomato", "garlic"] },
  ]);
});

recipeRouter.post("/", (req, res) => {
  res.json({ success: true, message: "Recipe created" });
});
