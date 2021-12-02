//imports
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3001;
const api = require('./routes/index.js')

const app = express()

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api)

//handle get requests
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
)


app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html')))

//send invalid requests to index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
