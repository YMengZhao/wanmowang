const express = require('express');
let router = express.Router();
// const bodyParser = require('body-parser');
// let urlencodedParser = bodyParser.urlencoded({ extended: false });


var {
    connect, 
    insert, 
    find,
    del, 
    update, 
    ObjectId
  } = require("../libs/mongo.js");

// 查找商品
router.get('/',async(req,res)=>{
   
    var data = await find('cart',{})
      
    
    res.send(data);
})


router.post('/insert',async(req,res)=>{
    let {
        picture,
        goodsname,
        goodsid,
        allPrice,
        num,
        size,
        color,
        username
    }=req.body
   
    var data = await find('cart',{
        username,
        goodsid,
        size,
        color
    })
    if(data == ''){
        var data = await insert("cart", [{
            picture,
            goodsname,
            goodsid,
            allPrice,
            num,
            size,
            color,
            username
        }]);
        res.send("succes")
    }else{
        num = String((data[0].num*1 + num*1))
        allPrice = String(data[0].allPrice*1 + allPrice*1)
        // console.log(num,allPrice)
        update('cart', {
            username,
            goodsid,
            size,
            color
        }, {
            num,
            allPrice
        }, true);
        res.send("succes");
    }
    
})
  
// 删除商品
// db文件夹下的find可以用来删除商品
// router.delete('/',urlencodedParser,async(req,res)=>{
//     let {id} = req.query;
//     // console.log(req.query)
//     var delSql = 'DELETE FROM cart where id=' + id;
//     var data = await db.find(delSql);
//     res.send(data);
// })

// // 修改商品
// // db文件夹下的add可以用来修改商品
// router.post('/',urlencodedParser,async(req,res)=>{
//     let {num,id} = req.body
//     let modSql = 'UPDATE cart SET num = ? WHERE id = ?';
//     let modSqlParams = [num, id];

//     var data = await db.add(modSql,modSqlParams);
//     res.send(data);
// })

// // 添加商品
// router.put('/',urlencodedParser,async(req,res)=>{
//     let {id,title,price,num,url} = req.body;
//     let Params = [id,title,price,num,url];
//     // console.log(title,price,num,url)
//     // res.send(req.body)
//     var sql = 'INSERT INTO cart (id,title,price,num,url)  VALUES(?,?,?,?,?)';
//     var data = await db.add(sql,Params);
//     res.send(data);
// })


module.exports = router;