const express = require('express')
const connectToDatabase = require('./db')
const dotenv = require('dotenv')

dotenv.config();

connectToDatabase()

const app = express()

app.use(express.json())

const authRoutes = require('./routes/authRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes')
const submissionRoutes = require('./routes/submissionRoutes')


app.use('/auth', authRoutes);
app.use('/assignment', assignmentRoutes)
app.use('/submission', submissionRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`)
})