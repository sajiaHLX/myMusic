var express = require('express');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var multer = require('multer');
var router = express.Router();
var con = require('../utils/connection');
con.connect();
let objMulter = multer({
  dest: ""
}); //实例化multer，传递的参数对象，dest表示上传文件的存储路径
router.use(objMulter.any());

router.post("/", (req, res) => {
  // let file = req.files[0];
  // let singer = file.originalname.split('-')[0].slice(0, -1);
  // let name = file.originalname.split('-')[1].split('.')[0].slice(1);
  // let add = 'INSERT INTO music.`music-file`(file,singer,name) VALUES(?,?,?)';
  // con.query(add, ['123123', singer, name], (err, res) => {
  //   if (err) {
  //     console.log('[INSERT ERROR] - ', err.message);
  //     return;
  //   }
  //   console.log('INSERT ID:', res);
  // });
  // console.log(req.files[0], singer, name);
  // fs.renameSync(oldName, newName);
  // res.send();
});
// let storage = multer.diskStorage({ 
//   destination: function(req, file, cb) {
//     cb(null, "mp3"); 
//   },
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + "." + file.originalname.split(".")[1]);
//   }
// });

// let upload = multer({
//   storage: storage,
// });

// router.post("/", upload.single("mp3"), (req, res, next) => {
//   if (err) throw err;
//   else {
//     res.json(req.body);
//   }
// });

// router.post('/', function (req, res, next) {

// req.pipe(fs.createWriteStream('.' + req.url, {
//      encoding:'binary' // 行
// }));
// res.end(`${req.url} done!`);
// console.log(req);
// res.send('chenggong')
// let data = {
//   file: '',
// }
// var currFile = '/Users/helinxiao/Music/网易云音乐/薛之谦 - 天外来物.mp3';
// let file = fs.readFileSync(currFile, 'binary');
// res.set('content-type', 'audio/mp3'); //设置返回类型
// var finalData = Buffer(file);
// res.write(finalData);
// res.end();
// con.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
// /Users/helinxiao/myJob/myMusic/services/public/images/logo192.png
// let file = fs.readFileSync('/Users/helinxiao/myJob/myMusic/services/public/images/logo192.png', 'binary');
// data.file = Buffer(file);
// res.write(finalData);
// res.end();
// });
module.exports = router;