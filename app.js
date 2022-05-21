const express = require('express');;
const connect = require('./schemas') //  #mongoose 가져오기#   // index.js 파일명은 특이함 ./schemas/index랑 같음
const app = express();
const port = 3000;

connect()  //#mongoose 가져오기# 

const goodsRouter = require('./routes/goods') //## 라우터설정1##
const cartsRouter = require("./routes/carts");

const requestMiddleWare = (req,res,next)=>{
    console.log('Request URL:', req.originalUrl, '-', new Date())
     next();   //미들웨어는 next 함수가 중요   //next함수를 쓰던가 응답을 주던가 ,둘다 없으면 무한루프
    }

app.use(express.json()) // body로 들어오는 json형태의 데이터를 파싱해주는 미들웨어 / 이거 써야 thunder client 사용 가능 
app.use(requestMiddleWare)  //미들웨어는 use로 호출함 , //use 안에 함수 넣으면 미들웨어 구현 가능(함수인자 3개) , 아래 코드들이 영향받도록 위치가 중요

app.use("/api", [goodsRouter, cartsRouter]); //## 라우터설정1## /express는 router를 미들웨어로 처리한다.

app.get('/',(req,res)=>{ //express가 자동적으로 req,res 객체 넣어줌, 약속임
    res.send('Hello World')
})

app.listen(port , ()=>{ //app.listen 서버를 키겠다 , 인자1:port , 인자2:함수
    console.log(port, '포트로 서버가 켜졌어요')
})