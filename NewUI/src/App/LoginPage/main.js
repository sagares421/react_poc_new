import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginActions } from '../../_actions';

class LoginPageMain extends React.Component {
  render() {
    const { dispatch, login } = this.props;
    return (
      <div className="login">
      {login.name}
        <h2>LOGIN</h2>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required')
          })}
          onSubmit={(data, { setStatus, setSubmitting }) => {
            dispatch(loginActions.login(data))
          }}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-login">Login</button>
              </div>
            </Form>
          )}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { login } = state;
  const { loginUser } = state;
  const { isAdmin } = state
  return {
    login,
    loginUser,
    isAdmin
  };
}

const connectedApp = connect(mapStateToProps)(LoginPageMain);
export { connectedApp as LoginPageMain }; 
