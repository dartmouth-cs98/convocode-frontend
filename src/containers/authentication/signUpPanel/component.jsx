import React, { useEffect, useState } from 'react';
import ActionTypes from '../../../utils/store';

const SignInPanel = ({
  isAuthenticated, isLoading, errorMessage,
  history, signUpUser, setError
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) { history.push('/admin'); }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send only if all fields filled in
    if (!firstName) setError([ActionTypes.AUTH_USER], 'Please enter your first name!');
    else if (!lastName) setError([ActionTypes.AUTH_USER], 'Please enter your last name!');
    else if (!email) setError([ActionTypes.AUTH_USER], 'Please enter an email address!');
    else if (!password) setError([ActionTypes.AUTH_USER], 'Please enter a password!');
    else signUpUser(email, password, firstName, lastName, { successCallback: () => history.push('/admin') });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Sign Up" />
      </form>

      <p>{isLoading ? 'Authenticating...' : errorMessage}</p>
    </div>
  );
};

export default SignInPanel;
