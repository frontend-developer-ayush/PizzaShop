import React from "react";
import PizzaCard from "./PizzaCard";

const PizzaStagesSection = () => {
  return (
    <div style={{ margin: "30px" }}>
      <div style={{ margin: "10px" }}>Pizza Stages Section</div>
      <div
        style={{
          height: "250px",
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid black",
        }}
      >
        <div style={{ border: "1px solid black", padding: "20px", flex: 1 }}>
          Order placed
        </div>
        <div style={{ border: "1px solid black", padding: "20px", flex: 1 }}>
          Order is making
        </div>
        <div style={{ border: "1px solid black", padding: "20px", flex: 1 }}>
          Order Ready
        </div>
        <div style={{ border: "1px solid black", padding: "20px", flex: 1 }}>
          Order Picked
        </div>
      </div>
    </div>
  );
};

export default PizzaStagesSection;
