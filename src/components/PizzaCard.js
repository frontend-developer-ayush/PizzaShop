const PizzaCard = ({ order, moveOrder, cancelOrder }) => {
  const { id, stage, remainingTime, isStageExceeded } = order;

  const handleMoveOrder = () => {
    console.log("stage", stage);
    let nextStage;
    if (stage === "Order Placed") {
      nextStage = "Order is making";
    } else if (stage === "Order is making") {
      nextStage = "Order Ready";
    } else if (stage === "Order Ready") {
      nextStage = "Order Picked";
    }

    moveOrder(id, nextStage);
  };

  const handleCancelOrder = () => {
    cancelOrder(id);
  };

  return (
    <div
      style={{
        border: "2px solid black",

        borderRadius: "5px",
        padding: "10px",
        backgroundColor: isStageExceeded ? "red" : "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {stage === "Order Picked" ? (
        <div>
          <p>Order {id}</p>
          <p>picked</p>
        </div>
      ) : (
        <div>
          <p>Order {id}</p>
          <p>{remainingTime}</p>
          <button onClick={() => handleMoveOrder()}>Next</button>
        </div>
      )}

      {/* <button onClick={() => handleMoveOrder("picked")}>Picked</button>
      <button onClick={handleCancelOrder}>Cancel</button> */}
    </div>
  );
};

export default PizzaCard;
