import React from "react";

const MainSection = ({
  orders,
  calculateTotalTimeSpent,
  cancelOrder,
  totalOrdersDelivered,
}) => {
  return (
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
  );
};

export default MainSection;
