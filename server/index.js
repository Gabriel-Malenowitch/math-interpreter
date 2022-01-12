const express = require('express')

const Calc = require("./src/Objects/Calc.js")

const app = express()

let text = ''

app.use((req, res, next)=>{
    const regExRemoveFirst = /.(.*)/
    text = req.url.replace(regExRemoveFirst,"$1")

    console.log(text)
    

    next()
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})