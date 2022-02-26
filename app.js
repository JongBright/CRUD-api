const express = require('express')
const app = express()
const pool = require('./db')

app.use(express.json())


app.get('/category/categories', async (req, res) => {

    try {

        const allCategories = await pool.query("SELECT * FROM category")
        res.json(allCategories.rows)

    } catch (err) {
        console.log(err)
    }
})


app.get('/category/categories/:id', async (req, res) => {

    const { id } = req.params
    try {

        const category = await pool.query("SELECT * FROM category WHERE id = ($1)", [id])
        res.json(category.rows)

    } catch (err) {
        console.log(err)
    }
})


app.post('/category/add', async (req, res) => {

    const { name, description } = req.body
    try {

        var date = new Date();
        var theDate = date.toDateString();
        var theTime = date.toLocaleTimeString();
        let creationInfo = `${theTime}, ${theDate}`;

        const newCategory = await pool.query("INSERT INTO category (name, description, created_at) VALUES ($1, $2, $3) RETURNING *", [name, description, creationInfo])
        res.json(newCategory.rows)

    } catch (err) {
        console.log(err)
    }
})


app.put('/category/categories/:id', async (req, res) => {

    const { id } = req.params
    const { name, description } = req.body
    try {

        const updateCategory = await pool.query("UPDATE category SET name =$1, description = $2 WHERE id = $3", [name, description, id])
        res.json(`Category with id ${id} has been updated successfully`)

    } catch (err) {
        console.log(err)
    }
})


app.delete('/category/categories/:id', async (req, res) => {

    const { id } = req.params
    try {

        const category = await pool.query("DELETE FROM category WHERE id = ($1)", [id])
        res.json(`Category with id ${id} has been removed successfully`)

    } catch (err) {
        console.log(err)
    }
})






app.listen(3000, () => { console.log('Server is running') })