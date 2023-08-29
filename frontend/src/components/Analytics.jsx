import React from "react";
import { Progress } from "antd";
import "./Anylytics.css";

const Analytics = ({ allTransection }) => {
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ];
  // total transection
  const totalTransection = allTransection.length;
  const totalIncomeTansections = allTransection.filter(
    (transection) => transection.type === "income"
  );
  const totalExpenseTansections = allTransection.filter(
    (transection) => transection.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTansections.length / totalTransection) * 100;
  const totalExpensePercent =
    (totalExpenseTansections.length / totalTransection) * 100;

  //  total turnover

  const totalTurnover = allTransection.reduce(
    (acc, transection) => acc + transection.amount,
    0
  );

  const totalIncomeTurnover = allTransection
    .filter((transection) => transection.type === "income")
    .reduce((acc, transection) => acc + transection.amount, 0);
  const totalExpenseTurnover = allTransection
    .filter((transection) => transection.type === "expense")
    .reduce((acc, transection) => acc + transection.amount, 0);
  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;
  return (
    <>
      <div className="row m-3 ">
        <div className="col-md-5">
          <div className="card">
            <div className="card-header">
              Total Transections :{totalTransection}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeTansections.length}
              </h5>
              <h5 className="text-danger">
                Expense : {totalExpenseTansections.length}
              </h5>
            </div>
            <div>
              <Progress
                type="circle"
                strokeColor={"green"}
                className="mx-2"
                percent={totalIncomePercent.toFixed(0)}
              />
              <Progress
                type="circle"
                strokeColor={"red"}
                className="mx-2"
                percent={totalExpensePercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card">
            <div className="card-header">Total TurnOver :{totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income : {totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expense : {totalExpenseTurnover}</h5>
            </div>
            <div>
              <Progress
                type="circle"
                strokeColor={"green"}
                className="mx-2"
                percent={totalIncomeTurnoverPercent.toFixed(0)}
              />
              <Progress
                type="circle"
                strokeColor={"red"}
                className="mx-2"
                percent={totalExpenseTurnoverPercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row m-3">
        <div className="col-md-5">
          <div className="card">
            <div className="card-header">Categorywise Income</div>

            {categories.map((category) => {
              const amount = allTransection
                .filter(
                  (transection) =>
                    transection.type === "income" &&
                    transection.category === category
                )
                .reduce((acc, transection) => acc + transection.amount, 0);

              return (
                amount > 0 && (
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="col-md-5">
          <div className="card">
            <div className="card-header">Categorywise Expense</div>

            {categories.map((category) => {
              const amount = allTransection
                .filter(
                  (transection) =>
                    transection.type === "expense" &&
                    transection.category === category
                )
                .reduce((acc, transection) => acc + transection.amount, 0);

              return (
                amount > 0 && (
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalExpenseTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
