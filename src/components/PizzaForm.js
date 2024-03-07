import React, { useState } from "react";

const PizzaForm = ({ placeOrder }) => {
  const [pizzaType, setPizzaType] = useState("");
  const [pizzaSize, setPizzaSize] = useState("");
  const [pizzaBase, setPizzaBase] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder({ type: pizzaType, size: pizzaSize, base: pizzaBase });
    setPizzaType("");
    setPizzaSize("");
    setPizzaBase("");
  };
  return (
    <div className="main">
      <h2>PIZZA SHOP</h2>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="pizzaType">Pizza Type:</label>
          <select
            name="pizzaType"
            id="pizzaType"
            value={pizzaType}
            onChange={(e) => setPizzaType(e.target.value)}
            required
          >
            <option value="">Please choose one option</option>
            <option value="veg">Veg</option>
            <option value="nonVeg">Non Veg</option>
          </select>

          <label htmlFor="pizzaSize">Pizza Size:</label>
          <select
            name="pizzaSize"
            id="pizzaSize"
            value={pizzaSize}
            onChange={(e) => setPizzaSize(e.target.value)}
            required
          >
            <option value="">Please choose one option</option>
            <option value="large">Large</option>
            <option value="medium">Medium</option>
            <option value="small">Small</option>
          </select>

          <label htmlFor="pizzaBase">Pizza Base:</label>
          <select
            name="pizzaBase"
            id="pizzaBase"
            value={pizzaBase}
            onChange={(e) => setPizzaBase(e.target.value)}
            required
          >
            <option value="">Please choose one option</option>
            <option value="thin">Thin</option>
            <option value="thick">Thick</option>
          </select>

          <button type="submit" style={{ marginTop: "30px" }}>
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default PizzaForm;
