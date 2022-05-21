const express = require('express');
const Goods = require('../schemas/goods')
const router = express.Router(); 

router.get('/',(req,res)=>{
    res.send('this is root page');
});



router.get('/goods',async (req,res)=>{ //  ##목록 조회 api구현1##
    const {category} = req.query

    const goods = await Goods.find({category})

    res.json({
        goods,
    })
});


router.get('/goods/:goodsId',async (req,res)=>{  //   '/:아무값' 의미 /:아무값이나 받겠다. 
    const { goodsId } = req.params;  //   /:  값에 접근하려면 req.params.으로 접근
    
    const [detail] = await Goods.find({ goodsId : Number(goodsId)})
    
    //  56 번 하면서 지움 const [detail] = goods.filter((item)=>{ //filter메소드의 return값에는 특이하게 조건식이 들어가며, 조건식에 해당하는 것들만 배열에 담겨짐 , //구조 분해 할당 : 배열이란 값 풀어 낸다
    //     return item.goodsId === Number(goodsId)  //왼쪽에 있는 item.goodsId는 코드위에있는 숫자타입이고
    // })                              //오른쪽에 있는 goodsId는 주소에 입력된 값이기에 문자타입으로 나온다.
                                            //그래서 숫자형으로 바꿔야 타입까지 일치.
    res.json({
        detail,  //구조 분해 할당 , key : value 값 같아서 하나로 
    })                                 
})

router.post('/goods',async (req,res)=>{//find 함수는 promise를 반환함으로 async로 만들어야 await쓸수있다 // get을 제외한 매소드는 body(=payload)에 접근할 수 있음(스케마에 접근해서 수정해야 하니까)
    const { goodsId, name, thumbnailUrl, category ,price } = req.body //5줄을 비 구조화 할당으로 한줄로 만듬
    
    const goods = await Goods.find({ goodsId })
    if(goods.length){
        return res.status(400).json({ sucess :false , errorMessage : '이미 있는 데이터입니다.'})
    }

    const createdGoods = await Goods.create({goodsId, name, thumbnailUrl, category ,price })
    res.json({ goods : createdGoods })
})

module.exports = router;

