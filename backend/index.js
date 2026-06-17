require('dotenv').config();
const express = require('express');
const cors = require('cors');
const appointmentsRouter = require('./routes/appointments');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', appointmentsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend listening on ${port}`));
