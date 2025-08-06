// services/itemService.js
import pool from "../config/db.js";

export async function createItem({ name, quantity }) {
  const { rows } = await pool.query(
    `INSERT INTO items (name, quantity)
     VALUES ($1, $2)
     RETURNING *`,
    [name, quantity]
  );
  return rows[0];
}

export async function getAllItems() {
  const { rows } = await pool.query(
    `SELECT * FROM items
     ORDER BY id`
  );
  return rows;
}

export async function getItemById(id) {
  const { rows } = await pool.query(
    `SELECT * FROM items
     WHERE id = $1`,
    [id]
  );
  return rows[0];
}

export async function updateItem(id, { name, quantity }) {
  const { rows } = await pool.query(
    `UPDATE items
     SET name     = $1,
         quantity = $2
     WHERE id = $3
     RETURNING *`,
    [name, quantity, id]
  );
  return rows[0];
}

export async function deleteItem(id) {
  await pool.query(
    `DELETE FROM items
     WHERE id = $1`,
    [id]
  );
}
