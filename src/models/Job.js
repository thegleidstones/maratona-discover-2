const Database = require('../db/config')

module.exports = {
    async create(job) {
        const db = await Database()

        await db.run(
            `INSERT INTO jobs (
                profile_id,
                category_id,
                name,
                daily_hours,
                total_hours,
                created_at,
                updated_at
            ) VALUES (
                ${job.profile_id},
                ${job.category_id},
                "${job.name}",
                ${job.daily_hours},
                ${job.total_hours},
                ${job.created_at},
                ${job.updated_at}
            );`
        )

        await db.close()
    },

    async delete(id) {
        const db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${id}`)

        await db.close()
    },

    async get(profile_id) {
        const db = await Database()

        const data = await db.all(`SELECT * FROM jobs WHERE profile_id = ${profile_id}`)

        await db.close()

        return data
    },

    async update(job) {
        const db = await Database()

        await db.run(
            `UPDATE jobs SET
                category_id = ${job.category_id},
                name = "${job.name}",
                daily_hours = ${job.daily_hours},
                total_hours = ${job.total_hours},
                updated_at = ${job.updated_at}
            WHERE id = ${job.id}`
        )

        await db.close()
    }
}