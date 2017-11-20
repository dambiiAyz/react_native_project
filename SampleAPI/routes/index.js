var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var player1 = {

		heartX : '',
		heartY : '',
		Direction : ''

	}

router.get("/test",function(req, res, next){

	

	player1.heartX = req.query.heartX;
	player1.heartY = req.query.heartY;
	player1.Direction = req.query.direction;

	
	console.log(' '+player1.Direction+' X - '+player1.heartX+' Y - '+player1.heartY);

});

router.get("/player1",function(req, res, next){
	

	res.send({"heartX": player1.heartX, 
			  "heartY": player1.heartY, 
			  "direction": player1.Direction
			});
});

module.exports = router;
