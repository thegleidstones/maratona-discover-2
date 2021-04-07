const Job = require('../models/Job')
const Profile = require('../models/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    create(req, res) {
        return res.render('job')
    },

    async delete(req, res) {
        const { id } = req.params

        await Job.delete(id)

        return res.redirect('/')
    },

    
    async edit(req, res) {
        const { id } = req.params
        const jobs = await Job.get()
        const profile = await Profile.get()

        const job = jobs.find( job => Number(job.id) === Number(id))

        if (!job) {
            return res.send('Job not found!')
        }

        job.budget = JobUtils.calculateBudget(job, profile["value_hour"])

        return res.render('job-edit', { job })
    },

    async save(req, res) {
        await Job.create({
            name: req.body.name,
            daily_hours: req.body.daily_hours,
            total_hours: req.body.total_hours,
            created_at: Date.now()
        })

        return res.redirect('/')
    },

    async update(req, res) {
        const { id } = req.params

        const job = {
            id, 
            name: req.body.name,
            total_hours: req.body.total_hours,
            daily_hours: req.body.daily_hours,
        }
 
        await Job.update(job)

        res.redirect('/job/' + id)
    }
}