import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "./Register.css"; // Import your custom CSS file for styling

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/v1/users/register", values);
      message.success("User Registered successfully");
      navigate("/login");
    } catch (error) {
      message.error("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register-container">
      <div className="register-form">
        {loading && <Spinner />}
        <h1>Register Form</h1>
        <Form layout="vertical" onFinish={submitHandler}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>
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
            <Link to="/login">Already Registered? Click Here to Login</Link>
            <button className="btn btn-primary">Register</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
