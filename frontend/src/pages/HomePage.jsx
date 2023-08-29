import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { Modal, Form, Input, Select, message, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
import "./HomePage.css";

const HomePage = () => {
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequesny, setFrequency] = useState("7");
  const { RangePicker } = DatePicker;
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");

  /// from handeling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      await axios.post(
        "https://expense-exdz.onrender.com/api/v1/transections/add-transection",
        { ...values, userid: user._id }
      );
      // console.log({ ...values, userid: user._id });
      setShowModel(false);
      setLoading(false);
      message.success("Item Added");
      getAllTransections();
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
        "https://expense-exdz.onrender.com/api/v1/transections/get-transection",
        { userid: user._id, frequesny, selectedDate, type }
      );
      setLoading(false);
      setAllTransection(res.data);
      // console.log(frequesny);
    } catch (error) {
      console.log(error);
      message.error(error);
    }
  };

  useEffect(() => {
    getAllTransections();
  }, [frequesny, selectedDate, type]);

  const handleDelete = async (transaction) => {
    try {
      setLoading(true);
      await axios.post(
        "https://expense-exdz.onrender.com/api/v1/transections/delete-transection",
        { transectionId: transaction._id }
      );
      setLoading(false);
      getAllTransections();
      message.success("Item Deleted");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error(error);
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters-container">
        <div className="filters">
          <div className="filter-section">
            <h6 className="filter-title">Select Frequency</h6>
            <Select
              className="filter-select"
              value={frequesny}
              onChange={(value) => {
                setFrequency(value);
              }}
            >
              <Select.Option value="7">Last 1 Weak</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequesny === "custom" && (
              <RangePicker
                className="filter-range-picker"
                value={selectedDate}
                onChange={(values) => {
                  setSelectedDate(values);
                }}
              />
            )}
          </div>
          <div className="filter-section">
            <h6 className="filter-title">Select Type</h6>
            <Select
              className="filter-select"
              value={type}
              onChange={(value) => {
                setType(value);
              }}
            >
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>
          <div className="switch-icon">
            <UnorderedListOutlined
              className={`view-icon ${
                viewData === "table" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => {
                setViewData("table");
              }}
            />
            <AreaChartOutlined
              className={`view-icon ${
                viewData === "analytics" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => {
                setViewData("analytics");
              }}
            />
          </div>
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
      </div>

      <div className="content">
        {viewData === "table" ? (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Category</th>
                <th>Reference</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {allTransection.map((transaction, index) => (
                <tr key={transaction._id}>
                  <td>{moment(transaction.date).format("DD-MM-YYYY")}</td>
                  <td>{transaction.amount}</td>
                  <td className={`type-${transaction.type}`}>
                    {transaction.type}
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.refrence}</td>
                  <td>{transaction.description}</td>
                  <td>
                    <div className="action-icons">
                      <DeleteOutlined
                        onClick={() => handleDelete(transaction)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Analytics allTransection={allTransection} />
        )}
      </div>

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
