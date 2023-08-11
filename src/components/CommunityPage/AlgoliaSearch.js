import React from "react";
import { connect } from 'react-redux';
import { loadProjects, updateSearchString, updateCurrentPage, updateTotalPages } from "../../state/actions";

import './search.css'

const AlgoliaSearch = (props) => {

  const handleInputKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSearchClick();
    }
  };

  const onContentChange = (event) => {
    props.updateSearchString(event.target.value);
  };

  const handleSearchClick = () => {

    props.loadProjects(props.searchString, 1)
    props.updateCurrentPage(1);
    props.updateTotalPages(props.searchString);
  };

  return (
    <div className="algolia-container">
      <div className="agolia-search">
        <input type="text" id="AlgoliaInput" placeholder="Search @usernames, #tags, or key words" onChange={onContentChange} value={props.searchString} onKeyDown={handleInputKeypress} />
        <div className="algolia-button">
          <button onClick={handleSearchClick} className="pink">Search</button>
        </div>
      </div >
    </div>
  );

}

const mapStateToProps = (reduxstate) => {
  return {
    projects: reduxstate.community.projects,
    searchString: reduxstate.community.searchString,
  };
};


export default connect(mapStateToProps, { loadProjects, updateSearchString, updateCurrentPage, updateTotalPages })(AlgoliaSearch);
