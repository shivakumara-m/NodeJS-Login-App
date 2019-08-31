var express = require('express');
const fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', getMainPage);

function getMainPage(req, res) {
  console.debug('Route for mainViewpage: ' + __dirname );
  console.log(process.env);
  var mainViewFile = __dirname + '/../public/views/main-view.html';
  console.log('mainView log' , mainViewFile);
  fs.readFile(mainViewFile, function (err, html) {
    if (err) {
      throw err;
    }
    res.set('refer','test213');
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(html);
    res.end();
  });
}
module.exports = router;
