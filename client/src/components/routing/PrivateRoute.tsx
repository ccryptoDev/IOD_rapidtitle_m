import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';

type PrivateRouteTypes = {
  component : any;
  auth : any;
}
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading }
}:PrivateRouteTypes) => {
  if (loading) return <Spinner />;
  if (isAuthenticated) return <Component />;

  return <Navigate to="/auth/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state : any) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
