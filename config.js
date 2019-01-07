 /* config.js */
 var Joi =  require('joi');

 // require and configure dotenv, will load vars in .env in PROCESS.ENV
 require('dotenv').config();

 // 建立每個變數 joi 驗證規則
 const envVarSchema = Joi.object().keys({
   NODE_ENV: Joi.string().default('development').allow(['development', 'production']), // 字串且預設值為development 並只允許兩種參數
   PORT: Joi.number().default(8080), // 數字且預設值為 8080
   HOST: Joi.string().default('127.0.0.1'), //ip
   USER: Joi.string().default('root'),
   PASS: Joi.string(),
   DATABASE: Joi.string(),
   VERSION: Joi.string() // 字串
 }).unknown().required();

 // process.env 撈取 .env 內的變數做 joi 驗證
 const { error, value: envVars } = Joi.validate(process.env, envVarSchema);

 if (error) {
   throw new Error(`Config validation error: ${error.message}`);
 }

 const config = {
   version: envVars.VERSION, // 版本
   env: envVars.NODE_ENV,  // 開發模式
   port: envVars.PORT,  // 阜號
   host: envVars.HOST, 
   user: envVars.USER,
   password: envVars.PASS,
   database: envVars.DATABASE
 };

 module.exports= config;  // 匯出共用