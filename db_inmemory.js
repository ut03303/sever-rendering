const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // In-memory database, or provide a file path for persistence

// Create Employee Table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Employee (
            id TEXT PRIMARY KEY,
            firstname TEXT NOT NULL,
            lastname TEXT NOT NULL,
            dob TEXT NOT NULL
        )
    `);

    // Create EmployeeContact Table
    db.run(`
        CREATE TABLE IF NOT EXISTS EmployeeContact (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employeeId TEXT NOT NULL,
            phoneNumbers TEXT NOT NULL,
            addresses TEXT NOT NULL,
            FOREIGN KEY (employeeId) REFERENCES Employee(id) ON DELETE CASCADE
        )
    `);
});

module.exports = db;
