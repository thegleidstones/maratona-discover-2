const Database = require('../db/config')

module.exports = {
    async create(job) {
        const db = await Database()

        await db.run(`
            INSERT INTO jobs (
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "${job.name}",
                ${job.daily_hours},
                ${job.total_hours},
                ${job.created_at}
            );
        `)

        await db.close()
    },

    async delete(id) {
        const db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${id}`)

        await db.close()
    },

    async get() {
        const db = await Database()

        const data = await db.all(`SELECT * FROM jobs`)

        await db.close()

        return data
    },

    async update(job) {
        const db = await Database()

        await db.run(`
            UPDATE jobs SET
            name = "${job.name}",
            daily_hours = ${job.daily_hours},
            total_hours = ${job.total_hours}
            WHERE id = ${job.id}
        `)

        await db.close()
    }
}