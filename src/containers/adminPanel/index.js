import { connect } from 'react-redux';

import AdminPanel from './component';

import { createErrorSelector, createLoadingSelector } from '../../store/actionCreators/requestActionCreators';
import { fetchResourceById, fetchAllResources } from '../../store/actionCreators/resourceActionCreators';
import { fetchUserById, fetchAllUsers } from '../../store/actionCreators/userActionCreators';

import ActionTypes from '../../utils/store';

const userSelectorActions = [ActionTypes.FETCH_USER, ActionTypes.FETCH_USERS, ActionTypes.DELETE_USER];
const resourceSelectorActions = [ActionTypes.FETCH_RESOURCE, ActionTypes.FETCH_RESOURCES, ActionTypes.DELETE_RESOURCE];

const mapStateToProps = (state) => ({
  resourceIsLoading: createLoadingSelector(resourceSelectorActions)(state),
  resourceErrorMessage: createErrorSelector(resourceSelectorActions)(state),
  userIsLoading: createLoadingSelector(userSelectorActions)(state),
  userErrorMessage: createErrorSelector(userSelectorActions)(state),

  resourceMap: state.resource.resources,
  userMap: state.auth.users,
});

export default connect(mapStateToProps, {
  fetchResourceById,
  fetchAllResources,
  fetchUserById,
  fetchAllUsers
})(AdminPanel);
