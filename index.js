require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const multer  = require('multer')
require('./config/db')

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const upload = multer({ dest: 'uploads/' })

app.use(upload.single('image'))
app.use('/api', routes)

app.listen(8000, () => {
    console.log(`Server Started at ${8000}`)
})