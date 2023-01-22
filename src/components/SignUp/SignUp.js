import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import HeaderBar from "../HeaderBar/HeaderBar";

import './signup.css'

const SignUp = (props) => {
  // const [name, setName] = useState();
  // const [username, setUsername] = useState();
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  // const [email2, setEmail2] = useState();
  // const [password2, setPassword2] = useState();
  // const [emailMatchError, setEmailMatchError] = useState(false);
  // const [emailRegError, setEmailRegError] = useState(false);
  // const [passMatchError, setPassMatchError] = useState(false);

  // const handleSubmit = () => {
  //   if (email === email2 && password === password2 && validEmail.test(email)) {
  //     alert('form submitted');
  //     resetErrors()
  //     resetAllFields();
  //   } else {
  //     console.log("improper data")
  //     if (email !== email2) {
  //       setEmailMatchError(true)
  //       setEmail("")
  //       setEmail2("")
  //     }
  //     if (password !== password2) {
  //       setPassMatchError(true)
  //       setPassword("")
  //       setPassword2("")
  //     }
  //     if (validEmail.test(email)) {
  //       setEmailRegError(true)
  //       setEmail("")
  //       setEmail2("")
  //     }
  //   }
  // }

  // const resetAllFields = () => {
  //   setName("")
  //   setUsername("")
  //   setEmail("")
  //   setEmail2("")
  //   setPassword("")
  //   setPassword2("")
  // }

  // const resetErrors = () => {
  //   setEmailMatchError(false)
  //   setEmailRegError(false)
  //   setPassMatchError(false)
  // }


  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short')
      .max(50, 'Too Long')
      .required('Required'),
    username: Yup.string()
      .min(2, 'Too Short')
      .max(50, 'Too Long')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  });

  return (
    <div className="sign-up" data-theme={props.lightMode ? 'light' : 'dark'}>
      <HeaderBar />
      <div className="content">
        <h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
        {/* <form onSubmit={() => handleSubmit()}>
          <label>
            <h3>Name:</h3>
            <input type="text" value={name} id="one" onChange={(e) => setName(e.target.data)} />
          </label>
          <label>
            <h3>Username:</h3>
            <input type="text" value={username} id="two" onChange={(e) => setUsername(e.target.data)} />
          </label>
          <label>
            <h3>Email:</h3>
            <input type="text" value={email} id="three" onChange={(e) => setEmail(e.target.data)} />
          </label>
          <label>
            <h3>Confirm Email:</h3>
            <input type="text" value={email2} id="four" onChange={(e) => setEmail2(e.target.data)} />
          </label>
          <label>
            <h3>Password:</h3>
            <input type="password" value={password} id="five" onChange={(e) => setPassword(e.target.data)} />
          </label>
          <label>
            <h3>Confirm Password:</h3>
            <input type="password" value={password2} id="six" onChange={(e) => setPassword2(e.target.data)} />
          </label>
          <div className="submit-buttons">
            <input type="submit" />
            <NavLink to="/signin" id="link">Sign In</NavLink>
          </div>
        </form> */}
        <Formik
          initialValues={{
            name: '',
            username: '',
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="firstName" />
              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
              <Field name="lastName" />
              {errors.lastName && touched.lastName ? (
                <div>{errors.lastName}</div>
              ) : null}
              <Field name="email" type="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
const mapStateToProps = (reduxstate) => {
  return { lightMode: reduxstate.settings.lightMode };
};

export default connect(mapStateToProps, {})(SignUp);