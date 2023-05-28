const express = require('express')
const app = express()
const cors = require("cors");
const port = 5000
const lyricsFinder = require('lyrics-finder');
const bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', async(req, res) => {

    const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
    res.json({ lyrics })
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})