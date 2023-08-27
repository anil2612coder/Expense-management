import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        values
      );
      message.success("User Login successfully");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Invalid username or password");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="register">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Login Form</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex">
            <Link to="/register">Not a user ? Click Here to register</Link>
            <button className="btn btn-primary"> Login</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
