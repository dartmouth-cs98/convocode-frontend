import { connect } from 'react-redux';

import SearchPane from './component';

import { signOutUser } from '../../../store/actionCreators/authActionCreators';

const mapDispatchToProps = {
  signOutUser
};

export default connect(null, mapDispatchToProps)(SearchPane);
