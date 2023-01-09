const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')
require('dotenv').config()

// middleware
app.use(express.json())
app.use(cors())

app.use("/api", require("./api/status"))
app.use("/api", require("./api/foods"))
app.use("/api", require("./api/orders"))
app.use("/api", require("./api/staffs"))

app.listen(port, () => {
    console.log('listening at ', port)
})
