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
        TipSchema.find({}).select('').exec((err, doc) => {
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
        }, 'info login.email login.unique login.shc_no login.device_type address times is_active created_at').exec( (err, doc) => {
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
        new TipSchema(req.body).save( (err, doc) => {
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
                'admin_name': req.body.admin_name,
                'careteam_list': req.body.careteam_list,
                'updated_by': req.body.updated_by,
                'updated_at': new Date()
            }
        }).exec( (err, doc) => {
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
                'name': req.body.name,
                'admin_name': req.body.admin_name,
                'careteam_list': req.body.careteam_list,
                'updated_by': req.body.updated_by,
                'updated_at': new Date()
            }
        }).exec( (err, doc) => {
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
            _id: req.params.c_id
        }).exec( (err, doc) => {
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