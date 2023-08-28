import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { Modal, Form, Input, Select, message } from "antd";
import axios from "axios";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);

  /// from handeling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/v1/transections/add-transection",
        { ...values, userid: user._id }
      );
      // console.log({ ...values, userid: user._id });
      setShowModel(false);
      setLoading(false);
      message.success("Item Added");
    } catch (error) {
      setLoading(false);
      message.error("failed");
    }
  };
  // get all transections
  const getAllTransections = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/v1/transections/get-transection",
        { userid: user._id }
      );
      setLoading(false);
      setAllTransection(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      message.error(error);
    }
  };

  useEffect(() => {
    getAllTransections();
  }, []);

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>Range filter</div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowModel(true);
            }}
          >
            Add New
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
            <th scope="col">Type</th>
            <th scope="col">Category</th>
            <th scope="col">Refrence</th>
            <th scope="col">Discription</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {allTransection.map((transaction, index) => (
            <tr key={transaction._id}>
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.type}</td>
              <td>{transaction.description}</td>
              <td>{transaction.refrence}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        title="Add Transection"
        open={showModel}
        onCancel={() => {
          setShowModel(false);
        }}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Refrence" name="refrence">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
