var con = require('./mysqlConnect')
//查詢
exports.getAllDeck = function(callback){
    con.query("SELECT * FROM deck", function (err, result, fields) {
        if (err) throw err;
        callback(result)
    });
}

exports.getDeck = function (callback, data){
    con.query("SELECT * FROM deck where DECK_id = ?", data, function(err, result){
        callback(result)
    })
}

exports.getDeckContent = function (callback, data){
    con.query("SELECT * FROM contain where DECK_id = ?", data, function(err, result){
        callback(result)
    })
}

//新增
exports.createDeck = function (callback,sqlstr){
    con.query(sqlstr,function(err,result){
        if (err) throw err
        console.log("成功新增牌組")
        callback(result)
    })
}

exports.addDeckContent = function (sqlstr){
    con.query(sqlstr,function(err,result){
        if (err) throw err
        console.log("成功新增卡片")
    })
}
//更新
exports.updateDeckContent = function(data){
    var sqlstr= "UPDATE `final`.`contain` SET `C_amount` = '"+data.C_amount+"' WHERE (`DECK_id` = '"+DECK_id+"') and (`C_ID` = '"+data.C_ID+"')";
    con.query(sqlstr,function(err,result){
        if (err) throw err
        console.log("成功修改卡片數量")
    })
}

//刪除
exports.deleteDeckContent = function (data){
    con.query("DELETE FROM `final`.`contain` WHERE (`DECK_id` = '"+data.Deck_id+"') and (`C_ID` = '"+data.C_ID+"');",
    function(err,result){
        if (err) throw err
        console.log("成功刪除卡片")
    })
}

exports.deleteDeck= function(callback,data){
    var cards= data.cards;
    var deckid = data.deckid;
    var userInputPassword = data.userInputPassword
    con.query("select deck_password from deck where DECK_id = '"+deckid+"'",function(err,result){
        var detect = userInputPassword === result[0].deck_password;
        console.log(userInputPassword
            )
        if(detect){
            con.query("DELETE FROM contain WHERE (`DECK_id` = '"+deckid+"')",
            function(err, result){
                console.log("成功刪除牌組內的卡牌")
            })
            con.query("DELETE FROM deck WHERE (`DECK_id` = '"+deckid+"')",
            function(err, result){
                console.log("成功刪除牌組")
            })
        }
        callback(detect)
    })
}