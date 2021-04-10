module.exports =  {
    remainingDays(job) {
        // Calculando o total de dias restantes para entregar o projeto
        const remainingDays = (job["total_hours"] / job["daily_hours"]).toFixed()
    
        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDate = createdDate.setDate(dueDay)
    
        const timeDiffInMs = dueDate - Date.now()
        // transformar milisegundos em dias
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
    
        return dayDiff
    },

    valueHour(req) {
        const { vacation_per_year, hours_per_day, days_per_week, monthly_budget } = req.body

        // definir quantas semanas tem em um ano
        const weeksPerYear = 52

        // remover semanas de férias do ano, para buscar as semanas medias por mes
        const weeksPerMonth = (weeksPerYear - vacation_per_year) / 12

        // total de horas trabalhadas na semana
        const weekTotalHours = hours_per_day * days_per_week

        // horas trabalhadas no mês
        const monthlyTotalHours = weekTotalHours * weeksPerMonth

        // qual será o valor da minha hora?
        const valueHour = monthly_budget / monthlyTotalHours

        return valueHour
    },

    calculateBudget: (job, valueHour) => valueHour * job.total_hours
}