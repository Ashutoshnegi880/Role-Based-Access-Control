const express = require('express');
const cors = require('cors');
require('dotenv').config();

const router = require('./routes/router');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
