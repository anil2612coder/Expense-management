import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import "./Login.css"; // Import the CSS file

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
    <div className="login-container">
      <div className="login-form">
        {loading && <Spinner />}
        <h1>Login Form</h1>
        <Form layout="vertical" onFinish={submitHandler}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input type="password" />
          </Form.Item>
          <div className="form-actions">
            <Link to="/register">Not a user? Click Here to Register</Link>
            <button className="btn btn-primary">Login</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
