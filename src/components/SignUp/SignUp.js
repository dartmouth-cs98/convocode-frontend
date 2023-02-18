import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { signup, clearUserError } from '../../state/actions';


import HeaderBar from "../HeaderBar/HeaderBar";
import ErrorModal from "../Error/ErrorModal";

import './signup.css'

const SignUp = (props) => {

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
    email2: Yup.string().email('Invalid email').required('Required')
      .oneOf([Yup.ref('email'), null], "Emails do not match!"),
    password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    password2: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
      .oneOf([Yup.ref('password'), null], "Passwords do not match!"),
  });

  const [modalShow, setModalShow] = useState(false);

  const handleModalToggle = () => {
    setModalShow(!modalShow);
  }

  const submit = (values) => {
    props.signup(values.email, values.password, values.username);
  }

  useEffect(() => {
    console.log("current state of ", props.error)
    setModalShow(props.error !== {})
  }, [props.error]);


  return (
    <div className="sign-up" data-theme={props.lightMode ? 'light' : 'dark'}>
      <HeaderBar />
      <div className="content">
        <h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
        {props.error.data ?
          <ErrorModal isOpen={modalShow} handleModalToggle={handleModalToggle} title={props.error.location} error={props.error.data} onClose={props.clearUserError} /> :
          <></>
        }
        <Formik
          initialValues={{
            name: '',
            username: '',
            email: '',
            email2: '',
            password: '',
            password2: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => submit(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <h3>Name:</h3>
              <Field name="name" id="one" />
              {errors.name && touched.name ? (
                <div>{errors.name}</div>
              ) : null}
              <h3>Username:</h3>
              <Field name="username" id="two" />
              {errors.username && touched.username ? (
                <div>{errors.username}</div>
              ) : null}
              <h3>Email:</h3>
              <Field name="email" type="email" id="three" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <h3>Confirm Email:</h3>
              <Field name="email2" type="email" id="four" />
              {errors.email2 && touched.email2 ? <div>{errors.email2}</div> : null}
              <h3>Password:</h3>
              <Field name="password" type="password" id="five" />
              {errors.password && touched.password ? <div>{errors.password}</div> : null}
              <h3>Confirm Password:</h3>
              <Field name="password2" type="password" id="six" />
              {errors.password2 && touched.password2 ? <div>{errors.password2}</div> : null}
              <div className="submit-buttons">
                <button type="submit">Submit</button>
                <NavLink to="/signin" id="link">Sign In</NavLink>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div >
  );
};
const mapStateToProps = (reduxstate) => {
  return {
    lightMode: reduxstate.settings.lightMode,
    error: reduxstate.user.error,
  };
};

export default connect(mapStateToProps, { signup, clearUserError })(SignUp);