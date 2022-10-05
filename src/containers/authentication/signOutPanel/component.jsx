import React from 'react';
import { NavLink } from 'react-router-dom';

const SignOutPanel = ({ signOutUser }) => (
  <div>
    <NavLink to="/" onClick={() => signOutUser()}>Sign Out</NavLink>
  </div>
);

export default SignOutPanel;
