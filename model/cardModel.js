var con = require('./mysqlConnect')

exports.allCard=function(callback){
  con.query("SELECT * FROM card", function (err, result, fields) {
    if (err) throw err;
    callback(result)
  });
}

exports.findCard=function(callback, sqlstr, data){
  console.log( data)
  console.log(sqlstr)
  con.query(sqlstr, data, function(err, result){
    callback(result)
  })
}

exports.findCardByID=function(callback, data){
  con.query("SELECT * FROM card where C_id = ?", data, function(err, result){
    callback(result)
  })
}
exports.findCardByName=function(callback, data){
  con.query("SELECT * FROM card where c_name = ?", data, function(err, result){
    callback(result)
  })
}
exports.findCardByClass=function(callback, data){
  con.query("SELECT * FROM card where C_class = 'Neutral' or c_class= '"+data+"')", data, function(err, result){
    callback(result)
  })
}
exports.findCardByKind=function(callback, data){
  con.query("SELECT * FROM card where c_kind = ?", data, function(err, result){
    callback(result)
  })
}
exports.findCardByRare=function(callback, data){
  con.query("SELECT * FROM card where C_rare = ?", data, function(err, result){
    callback(result)
  })
}
