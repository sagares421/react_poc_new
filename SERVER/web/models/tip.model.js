const TipSchema = require('../../_model/tip.schema');
const RESPONSES = require('../../_constants/responses');

class Tip {

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
    };

    /**
     * @Todo: List all Metals
     * @param {*} req 
     * @param {*} res 
     */
    getAllTips(req, res) {
        TipSchema.find({}).select('').populate('metal_id').exec((err, doc) => {
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

    getApprovedTips(req, res) {
        TipSchema.find({ is_approved: true }).select('').populate('metal_id').exec((err, doc) => {
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

    getTips(req, res) {
        TipSchema.find({ created_by: req.session._id }).select('').populate('metal_id').exec((err, doc) => {
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
     * @Todo: Get a Patient
     * @param {*} req 
     * @param {*} res 
     */
    getOneTip(req, res) {
        TipSchema.findById({
            _id: req.params.id
        }, 'info login.email login.unique login.shc_no login.device_type address times is_active created_at').exec((err, doc) => {
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
     * @Todo: Add Location
     * @param {*} req 
     * @param {*} res 
     */
    addTip(req, res) {
        console.log(req.body);
        new TipSchema(req.body).save((err, doc) => {
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
     * @Todo: Update a CareTeam
     * @param {*} req 
     * @param {*} res 
     */
    updateTip(req, res) {
        TipSchema.findByIdAndUpdate({
            _id: req.params.id
        }, {
                $set: {
                    'name': req.body.name,
                    'tip_one': req.body.tip_one,
                    'tip_two': req.body.tip_two,
                    'tip_three': req.body.tip_three,
                    'comment': req.body.comment,
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
     * @Todo: Update a CareTeam
     * @param {*} req 
     * @param {*} res 
     */
    activateTip(req, res) {
        TipSchema.findByIdAndUpdate({
            _id: req.params.id
        }, {
                $set: {
                    'is_approved': true,
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
     * @Todo: Delete a CareTeam
     * @param {*} req 
     * @param {*} res 
     */
    deleteTip(req, res) {
        TipSchema.findByIdAndRemove({
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

module.exports = Tip;