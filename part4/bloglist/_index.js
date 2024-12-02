const express = require("express")
const app = express()



app.use(express.json())

app.get("/", (request, response) =>{
    response.send("<h1>Hello Node</h1>")
}
)

const PORT = 3000
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})