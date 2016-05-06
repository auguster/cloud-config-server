var express = require('express');

var server = express();

server.set('view engine', 'ejs');
server.set('views', __dirname + '/data');

server.use(function(req, res){
    var file = req.path.slice(1)
    if (file)
    {
	res.render(file, req.query);
    }
    else
    {
	res.status('400').send('no file specified');
    }
});

console.log("listening on port 8080");
server.listen(8080);