const Profile = require('../models/Profile')

module.exports = {
    index(req, res) {
        return res.render('profile', { profile: Profile.get() })
    },

    update(req, res) {
        const data = req.body

        // definir quantas semanas tem em um ano
        const weeksPerYear = 52
        // remover semanas de férias do ano, para buscar as semanas medias por mes
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

        // total de horas trabalhadas na semana
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

        // horas trabalhadas no mês
        const monthlyTotalHours = weekTotalHours * weeksPerMonth

        // qual será o valor da minha hora?
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        Profile.update({
            ...Profile.data,
            ...req.body,
            "value-hour": valueHour
        })

        return res.redirect('/profile')
    }
}