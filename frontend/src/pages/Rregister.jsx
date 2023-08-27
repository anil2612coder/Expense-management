import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Rregister = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/v1/users/register", values);
      message.success("User Registered successfully");
      navigate("/login");
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
          <h1>Register Form</h1>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex">
            <Link to="/login">Already Register ? Click Here to login</Link>
            <button className="btn btn-primary"> Register</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Rregister;
