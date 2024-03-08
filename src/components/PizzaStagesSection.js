import React from "react";
import PizzaCard from "./PizzaCard";

const PizzaStagesSection = ({ orders, moveOrder, cancelOrder }) => {
  return (
    <div style={{ margin: "30px" }}>
      <div style={{ margin: "10px" }}>
        <h3>Pizza Stages Section</h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid black",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            flex: 1,
          }}
        >
          <h5>Order Placed</h5>
          {orders.map((order) => {
            if (order?.stage === "Order Placed") {
              return (
                <PizzaCard
                  key={order.id}
                  order={order}
                  moveOrder={moveOrder}
                  cancelOrder={cancelOrder}
                />
              );
            }
          })}
        </div>
        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            flex: 1,
          }}
        >
          <h5>Order is making</h5>
          {orders.map((order) => {
            if (order?.stage === "Order is making") {
              return (
                <PizzaCard
                  key={order.id}
                  order={order}
                  moveOrder={moveOrder}
                  cancelOrder={cancelOrder}
                />
              );
            }
          })}
        </div>
        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            flex: 1,
          }}
        >
          <h5>Order Ready</h5>
          {orders.map((order) => {
            if (order?.stage === "Order Ready") {
              return (
                <PizzaCard
                  key={order.id}
                  order={order}
                  moveOrder={moveOrder}
                  cancelOrder={cancelOrder}
                />
              );
            }
          })}
        </div>
        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            flex: 1,
          }}
        >
          <h5>Order picked</h5>
          {orders.map((order) => {
            if (order?.stage === "Order Picked") {
              return (
                <PizzaCard
                  key={order.id}
                  order={order}
                  moveOrder={moveOrder}
                  cancelOrder={cancelOrder}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default PizzaStagesSection;
