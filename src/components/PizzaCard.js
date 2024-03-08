const PizzaCard = ({ order, moveOrder }) => {
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
        marginBottom: "10px",
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
    </div>
  );
};

export default PizzaCard;
