const { Router } = require('express');
const AppController = require('../controller/AppContorller');
const BotController = require('../controller/BotController');


const router = Router();

router.get("/", AppController.test);
router.post('/bot', BotController.Botgenai);



module.exports = router