const express = require('express');
const router = express.Router();
const validate = require('express-validation');

const auth = require('../../_middleware/auth');

const MetalValidator = require('../../_validation/metal.validate');

const MetalClass = require('../models/metal.model');
const Metal = new MetalClass();


router.use(auth.isWebValid);

/**
 * @TODO: Get all Metals
 */
router.get('/', Metal.getAllMetals);

/**
 * @TODO: Get one Metal
 */
router.get('/:id', Metal.getOneMetal);

/**
 * @TODO: Add one Metal
 */
router.post('/', validate(MetalValidator.createMetal), Metal.addMetal);

/**
 * @TODO: Update one Metal
 */
router.put('/:id', validate(MetalValidator.updateMetal), Metal.updateMetal);

/**
 * @TODO: Remove one Metal
 */
router.delete('/:id', Metal.deleteMetal);

module.exports = router;