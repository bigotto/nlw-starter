const express = require('express')
const nunjucks = require('nunjucks')
const db = require('./database/db')

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
nunjucks.configure('src/views', {
    express: app,
    noCache: true
})

app.get('/', (req, res) => {
    return res.render('index.html')
})

app.get('/create-point', (req, res) => {
    return res.render('create-point.html')
})

app.post('/savepoint', (req, res) => {
    
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afertInsertData(err) {
        if(err) {
            console.log(err)
            return res.send('Erro no cadastro!')
        }
        return res.render('create-point.html', { saved: true })
    }

    db.run(query, values, afertInsertData)
})

app.get('/search', (req, res) => {
    const city = req.query.search

    if(city == '')
        return res.render('search-results.html', { total: 0})
    
    db.all(`SELECT * FROM places WHERE city LIKE '%${city}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        const total = rows.length
        return res.render('search-results.html', { places: rows, total})
    })  
})


app.listen(port, () => {
    console.log('Server running on port ' + port)
})