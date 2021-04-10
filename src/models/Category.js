const Database = require('../db/config')

module.exports = {
    async create(category) {
        const db = await Database()

        await db.run(
            `INSERT INTO categories (
                name,
                created_at,
                updated_at
            ) VALUES (
                "${category.name}",
                ${category.created_at},
                ${category.updated_at}
            );`
        )

        await db.close()
    },

    async delete(id) {
        const db = await Database()

        await db.run(`DELETE FROM categories WHERE id = ${id}`)

        await db.close()
    },

    async get() {
        const db = await Database()

        const categories = await db.all(`SELECT * FROM categories`)

        await db.close()

        return categories
    },

    async update(category) {
        const db = await Database()

        await db.run(
            `UPDATE categories SET
                name = "${category.name}",
                updated_at = ${category.updated_at}
            WHERE id = ${category.id}`
        )

        await db.close()
    }
}