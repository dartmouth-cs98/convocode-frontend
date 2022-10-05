import React from 'react';
import SearchItem from '../../../components/searchItem';

const SearchPane = ({
  results, numResults,
  isLoading, errorMessage
}) => {
  if (isLoading) return <div><p>Loading results...</p></div>;
  if (errorMessage) return <div><p>{errorMessage}</p></div>;

  return (
    <div>
      <>
        {/* Number of results available for given query and filter options */}
        {/* Check if there have been results loaded or if there is an array of resources in redux */}
        <p>
          {numResults || (results && results.length) ? numResults || results.length : 0}
          {' '}
          results
        </p>

        {/* Go through passed data array and break into SearchItem elements */}
        {results && results.length ? results.map((element) => <SearchItem key={element.id || element._id} displayObject={element} />) : null}
      </>
    </div>
  );
};

export default SearchPane;
