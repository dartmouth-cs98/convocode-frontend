import { connect } from 'react-redux';

import SearchPane from './component';

import { createLoadingSelector, createErrorSelector } from '../../../store/actionCreators/requestActionCreators';
import ActionTypes from '../../../utils/store';

// Import loading state and error messages of specified actions from redux state
const loadingSelector = createLoadingSelector([[ActionTypes.SEARCH, ActionTypes.FETCH_RESOURCES]]);
const errorSelector = createErrorSelector([ActionTypes.SEARCH, ActionTypes.FETCH_RESOURCES]);

const mapStateToProps = (state) => ({
  results: state.resource.results,
  numResults: state.resource.numResults,
  isLoading: loadingSelector(state),
  errorMessage: errorSelector(state),
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPane);
