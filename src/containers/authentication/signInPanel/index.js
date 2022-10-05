import { connect } from 'react-redux';

import SignInPanel from './component';

import { signInUser } from '../../../store/actionCreators/authActionCreators';

import {
  createLoadingSelector, createErrorSelector,
  setError, clearError
} from '../../../store/actionCreators/requestActionCreators';

import ActionTypes from '../../../utils/store';

const loadActions = [ActionTypes.AUTH_USER];

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  isLoading: createLoadingSelector(loadActions)(state),
  errorMessage: createErrorSelector(loadActions)(state),
});

const mapDispatchToProps = {
  signInUser,
  setError,
  clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPanel);
