const Job = require('../models/Job')
const Profile = require('../models/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    create(req, res) {
        return res.render('job')
    },

    delete(req, res) {
        const { id } = req.params

        Job.delete(id)

        return res.redirect('/')
    },

    
    edit(req, res) {
        const { id } = req.params
        const jobs = Job.get()
        const profile = Profile.get()

        const job = jobs.find( job => Number(job.id) === Number(id))

        if (!job) {
            return res.send('Job not found!')
        }

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render('job-edit', { job })
    },

    save(req, res) {
        const jobs = Job.get()
        const lastId = jobs[jobs.length -1]?.id || 1

        Job.create({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()
        })

        return res.redirect('/')
    },

    update(req, res) {
        const { id } = req.params
        const jobs = Job.get()

        const job = jobs.find(job => Number(job.id) === Number(id))

        console.log(job)

        if (!job) {
            return res.send('Job not found!')
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }

        updatedJobs = jobs.map(job => {
            if (Number(job.id) === Number(id)) {
                job = updatedJob
            }

            return job
        })

        Job.update(updatedJobs)

        res.redirect('/job/' + id)
    }
}