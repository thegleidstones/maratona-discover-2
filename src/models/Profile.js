const Database = require('../db/config')

module.exports = {
    async create(profile) {
        const db = await Database()

        await db.run(
            `INSERT INTO profile (
                user_name,
                profile_url,
                name,
                avatar,
                value_hour,
                created_at,
                updated_at
            ) VALUES (
                "${profile.user_name}",
                "${profile.profile_url}",
                "${profile.name}",
                "${profile.avatar}",
                0,
                ${profile.created_at},
                ${profile.updated_at}
            );`
        )
    },

    async get(user_name) {
        const db = await Database()

        const data = await db.get(`SELECT * FROM profile WHERE user_name = "${user_name}"`)

        await db.close()

        return data
    },

    async update(profile) {
        const db = await Database()

        db.run(
            `UPDATE profile SET 
                monthly_budget = ${profile.monthly_budget},
                hours_per_day = ${profile.hours_per_day},
                days_per_week = ${profile.days_per_week},
                vacation_per_year = ${profile.vacation_per_year},
                value_hour = ${profile.value_hour},
                updated_at = ${profile.updated_at}
            WHERE user_name = "${profile.user_name}"`
        )

        await db.close()
    }
}