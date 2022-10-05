/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';

/**
 * A function that takes two components and displays
 * <SuccessComp /> if the user is authenticated or
 * <FailureComp /> if the user is not authenticated
 */
export default (SuccessComp, FailureComp) => {
  const RequireAuthHOC = (props) => (props.authenticated
    ? <SuccessComp {...props} />
    : <FailureComp {...props} />);

  const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated,
  });

  return connect(mapStateToProps, null)(RequireAuthHOC);
};
