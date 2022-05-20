const express = require('express');
const router = express.Router()
                                //router 때문에 일로오면
router.get('/', (req,res)=>{   //  / 이 주소를 /api로
    res.send('this is root page')
})

router.get('/goods',(req,res)=>{   // 이 주소를 /api/goods 로 바꿔줌
    res.send('this is goods page')
})

module.exports = router