const Profile = require('../models/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    async index(req, res) {
        return res.render('profile', { profile: await Profile.get() })
    },

    async update(req, res) {
        const valueHour = JobUtils.valueHour(req)
        const profile = await Profile.get()

        await Profile.update({
            ...profile,
            ...req.body,
            value_hour: valueHour,
            updated_at: Date.now()
        })

        return res.redirect('/profile')
    }
}