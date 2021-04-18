const Category = require('../models/Category')
const Job = require('../models/Job')
const Profile = require('../models/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    async create(req, res) {
        const categories = await Category.get()
        
        return res.render('job', { categories })
    },

    async delete(req, res) {
        const { id } = req.params

        await Job.delete(id)

        return res.redirect('/dashboard')
    },

    async edit(req, res) {
        const { id } = req.params
        const { username } = req.user
        const categories = await Category.get()
        const profile = await Profile.get(username)
        const jobs = await Job.get(profile.id)

        const job = jobs.find( job => Number(job.id) === Number(id))

        if (!job) {
            return res.send('Job not found!')
        }

        job.budget = JobUtils.calculateBudget(job, profile.value_hour)

        return res.render('job-edit', { job, categories })
    },

    async save(req, res) {
        const { category_id, name, daily_hours, total_hours } = req.body
        const { username } = req.user
        const profile = await Profile.get(username)

        if (category_id.trim() === 0 ||
            name.trim() === '' ||
            daily_hours.trim() === '' ||
            total_hours.trim() === '') {
            return res.send('Por favor, preencha os campos para salvar o Job')
        }

        await Job.create({
            profile_id: profile.id,
            category_id,
            name,
            daily_hours,
            total_hours,
            created_at: Date.now(),
            updated_at: Date.now()
        })

        return res.redirect('/dashboard')
    },

    async update(req, res) {
        const { id } = req.params
        const { category_id, name, daily_hours, total_hours } = req.body

        await Job.update({
            id,
            category_id, 
            name,
            daily_hours,
            total_hours,
            updated_at: Date.now()
        })

        res.redirect('/job/' + id)
    }
}