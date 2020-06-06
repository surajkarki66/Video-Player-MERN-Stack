import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import Form from "../Form";
import "../Form.css";

const signIn = React.memo(() => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    redirect: localStorage.getItem("userTokenTime") ? true : false,
  });

  const onSubmitHandler = () => {
    if (
      !(credentials.email === "" || credentials.password === "") &&
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        credentials.email
      )
    ) {
      axios
        .post("http://127.0.0.1:3333/api/signIn", {
          email: credentials.email,
          password: credentials.password,
        })
        .then((res) => {
          const data = {
            token: res.data.token,
            time: new Date().getTime(),
          };
          localStorage.setItem("userTokenTime", JSON.stringify(data));
          setCredentials(prev => ({ ...prev, redirect: true}));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please enter valid details");
    }
  };
  if (credentials.redirect) return <Redirect to="/" />;
  return (
    <Form onSubmit={onSubmitHandler}>
      <h3 className="text-center text-info">Login</h3>
      <div className="form-group">
        <label htmlFor="email" className="text-info">
          Email:
        </label>
        <br />
        <input
          id="email"
          className="form-control"
          type="email"
          name="email"
          placeholder="example@domain.com"
          onChange={(event) => {
            const newEmail = event.target.value;
            setCredentials(prev => ({ ...prev, email: newEmail }));
          }}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="text-info">
          Password:
        </label>
        <br />
        <input
          id="password"
          className="form-control"
          type="password"
          name="password"
          placeholder="********"
          onChange={(event) => {
            const newPassword = event.target.value;
            setCredentials(prev => ({ ...prev, password: newPassword }));
          }}
          required
        />
      </div>
      <div className="d-flex justify-content-between align-items-end">
        <button
          onClick={onSubmitHandler}
          className="btn btn-info btn-md"
          type="button"
        >
          Submit
        </button>
        <Link to="/signUp" className="text-info">
          Sign Up here
        </Link>
      </div>
    </Form>
  );
});

export default signIn;
