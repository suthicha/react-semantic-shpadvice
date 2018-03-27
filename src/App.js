import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import './App.css';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';

const asyncLogin = asyncComponent(() => {
  return import('./containers/Login/Login')
});

const asyncDashboard = asyncComponent(() => {
  return import('./containers/Dashboard/Dashboard')
});

const asyncShippingAdvice = asyncComponent(() => {
  return import('./containers/ShippingAdvice/ShippingAdvice')
});

class App extends Component {
  
  componentDidMount(){

  };

  render() {
    const { pathname } = this.props.location;
    const isAccessible = true;
    const groupId = 1;

    let routes = (
      <Switch>
        <Route path="/shipping-advice" component={asyncShippingAdvice} />        
        <Route path="/login" component={asyncLogin} />        
        <Route path="/" exact component={asyncDashboard} />
      </Switch>
    );

    return (
      <Layout 
        pathname={pathname} 
        isAuth={isAccessible} 
        groupId={groupId} >
        { routes }
      </Layout>
    );
  }
};

const mapStateToProps = state => {
  return {
    notifications: state.notifications,
  }
};

export default withRouter(connect(mapStateToProps)(App));
