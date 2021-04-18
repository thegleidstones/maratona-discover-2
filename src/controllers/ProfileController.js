const Profile = require('../models/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    async index(req, res) {
        const { username } = req.user
        return res.render('profile', { profile: await Profile.get(username) })
    },

    async save(user) {
        const { username, profileUrl, displayName } = user
        const avatar = user.photos[0].value

        await Profile.create({
            user_name: username,
            profile_url: profileUrl,
            name: displayName,
            avatar: avatar,
            created_at: Date.now(),
            updated_at: Date.now()
        })
    },

    async update(req, res) {
        const { username } = req.user
        const valueHour = JobUtils.valueHour(req)
        const profile = await Profile.get(username)

        await Profile.update({
            ...profile,
            ...req.body,
            value_hour: valueHour,
            updated_at: Date.now()
        })

        return res.redirect('/profile')
    }
}