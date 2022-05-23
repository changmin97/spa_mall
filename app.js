const express = require('express')
const connect = require('./schemas') //스케마폴더에서-1.schemas파일찾고 2.없으면 index파일찾음
const app = express()
const port = 3000

connect()

const goodsRouter = require('./routes/goods')

const requestMiddleware = (req,res,next)=>{
    console.log('Request URL:', req.originalUrl,'-',new Date())
    next()
}

app.use(express.static('static'))
app.use(express.json())
app.use(express.urlencoded())
app.use(requestMiddleware)

app.use('/api', [goodsRouter])

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(port, '포트가 켜졌어요')
})