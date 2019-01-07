var deckModel = require('../model/deckModel');

exports.getAllDeck = function(req, res)
{
    deckModel.getAllDeck(function(result){
        if(result.length == 0) res.send('is not exist')
        else res.json(result)
    })
};
exports.findDeck = function(req, res)
{
    var data = [req.params[0]];
    deckModel.getDeck(function(result){
        if(result.length == 0) res.send('is not exist')
        else res.json(result)
    },data)
}; 

exports.getDeckContent = function(req, res)
{
    var data = [req.params[0]];
    deckModel.getDeckContent(function(result){
        if(result.length == 0) res.send('is not exist')
        else res.json(result)
    },data)
}; 

exports.createDeck = function(req,res){
    var sqlstr = "insert into final.deck (deck_class, deck_amount, deck_id, deck_name, deck_intro, deck_password) "+
    "value('"+req.body.deckClass+"', "+req.body.deck_count+", null,'" + req.body.deckName +"', '" + req.body.deckIntro+"', '"+req.body.deckPass+"')";
    var cards = JSON.parse(req.body.allcard);
    console.log(cards)
    deckModel.createDeck(function(result){
        console.log(result.insertId)
        cards.forEach(card => {
            var sqlstr = ("insert into final.contain (deck_id, c_id, c_amount) "+
            "value("+result.insertId+", "+card.C_ID+", "+ card.c_amount+")");
            deckModel.addDeckContent(sqlstr)
        });
    },sqlstr);
    res.json({
        success: true
    })
}

exports.deleteDeck = function(req,res){
    var DECK_id = req.body.DECK_id
    var userInputPassword = req.body.password
    deckModel.deleteDeck(function(result){
        if(result === true)res.json({message:'success'})
        else {
            res.json({message:'faild'})
        }
    },{deckid:DECK_id, userInputPassword: userInputPassword})
}
