import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';

import Form from '../Form';
import '../Form.css';

const signUp = React.memo((props) => {
    const [credentials, setCredentials] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      redirect: false     //localStorage.getItem('userTokenTime') ? true : false
    });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (!(credentials.firstName === '' || credentials.lastName === '' || credentials.email === '' || credentials.password === '')
          && (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(credentials.email))) {
          axios.post('http://127.0.0.1:3333/api/signUp', {
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            email: credentials.email,
            password: credentials.password
          }).then(res => {
              setCredentials(prev => ({...prev, redirect: true}));
              props.history.push('/signin');
          }).catch(err => {
            alert('Email already exist');
          });
        } else {
          alert('Please enter valid details');
        }
    };
    return (
        <Form onSubmit={onSubmitHandler}>
        <h3 className="text-center text-info">Register</h3>
        <div className="form-group">
          <label htmlFor="first-name" className="text-info">First Name:</label><br />
          <input
            id="first-name"
            className="form-control"
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={event => {
                const newFirstName = event.target.value;
                setCredentials(prev=>({...prev, firstName: newFirstName}));
            }}
            required />
        </div>
        <div className="form-group">
          <label htmlFor="last-name" className="text-info">Last Name:</label><br />
          <input
            id="last-name"
            className="form-control"
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={event => {
                const newLastName = event.target.value;
                setCredentials(prev=>({...prev, lastName: newLastName}));
            }}
            required />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="text-info">Email:</label><br />
          <input
            id="email"
            className="form-control"
            type="email"
            name="email"
            placeholder="example@domain.com"
            onChange={event=> {
                const newEmail = event.target.value;
                setCredentials(prev=>({...prev, email: newEmail}));
            }}
            required />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="text-info">Password:</label><br />
          <input
            id="password"
            className="form-control"
            type="password"
            name="password"
            placeholder="********"
            onChange={event=> {
                const newPassword = event.target.value;
                setCredentials(prev => ({...prev, password: newPassword}));
            }}
            required />
        </div>
        <div className="d-flex justify-content-between align-items-end">
          <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit" />
          <Link to="/signIn" className="text-info">Login here</Link>
        </div>
      </Form>
    );
});

export default signUp;