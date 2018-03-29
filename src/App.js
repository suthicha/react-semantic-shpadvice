import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import './App.css';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import ProtectedRoute from './hoc/ProtectedRoute/ProtectedRoute';
import NotFound from './containers/NotFound/NotFound';

const asyncLogin = asyncComponent(() => {
  return import('./containers/Login/Login')
});

const asyncLogout = asyncComponent(() => {
  return import('./containers/Logout/Logout')
});

const asyncShippingAdvice = asyncComponent(() => {
  return import('./containers/ShippingAdvice/ShippingAdvice')
});

class App extends Component {
  
  componentDidMount(){
    this.props.onTryAutoSignup(this.props.location.pathname);
  };

  render() {
    const { pathname } = this.props.location;

    let routes = (
      <Switch>  
        <Route path="/login" component={asyncLogin} />     
        <ProtectedRoute redirectToPath="/login" path="*" component={NotFound} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
        routes = (
          <Switch>
            <Route path="/login" component={asyncLogin} />
            <Route path="/logout" component={asyncLogout} />
            <ProtectedRoute redirectToPath="/login" path="/shipping-adv" component={asyncShippingAdvice} />
            <Route path="/" exact component={asyncShippingAdvice} />
            <Route path="*" component={NotFound} />
          </Switch>
        );
    };

    return (
      <Layout 
        pathname={pathname} 
        isAuth={this.props.isAuthenticated} 
        groupId={this.props.groupId} >
        { routes }
      </Layout>
    );
  }
};

const mapStateToProps = state => {
  return {
    notifications: state.notifications,
    groupId: state.authAgent.groupId,
    isAuthenticated: state.authAgent.token !== null,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: (path) => dispatch(actions.authCheckState(path))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
