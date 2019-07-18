const RESPONSES = require('../../_constants/responses');
const jwt = require('../../_service/jwt');
const bcrypt = require('../../_service/bcrypt');
const UserSchema = require('../../_model/user.schema');
const teams = [
    {
        first_name: 'John',
        last_name: 'Doe',
        email: 'admin@test.com',
        role: 'ADMIN',
        password: bcrypt.hashPassword('test')
    },
    {
        first_name: 'John',
        last_name: 'Doe',
        email: 'advisor@test.com',
        role: 'ADVISOR',
        password: bcrypt.hashPassword('test')
    },
    {
        first_name: 'John',
        last_name: 'Doe',
        email: 'user@test.com',
        role: 'USER',
        password: bcrypt.hashPassword('test')
    }
];


class User {

    constructor() {
        this.defaults = {};
        this.ErrorHandler = (res, message = null, err = null, data = null) => {
            res.status(400).json({
                success: false,
                message: message,
                error: err,
                data: data
            });
        };
        this.onload();
    };

    onload() {
        UserSchema
            .find({})
            .exec((err, doc) => {
                if (err) {
                    console.log('Error: Unable to insert Team');
                } else if (doc.length === 0) {
                    for (var i = 0; i < teams.length; i++) {
                        new UserSchema(teams[i]).save((err, doc) => {
                            if (err) {
                                console.log('Error: Unable to insert Users', err);
                            }
                        });
                    }
                    console.log('Message: Users Added Succesfully');
                } else {
                    console.log('Message: Users Available');
                }
            });
    }

    /**
 * @Todo: Login User
 * @param {*} req 
 * @param {*} res 
 */
    loginUser(req, res) {
        UserSchema.findOne({
            'email': req.body.email
        }, 'first_name last_name email role password', (err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else if (doc === null) {
                res.status(200).json({
                    success: false,
                    message: 'The email address you entered is incorrect. Please try again.'
                });
            } else {
                console.log(doc.password);
                if (bcrypt.comparePassword(req.body.password, doc.password)) {
                    res.status(200).json(
                        {
                            id: doc._id,
                            username: `${doc.first_name} ${doc.last_name}`,
                            firstName: doc.first_name,
                            lastName: doc.last_name,
                            role: doc.role,
                            token: `fake-jwt-token.${jwt.signWebToken({
                                _id: doc._id,
                                first_name: doc.first_name,
                                last_name: doc.last_name,
                                email: doc.email,
                                role: doc.role,
                            })}`
                        });
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Password is incorrect. Please try again.'
                    });
                };
            };
        });
    };

    /**
     * @Todo: Add Location
     * @param {*} req 
     * @param {*} res 
     */
    regUser(req, res) {
        let data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            role: 'USER',
            password: bcrypt.hashPassword(req.body.password)
        }
        new UserSchema(data).save((err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Added Successfully!'
                });
            }
        });
    };

};

module.exports = User;