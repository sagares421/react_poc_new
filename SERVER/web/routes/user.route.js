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

/**
 * @TODO: Add User
 */
router.post('/reg', User.regUser);


/**
 * @TODO: Validate Web Token
 */
// router.get('/token-check', auth.isMobValid, (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: 'Ok'
//     })
// });

module.exports = router;