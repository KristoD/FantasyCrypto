var express = require('express');
var router = express.Router();

// Get Routes

router.use(require('./index/index'));
router.use(require('./signup/signup'));
router.use(require('./platform/platform'));
router.use(require('./platform/platformsell'));

// Post Routes

router.use(require('./signup/register'));
router.use(require('./signup/login'));
router.use(require('./platform/coinpurchase'));
router.use(require('./platform/sellcoin'));

module.exports = router;