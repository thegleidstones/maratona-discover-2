let data = {
    name: "Gleidson",
    avatar: "https://github.com/thegleidstones.png",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 8,
    "value-hour": 75
}

module.exports = {
    get() {
        return data
    },

    update(newData) {
        data = newData
    }
}