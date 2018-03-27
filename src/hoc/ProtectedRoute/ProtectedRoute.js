import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
    redirectToPath,
    component: Component,
    ...rest
}) => {
    const token = localStorage.getItem('token');
    return token
        ? <Route {...rest} render={props => <Component {...props} />} />
        : <Route {...rest} render={props => <Redirect
            to={{
                pathname: redirectToPath,
                state: { from: props.location },
            }}/>} />
};

ProtectedRoute.propTypes = {
    redirectToPath: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    location: PropTypes.shape({
        /** Current exact location of page */
        pathname: PropTypes.string,
    }),
};

ProtectedRoute.defaultProps = {
    location: {},
};

export default ProtectedRoute;
