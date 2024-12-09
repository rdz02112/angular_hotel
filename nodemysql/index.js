const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const port = 3000;

// กำหนดให้ทุก endpoint อนุญาตการเข้าถึงจากทุกโดเมน (สำหรับการทดสอบ)
app.use(cors({
    origin: '*'
}));

app.use(express.json());

// ใช้ createPool เพื่อการเชื่อมต่อที่ดีขึ้น
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'k123',
    database: 'dbhotel'
});

// ตรวจสอบการเชื่อมต่อ
db.getConnection((err) => {
    if (err) {
        console.log("Error connecting to db", err);
        return;
    }
    console.log('Connected to db Successfully');
});

//login
app.post('/api/register', (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.log('Error checking username:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) {
                console.log('Error hashing password:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
            db.query(query, [username, hashedPassword, email], (err, results) => {
                if (err) {
                    console.log('Error inserting data:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    });
});

// Login API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful', user: { username: user.username } });
    });
});


// Insert
app.post('/api/insert', (req, res) => {
    const { room_number, people, type, day } = req.body;
    
    const query = "INSERT INTO room (room_number, people, type, day) VALUES (?, ?, ?, ?)";
    db.query(query, [room_number, people, type, day], (err, results) => {
        if (err) {
            console.log('Error inserting data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        res.status(201).json({
            msg: 'Data inserted successfully',
            insertId: results.insertId
        });
    });
});

// Read
app.get('/api/read', (req, res) => {
    db.query("SELECT * FROM room", (err, results) => {
        if (err) {
            console.log("Database query error:", err);
            return res.status(400).send("Error retrieving data");
        }
        res.status(200).json(results);
    });
});

// Update
app.put('/api/update/:id', (req, res) => {
    const { id } = req.params;
    const { room_number, people, type, day } = req.body;

    if (!room_number || !people || !type || !day) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `UPDATE room SET room_number = ?, people = ?, type = ?, day = ? WHERE id = ?`;
    db.query(query, [room_number, people, type, day, id], (err, results) => {
        if (err) {
            console.log('Error updating data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'No data found to update' });
        }

        res.status(200).json({ message: 'Data updated successfully' });
    });
});

// Delete
app.delete('/api/delete/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM room WHERE id = ?`;
    db.query(query, [id], (err, results) => {
        if (err) {
            console.log('Error deleting data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'No data found to delete' });
        }

        res.status(200).json({ message: 'Data deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
});
