import React from 'react';
import {
    Container, Row, Col, Card, Button, CardHeader, CardBody, Table,
    Modal, ModalHeader, ModalBody
} from 'reactstrap';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { service } from './User.service';

class Users extends React.Component {
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
    }

    getMetals() {
        service.getAll().then(tips => this.setState({ tips: tips.data }));
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
                                            <th>Active</th>
                                            <th width="20%">Action</th>
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
                                                <td>{d.is_active ? 'TRUE' : 'FALSE'}</td>
                                                <td>
                                                     <Button onClick={this.modelToggle.bind(this, 'comDelete', d)} outline color="danger" size="sm"><i className="fa fa-trash-o" aria-hidden="true"></i> Rate</Button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </div>
                </div>

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


export { Users };