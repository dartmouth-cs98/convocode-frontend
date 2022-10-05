import React from 'react';

const SearchItem = ({ displayObject }) => (
  <div>
    {Object.entries(displayObject).map(([k, v]) => (
      <div key={k}>
        {JSON.stringify(k)}
        :
        {' '}
        {JSON.stringify(v)}
      </div>
    ))}
  </div>
);

export default SearchItem;
