import { useEffect, useState } from "react";
import PizzaForm from "./components/PizzaForm";
import PizzaCard from "./components/PizzaCard";
import "./App.css";

function App() {
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

  const placeOrder = (newOrder) => {
    if (orders?.length === 10) {
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
      startStageTimer(id, startTime, "Order Placed");
    }
  };

  const moveOrder = (id, nextStage) => {
    // Clear interval for the order being moved
    setOrders((prevOrders) =>
      prevOrders.map((o) => {
        if (o.id === id) {
          clearInterval(o.intervalId);
        }
        return o;
      })
    );

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
    }
  };

  const totalOrdersDelivered = orders?.filter((order) => {
    return order?.stage === "Order Picked";
  });

  const cancelOrder = (id) => {
    // Clear interval for the order being moved
    setOrders((prevOrders) =>
      prevOrders.map((o) => {
        if (o.id === id) {
          clearInterval(o.intervalId);
        }
        return o;
      })
    );
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
    console.log("order", orders);
  });

  return (
    <div className="App">
      <PizzaForm placeOrder={placeOrder} />
      {/* pizza stage */}
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
      {/* main section */}
      <div style={{ margin: "20px" }}>
        <div>
          <h3>Main Section</h3>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Stage</th>
                <th>Total time spent (time from order placed)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => {
                return (
                  <tr>
                    <td>Order Id: {order?.id}</td>
                    <td>{order?.stage}</td>
                    <td>{calculateTotalTimeSpent(order.timeSpent)}</td>
                    <td>
                      {(order?.stage === "Order Placed" ||
                        order?.stage === "Order is making") && (
                        <button onClick={() => cancelOrder(order?.id)}>
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td>Total order delivered</td>
                <td colSpan={2}>{totalOrdersDelivered?.length}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
