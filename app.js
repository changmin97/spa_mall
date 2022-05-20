const express = require("express"); //express패키지 express 변수로 불러옴
const { nextTick } = require("process");
const app = express();  //변수를 함수처럼 실행함 , express 쓰는법임
const port = 3000;

const goodsRouter = require('./routes/goods')

const requestMiddleware = (req,res,next)=>{
    console.log('Request URL:', req.originalUrl, new Date() ) // 미들웨어가 처리될떄의 시간을 나타내는 함수
    next()   //까먹지말고 미들웨어 쓸떄는 next()   아니면 무한루프에 걸림
}

app.use(requestMiddleware)

app.use('/api', [goodsRouter])

app.get('/', (req, res) => {   //  /루트에 들어오면 함수를적용시키겠다.  //req,res 인자는 express 약속임
    res.send('Hello World')
});

app.listen(port, ()=>{
    console.log(port,'포트로 서버가 켜졌어요!')
});