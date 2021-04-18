const Category = require("../models/Category")
const { update } = require("../models/Job")

module.exports = {
    async create(req, res) {
        const categories = await Category.get()
        
        return res.render('category', { categories })
    },

    async delete(req, res) {
        const { id } = req.params

        await Category.delete(id)

        return res.redirect('/category')
    },

    async edit(req, res) {
        const { id } = req.params
        const categories = await Category.get()
        const category = categories.find( category => Number(category.id) === Number(id))

        if (!category) {
            return res.send('Category not found')
        }

        return res.render('category-edit', { category, categories })
    },

    async save(req, res) {
        const { name } = req.body

        console.log("requisição: ", name)

        await Category.create({
            name,
            created_at: Date.now(),
            updated_at: Date.now()
         })

         res.redirect('/dashboard')
    },

    async update(req, res) {
        const { id } = req.params
        const { name } = req.body
        
        await Category.update({
            id,
            name,
            updated_at: Date.now()
        })

        return res.redirect(`/category/${id}`)
    }
}