const Job = require('../models/Job')
const Profile = require('../models/Profile')
const JobUtils = require('../utils/JobUtils')
const ProfileController = require('./ProfileController')

module.exports = {
    async index(req, res) {
        const { username } = req.user
        const jobs = await Job.get()
        let profile = await Profile.get(req.user.username)

        if (!profile) {
            await ProfileController.save(req.user)
            profile = await Profile.get(username)
        }

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        // total de horas por dia de cada Job em progress
        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            const budget = JobUtils.calculateBudget(job, profile.value_hour)

            statusCount[status] += 1

            if (status === 'progress') {
                jobTotalHours += Number(job.daily_hours)
            }

            return {
                ...job,
                remaining,
                status,
                budget
            }
        })

        // qtd de horas que quero trabalhar 
        // MENOS 
        // quantidade de horas/dia de cada job em progresso
        const freeHours = profile["hours_per_day"] - jobTotalHours

        return res.render('index', { jobs: updatedJobs, profile, statusCount, freeHours })
    }
}