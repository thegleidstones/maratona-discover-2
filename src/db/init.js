const Database = require('./config')


const initDB = {
    async init() {
        const db = await Database()

        await db.exec(            
            `CREATE TABLE profile (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
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
                category_id INTEGER,
                name TEXT,
                daily_hours INT,
                total_hours INT,
                created_at DATETIME,
                updated_at DATETIME,
                FOREIGN KEY (category_id) REFERENCES categories(id) 
                ON UPDATE CASCADE
                ON DELETE CASCADE 
            )`
        )

        await db.run(
            `INSERT INTO profile (
                name,
                avatar,
                monthly_budget,
                hours_per_day,
                days_per_week,
                vacation_per_year,
                value_hour,
                created_at,
                updated_at
            ) VALUES (
                "Gleidson Morais Silva",
                "https://github.com/thegleidstones.png",
                3000,
                5,
                5,
                8,
                75,
                1617514376035,
                1617514376035
            );`
        )

        await db.run(
            `INSERT INTO categories (
                name,
                created_at,
                updated_at
            ) VALUES (
                "Web Application",
                1617514376035,
                1617514376035
            );`
        )

        await db.run(
            `INSERT INTO jobs (
                category_id,
                name,
                daily_hours,
                total_hours,
                created_at,
                updated_at
            ) VALUES (
                1,
                "Pizzaria Guloso",
                4,
                1,
                1617514376018,
                1617514376018
            );`
        )

        await db.run(
            `INSERT INTO jobs (
                category_id,
                name,
                daily_hours,
                total_hours,
                created_at,
                updated_at
            ) VALUES (
                1,
                "Project OneTwo",
                3,
                75,
                1617514376035,
                1617514376035
            );`
        )

        await db.close()
    }
}

initDB.init()