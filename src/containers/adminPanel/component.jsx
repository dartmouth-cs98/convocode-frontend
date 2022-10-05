import React, { useState } from 'react';
import SearchItem from '../../components/searchItem';

const AdminPanel = ({
  resourceIsLoading, resourceErrorMessage, resourceMap, fetchAllResources, fetchResourceById,
  userIsLoading, userErrorMessage, userMap, fetchAllUsers, fetchUserById,
}) => {
  const [resourceId, setResourceId] = useState('');
  const [userId, setUserId] = useState('');

  const handleResourceAllSubmit = (e) => {
    e.preventDefault();
    fetchAllResources();
  };

  const handleResourceIdSubmit = (e) => {
    e.preventDefault();
    fetchResourceById(resourceId);
  };

  const handleUserAllSubmit = (e) => {
    e.preventDefault();
    fetchAllUsers();
  };

  const handleUserIdSubmit = (e) => {
    e.preventDefault();
    fetchUserById(userId);
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <section>
        <h2>Resources</h2>

        {resourceIsLoading
          ? <p>Loading...</p>
          : (
            <>
              <form onSubmit={handleResourceAllSubmit}>
                <h3>Fetch All Resources</h3>
                <button type="submit">Fetch All Resources</button>
              </form>

              <form onSubmit={handleResourceIdSubmit}>
                <h3>Fetch Resource By Id</h3>
                <input type="text" value={resourceId} onChange={(e) => setResourceId(e.target.value)} />
                <button type="submit">Fetch Resource By Id</button>
              </form>

              <div>
                <h3>Redux Resource Map</h3>
                <div>{Object.values(resourceMap).map((r) => <SearchItem key={r._id} displayObject={r} />)}</div>
              </div>
            </>
          )}

        {resourceErrorMessage && <p>{resourceErrorMessage}</p>}
      </section>

      <section>
        <h2>Users</h2>

        {userIsLoading
          ? <p>Loading...</p>
          : (
            <>
              <form onSubmit={handleUserAllSubmit}>
                <h3>Fetch All Users</h3>
                <button type="submit">Fetch All Users</button>
              </form>

              <form onSubmit={handleUserIdSubmit}>
                <h3>Fetch User By Id</h3>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
                <button type="submit">Fetch User By Id</button>
              </form>

              <div>
                <h3>Redux User Map</h3>
                <div>{Object.values(userMap).map((u) => <SearchItem key={u._id} displayObject={u} />)}</div>
              </div>
            </>
          )}

        {userErrorMessage && <p>{userErrorMessage}</p>}
      </section>
    </div>
  );
};

export default AdminPanel;
