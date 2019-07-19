const express = require('express');
const router = express.Router();
const validate = require('express-validation');

const auth = require('../../_middleware/auth');

const TipValidator = require('../../_validation/tip.validate');

const TipClass = require('../models/tip.model');
const Tip = new TipClass();


router.use(auth.isWebValid);

/**
 * @TODO: Get all Tips
 */
router.get('/all', Tip.getAllTips);

/**
 * @TODO: Get all Tips
 */
router.get('/approved', Tip.getApprovedTips);

/**
 * @TODO: Get all Tips
 */
router.get('/', Tip.getTips);


/**
 * @TODO: Get one Tip
 */
router.get('/:id', Tip.getOneTip);


/**
 * @TODO: Add one Tip
 */
router.post('/', validate(TipValidator.createTip), Tip.addTip);

/**
 * @TODO: Update one Tip
 */
router.put('/:id', validate(TipValidator.updateTip), Tip.updateTip);

/**
 * @TODO: Activate one Tip
 */
router.put('/activate/:id',  Tip.activateTip);


/**
 * @TODO: Remove one Tip
 */
router.delete('/:id', Tip.deleteTip);

module.exports = router;