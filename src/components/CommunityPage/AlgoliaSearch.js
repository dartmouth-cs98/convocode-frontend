import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { loadProjects } from "../../state/actions";

import { searchProjects } from '../../services/projects';

import './search.css'

const AlgoliaSearch = (props) => {
  const [searchPath, setSearchPath] = useState("")

  const onContentChange = (event) => {
    setSearchPath(event.target.value);
  };

  const handleSearchClick = () => {
    props.loadProjects(searchPath)
    searchProjects(searchPath);
  };

  return (
    <div className="algolia-container">
      <div className="agolia-search">
        <input type="text" id="AlgoliaInput" placeholder="Search @usernames, #tags, or key words" onChange={onContentChange} value={searchPath} />
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
  };
};

export default connect(mapStateToProps, { loadProjects })(AlgoliaSearch);

//export default AlgoliaSearch;