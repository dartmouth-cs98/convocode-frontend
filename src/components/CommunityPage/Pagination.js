import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { loadProjects, updateCurrentPage, updateTotalPages } from "../../state/actions";

import './community.css'

const Pagination = (props) => {

  useEffect(() => {
    props.updateCurrentPage(1);
    props.updateTotalPages();
  }, []);

  const handlePreviousClick = () => {
    if(props.currentPage === 1) return;
    props.updateCurrentPage(props.currentPage - 1)
    props.loadProjects(props.searchString, props.currentPage -1 )
  };

  const handleForwardClick = () => {
    if(props.currentPage === props.totalPages) return;
    props.updateCurrentPage(props.currentPage + 1)
    props.loadProjects(props.searchString, props.currentPage+ 1)
  };

  return (
    <div className="pagination-container">
      <div className="pagination-button">
        <button onClick={handlePreviousClick} >&lt;</button>
      </div>
      <p>{props.currentPage} of {props.totalPages}</p>
      <div className="pagination-button">
        <button onClick={handleForwardClick} >&gt;</button>
      </div>
    </div>
  );

}

const mapStateToProps = (reduxstate) => {
  return {
    projects: reduxstate.community.projects,
    currentPage: reduxstate.community.currentPage,
    totalPages: reduxstate.community.totalPages,
    searchString: reduxstate.community.searchString,
  };
};

export default connect(mapStateToProps, { loadProjects, updateCurrentPage, updateTotalPages })(Pagination);

