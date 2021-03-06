import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Menu, Button, Icon } from 'semantic-ui-react';
import classes from './Navbar.css';
import logo from '../../../assets/cti_logo.png';
import './Navbar.css';

const navbar = props => {
    let menuItemClasses = [classes.NavbarMenuItem];

    let menuItems = (
        <Menu.Menu position="right">
            <Menu.Item className={classes.Item}>
                <Button icon onClick={(event)=> props.clickMenu(event, '/login')} className={classes.Button} color="blue">
                <Icon name="user" size="large" />
                Login</Button>
            </Menu.Item>
        </Menu.Menu>);

    if (props.isAuth){
        menuItems = (
            <Menu.Menu position="right">
                <Menu.Item active={props.pathname === '/shipping-adv'} className={menuItemClasses.join(' ')}>
                    <Link to="/shipping-adv">
                        <Icon name="unordered list" size="large" />
                        Shipping Advice
                    </Link>
                </Menu.Item>
                <Menu.Item active={props.pathname === '/user'} className={menuItemClasses.join(' ')}>
                    <Link to="/users">
                    <Icon name="users" size="large" />
                    Users</Link>
                </Menu.Item>
                <Menu.Item active={props.pathname === '/settings'} className={classes.NavbarMenuItem}>
                    <Link to="/settings">
                        <Icon name="setting" size="large" />
                    Settings</Link>
                </Menu.Item>
                <Menu.Item>
                    <Button icon color="google plus" onClick={(event) => props.clickMenu(event, '/logout')} className={classes.Button}>
                    <Icon name="sign out" size="large" />
                    Logout</Button>
                </Menu.Item>
            </Menu.Menu>
        );
    };

    return (
        <Menu secondary className={classes.MainMenu}>
            <Menu.Menu className={classes.MenuItem}>
                <Menu.Item onClick={(event) => props.clickMenu(event, '/')}>
                    <img src={logo} className={classes.Logo} alt="logo" />
                </Menu.Item>
            </Menu.Menu>
            {menuItems}
        </Menu>
    );
};

navbar.propTypes = {
    clickMenu: PropTypes.func.isRequired,
    isAuth: PropTypes.bool.isRequired,
};

export default navbar;
