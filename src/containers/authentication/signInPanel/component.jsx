import React, { useEffect, useState } from 'react';
import ActionTypes from '../../../utils/store';

const SignInPanel = ({
  isAuthenticated, isLoading, errorMessage,
  history, signInUser, setError
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) { history.push('/admin'); }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send only if all fields filled in
    if (!email) setError([ActionTypes.AUTH_USER], 'Please enter an email address!');
    else if (!password) setError([ActionTypes.AUTH_USER], 'Please enter a password!');
    else signInUser(email, password, { successCallback: () => history.push('/admin') });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Sign In" />
      </form>

      <p>{isLoading ? 'Authenticating...' : errorMessage}</p>
    </div>
  );
};

export default SignInPanel;
