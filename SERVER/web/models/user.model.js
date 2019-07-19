const RESPONSES = require('../../_constants/responses');
const jwt = require('../../_service/jwt');
const bcrypt = require('../../_service/bcrypt');
const UserSchema = require('../../_model/user.schema');
const teams = [
    {
        first_name: 'John',
        last_name: 'Doe',
        email: 'admin@test.com',
        role: 'Admin',
        password: bcrypt.hashPassword('test')
    },
    {
        first_name: 'John',
        last_name: 'Doe',
        email: 'advisor@test.com',
        role: 'Advisor',
        password: bcrypt.hashPassword('test')
    },
    {
        first_name: 'John',
        last_name: 'Doe',
        email: 'user@test.com',
        role: 'User',
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
        console.log(req.body);
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
                if (bcrypt.comparePassword(req.body.password, doc.password)) {
                    res.status(200).json(
                        {
                            success: true,
                            id: doc._id,
                            username: `${doc.first_name} ${doc.last_name}`,
                            firstName: doc.first_name,
                            lastName: doc.last_name,
                            role: doc.role,
                            token: `${jwt.signWebToken({
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
     * @Todo: List all Advisors
     * @param {*} req 
     * @param {*} res 
     */
    getAllAdvisors(req, res) {
        UserSchema.find({role: 'Advisor'}).select('first_name last_name email role is_active').exec((err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else if (doc === null) {
                res.status(200).json(RESPONSES.RECORDS_NOT_FOUND);
            } else {
                res.status(200).json({
                    success: true,
                    data: doc
                });
            }
        });
    };

    /**
     * @Todo: Get a Advisor
     * @param {*} req 
     * @param {*} res 
     */
    getOneAdvisor(req, res) {
        UserSchema.findById({
            _id: req.params.id,
            role: 'Advisor'
        }, 'first_name last_name email role is_active').exec((err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else if (doc === null) {
                res.status(200).json(RESPONSES.RECORDS_NOT_FOUND);
            } else {
                res.status(200).json({
                    success: true,
                    data: doc
                });
            }
        });
    };

    /**
     * @Todo: Add Advisor
     * @param {*} req 
     * @param {*} res 
     */
    addAdvisor(req, res) {
        req.body.password = bcrypt.hashPassword('test')
        new UserSchema(req.body).save((err, doc) => {
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

    /**
     * @Todo: Update a Advisor
     * @param {*} req 
     * @param {*} res 
     */
    updateAdvisor(req, res) {
        UserSchema.findByIdAndUpdate({
            _id: req.params.id
        }, {
                $set: {
                    'first_name': req.body.first_name,
                    'last_name': req.body.last_name,
                    'email': req.body.email,
                    'updated_by': req.body.updated_by,
                    'updated_at': new Date()
                }
            }).exec((err, doc) => {
                if (err) {
                    res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Updated Successfully!',
                        id: doc.id
                    });
                }
            });
    }

    /**
     * @Todo: Delete a Advisor
     * @param {*} req 
     * @param {*} res 
     */
    deleteAdvisor(req, res) {
        UserSchema.findByIdAndRemove({
            _id: req.params.id
        }).exec((err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else if (doc === null) {
                res.status(200).json(RESPONSES.RECORDS_NOT_FOUND);
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Deleted Successfully!',
                    id: doc.id
                });
            }
        });
    }

};

module.exports = User;