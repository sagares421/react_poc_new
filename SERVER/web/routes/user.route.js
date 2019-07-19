const express = require('express');
const router = express.Router();

const validate = require('express-validation');

const auth = require('../../_middleware/auth');

const jwt = require('../../_service/jwt');

const UserValidator = require('../../_validation/user.validate');
const UserProvider = require('../models/user.model');
const User = new UserProvider();

/**
 * @TODO: Login User
 */
router.post('/login', User.loginUser);

router.use(auth.isWebValid);

/**
 * @TODO: Get all Advisors
 */
router.get('/advisor', User.getAllAdvisors);

/**
 * @TODO: Get one Advisors
 */
router.get('/advisor/:id', User.getOneAdvisor);

/**
 * @TODO: Add one Advisors
 */
router.post('/advisor', validate(UserValidator.createAdvisor), User.addAdvisor);

/**
 * @TODO: Update one Advisors
 */
router.put('/advisor/:id', validate(UserValidator.updateAdvisor), User.updateAdvisor);

/**
 * @TODO: Remove one Advisors
 */
router.delete('/advisor/:id', User.deleteAdvisor);

module.exports = router;