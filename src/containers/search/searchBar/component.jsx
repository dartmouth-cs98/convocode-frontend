import React, { useState } from 'react';

const SearchBar = ({ resourceSearch }) => {
  const [query, setQuery] = useState('');
  // const [filters, setFilters] = useState([]); // UNIMPLEMENTED
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [numPerPage, setNumPerPage] = useState(100);

  const handleSubmit = (e) => {
    e.preventDefault();
    resourceSearch(query, [], sort, page, numPerPage);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Search Bar */}
        <input type="search" placeholder="Enter search here!" value={query} onChange={(e) => setQuery(e.target.value)} />

        {/* UNIMPLEMENTED: Filtering Options */}
        {/* <label htmlFor="idRange">Max User ID</label>
          <input type="range" id="idRange" placeholder="User ID Range" min={0} max={10} /> */}

        {/* Sorting Options */}
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="d">Alphabetical</option>
          <option value="a">Inverse Alphabetical</option>
        </select>

        {/* Pagination Controls */}
        <select value={page} onChange={(e) => setPage(e.target.value)}>
          <option value="1">Page 1</option>
          <option value="2">Page 2</option>
          <option value="3">Page 3</option>
          <option value="4">Page 4</option>
        </select>

        {/* Number Per Page Options */}
        <select value={numPerPage} onChange={(e) => setNumPerPage(e.target.value)}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>

        {/* Submit Button */}
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};

export default SearchBar;
