const MetalSchema = require('../../_model/metal.schema');
const RESPONSES = require('../../_constants/responses');

class Metal {

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
    getAllMetals(req, res) {
        MetalSchema.find({}).select('name type is_active').exec((err, doc) => {
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
    getOneMetal(req, res) {
        MetalSchema.findById({
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
    addMetal(req, res) {
        console.log(req.body);
        new MetalSchema(req.body).save( (err, doc) => {
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
    updateMetal(req, res) {
        MetalSchema.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                'name': req.body.name,
                'type': req.body.type,
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
    deleteMetal(req, res) {
        MetalSchema.findByIdAndRemove({
            _id: req.params.id
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

module.exports = Metal;