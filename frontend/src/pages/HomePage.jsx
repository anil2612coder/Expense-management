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
        "http://localhost:5000/api/v1/transections/add-transection",
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
        "http://localhost:5000/api/v1/transections/get-transection",
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

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select
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
              value={selectedDate}
              onChange={(values) => {
                setSelectedDate(values);
              }}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select
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
        <div className="mx-2 switch-icon">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => {
              setViewData("table");
            }}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon " : "inactive-icon"
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
      <div className="content">
        {viewData === "table" ? (
          <table className="table m-3 table-striped table-hover ">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Type</th>
                <th scope="col">Category</th>
                <th scope="col">Refrence</th>
                <th scope="col">Discription</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="table-group-divider ">
              {allTransection.map((transaction, index) => (
                <tr key={transaction._id}>
                  <td>{moment(transaction.date).format("DD-MM-YYYY")}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.refrence}</td>
                  <td>
                    <div>
                      <DeleteOutlined />
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
