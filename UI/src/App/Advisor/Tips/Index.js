import React from 'react';
import {
    Container, Row, Col, Card, Button, CardHeader, CardBody, Table,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { service } from './Advisors.service';

class Advisors extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            commodities: [],
            comAdd: false,
            comEdit: false,
            comDelete: false,
            tips: [],
            editMetal: {},
            deleteMetal: {}
        };

        this.modelToggle = this.modelToggle.bind(this);
        this.addMetals = this.addMetals.bind(this);
        this.updateMetals = this.updateMetals.bind(this);
        this.deleteMetals = this.deleteMetals.bind(this);
    }

    modelToggle(modelName, d = null) {
        this.setState(prevState => ({
            [modelName]: !prevState[modelName]
        }));
        if (modelName === 'comEdit' && d != null) {
            this.setState({
                editMetal: d
            });
        } else if (modelName === 'comDelete' && d != null) {
            this.setState({
                deleteMetal: d
            });
        }
    }

    componentDidMount() {
        this.getMetals();
        service.getCommodities().then(commodities => this.setState({ commodities: commodities.data }));
        console.log(typeof (this.state.commodities))
    }

    getMetals() {
        service.getAll().then(tips => this.setState({ tips: tips.data }));
    }
    addMetals(data) {
        service.addOne(data).then(tips => {
            this.getMetals();
            this.modelToggle('comAdd')
        });
    }
    updateMetals(data) {
        service.updateById(data, this.state.editMetal._id).then(tips => {
            this.getMetals();
            this.modelToggle('comEdit')
        });
    }
    deleteMetals() {
        service.deleteById(this.state.deleteMetal._id).then(tips => {
            this.getMetals();
            this.modelToggle('comDelete')

        });
    }
    render() {
        return (
            <section className="body-section">
                <div className="container">
                    <div className="st-card">
                        <Card>
                            <CardHeader>
                                <h4>Your Tips</h4>
                                <i className="fa fa-plus-circle" aria-hidden="true" onClick={this.modelToggle.bind(this, 'comAdd')}></i>
                            </CardHeader>
                            <CardBody>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Commoditie</th>
                                            <th>Name</th>
                                            <th>Tip One</th>
                                            <th>Tip Two</th>
                                            <th>Tip Three</th>
                                            <th>Comment</th>
                                            <th>Approved</th>
                                            <th>Active</th>
                                            <th width="15%">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.tips.map((d, i) =>
                                            <tr key={d.id}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{d.metal_id.name}</td>
                                                <td>{d.name}</td>
                                                <td>{d.tip_one}</td>
                                                <td>{d.tip_two}</td>
                                                <td>{d.tip_three}</td>
                                                <td>{d.comment}</td>
                                                <td>{d.is_approved ? 'TRUE' : 'FALSE'}</td>
                                                <td>{d.is_active ? 'TRUE' : 'FALSE'}</td>
                                                <td>
                                                    <Button onClick={this.modelToggle.bind(this, 'comEdit', d)} outline color="info" size="sm"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</Button>{' '}
                                                    <Button onClick={this.modelToggle.bind(this, 'comDelete', d)} outline color="danger" size="sm"><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</Button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                {/* Add Model One Starts */}
                <Modal isOpen={this.state.comAdd} toggle={this.modelToggle.bind(this, 'comAdd')} className={this.props.className}>
                    <ModalHeader toggle={this.modelToggle.bind(this, 'comAdd')}>Add Tip</ModalHeader>
                    <ModalBody>
                        <Formik
                            initialValues={{
                                metal_id: '',
                                name: '',
                                tip_one: '',
                                tip_two: '',
                                tip_three: '',
                                comment: ''
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().required('Name is required'),
                                tip_one: Yup.string().required('Tip 1 is required'),
                                tip_two: Yup.string().required('Tip 2 is required'),
                                tip_three: Yup.string().required('Tip 3 is required'),
                                comment: Yup.string().required('Comment is required')
                            })}
                            onSubmit={fields => {
                                this.addMetals(fields);
                            }}
                            render={({ errors, status, touched }) => (

                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="metal_id">Commoditie</label>
                                        <Field component="select" name="metal_id" class="form-control" className={'form-control' + (errors.metal_id && touched.metal_id ? ' is-invalid' : '')}>
                                            <option>-- Select --</option>
                                            {this.state.commodities.map((d, i) =>
                                                <option value={d._id}>{d.name}</option>
                                            )}
                                        </Field>
                                        <ErrorMessage name="metal_id" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tip_one">Tip One</label>
                                        <Field name="tip_one" type="text" className={'form-control' + (errors.tip_one && touched.tip_one ? ' is-invalid' : '')} />
                                        <ErrorMessage name="tip_one" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tip_two">Tip Two</label>
                                        <Field name="tip_two" type="text" className={'form-control' + (errors.tip_two && touched.tip_two ? ' is-invalid' : '')} />
                                        <ErrorMessage name="tip_two" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tip_three">Tip Three</label>
                                        <Field name="tip_three" type="text" className={'form-control' + (errors.tip_three && touched.tip_three ? ' is-invalid' : '')} />
                                        <ErrorMessage name="tip_three" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="comment">Comment</label>
                                        <Field name="comment" type="text" className={'form-control' + (errors.comment && touched.comment ? ' is-invalid' : '')} />
                                        <ErrorMessage name="comment" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-submit">Submit</button>
                                        <button onClick={this.modelToggle.bind(this, 'comAdd')} type="reset" className="btn btn-secondary btn-cance">Cancel</button>
                                    </div>
                                </Form>
                            )}
                        />
                    </ModalBody>
                </Modal>
                {/* Add Model One Ends */}

                {/* Edit Model One Starts */}
                <Modal isOpen={this.state.comEdit} toggle={this.modelToggle.bind(this, 'comEdit')} className={this.props.className}>
                    <ModalHeader toggle={this.modelToggle.bind(this, 'comEdit')}>Edit Tip</ModalHeader>
                    <ModalBody>
                        <Formik
                            initialValues={{
                                name: this.state.editMetal.name || '',
                                tip_one: this.state.editMetal.tip_one || '',
                                tip_two: this.state.editMetal.tip_two || '',
                                tip_three: this.state.editMetal.tip_three || '',
                                comment: this.state.editMetal.comment || '',
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().required('Name is required'),
                                tip_one: Yup.string().required('Tip 1 is required'),
                                tip_two: Yup.string().required('Tip 2 is required'),
                                tip_three: Yup.string().required('Tip 3 is required'),
                                comment: Yup.string().required('Comment is required')
                            })}
                            onSubmit={fields => {
                                this.updateMetals(fields);
                            }}
                            render={({ errors, status, touched }) => (
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tip_one">Tip One</label>
                                        <Field name="tip_one" type="text" className={'form-control' + (errors.tip_one && touched.tip_one ? ' is-invalid' : '')} />
                                        <ErrorMessage name="tip_one" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tip_two">Tip Two</label>
                                        <Field name="tip_two" type="text" className={'form-control' + (errors.tip_two && touched.tip_two ? ' is-invalid' : '')} />
                                        <ErrorMessage name="tip_two" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tip_three">Tip Three</label>
                                        <Field name="tip_three" type="text" className={'form-control' + (errors.tip_three && touched.tip_three ? ' is-invalid' : '')} />
                                        <ErrorMessage name="tip_three" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="comment">Comment</label>
                                        <Field name="comment" type="text" className={'form-control' + (errors.comment && touched.comment ? ' is-invalid' : '')} />
                                        <ErrorMessage name="comment" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-submit">Submit</button>
                                        <button onClick={this.modelToggle.bind(this, 'comAdd')} type="reset" className="btn btn-secondary btn-cance">Cancel</button>
                                    </div>
                                </Form>
                            )}
                        />
                    </ModalBody>
                </Modal>
                {/* Edit Model One Ends */}

                {/* Delete Model One Starts */}
                <Modal isOpen={this.state.comDelete} toggle={this.modelToggle.bind(this, 'comDelete')} className={this.props.className}>
                    <ModalHeader toggle={this.modelToggle.bind(this, 'comDelete')}>Delete Tip</ModalHeader>
                    <ModalBody>
                        <h3 className="del-sure">{this.state.deleteMetal.name} </h3>
                        <Button onClick={this.deleteMetals} className="btn-submit"><i className="fa fa-paper-plane" aria-hidden="true"></i> Yes</Button>
                        <Button className="btn-cancel" onClick={this.modelToggle.bind(this, 'comDelete')}><i className="fa fa-times-circle" aria-hidden="true"></i> Cancel</Button>
                    </ModalBody>
                </Modal>
                {/* Delete Model One Ends */}
            </section>
        );
    }
}


export { Advisors };