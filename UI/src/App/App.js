import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { history, Role  } from '../_helpers';
import { authenticationService } from '../_services';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from './HomePage';
import { AdminPage } from './AdminPage';
import { LoginPage } from './LoginPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }

    componentDidMount() {
        let x = authenticationService.currentUser;
        this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin
        })
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { alert } = this.props;
        const { currentUser, isAdmin } = this.state;
        return (
            <React.Fragment>
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }

                <Router history={history}>
                    <div>
                        {currentUser &&
                            <nav className="navbar navbar-expand navbar-dark bg-dark">
                                <div className="navbar-nav">
                                    <Link to="/" className="nav-item nav-link">Home</Link>
                                    {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
                                    <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                                </div>
                            </nav>
                        }
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                                <div className="navbar-nav">
                                    <Link to="/" className="nav-item nav-link">Home</Link>
                                    {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
                                    <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                                </div>
                            </nav>
                        <div className="jumbotron">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 offset-md-3">
                                        <PrivateRoute exact path="/" component={HomePage} />
                                        <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
                                        <Route path="/login" component={LoginPage} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Router>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 