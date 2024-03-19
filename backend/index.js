const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'sqlI'
})

// connecting to mysql
db.connect((error) => {
	if (error) 
		console.log("Error connecting to database: ", error)
})

db.query('select * from user', (error, result) => {
	if (error) {
		console.log(error)
	} else if (result) {
		console.log(result)
	}
})

// creating express instance for http requests
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
	console.log('getting get request on /')
	res.json({server: 'working'})

})

// handling login
app.post('/api/login', (req, res) => {

	const {username, password} = req.body
	console.log(req.body)


	const query = `SELECT * FROM user WHERE name='${username}' AND password='${password}'`;

	db.query(query, (error, row) => {
		if (error) {
			console.log(error)
			res.status(500).json({message: 'Internal Server Error'})
		} else if (row[0]) {
			res.json(row[0])
		} else {
			res.status(401).json({message: 'Invalid Username or Password'})
		}
	})

	// prevention
	// const query = `SELECT * FROM user WHERE name=? AND password=?`;

	// db.query(query, [username, password], (error, row) => {
	// 	if (error) {
	// 		console.log(error)
	// 		res.status(500).json({message: 'Internal Server Error'})
	// 	} else if (row[0]) {
	// 		res.json(row[0])
	// 	} else {
	// 		res.status(401).json({message: 'Invalid Username or Password'})
	// 	}
	// })


})


const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})