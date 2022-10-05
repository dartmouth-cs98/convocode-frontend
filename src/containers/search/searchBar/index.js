import { connect } from 'react-redux';

import SearchBar from './component';

import { resourceSearch } from '../../../store/actionCreators/searchActionCreators';

const mapDispatchToProps = {
  resourceSearch
};

export default connect(null, mapDispatchToProps)(SearchBar);
