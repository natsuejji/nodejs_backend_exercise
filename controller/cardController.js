var cardModel = require('../model/cardModel');

exports.getallCard = function(req, res)
{
    cardModel.allCard(function(result){
        res.json(result)
    })
};

exports.findCard = function(req, res)
{
    var sqlstr = "select * from card ";
    var count =0;
 
    for (var key in req.body) {
        console.log(key,req.body[key])
        if(req.body[key]=="") continue;
        if(count==0){sqlstr+= 'where '}
        else {sqlstr+= 'and'}
        if(key=="c_kind") {sqlstr+= " c_kind = '"+req.body[key]+"' "}
        if(key=="C_rare") {sqlstr+= " C_rare = '"+req.body[key]+"' "}
        if(key=="C_class") {sqlstr+= " (C_class = 'Neutral' or C_class ='"+req.body[key]+"')"}
        if(key=="c_name") {sqlstr+= " c_name like '"+req.body[key]+"' "}

        count++;
    }
    cardModel.findCard(function(result){
        //if(result.length == 0) res.send('is not exist')
        res.json(result)
    },sqlstr,req.body)
}; 

exports.findCardByID = function(req, res)
{
    var data = [req.params[0]];
    cardModel.findCardByID(function(result){
        if(result.length == 0) res.send('is not exist')
        else res.json(result)
    },data)
}; 
exports.findCardByName = function(req, res)
{
    var data = [req.params[0]];
    cardModel.findCardByName(function(result){
        if(result.length == 0) res.send('is not exist')
        else res.json(result)
    },data)
}; 

exports.findCardByClass = function(req, res)
{
    var data = [req.params[0]];
    cardModel.findCardByClass(function(result){
        if(result.length == 0) res.send('is not exist')
        else res.json(result)
    },data)
}; 

exports.findCardByKind = function(req, res)
{
    var data = [req.params[0]];
    cardModel.findCardByKind(function(result){
        if(result.length == 0) res.send('is not exist')
        else res.json(result)
    },data)
}; 

exports.findCardByRare = function(req, res)
{
    var data = [req.params[0]];
    cardModel.findCardByRare(function(result){
        if(result.length == 0) res.send('is not exist')
        else res.json(result)
    },data)
}; 
