import { useEffect, useState } from "react";
import PizzaForm from "./components/PizzaForm";
import PizzaStagesSection from "./components/PizzaStagesSection";
import MainSection from "./components/MainSection";
import "./App.css";

function App() {
  const [limitedOrders, setLimitedOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [timeSpentOnStages, setTimeSpentOnStages] = useState({
    "Order Placed": 0,
    "Order is making": 0,
    "Order Ready": 0,
    "Order Picked": 0,
  });

  const startStageTimer = (id, startTime, stage) => {
    const intervalId = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((o) => {
          if (o.id === id) {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = elapsedTime % 60;
            const remainingTime = `${minutes} min ${seconds} sec`;

            const stageDuration = 180; // 3 minutes in seconds
            const isStageExceeded = elapsedTime > stageDuration;

            const updatedTimeSpent = { ...timeSpentOnStages };
            updatedTimeSpent[stage] += elapsedTime;

            return {
              ...o,
              remainingTime,
              isStageExceeded,
              timeSpent: { ...o.timeSpent, [stage]: elapsedTime },
            };
          } else {
            return o;
          }
        })
      );
      setTimeSpentOnStages((prev) => ({
        ...prev,
        [stage]: prev[stage] + 1,
      }));
    }, 1000);
    setOrders((prevOrders) =>
      prevOrders.map((o) => {
        if (o.id === id) {
          return { ...o, intervalId };
        } else {
          return o;
        }
      })
    );
  };

  const clearPreviousStageInterval = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) => {
        if (o.id === id) {
          clearInterval(o.intervalId);
        }
        return o;
      })
    );
  };

  const updateLimitedOrders = (id) => {
    const updatedOrders = limitedOrders.filter((order) => order.id !== id);
    setLimitedOrders(updatedOrders);
  };

  const placeOrder = (newOrder) => {
    if (limitedOrders?.length === 10) {
      alert("Not taking any order for now!");
    } else {
      // Generate unique ID for the new order
      const id = Math.floor(Math.random() * 1000);
      const startTime = Date.now();
      const order = {
        id,
        ...newOrder,
        stage: "Order Placed",
        remainingTime: "0 min 0 sec",
        startTime,
        isStageExceeded: false,
        timeSpent: {
          "Order Placed": 0,
          "Order is making": 0,
          "Order Ready": 0,
          "Order Picked": 0,
        },
      };
      setOrders((prev) => [...prev, order]);
      setLimitedOrders((prev) => [...prev, order]);
      startStageTimer(id, startTime, "Order Placed");
    }
  };

  const moveOrder = (id, nextStage) => {
    clearPreviousStageInterval(id);
    const updatedOrders = orders?.map((order) => {
      if (order?.id === id) {
        const elapsedTime = Math.floor((Date.now() - order.startTime) / 1000);
        const updatedTimeSpent = { ...order.timeSpent };
        updatedTimeSpent[order.stage] += elapsedTime;
        return { ...order, stage: nextStage, timeSpent: updatedTimeSpent };
      }
      return order;
    });
    setOrders(updatedOrders);

    if (nextStage !== "Order Picked") {
      // Start timer for the next stage
      const nextStageStartTime = Date.now();
      startStageTimer(id, nextStageStartTime, nextStage);
    } else {
      updateLimitedOrders(id);
    }
  };

  const totalOrdersDelivered = orders?.filter((order) => {
    return order?.stage === "Order Picked";
  });

  const cancelOrder = (id) => {
    clearPreviousStageInterval(id);
    updateLimitedOrders(id);
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  };

  const calculateTotalTimeSpent = (timeSpent) => {
    const total = Object.values(timeSpent).reduce((acc, cur) => acc + cur, 0);
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes} min ${seconds} sec`;
  };

  useEffect(() => {
    console.log("order", orders, "all", limitedOrders);
  });

  return (
    <>
      <PizzaForm placeOrder={placeOrder} />
      <PizzaStagesSection
        orders={orders}
        moveOrder={moveOrder}
        cancelOrder={cancelOrder}
      />
      <MainSection
        orders={orders}
        cancelOrder={cancelOrder}
        calculateTotalTimeSpent={calculateTotalTimeSpent}
        totalOrdersDelivered={totalOrdersDelivered}
      />
    </>
  );
}

export default App;
