import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history, Role } from '../_helpers';
import { authenticationService } from '../_services';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { LoginPage } from './LoginPage';

// Components
import { Admin } from './Admin/Main';
import { AdminCommodities } from './Admin/Commodities/Index';
import { AdminAdvisors } from './Admin/Advisors/Index';
import { AdminTips } from './Admin/Tips/Index';
import { Advisors } from './Advisor/Tips/Index';
import { Users } from './User/GetTips/Index';

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
        history.push('/');
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
                                        {isAdmin && <li class="nav-item"><Link to="/admin/tips" className="nav-item nav-link">Tips</Link></li>}
                                        <li class="nav-item">
                                            <Link onClick={this.logout.bind(this)} className="nav-link btn" href="#">Logout</Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        }
                        <Switch>
                            <PrivateRoute exact path="/admin" roles={[Role.Admin]} component={Admin} />
                            <PrivateRoute exact path="/admin/commodities" roles={[Role.Admin]} component={AdminCommodities} />
                            <PrivateRoute exact path="/admin/advisors" roles={[Role.Admin]} component={AdminAdvisors} />
                            <PrivateRoute exact path="/admin/tips" roles={[Role.Admin]} component={AdminTips} />
                            <PrivateRoute exact path="/advisor" roles={[Role.Advisor]} component={Advisors} />
                            <PrivateRoute exact path="/user" roles={[Role.User]} component={Users} />
                            <Route exact path="/" component={LoginPage} />
                        </Switch>
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