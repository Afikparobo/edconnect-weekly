import React from "react";
import Layout from "./shared/Layout";
import { Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { setCookie } from "./App";

const Login = () => {
  const [alert, setAlert] = useState([]);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let location = useHistory();
  const handleSubmit = async (eve) => {
    eve.preventDefault();
    await setLogin();
  };

  const setLogin = async () => {
    const resp = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (resp.status === 200) {
      const user = await resp.json();
      setCookie("uid", user.data.id);
      location.push("/");
    } else {
      setAlert("Invalid email/password");
      setShow(true);
    }
  };
  return (
    <Layout>
      <div className="mx-auto w-50 mt-5 p-5">
        <h2>Login</h2>
        {show && (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            {alert}
          </Alert>
        )}
        <Form onSubmit={handleSubmit} id="loginForm">
          <Form.Row>
            <Form.Label htmlFor="name"> Email Address:</Form.Label>
            <Form.Control
              type="email"
              placeholder={"enter email"}
              value={email}
              name="email"
              onChange={(eve) => {
                setEmail(eve.target.value);
              }}
            />
          </Form.Row>

          <Form.Row>
            <Form.Label htmlFor="password"> Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="enter password"
              value={password}
              name="password"
              onChange={(eve) => {
                setPassword(eve.target.value);
              }}
              autoComplete="true"
            />
          </Form.Row>

          <Button className="mt-3 mb-3" variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default Login;