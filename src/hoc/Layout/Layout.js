import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import classes from './Layout.css';
import Aux from '../Aux/Aux';

class Layout extends Component {

    handleClickMenu = (event, pathname) => {
        event.preventDefault();
        this.props.history.push(pathname);
    }

    render(){
        return(
            <Aux>
                <Navbar
                    pathname={this.props.pathname} 
                    isAuth={this.props.isAuth}
                    groupId={this.props.groupId}
                    clickMenu={this.handleClickMenu} />
                <div className={classes.Content}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

Layout.propTypes = {
    pathname: PropTypes.string.isRequired,
    isAuth: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired,
    groupId: PropTypes.number.isRequired,
};

Layout.defaultProps = {
    isAuth: false,
    groupId: 1,
}

export default withRouter(Layout);
