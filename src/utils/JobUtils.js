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
        const dayDiff = Math.floor(timeDiffInMs / dayInMs)
    
        return dayDiff
    },

    calculateBudget: (job, valueHour) => valueHour * job["total_hours"]
}