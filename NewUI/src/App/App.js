import React from 'react';
import { connect } from 'react-redux';
import { history, Role } from '../_helpers';
import { Router, Route, Link, Switch } from 'react-router-dom';

// Components
import { TopNav } from './_Layouts/TopName';
import { Footer } from './_Layouts/Footer';
import { AdminPageMain } from './AdminPage/main';
import { AdminCommodityPage } from './AdminPage/commodityPage';
import { AdminAdvisorPage } from './AdminPage/advisorPage';
import { AdminTipPage } from './AdminPage/tipsPage';
import { AdvisorPageMain } from './AdvisorPage/main';
import { UserPageMain } from './UserPage/main';
import { LoginPageMain } from './LoginPage/main';

// Protected Route
import { PrivateRoute } from '../_helpers/PrivateRoute'


class App extends React.Component {

  logout() {
    history.push('/');
}

  render() {
    const { loginUser, isAdmin } = this.props;
    return (
      <React.Fragment>
        <Router history={history}>
          <div>
            {loginUser ? <nav class="navbar navbar-expand bg-nav">
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
            </nav> : null}
            <Switch>
              <PrivateRoute exact path="/admin" roles={[Role.Admin]} component={AdminPageMain} />
              <PrivateRoute exact path="/admin/commodities" roles={[Role.Admin]} component={AdminCommodityPage} />
              <PrivateRoute exact path="/admin/advisors" roles={[Role.Admin]} component={AdminAdvisorPage} />
              <PrivateRoute exact path="/admin/tips" roles={[Role.Admin]} component={AdminTipPage} />
              <PrivateRoute exact path="/advisor" roles={[Role.Advisor]} component={AdvisorPageMain} />
              <PrivateRoute exact path="/user" roles={[Role.User]} component={UserPageMain} />
              <Route exact path="/" component={LoginPageMain} />
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { loginUser } = state;
  const { isAdmin } = state
  return {
    loginUser,
    isAdmin
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
