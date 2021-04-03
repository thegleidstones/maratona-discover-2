let data = [
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
]

module.exports = {
    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id))
    },

    get() {
        return data
    },

    update(newData) {
        data = newData
    }
}