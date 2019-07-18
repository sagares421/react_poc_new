import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { history, Role } from '../_helpers';
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
            isAdmin: false,
            isAdvisor: false,
            isuser: false,
        };
    }

    componentDidMount() {
        let x = JSON.parse(localStorage.getItem('currentUser'));
        this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin,
            isAdvisor: x && x.role === Role.Advisor,
            isUser: x && x.role === Role.User,
        })
        console.log(this.state);
    }

    logout() {
        this.setState({
            currentUser: null,
            isAdmin: false
        })
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
                            <nav class="navbar navbar-expand bg-nav">
                                <Link class="navbar-brand">Stock Tips</Link>
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>

                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav ml-auto">
                                        {isAdmin && <li class="nav-item"><Link to="/admin/commodities" className="nav-item nav-link">Commodities</Link></li>}
                                        {isAdmin && <li class="nav-item"><Link to="/admin/advisors" className="nav-item nav-link">Advisors</Link></li>}
                                        {isAdmin && <li class="nav-item"><Link to="/admin/users" className="nav-item nav-link">Users</Link></li>}
                                        <li class="nav-item">
                                            <Link onClick={this.logout.bind(this)} class="nav-link" href="#">Logout</Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        }
                        <PrivateRoute exact path="/" component={HomePage} />
                        <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
                        <Route path="/login" component={LoginPage} />
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