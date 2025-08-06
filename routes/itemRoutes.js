// routes/itemRoutes.js
import express from "express";
import {
  createItemSchema,
  updateItemSchema,
  ZodError,
} from "../schemas/itemSchema.js";
import * as service from "../services/itemService.js";

const router = express.Router();

router.post("/items", async (req, res) => {
  try {
    const data = createItemSchema.parse(req.body);
    const item = await service.createItem(data);
    res.status(201).json(item);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
});

router.get("/items", async (_, res) => {
  try {
    const items = await service.getAllItems();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/items/:id", async (req, res) => {
  try {
    const item = await service.getItemById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item não encontrado" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/items/:id", async (req, res) => {
  try {
    const data = updateItemSchema.parse(req.body);
    const item = await service.updateItem(req.params.id, data);
    if (!item) return res.status(404).json({ error: "Item não encontrado" });
    res.json(item);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
});

router.patch("/items/:id", async (req, res) => {
  try {
    // valida só os campos que vieram
    const data = updateItemSchema.parse(req.body);
    const item = await service.patchItem(req.params.id, data);
    if (!item) return res.status(404).json({ error: "Item não encontrado" });
    res.json(item);
  } catch (err) {
    if (err instanceof ZodError)
      return res.status(400).json({ errors: err.errors });
    res.status(500).json({ error: err.message });
  }
});

router.delete("/items/:id", async (req, res) => {
  try {
    await service.deleteItem(req.params.id);
    res.json({ message: "Item removido com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
