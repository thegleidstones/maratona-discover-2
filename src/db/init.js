const Database = require('./config')

const initDB = {
    async init() {
        const db = await Database()

        await db.exec(            
            `CREATE TABLE profiles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_name TEXT UNIQUE,
                profile_url TEXT,
                name TEXT,
                avatar TEXT,
                monthly_budget INT,
                hours_per_day INT,
                days_per_week INT,
                vacation_per_year INT,
                value_hour INT,
                created_at DATETIME,
                updated_at DATETIME
            )`
        )

        await db.exec(
            `CREATE TABLE categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                created_at DATETIME,
                updated_at DATETIME
            )`
        )

        await db.exec(            
            `CREATE TABLE jobs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                profile_id INTEGER,
                category_id INTEGER,
                name TEXT,
                daily_hours INT,
                total_hours INT,
                created_at DATETIME,
                updated_at DATETIME,
                FOREIGN KEY (profile_id) REFERENCES profiles(id),
                FOREIGN KEY (category_id) REFERENCES categories(id) 
            )`
        )

        await db.close()
    }
}

initDB.init()