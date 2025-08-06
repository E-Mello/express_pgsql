import pool from "../config/db.js";

/**
 * Cria um novo item no banco de dados.
 * @param {{ name: string, quantity: number }} item - O objeto contendo os dados do item.
 * @returns {Promise<object>} O item recém-criado.
 */
export async function createItem({ name, quantity }) {
  try {
    const { rows } = await pool.query(
      `INSERT INTO items (name, quantity)
       VALUES ($1, $2)
       RETURNING *`,
      [name, quantity]
    );
    return rows[0];
  } catch (error) {
    console.error("Erro ao criar item:", error);
    throw error; // Propaga o erro para a camada superior (rota)
  }
}

/**
 * Busca todos os itens do banco de dados, ordenados por ID.
 * @returns {Promise<Array<object>>} Uma lista de todos os itens.
 */
export async function getAllItems() {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM items
       ORDER BY id`
    );
    return rows;
  } catch (error) {
    console.error("Erro ao buscar todos os itens:", error);
    throw error;
  }
}

/**
 * Busca um item específico pelo seu ID.
 * @param {number} id - O ID do item a ser buscado.
 * @returns {Promise<object|undefined>} O objeto do item ou undefined se não for encontrado.
 */
export async function getItemById(id) {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM items
       WHERE id = $1`,
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error(`Erro ao buscar item com ID ${id}:`, error);
    throw error;
  }
}

/**
 * Atualiza um item por completo (método PUT).
 * @param {number} id - O ID do item a ser atualizado.
 * @param {{ name: string, quantity: number }} itemData - Os novos dados do item.
 * @returns {Promise<object|undefined>} O item atualizado ou undefined se o ID não for encontrado.
 */
export async function updateItem(id, { name, quantity }) {
  try {
    const { rows } = await pool.query(
      `UPDATE items
       SET name = $1,
           quantity = $2
       WHERE id = $3
       RETURNING *`,
      [name, quantity, id]
    );
    return rows[0];
  } catch (error) {
    console.error(`Erro ao atualizar item com ID ${id}:`, error);
    throw error;
  }
}

/**
 * Atualiza parcialmente um item (método PATCH).
 * @param {number} id - O ID do item a ser atualizado.
 * @param {object} fields - Um objeto com os campos a serem atualizados.
 * @returns {Promise<object|undefined>} O item atualizado ou undefined se o ID não for encontrado.
 */
export async function patchItem(id, fields) {
  try {
    const keys = Object.keys(fields);
    const values = Object.values(fields);

    // Se nenhum campo for enviado, retorna o item existente sem fazer o update.
    if (keys.length === 0) {
      return await getItemById(id);
    }

    // Monta a string "SET" dinamicamente: "name = $1, quantity = $2", etc.
    const setString = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");

    const query = `
      UPDATE items
      SET ${setString}
      WHERE id = $${keys.length + 1}
      RETURNING *`;

    const { rows } = await pool.query(query, [...values, id]);
    return rows[0];
  } catch (error) {
    console.error(`Erro ao fazer patch do item com ID ${id}:`, error);
    throw error;
  }
}

/**
 * Deleta um item do banco de dados.
 * @param {number} id - O ID do item a ser deletado.
 * @returns {Promise<number>} O número de linhas deletadas (0 ou 1).
 */
export async function deleteItem(id) {
  try {
    const { rowCount } = await pool.query(
      `DELETE FROM items
       WHERE id = $1`,
      [id]
    );
    // Retorna a contagem de linhas afetadas.
    // A rota pode usar isso para saber se o item foi encontrado e deletado (rowCount === 1)
    // ou se não foi encontrado (rowCount === 0).
    return rowCount;
  } catch (error) {
    console.error(`Erro ao deletar item com ID ${id}:`, error);
    throw error;
  }
}
