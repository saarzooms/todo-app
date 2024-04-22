import React, { useEffect, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [sqrCount, setSqrCount] = useState(0);
  const handleInc = () => {
    setCount(count + 1);
  };
  const handleDec = () => {
    setCount(count - 1);
  };
  const handleReset = () => {
    setCount(0);
  };
  useEffect(() => {
    setSqrCount(count * count);
  }, [count]);

  return (
    <div>
      {count} {sqrCount}
      <br />
      <button onClick={handleDec}>-</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleInc}>+</button>
    </div>
  );
};

export default Counter;
