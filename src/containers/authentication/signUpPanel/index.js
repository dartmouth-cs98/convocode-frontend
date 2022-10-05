import { connect } from 'react-redux';

import SignUpPanel from './component';

import { signUpUser } from '../../../store/actionCreators/authActionCreators';

import {
  createLoadingSelector, createErrorSelector,
  setError, clearError,
} from '../../../store/actionCreators/requestActionCreators';

import ActionTypes from '../../../utils/store';

// Import loading state and error messages of specified actions from redux state
const loadActions = [ActionTypes.AUTH_USER];
const loadingSelector = createLoadingSelector(loadActions);
const errorSelector = createErrorSelector(loadActions);

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  isLoading: loadingSelector(state),
  errorMessage: errorSelector(state),
});

const mapDispatchToProps = {
  signUpUser,
  setError,
  clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPanel);
