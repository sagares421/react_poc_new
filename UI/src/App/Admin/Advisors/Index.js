import React from 'react';
import {
    Container, Row, Col, Card, Button, CardHeader, CardBody, Table,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { service } from './AdminAdvisors.service';

class AdminAdvisors extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comAdd: false,
            comEdit: false,
            comDelete: false,
            commodities: [],
            editMetal: {},
            deleteMetal: {}
        };

        this.modelToggle = this.modelToggle.bind(this);
        this.addMetals =this.addMetals.bind(this);
        this.updateMetals =this.updateMetals.bind(this);
        this.deleteMetals =this.deleteMetals.bind(this);
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
    }
    getMetals() {
        service.getAll().then(commodities => this.setState({ commodities: commodities.data }));
    }
    addMetals(data){
        service.addOne(data).then(commodities => {
            this.getMetals();
            this.modelToggle('comAdd')
        });
    }
    updateMetals(data){
        service.updateById(data, this.state.editMetal._id).then(commodities => {
            this.getMetals();
            this.modelToggle('comEdit')
        });
    }
    deleteMetals() {
        service.deleteById(this.state.deleteMetal._id).then(commodities => {
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
                                <h4>Advisors</h4>
                                <i className="fa fa-plus-circle" aria-hidden="true" onClick={this.modelToggle.bind(this, 'comAdd')}></i>
                            </CardHeader>
                            <CardBody>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Active</th>
                                            <th width="15%">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.commodities.map((d, i) =>
                                            <tr key={d.id}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{d.first_name}</td>
                                                <td>{d.last_name}</td>
                                                <td>{d.email}</td>
                                                <td>{d.is_active? 'TRUE': 'FALSE'}</td>
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
                    <ModalHeader toggle={this.modelToggle.bind(this, 'comAdd')}>Add Advisor</ModalHeader>
                    <ModalBody>
                        <Formik
                            initialValues={{
                                first_name: '',
                                last_name: '',
                                email: '',
                                role: 'Advisor'
                            }}
                            validationSchema={Yup.object().shape({
                                first_name: Yup.string().required('First Name is required'),
                                last_name: Yup.string().required('Last Name is required'),
                                email: Yup.string().required('Email is required')
                            })}
                            onSubmit={fields => {
                                this.addMetals(fields);
                            }}
                            render={({ errors, status, touched }) => (
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="name">First Name</label>
                                        <Field name="first_name" type="text" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
                                        <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Last Name</label>
                                        <Field name="last_name" type="text" className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')} />
                                        <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="type">Email</label>
                                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
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
                    <ModalHeader toggle={this.modelToggle.bind(this, 'comEdit')}>Edit Advisor</ModalHeader>
                    <ModalBody>
                        <Formik
                            initialValues={{
                                first_name: this.state.editMetal.first_name || '',
                                last_name: this.state.editMetal.last_name || '',
                                email: this.state.editMetal.email || '',
                                role: 'Advisor'
                            }}
                            validationSchema={Yup.object().shape({
                                first_name: Yup.string().required('First Name is required'),
                                last_name: Yup.string().required('Last Name is required'),
                                email: Yup.string().required('Email is required')
                            })}
                            onSubmit={fields => {
                                this.updateMetals(fields);
                            }}
                            render={({ errors, status, touched }) => (
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="name">First Name</label>
                                        <Field name="first_name" type="text" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
                                        <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Last Name</label>
                                        <Field name="last_name" type="text" className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')} />
                                        <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="type">Email</label>
                                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
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
                    <ModalHeader toggle={this.modelToggle.bind(this, 'comDelete')}>Delete Advisor</ModalHeader>
                    <ModalBody>
                        <h3 className="del-sure">{this.state.deleteMetal.first_name}  {this.state.deleteMetal.last_name}</h3>
                        <Button onClick={this.deleteMetals} className="btn-submit"><i className="fa fa-paper-plane" aria-hidden="true"></i> Yes</Button>
                        <Button className="btn-cancel" onClick={this.modelToggle.bind(this, 'comDelete')}><i className="fa fa-times-circle" aria-hidden="true"></i> Cancel</Button>
                    </ModalBody>
                </Modal>
                {/* Delete Model One Ends */}
            </section>
        );
    }
}


export { AdminAdvisors };