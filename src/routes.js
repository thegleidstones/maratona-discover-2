const express = require('express')
const routes = express.Router()

const Profile = {
    data: {
        name: "Gleidson",
        avatar: "https://github.com/thegleidstones.png",
        "monthly-budget": 3000,
        "hours-per-day": 5,
        "days-per-week": 5,
        "vacation-per-year": 8,
        "value-hour": 75
    },

    controllers: {
        index(req, res) {
            return res.render('profile', { profile: Profile.data })
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

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            }
            
            console.log(Profile.data)

            return res.redirect('/profile')

        }

    }
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 4,
            "total-hours": 1,
            created_at: Date.now()
        },
        {
            id: 2,
            name: "Project OneTwo",
            "daily-hours": 3,
            "total-hours": 75,
            created_at: Date.now()
        },
    ],

    controllers: {
        create(req, res) {
            return res.render('job')
        },

        delete(req, res) {
            const { id } = req.params

            Job.data = Job.data.filter(job => Number(job.id) !== Number(id))

            return res.redirect('/')
        },

        index(req, res) {
            const updatedJobs = Job.data.map((job) => {
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'
                const budget = Job.services.calculateBudget(job, Profile.data["value-hour"])
        
                return {
                    ...job,
                    remaining,
                    status,
                    budget
                }
            })

            console.log(updatedJobs)

            return res.render('index', { jobs: updatedJobs })
        },

        save(req, res) {
            const lastId = Job.data[Job.data.length -1]?.id || 1
            
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now()
            })
            return res.redirect('/')
        },

        edit(req, res) {
            const { id } = req.params
            const job = Job.data.find( job => Number(job.id) === Number(id))

            if (!job) {
                return res.send('Job not found!')
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

            return res.render('job-edit', { job })
        },

        update(req, res) {
            const { id } = req.params

            const job = Job.data.find(job => Number(job.id) === Number(id))

            if (!job) {
                return res.send('Job not found!')
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"]
            }

            Job.data = Job.data.map(job => {
                if (Number(job.id) === Number(id)) {
                    job = updatedJob
                }

                return job
            })

            res.redirect('/job/' + id)
        }

    },

    services: {
        remainingDays(job) {
            // Calculando o total de dias restantes para entregar o projeto
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
        
            const createdDate = new Date(job.created_at)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDate = createdDate.setDate(dueDay)
        
            const timeDiffInMs = dueDate - Date.now()
            // transformar milisegundos em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
        
            return dayDiff
        },

        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.edit)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes