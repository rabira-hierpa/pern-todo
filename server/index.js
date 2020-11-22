const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json()); // allows us to access the req.body

// ROUTES

// get all todos
app.get('/todos', async (req, res) => {
	try {
		const allTodos = pool.query('SELECT * FROM todo');
		res.json((await allTodos).rows);
	} catch (error) {
		console.error(error.message);
	}
});
// get a todo
app.get('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const todo = pool.query('SELECT * FROM todo WHERE todo_id=$1', [id]);
		res.json((await todo).rows[0]);
	} catch (error) {
		console.error(error.message);
	}
});
// create a todo
app.post('/todos', async (req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query(
			'INSERT INTO todo (description) VALUES ($1) RETURNING *',
			[description]
		);
		res.json(newTodo.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
});
// update a todo
app.put('/todo/:id', async (req, res) => {
	try {
		const { description } = req.body;
		const { id } = req.params;
		const updateTodo = await pool.query(
			'UPDATE todo SET description=$1 WHERE todo_id=$2',
			[description, id]
		);
		res.json('Update successfull');
	} catch (err) {
		console.error(err.message);
	}
});

// delete a todo
app.delete('/todo/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id=$1', [
			id,
		]);
		res.json({ delete: 'single' });
	} catch (err) {
		console.error(err.message);
	}
});

app.listen(5000, () => {
	console.log('Sever is listining');
});
