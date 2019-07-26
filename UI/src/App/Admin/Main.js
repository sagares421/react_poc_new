import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { userService } from '../../_services';

class Admin extends React.Component {

    render() {
        return (
            <React.Fragment>

                <section className="body-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <Card body>
                                    <CardTitle>Commodities</CardTitle>
                                    <Link to="/admin/commodities" className="nav-item nav-link"><Button className="btn-full">Go</Button></Link>
                                </Card>
                            </div>
                            <div className="col-md-4">
                                <Card body>
                                    <CardTitle>Advisors</CardTitle>
                                    <Link to="/admin/advisors" className="nav-item nav-link"><Button className="btn-full">Go</Button></Link>
                                </Card>
                            </div>
                            <div className="col-md-4">
                                <Card body>
                                    <CardTitle>Tips</CardTitle>
                                    <Link to="/admin/tips" className="nav-item nav-link"><Button className="btn-full">Go</Button></Link>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export { Admin };