const Database = require('../db/config')

module.exports = {
    async get() {
        const db = await Database()

        const data = await db.get(`SELECT * FROM profile`)

        await db.close()

        return data
    },

    async update(profile) {
        const db = await Database()

        db.run(
            `UPDATE profile SET 
                name = "${profile.name}",
                avatar = "${profile.avatar}",
                monthly_budget = ${profile.monthly_budget},
                hours_per_day = ${profile.hours_per_day},
                days_per_week = ${profile.days_per_week},
                vacation_per_year = ${profile.vacation_per_year},
                value_hour = ${profile.value_hour},
                updated_at = ${profile.updated_at}`
        )

        await db.close()
    }
}