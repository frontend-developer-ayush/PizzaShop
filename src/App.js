import { useEffect, useState } from "react";
import PizzaForm from "./components/PizzaForm";
import PizzaCard from "./components/PizzaCard";
import "./App.css";

function App() {
  const [orders, setOrders] = useState([]);
  let intervalId;

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
      };
      // setOrders([...orders, order]);
      setOrders((prev) => [...prev, order]);
      // Increment remainingTime every second
      intervalId = setInterval(() => {
        setOrders((prevOrders) =>
          prevOrders.map((o) => {
            if (o.id === id) {
              const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
              const minutes = Math.floor(elapsedTime / 60);
              const seconds = elapsedTime % 60;
              const remainingTime = `${minutes} min ${seconds} sec`;

              // Highlight with red if the order remains in the same stage for more than 3 minutes
              const stageDuration = 180; // 3 minutes in seconds
              const isStageExceeded = elapsedTime > stageDuration;
              return { ...o, remainingTime, isStageExceeded };
            } else {
              return o;
            }
          })
        );
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
    }
  };

  const moveOrder = (id, nextStage) => {
    console.log("id", id, nextStage);
    // Clear interval for the order being moved
    setOrders((prevOrders) =>
      prevOrders.map((o) => {
        if (o.id === id) {
          clearInterval(o.intervalId);
        }
        return o;
      })
    );

    // Clear intervals for all orders
    // orders.forEach((order) => clearInterval(order.intervalId));

    const updatedOrders = orders?.map((order) => {
      if (order?.id === id) {
        return { ...order, stage: nextStage };
      }
      return order;
    });
    setOrders(updatedOrders);

    if (nextStage !== "Order Picked") {
      // Start timer for the next stage
      const nextStageStartTime = Date.now();
      const nextStageIntervalId = setInterval(() => {
        // Calculate remaining time for the next stage
        setOrders((prevOrders) =>
          prevOrders.map((o) => {
            if (o.id === id) {
              const elapsedTime = Math.floor(
                (Date.now() - nextStageStartTime) / 1000
              );
              const minutes = Math.floor(elapsedTime / 60);
              const seconds = elapsedTime % 60;
              const remainingTime = `${minutes} min ${seconds} sec`;

              // Highlight with red if the order remains in the same stage for more than 3 minutes
              const stageDuration = 180; // 3 minutes in seconds
              const isStageExceeded = elapsedTime > stageDuration;
              return { ...o, remainingTime, isStageExceeded };
            } else {
              return o;
            }
          })
        );
      }, 1000);

      // Save interval ID for the next stage in the order object
      setOrders((prevOrders) =>
        prevOrders.map((o) => {
          if (o.id === id) {
            return { ...o, intervalId: nextStageIntervalId };
          } else {
            return o;
          }
        })
      );
    }
  };

  const totalOrdersDelivered = orders?.filter((order) => {
    return order?.stage === "Order Picked";
  });

  console.log("total", totalOrdersDelivered);

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
            // height: "250px",
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
                    <td>ayush</td>
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
