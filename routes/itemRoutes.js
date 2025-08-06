/**
 * @openapi
 * components:
 *   schemas:
 *     ItemInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: MeuItem
 *         quantity:
 *           type: integer
 *           example: 10
 *       required:
 *         - name
 *         - quantity
 *     Item:
 *       allOf:
 *         - $ref: '#/components/schemas/ItemInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             created_at:
 *               type: string
 *               format: date-time
 *               example: 2025-08-06T13:45:00.123Z
 * tags:
 *   - name: Items
 *     description: Operações CRUD em itens
 */

import express from "express";
import {
  createItemSchema,
  updateItemSchema,
  ZodError,
} from "../schemas/itemSchema.js";
import * as service from "../services/itemService.js";

const router = express.Router();

/**
 * @openapi
 * /items:
 *   post:
 *     summary: Cria um novo item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       201:
 *         description: Item criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno
 */
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

/**
 * @openapi
 * /items:
 *   get:
 *     summary: Lista todos os itens
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Lista de itens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Erro interno
 */
router.get("/items", async (_, res) => {
  try {
    const items = await service.getAllItems();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @openapi
 * /items/{id}:
 *   get:
 *     summary: Busca um item por ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item
 *     responses:
 *       200:
 *         description: Item encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item não encontrado
 *       500:
 *         description: Erro interno
 */
router.get("/items/:id", async (req, res) => {
  try {
    const item = await service.getItemById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item não encontrado" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @openapi
 * /items/{id}:
 *   put:
 *     summary: Atualiza um item completamente
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       200:
 *         description: Item atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Item não encontrado
 *       500:
 *         description: Erro interno
 */
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

/**
 * @openapi
 * /items/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       200:
 *         description: Item atualizado parcialmente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Item não encontrado
 *       500:
 *         description: Erro interno
 */
router.patch("/items/:id", async (req, res) => {
  try {
    const data = updateItemSchema.parse(req.body);
    const item = await service.patchItem(req.params.id, data);
    if (!item) return res.status(404).json({ error: "Item não encontrado" });
    res.json(item);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
});

/**
 * @openapi
 * /items/{id}:
 *   delete:
 *     summary: Remove um item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item
 *     responses:
 *       200:
 *         description: Item removido com sucesso
 *       500:
 *         description: Erro interno
 */
router.delete("/items/:id", async (req, res) => {
  try {
    await service.deleteItem(req.params.id);
    res.json({ message: "Item removido com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
