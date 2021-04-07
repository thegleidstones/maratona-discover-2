const Profile = require('../models/Profile')

module.exports = {
    async index(req, res) {
        return res.render('profile', { profile: await Profile.get() })
    },

    async update(req, res) {
        const data = req.body

        // definir quantas semanas tem em um ano
        const weeksPerYear = 52
        // remover semanas de férias do ano, para buscar as semanas medias por mes
        const weeksPerMonth = (weeksPerYear - data["vacation_per_year"]) / 12

        // total de horas trabalhadas na semana
        const weekTotalHours = data["hours_per_day"] * data["days_per_week"]

        // horas trabalhadas no mês
        const monthlyTotalHours = weekTotalHours * weeksPerMonth

        // qual será o valor da minha hora?
        const valueHour = data["monthly_budget"] / monthlyTotalHours

        const profile = await Profile.get()

        await Profile.update({
            ...profile,
            ...req.body,
            "value_hour": valueHour
        })

        return res.redirect('/profile')
    }
}