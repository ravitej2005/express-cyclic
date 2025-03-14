import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();  // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


db.connect((err) => {
  if (err) throw err;
  console.log("✅ Database Connected");
});

app.get('/tasks', (req, res) => {
  const query = "SELECT * FROM tasks;";
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/addtasks', (req, res) => {
  const { task } = req.body;
  const query = "INSERT INTO tasks (task) VALUES(?);";
  db.query(query, [task], (err, result) => {
    if (err) throw err;
    res.json({ task: task });
  });
});

app.delete('/task/:id', (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM tasks WHERE id=?";
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.json({ msg: "Task deleted" });
  });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
