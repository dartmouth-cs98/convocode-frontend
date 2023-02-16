import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { loadProjects } from "../../state/actions";

import { searchProjects } from '../../services/projects';

import './community.css'

class AlgoliaSearch extends Component {
    constructor(props) {
      super(props);
  
      this.state = { searchPath: "" };
  
      this.handleSearchclick = this.handleSearchclick.bind(this);
      this.onContentChange = this.onContentChange.bind(this);
    }

    onContentChange = (event) => {
      this.setState({ searchPath: event.target.value });
    };

    handleSearchclick = (event) => {
      this.props.loadProjects(this.state.searchPath)
      searchProjects(this.state.searchPath);
    };


  //Should just be a search bar and a navigation button
  //On click of the navigation button, it should take you to the search results page
  render() {
    return (
    <div >
      <input type="text" id="AlgoliaInput" placeholder="Search..." onChange={this.onContentChange} value={this.state.searchPath} />
      <button onClick={this.handleSearchclick}>Click me</button>
    </div >
    );
  };
}

const mapStateToProps = (reduxstate) => {
  return {
    projects: reduxstate.community.projects,
  };
};

export default connect(mapStateToProps, { loadProjects })(AlgoliaSearch);

//export default AlgoliaSearch;