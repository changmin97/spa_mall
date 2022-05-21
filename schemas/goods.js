const mongoose = require('mongoose');

const goodsSchema = mongoose.Schema({
    goodsId : {
        type : Number,
        required : true,
        unique : true, //아이디 고유한지 안한지 확인하는 key
    },
    name : {
        type : String,
        required : true,
        unique : true,
    },
    thumbnailUrl : {
        type : String,
    },
    category : {
        type : String,
    },
    price : {
        type : Number
    },
});

module.exports = mongoose.model('Goods', goodsSchema) 
                        //model('모델명',schema)