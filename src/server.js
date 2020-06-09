const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
const port = 3000

app.use(express.static('public'))
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

app.get('/search', (req, res) => {
    return res.render('search-results.html')
})


app.listen(port, () => {
    console.log('Server running on port ' + port)
})